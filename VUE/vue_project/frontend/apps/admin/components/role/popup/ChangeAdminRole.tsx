/**
 * 화면: 어드민 역할_역할 상세_역할 수정_역할 인원_역할 변경.p
 */

import { ButtonMui, DetailTable, MultiSelectMui, SelectChangeEvent } from 'ui'
import { ToastType, useModal, useToastPopup } from 'library'
import { useEffect, useMemo, useState } from 'react'
import { AdminRoleMemberType, AdminRoleModifiedListType, AdminRoleModifiedMemberType } from '@type/role/adminRole'
import { getMemberAdminRoles } from '@api/role'
import { useQueryClient } from '@tanstack/react-query'
import { useAdminRoleData } from '@store/server/useCommonQuery'
import { useAtom } from 'jotai'
import { adminRoleMemberSaveSusccessAtom } from '@store/client/role'
import { useAdminRoleMemberUpdate } from '@store/server/useAdminRoleQuery'

interface ChangeAdminRoleProps {
  user: AdminRoleMemberType // 현재 멤버
  roleNumber: string
}

const ChangeAdminRole = (props: ChangeAdminRoleProps) => {
  const { user, roleNumber } = props
  const [currentAdminRole, setCurrentAdminRole] = useState([])
  const [selectedAdminRole, setSelectedAdminRole] = useState([]) // 선택된 admin role
  const [savedData, setSavedData] = useState<AdminRoleModifiedMemberType>()
  const [adminRoleMemberSaveFail, isAdminRoleMemberSaveFail] = useState(false) // 어드민 역할 회원 변경 실패 여부

  const [adminRoleMemberSaveSuccess, isAdminRoleMemberSaveSuccess] = useAtom(adminRoleMemberSaveSusccessAtom) // 어드민 역할 회원 변경 성공 여부

  const queryClient = useQueryClient()
  const adminRoleList = useAdminRoleData() // 어드민 역할 리스트 조회
  const mutateUpdateAdminRoleMember = useAdminRoleMemberUpdate()

  // 저장 버튼 비활성화 여부, 역할 변경이 없으면 Save 버튼 비활성화
  const disabledButton = useMemo(() => {
    return !(currentAdminRole.sort().toString() !== selectedAdminRole.sort().toString())
  }, [currentAdminRole, selectedAdminRole])

  const { toastOpen } = useToastPopup()
  const { modalClose } = useModal()

  /**
   * AdminRoleMemberAddFailToast: 사용자 역할 멤버 추가 실패 toast popup
   */
  const AdminRoleMemberAddFailToast: ToastType = {
    icon: 'warning',
    content: 'Add failed.',
  }

  /**
   * handleSave: Save 버튼을 클릭하면 동작하는 함수
   * - 현 멤버의 변경된 역할을 저장하고 멤버 리스트에 저장
   * - 모달 닫기
   */
  const handleSave = () => {
    // 추가된 역할
    let addData = selectedAdminRole
      .filter((item) => !currentAdminRole.includes(item))
      .map((item) => ({ admRolAplNum: null, admRolNum: Number(item), procTp: 'C' }))

    let deleteList = currentAdminRole.filter((item) => !selectedAdminRole.includes(item))
    let noneList = selectedAdminRole.filter((item) => currentAdminRole.includes(item))

    // 삭제된 역할
    let deleteData = savedData.admRoleList.filter((item) => deleteList.includes(item.admRolNum.toString())).map((item) => ({ ...item, procTp: 'D' }))
    // 변경없는 역할
    let noneData = savedData.admRoleList.filter((item) => noneList.includes(item.admRolNum.toString()))

    let data = { usrUid: savedData.usrUid, admRoleList: [...noneData, ...deleteData, ...addData] }

    mutateUpdateAdminRoleMember.mutate(
      { data: [data], roleNumber: roleNumber },
      {
        onSuccess: () => {
          isAdminRoleMemberSaveSuccess(true)
          queryClient.invalidateQueries(['adminRoleMember'])
          modalClose('changeRole')
        },
        onError: () => {
          isAdminRoleMemberSaveFail(true)
        },
      }
    )
  }

  // 초기 세팅
  useEffect(() => {
    const init = () => {
      getMemberAdminRoles(user.admRoleNum.toString(), user.usrUid).then((data) => {
        let list = data.usrUidList.map((item: AdminRoleModifiedListType) => item.admRolNum.toString())
        setCurrentAdminRole(list)
        setSelectedAdminRole(list)
        setSavedData({ usrUid: data.usrUid, admRoleList: data.usrUidList })
      })
    }
    init()
  }, [])

  // 멤버 변경 싫패 시 toast popup 제공
  useEffect(() => {
    if (adminRoleMemberSaveFail) {
      toastOpen(AdminRoleMemberAddFailToast)
      isAdminRoleMemberSaveFail(false)
    }
  }, [adminRoleMemberSaveFail])

  return (
    <>
      <div className="bg_box">
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '70%' }} />
            </colgroup>
          }
        >
          <tr>
            <th className="navy300">Name</th>
            <td className="navy600">{user.usrNm}</td>
          </tr>
          <tr>
            <th className="navy300">Email</th>
            <td className="navy600">{user.emlId}</td>
          </tr>
          <tr>
            <th className="navy300">Organization</th>
            <td className="navy600">{user.orgnNm || '-'}</td>
          </tr>
          <tr>
            <th className="navy300">Job title</th>
            <td className="navy600">{user.jobTitl || '-'}</td>
          </tr>
        </DetailTable>
      </div>

      <div className="ptb_20 pl_24">
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '28%' }} />
              <col style={{ width: '72%' }} />
            </colgroup>
          }
        >
          <tr>
            <th>Admin role</th>
            {/* className="pr_0" */}
            <td>
              {/* 어드민 역할 multi select */}
              <MultiSelectMui
                options={adminRoleList}
                value={selectedAdminRole}
                size="large"
                placeholder="Please select admin roles."
                onChange={(event: SelectChangeEvent<string[]>) => {
                  if (event.target.value.length === 0) {
                    setSelectedAdminRole([])
                    return
                  }
                  selectedAdminRole.find((item) => !event.target.value.includes(item)) !== undefined
                    ? setSelectedAdminRole(selectedAdminRole.filter((item) => event.target.value.includes(item)))
                    : setSelectedAdminRole([...selectedAdminRole, event.target.value.at(-1)])
                }}
              />
            </td>
          </tr>
        </DetailTable>
      </div>

      <div className="align center">
        {/* 모달 닫기 */}
        <ButtonMui size="xlarge" type="outlined" onClick={() => modalClose('changeRole')}>
          Cancel
        </ButtonMui>
        {/* Save */}
        <ButtonMui
          size="xlarge"
          disabled={disabledButton || mutateUpdateAdminRoleMember.isLoading}
          isLoading={mutateUpdateAdminRoleMember.isLoading}
          onClick={() => handleSave()}
        >
          Save
        </ButtonMui>
      </div>
    </>
  )
}

export default ChangeAdminRole
