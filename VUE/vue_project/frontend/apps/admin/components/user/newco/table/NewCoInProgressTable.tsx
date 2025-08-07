import { BoardTable, Icons, NoData, Pagenation } from 'ui'
import { ModalType, changeTimeLocal, useMenu, useModal } from 'library'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { NewCoProgressListReturnType, NewCoProgressUser } from '@type/user/user'
import { useAtom } from 'jotai'
import { progressRequestNameAtom, progressRequestStatusAtom } from '@store/client/user'
import NewCoRegistrationDenied from '@components/user/popup/NewCoRegistrationDenied'
import NewCoRegistrationApproval from '@components/user/popup/NewCoRegistrationApproval'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'library/i18n/client'

interface NewCoCompleteTableProps {
  size: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  progressList: NewCoProgressListReturnType
}

const NewCoInProgressTable = (props: NewCoCompleteTableProps) => {
  const { size, currentPage, setCurrentPage, progressList } = props
  const { t } = useTranslation('platform')

  const [approval, isApproval] = useState(false) // 승인 여부
  const [deny, isDeny] = useState(false) // 거절 여부
  const [requestName, setRequestName] = useAtom(progressRequestNameAtom)
  const [requestStatus, setRequestStatus] = useAtom(progressRequestStatusAtom)

  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const { modalOpen } = useModal()

  /**
   * handleApprove: Approval 버튼 클릭 시 동작하는 함수
   * - 가입 승인 toast에 노출시킬 해당 유저의 이름 state에 저장
   * - Approve 모달 노출
   * @param user : 유저 정보
   */
  const handleApprove = (user: NewCoProgressUser) => {
    const approvalModal: ModalType = {
      deleteKey: 'approvalNewCoRegistration',
      title: t('loeO'),
      textTitle: t('jwWr'),
      linetitle: true,
      content: <NewCoRegistrationApproval user={user} isApproval={isApproval} />,
    }
    setRequestName(user.fullName)
    modalOpen(approvalModal)
  }

  /**
   * handleDeny: Deny 버튼 클릭 시 동작하는 함수
   * - 가입 거절 toast에 노출시킬 해당 유저의 이름 state에 저장
   * - Deny 모달 노출
   * @param user : 유저 정보
   */
  const handleDeny = (user: NewCoProgressUser) => {
    const denyModal: ModalType = {
      deleteKey: 'deniedNewCoRegistration',
      title: t('czVK'),
      textTitle: t('xrag'),
      linetitle: true,
      content: <NewCoRegistrationDenied user={user} isDeny={isDeny} />,
    }
    setRequestName(user.fullName)
    modalOpen(denyModal)
  }

  /**
   * showUserInformation: 표에 유저 정보를 보여준다.
   * @param user: 유저 정보
   * @param index: 인덱스
   * @returns: 유저 정보를 담고있는 표 렌더링
   */
  const showUserInformation = (user: NewCoProgressUser, index: number) => {
    return (
      <tr key={index}>
        <td>{size * currentPage + 1 + index}</td>
        <td>{user.fullName}</td>
        <td>{user.nation}</td>
        <td>{user.corporationName}</td>
        <td>{user.emailId}</td>
        <td>{user.organization || '-'}</td>
        <td>{user.jobTitle || '-'}</td>
        <td>{changeTimeLocal({ time: user.createDate, type: 'yyyy-MM-dd' })}</td>
        <td>
          <button className="btn status" disabled={getPathInfo(pathname).uptYn !== 'Y'} onClick={() => handleApprove(user)}>
            <Icons.Approval fill="var(--isc-done)" />
            <span>{t('wKcC')}</span>
          </button>
          <button className="btn status" disabled={getPathInfo(pathname).uptYn !== 'Y'} onClick={() => handleDeny(user)}>
            <Icons.Deny fill="var(--isc-fail)" />
            <span>{t('KjaI')}</span>
          </button>
        </td>
      </tr>
    )
  }

  // 가입 승인 시 승인 toast popup 노출
  // 가입 거절 시 거절 toast popup 노출
  useEffect(() => {
    if (approval) {
      setRequestStatus('approval')
      isApproval(false)
    }
    if (deny) {
      setRequestStatus('deny')
      isDeny(false)
    }
    if (currentPage !== 0 && progressList?.totalElements % size === 1) {
      setCurrentPage(Math.floor(progressList?.totalElements / size) - 1 || 0)
    }
  }, [approval, isApproval, deny, isDeny, setRequestStatus])

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '6%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '9%' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '200px' }} />
        </colgroup>
        <thead>
          <tr>
            <th>{t('YodX')}</th>
            <th>{t('CwmC')}</th>
            <th>Country</th>
            <th>{t('orzY')}</th>
            <th>{t('yMUt')}</th>
            <th>{t('TPEV')}</th>
            <th>{t('ENsp')}</th>
            <th>{t('aJqe')}</th>
            <th>{t('OeJh')}</th>
          </tr>
        </thead>
        <tbody>
          {progressList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={9}>
                <NoData text={t('bwgU')} className="full" />
              </td>
            </tr>
          ) : (
            progressList?.content?.map((user: NewCoProgressUser, index: number) => showUserInformation(user, index))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={progressList?.totalPages}
        totalCount={progressList?.totalElements}
        pageSize={size}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  )
}

export default NewCoInProgressTable
