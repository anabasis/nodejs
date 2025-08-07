import { cancelInvitationAtom, resendInvitationAtom } from '@store/client/user'
import { useAtom } from 'jotai'
import { BoardTable, ButtonMui, NoData, Pagenation } from 'ui'
import { changeTimeLocal, useMenu } from 'library'
import { useCancelNewCoInvitationMutate, useNewCoInvitationData, useResendNewCoInvitationMutate } from '@store/server/useNewCoUserQuery'
import { NewCoInvitationUser, NewCoInvitationSearch } from '@type/user/user'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'library/i18n/client'
import { useState } from 'react'

const NewCoInInvitationTable = () => {
  const { t } = useTranslation('platform')
  const [resendInvitation, isResendInvitation] = useAtom(resendInvitationAtom)
  const [cancelInvitation, isCancelInvitation] = useAtom(cancelInvitationAtom)
  const { searchFilterParams, currentPage, onPageChange } = useSearchFilter<NewCoInvitationSearch>()

  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const { invitationList, isSuccess } = useNewCoInvitationData({ searchFilterParams, currentPage })

  const queryClient = useQueryClient()
  const mutateResendNewCoInvitation = useResendNewCoInvitationMutate()
  const mutateCancelNewCoInvitation = useCancelNewCoInvitationMutate()

  const [loadingUid, setLoadingUid] = useState('')

  /**
   * handleResend: 초대 재전송 버튼을 클릭할 시 동작하는 함수
   * - 초대 메일 재전송 API 호출
   * - 초대 메일 재전송 완료 toast popup 노출
   */
  const handleResend = (uid: string, email: string) => {
    setLoadingUid(uid)
    mutateResendNewCoInvitation.mutate(
      { uid, email },
      {
        onSuccess: () => {
          isResendInvitation(true)
          queryClient.invalidateQueries(['newCoInvitationList'])
        },
      }
    )
  }

  /**
   * handleCancel: 초대 취소 버튼을 클릭할 시 동작하는 함수
   * - 초대 명단 삭제 API 호출
   */
  const handleCancel = (uid: string, email: string) => {
    setLoadingUid(uid)
    mutateCancelNewCoInvitation.mutate(
      { uid, email },
      {
        onSuccess: () => {
          isCancelInvitation(true)
          queryClient.invalidateQueries(['newCoInvitationList'])
          if (currentPage !== 0 && invitationList?.totalElements % searchFilterParams.size === 1) {
            onPageChange(Math.floor(invitationList?.totalElements / searchFilterParams.size) - 1 || 0)
          }
        },
      }
    )
  }

  /**
   * showUserInformation: 표에 유저 정보를 보여준다.
   * @param user: 유저 정보
   * @param index: 인덱스
   * @returns: 유저 정보를 담고있는 표 렌더링
   */
  const showUserInformation = (user: NewCoInvitationUser, index: number) => {
    return (
      <tr key={index}>
        <td>{currentPage * searchFilterParams.size + index + 1}</td>
        <td>{user.nation}</td>
        <td>{user.corporationName}</td>
        <td>{user.emailId}</td>
        <td>{user.userRolName}</td>
        <td>{changeTimeLocal({ time: user.modifyDate, type: 'yyyy-MM-dd' })}</td>
        <td className="align end pr_30">
          <p className="capH navy300 mr_12" hidden={user.inviteExpirationYn === 'N'}>
            {t('PQEh')}
          </p>
          <ButtonMui
            key={`resend_${index}`}
            className="btn status"
            size="small"
            color="gray"
            type="outlined"
            icon="Resend"
            iconStyle={{ fill: 'var(--isc-ready)' }}
            disabled={
              (loadingUid === user.userInvtUid && (mutateResendNewCoInvitation.isLoading || mutateCancelNewCoInvitation.isLoading)) ||
              getPathInfo(pathname).uptYn !== 'Y'
            }
            uiType={loadingUid === user.userInvtUid && (mutateResendNewCoInvitation.isLoading || mutateCancelNewCoInvitation.isLoading) ? 'loading' : ''}
            onClick={() => handleResend(user.userInvtUid, user.emailId)}
          >
            <span>{t('KXWx')}</span>
          </ButtonMui>
          <ButtonMui
            key={`cancel_${index}`}
            className="btn status"
            size="small"
            color="gray"
            type="outlined"
            icon="Cancel"
            iconStyle={{ fill: 'var(--isc-stopped)' }}
            disabled={
              (loadingUid === user.userInvtUid && (mutateResendNewCoInvitation.isLoading || mutateCancelNewCoInvitation.isLoading)) ||
              getPathInfo(pathname).delYn !== 'Y'
            }
            uiType={loadingUid === user.userInvtUid && (mutateResendNewCoInvitation.isLoading || mutateCancelNewCoInvitation.isLoading) ? 'loading' : ''}
            onClick={() => handleCancel(user.userInvtUid, user.emailId)}
          >
            <span>{t('jyLd')}</span>
          </ButtonMui>
        </td>
      </tr>
    )
  }

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '11%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '120px' }} />
          <col style={{ width: '440px' }} />
        </colgroup>
        <thead>
          <tr>
            <th>{t('YodX')}</th>
            <th>Country</th>
            <th>{t('orzY')}</th>
            <th>{t('yMUt')}</th>
            <th>{t('onCl')}</th>
            <th>{t('qIEa')}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {isSuccess && invitationList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={7}>
                <NoData text={t('bwgU')} className="full" />
              </td>
            </tr>
          ) : (
            invitationList?.content?.map((user: NewCoInvitationUser, index: number) => showUserInformation(user, index))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={invitationList?.totalPages}
        totalCount={invitationList?.totalElements}
        pageSize={searchFilterParams.size}
        onPageChange={(page) => onPageChange(page)}
      />
    </>
  )
}

export default NewCoInInvitationTable
