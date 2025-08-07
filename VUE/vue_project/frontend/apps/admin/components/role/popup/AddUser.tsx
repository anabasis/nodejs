import { ButtonMui, SelectChangeEvent, SelectMui, BoardTable, Checkbox, Chip, SearchIcoInput, FilterItem, NoData, SelectChangeEventType } from 'ui'
import { ChangeEvent, Dispatch, useEffect, useMemo, useState } from 'react'
import { ToastType, useModal, useToastPopup } from 'library'
import { SetStateAction, useAtom } from 'jotai'
import { memberSearchConditionList } from '@constant/selectList'
import { UserRoleMemberType } from '@type/role/userRole'
import { userRoleMemberSaveSusccessAtom } from '@store/client/role'
import { useQueryClient } from '@tanstack/react-query'
import { useLevelMember, useUserRoleMemberUpdate } from '@store/server/useUserRoleQuery'
import { useRoleMember } from '@hook/useRoleMember'
import { isEmpty } from 'lodash-es'

// prop - 기업 레벨, 역할 레벨에 맞는 인원 리스트만 출력하기 위함
interface AddUserProps {
  purpose: string
  userData?: UserRoleMemberType[]
  setUserData?: Dispatch<SetStateAction<UserRoleMemberType[]>>
  corporateLevel?: string
  roleNumber?: string
}

const initData = {
  searchType: 'NAME',
  keyword: '',
}

const AddUser = (props: AddUserProps) => {
  const { purpose, userData, setUserData, corporateLevel, roleNumber } = props

  const [userRoleMemberSaveFail, isUserRoleMemberSaveFail] = useState(false) // 사용자 역할 회원 변경 실패 여부
  const [params, setParams] = useState({ searchType: '', keyword: '' })
  const [selectTab, setSelectTab] = useState<{ [key in string]: string }>()
  const [valueParam, setValueParam] = useState('')
  const [userRoleMemberSaveSuccess, isUserRoleMemberSaveSuccess] = useAtom(userRoleMemberSaveSusccessAtom) // 사용자 역할 회원 변경 성공 여부

  const queryClient = useQueryClient()
  const { data, isSuccess } = useLevelMember({ params, corporateLevel })
  const { selectedUserList, removeList, handleList } = useRoleMember()
  const mutateUpdateUserRoleMember = useUserRoleMemberUpdate()

  // 추가 버튼 비활성화 여부, 선택된 멤버가 없으면 Save 버튼 비활성화
  const disabledButton = useMemo(() => {
    return selectedUserList.length === 0
  }, [selectedUserList])

  const { toastOpen } = useToastPopup()
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
   * UserRoleMemberAddFailToast: 사용자 역할 멤버 추가 실패 toast popup
   */
  const UserRoleMemberAddFailToast: ToastType = {
    icon: 'warning',
    content: 'Add failed.',
  }

  /**
   * handleAdd: Add 버튼을 클릭 시 동작하는 함수
   * - 역할 추가 시 : 선택된 멤버들을 추가하여 인원 추가 화면에 노출 (임시 노출)
   * - 역할 수정 시 : 선택된 멤버들 추가 저장
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
      modalClose('addUser')
    } else {
      let data = selectedUserList.map((item: UserRoleMemberType) => ({ usrUid: item.usrUid, procTp: 'C', modifyUsrRoleNum: Number(roleNumber) }))
      mutateUpdateUserRoleMember.mutate(
        { data, roleNumber },
        {
          onSuccess: () => {
            isUserRoleMemberSaveSuccess(true)
            queryClient.invalidateQueries(['userRoleMember'])
            modalClose('addUser')
          },
          onError: () => {
            isUserRoleMemberSaveFail(true)
          },
        }
      )
    }
  }

  // 멤버 변경 싫패 시 toast popup 제공
  useEffect(() => {
    if (userRoleMemberSaveFail) {
      toastOpen(UserRoleMemberAddFailToast)
      isUserRoleMemberSaveFail(false)
    }
  }, [userRoleMemberSaveFail])

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
          <div className="">
            <span className="title3 typo500">
              Selected<em className="ml_6 title2 typo800 tl in_block min_w20">{selectedUserList?.length || 0}</em>
            </span>
          </div>
          <div className="align start wrap gap_10 flex1 min_h30">
            {selectedUserList.map((element) => (
              <Chip key={element.emlId} onClick={() => removeList(element.usrUid)}>
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
          disabled={disabledButton || mutateUpdateUserRoleMember.isLoading}
          isLoading={mutateUpdateUserRoleMember.isLoading}
          onClick={() => handleAdd()}
        >
          Add
        </ButtonMui>
      </div>
    </>
  )
}

export default AddUser
