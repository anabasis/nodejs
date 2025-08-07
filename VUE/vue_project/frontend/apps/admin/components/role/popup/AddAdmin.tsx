import { AdminRoleMemberType } from '@type/role/adminRole'
import { BoardTable, ButtonMui, Checkbox, Chip, FilterItem, NoData, SearchIcoInput, SelectChangeEvent, SelectChangeEventType, SelectMui } from 'ui'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { AlertType, ToastType, useAlert, useModal, useToastPopup } from 'library'
import { memberSearchConditionList } from '@constant/selectList'
import { useAdminRoleMemberUpdate, useHQmember } from '@store/server/useAdminRoleQuery'
import { adminRoleMemberSaveSusccessAtom } from '@store/client/role'
import { useAtom } from 'jotai'
import { useQueryClient } from '@tanstack/react-query'
import { useRoleMember } from '@hook/useRoleMember'
import { isEmpty } from 'lodash-es'

/**
 * 화면: 어드민 역할 회원 추가 팝업
 */

interface AddUserProps {
  purpose: string
  roleNumber?: string
  userData: AdminRoleMemberType[]
  adminRoleMemberList?: AdminRoleMemberType[]
  setUserData: Dispatch<SetStateAction<AdminRoleMemberType[]>>
}

const initData = {
  searchType: 'NAME',
  keyword: '',
}

const AddAdmin = (props: AddUserProps) => {
  const { purpose, roleNumber, userData, adminRoleMemberList, setUserData } = props

  const [adminRoleMemberSaveFail, isAdminRoleMemberSaveFail] = useState(false) // 최원 추가 실패 여부
  const [params, setParams] = useState({ searchType: '', keyword: '' })
  const [selectTab, setSelectTab] = useState<{ [key in string]: string }>()
  const [valueParam, setValueParam] = useState('')
  const [adminRoleMemberSaveSuccess, isAdminRoleMemberSaveSuccess] = useAtom(adminRoleMemberSaveSusccessAtom) // 회원 추가 성공 여부

  const queryClient = useQueryClient()
  const { data, isSuccess } = useHQmember(params) // HQ member 리스트 조회 API call
  const { selectedUserList, removeList, handleList } = useRoleMember()
  const mutateUpdateAdminRoleMember = useAdminRoleMemberUpdate()

  // 추가 버튼 비활성화 여부, 선택된 멤버가 없으면 Save 버튼 비활성화
  const disabledButton = useMemo(() => {
    return selectedUserList.length === 0
  }, [selectedUserList])

  const { toastOpen } = useToastPopup()
  const { alertOpen, alertClose } = useAlert()
  const { modalClose } = useModal()

  const isEnterKeyPressed = (data: React.KeyboardEvent<HTMLInputElement> | string) => {
    return typeof data === 'object' && 'key' in data && data.key === 'Enter'
  }
  const onSelectTab = (event: SelectChangeEventType, key: string) => {
    setSelectTab({ [key]: event.target.value })
  }

  const onValueParamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueParam(event.target.value)
  }

  const resetParam = () => {
    setParams(initData)
    setSelectTab({ searchType: 'NAME' })
    setValueParam('')
  }

  const onSearch = (data: React.KeyboardEvent<HTMLInputElement> | string, key?: string) => {
    /* 
      Enter or Click Search => Event Fn      
    */

    if (isEmpty(selectTab) && isEmpty(valueParam)) return
    if (!isEnterKeyPressed(data) && typeof data !== 'string') return
    const param = {
      searchType: '',
      keyword: '',
    }
    /* Entert Event Fn */
    if (isEnterKeyPressed(data)) {
      Object.assign(param, {
        [key]: valueParam,
        ...selectTab,
      })
    } else if (typeof data === 'string') {
      /* Click Event Fn */
      Object.assign(param, {
        [data as string]: valueParam,
        ...selectTab,
      })
    }
    setParams(param)
  }

  /**
   * AdminRoleMemberAddFailToast: 사용자 역할 멤버 추가 실패 toast popup
   */
  const AdminRoleMemberAddFailToast: ToastType = {
    icon: 'warning',
    content: 'Add failed.',
  }

  /**
   * handleAdd: Add 버튼을 클릭 시 동작하는 함수
   * - 선택된 멤버들을 추가하여 인원 추가 화면에 노출
   */
  const handleAdd = () => {
    if (purpose === 'a') {
      let data = [...userData, ...selectedUserList].reduce((acc, cur) => {
        if (acc.findIndex(({ usrUid }) => usrUid === cur.usrUid) === -1) {
          acc.push(cur)
        }
        return acc
      }, [])

      setUserData(data)
      modalClose('addAdmin')
    } else {
      let present = adminRoleMemberList.map((item) => item.usrUid)
      let data = selectedUserList
        .filter((item) => !present.includes(item.usrUid))
        .map((item: AdminRoleMemberType) => ({
          usrUid: item.usrUid,
          admRoleList: [{ admRolAplNum: null, admRolNum: Number(roleNumber), procTp: 'C' }],
        }))

      mutateUpdateAdminRoleMember.mutate(
        { data, roleNumber },
        {
          onSuccess: () => {
            isAdminRoleMemberSaveSuccess(true)
            queryClient.invalidateQueries(['adminRoleMember'])
            modalClose('addAdmin')
          },
          onError: () => {
            isAdminRoleMemberSaveFail(true)
          },
        }
      )
    }
  }

  // 멤버 변경 싫패 시 toast popup 제공
  useEffect(() => {
    if (adminRoleMemberSaveFail) {
      toastOpen(AdminRoleMemberAddFailToast)
      isAdminRoleMemberSaveFail(false)
    }
  }, [adminRoleMemberSaveFail])

  return (
    <>
      <div className="align">
        <div className="lft gap_10">
          <FilterItem label="Keyword">
            <SearchIcoInput
              uiType="addSelect"
              placeholder="Enter keyword"
              value={valueParam || ''}
              onChangeSearch={(event: ChangeEvent<HTMLInputElement>) => onValueParamChange(event)}
              onSearchClick={() => onSearch('keyword')}
              onSearch={(event) => onSearch(event, 'keyword')}
              width={400}
            >
              <SelectMui
                uiType="multi"
                size="full"
                options={memberSearchConditionList}
                value={selectTab?.searchType || 'NAME'}
                onChange={(event: SelectChangeEvent) => onSelectTab(event, 'searchType')}
              />
            </SearchIcoInput>
          </FilterItem>
          <ButtonMui
            size="xsmall"
            type="outlined"
            color="gray"
            uiType="reset_btn"
            icon="ResetIcon"
            iconStyle={{ width: 20, height: 20, fill: '#354165' }}
            onClick={() => resetParam()}
          />
        </div>
      </div>
      <div className="mt_20">
        <BoardTable className="max_vh40 bb" inner>
          <colgroup>
            <col style={{ width: '6%' }} />
            <col style={{ width: '16%' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '19%' }} />
            <col style={{ width: 'auto%' }} />
            <col style={{ width: '12%' }} />
          </colgroup>
          <thead className="sticky">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>User Role</th>
              <th>Job Title</th>
            </tr>
          </thead>
          <tbody>
            {isSuccess && data?.length === 0 ? (
              <tr className="nodata">
                <td colSpan={6}>
                  <NoData text="Member information not found." />
                </td>
              </tr>
            ) : (
              data?.map((user, index) => (
                <tr key={index}>
                  <td>
                    <Checkbox
                      id={user.emlId}
                      size="xs"
                      onChange={(event) => handleList(user, event)}
                      value={selectedUserList.map((element) => element.usrUid).includes(user.usrUid)}
                    />
                  </td>
                  <td>{user.usrNm}</td>
                  <td>{user.emlId}</td>
                  <td>{user.orgnNm || '-'}</td>
                  <td>{user.usrRolNm}</td>
                  <td className="pr_30">{user.jobTitl || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </BoardTable>
        <div className="align start top mt_20 gap_5">
          <div>
            <span className="title3 typo500">
              Selected<em className="ml_6 title2 typo800 tl in_block min_w20">{selectedUserList?.length || 0}</em>
            </span>
          </div>
          <div className="align start wrap gap_10 flex1 min_h30">
            {selectedUserList.map((element) => (
              <Chip key={element.usrUid} onClick={() => removeList(element.usrUid)}>
                {element.usrNm}
              </Chip>
            ))}
          </div>
        </div>
      </div>
      <div className="align center mt_30">
        <ButtonMui size="xlarge" type="outlined" onClick={() => modalClose('addUser')}>
          Cancel
        </ButtonMui>
        <ButtonMui
          size="xlarge"
          disabled={disabledButton || mutateUpdateAdminRoleMember.isLoading}
          isLoading={mutateUpdateAdminRoleMember.isLoading}
          onClick={() => handleAdd()}
        >
          Add
        </ButtonMui>
      </div>
    </>
  )
}

export default AddAdmin
