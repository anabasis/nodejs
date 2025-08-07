import { BoardTable, ButtonMui, NoData, Pagenation, Icons } from 'ui'
import { ModalType, changeTimeLocal, useMenu, useModal } from 'library'
import { useSeegeneProgressData } from '@store/server/useSeegeneUserQuery'
import { SeegeneProgressSearch, SeegeneProgressUser } from '@type/user/user'
import SeegeneRegistrationApproval from '../../popup/SeegeneRegistrationApproval'
import SeegeneRegistrationDenied from '../../popup/SeegeneRegistrationDenied'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { progressRequestNameAtom, progressRequestStatusAtom } from '@store/client/user'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'library/i18n/client'

const rowSize = 20

const SeegeneInProgressTable = () => {
  const { t } = useTranslation('platform')
  const [approval, isApproval] = useState(false) // 승인 여부
  const [deny, isDeny] = useState(false) // 거절 여부
  const [requestName, setRequestName] = useAtom(progressRequestNameAtom) // 클릭한 가입 진행중인 유저 이름
  const [requestStatus, setRequestStatus] = useAtom(progressRequestStatusAtom) // 클릭한 가입처리

  const { searchFilterParams, currentPage, onPageChange } = useSearchFilter<SeegeneProgressSearch>()

  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const { modalOpen } = useModal()

  const { progressList, isSuccess } = useSeegeneProgressData({ searchFilterParams, currentPage })

  /**
   * handleApprove: Approval 버튼 클릭 시 동작하는 함수
   * - 가입 승인 toast에 노출시킬 해당 유저의 이름 state에 저장
   * - Approve 모달 노출
   * @param user : 유저 정보
   */
  const handleApprove = (user: SeegeneProgressUser) => {
    const approvalModal: ModalType = {
      deleteKey: 'approvalSeegeneRegistration',
      title: t('loeO'),
      textTitle: t('jwWr'),
      linetitle: true,
      content: <SeegeneRegistrationApproval user={user} isApproval={isApproval} />,
    }
    setRequestName(user.userName)
    modalOpen(approvalModal)
  }

  /**
   * handleDeny: Deny 버튼 클릭 시 동작하는 함수
   * - 가입 거절 toast에 노출시킬 해당 유저의 이름 state에 저장
   * - Deny 모달 노출
   * @param user : 유저 정보
   */
  const handleDeny = (user: SeegeneProgressUser) => {
    const denyModal: ModalType = {
      deleteKey: 'deniedSeegeneRegistration',
      title: t('czVK'),
      textTitle: t('xrag'),
      linetitle: true,
      content: <SeegeneRegistrationDenied user={user} isDeny={isDeny} />,
    }
    setRequestName(user.userName)
    modalOpen(denyModal)
  }

  /**
   * showUserInformation: 표에 유저 정보를 보여준다.
   * @param user: 유저 정보
   * @param index: 인덱스
   * @returns: 유저 정보를 담고있는 표 렌더링
   */
  const showUserInformation = (user: SeegeneProgressUser, index: number) => {
    return (
      <tr key={index}>
        <td>{currentPage * rowSize + index + 1}</td>
        <td>{user.userName}</td>
        <td>{user.emailId}</td>
        <td>{user.organization || '-'}</td>
        <td>{user.jobTitle || '-'}</td>
        <td>{changeTimeLocal({ time: user.receiptDate, type: 'yyyy-MM-dd' })}</td>
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
    if (currentPage !== 0 && progressList?.totalElements % rowSize === 1) {
      onPageChange(Math.floor(progressList?.totalElements / rowSize) - 1)
    }
  }, [approval, isApproval, deny, isDeny, setRequestStatus])

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '6%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '17%' }} />
          <col style={{ width: '17%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '230px' }} />
        </colgroup>
        <thead>
          <tr>
            <th>{t('YodX')}</th>
            <th>{t('CwmC')}</th>
            <th>{t('yMUt')}</th>
            <th>{t('TPEV')}</th>
            <th>{t('ENsp')}</th>
            <th>{t('aJqe')}</th>
            <th>{t('OeJh')}</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && progressList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={7}>
                <NoData text={t('bwgU')} className="full" />
              </td>
            </tr>
          ) : (
            progressList?.content?.map((user: SeegeneProgressUser, index: number) => showUserInformation(user, index))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={progressList?.totalPages}
        totalCount={progressList?.totalElements || 0}
        pageSize={rowSize}
        onPageChange={(page) => onPageChange(page)}
      />
    </>
  )
}

export default SeegeneInProgressTable
