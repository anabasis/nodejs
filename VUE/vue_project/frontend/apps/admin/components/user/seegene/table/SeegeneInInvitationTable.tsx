import { SeegeneInvitaionSearch, SeegeneInvitationUser } from '@type/user/user'
import { BoardTable, ButtonMui, NoData, Pagenation, TextTooltip } from 'ui'
import { changeTimeLocal, useMenu } from 'library'
import { useCancelSeegeneInvitationMutate, useResendSeegeneInvitationMutate, useSeegeneInvitationData } from '@store/server/useSeegeneUserQuery'
import { cancelInvitationAtom, resendInvitationAtom } from '@store/client/user'
import { useAtom } from 'jotai'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'library/i18n/client'
import { useState } from 'react'

const rowSize = 20

const SeegeneInInvitationTable = () => {
  const { t } = useTranslation('platform')
  const [resendInvitation, isResendInvitation] = useAtom(resendInvitationAtom) // 초대 메일 재전송 여부
  const [cancelInvitation, isCancelInvitation] = useAtom(cancelInvitationAtom)
  const { searchFilterParams, currentPage, onPageChange } = useSearchFilter<SeegeneInvitaionSearch>()
  const { invitationList, isSuccess } = useSeegeneInvitationData({ searchFilterParams, currentPage })

  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const queryClient = useQueryClient()
  const mutateResendSeegeneInvitation = useResendSeegeneInvitationMutate()
  const mutateCancelSeegeneInvitation = useCancelSeegeneInvitationMutate()

  const [loadingUid, setLoadingUid] = useState('')

  /**
   * handleResend: 초대 재전송 버튼을 클릭할 시 동작하는 함수
   * - 초대 메일 재전송 API 호출
   * - 초대 메일 재전송 완료 toast popup 노출
   * - 3일 이내 재전송인 경우:
   */
  const handleResend = (uid: string, email: string) => {
    setLoadingUid(uid)
    mutateResendSeegeneInvitation.mutate(
      { uid, email },
      {
        onSuccess: () => {
          isResendInvitation(true)
          queryClient.invalidateQueries(['seegeneInvitationList'])
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
    mutateCancelSeegeneInvitation.mutate(
      { uid, email },
      {
        onSuccess: () => {
          isCancelInvitation(true)
          queryClient.invalidateQueries(['seegeneInvitationList'])
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
  const showUserInformation = (user: SeegeneInvitationUser, index: number) => {
    return (
      <tr key={index}>
        <td>{currentPage * rowSize + index + 1}</td>
        <td>{user.emlId}</td>
        <td>{user.usrRolNm}</td>
        <td>
          {user.hasOwnProperty('admRolNm') ? (
            user.admRolNm.split(',').length > 1 ? (
              <TextTooltip placements="top">{user.admRolNm.split(',').join(', ')}</TextTooltip>
            ) : (
              <span>{user.admRolNm}</span>
            )
          ) : (
            '-'
          )}
        </td>
        <td>{changeTimeLocal({ time: user.mdfDt, type: 'yyyy-MM-dd' })}</td>
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
            disabled
            uiType={loadingUid === user.usrInvtUid && (mutateResendSeegeneInvitation.isLoading || mutateCancelSeegeneInvitation.isLoading) ? 'Loading' : null}
            iconStyle={{ fill: 'var(--isc-ready)' }}
            onClick={() => handleResend(user.usrInvtUid, user.emlId)}
          >
            <span className="body2">{t('KXWx')}</span>
          </ButtonMui>
          <ButtonMui
            key={`cancel_${index}`}
            size="small"
            className="btn status"
            color="gray"
            type="outlined"
            icon="Cancel"
            disabled={
              (loadingUid === user.usrInvtUid && (mutateResendSeegeneInvitation.isLoading || mutateCancelSeegeneInvitation.isLoading)) ||
              getPathInfo(pathname).delYn !== 'Y'
            }
            uiType={loadingUid === user.usrInvtUid && (mutateResendSeegeneInvitation.isLoading || mutateCancelSeegeneInvitation.isLoading) ? 'Loading' : null}
            iconStyle={{ fill: 'var(--isc-stopped)' }}
            onClick={() => handleCancel(user.usrInvtUid, user.emlId)}
          >
            <span className="body2">{t('jyLd')}</span>
          </ButtonMui>
        </td>
      </tr>
    )
  }

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '6%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '19%' }} />
          <col style={{ width: '16%' }} />
          <col style={{ width: '100px' }} />
          <col style={{ width: '31%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>{t('YodX')}</th>
            <th>{t('yMUt')}</th>
            <th>{t('onCl')}</th>
            <th>{t('nUKr')}</th>
            <th>{t('qIEa')}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {isSuccess && invitationList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={6}>
                <NoData text={t('bwgU')} className="full" />
              </td>
            </tr>
          ) : (
            invitationList?.content?.map((user: SeegeneInvitationUser, index: number) => showUserInformation(user, index))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={invitationList?.totalPages}
        totalCount={invitationList?.totalElements || 0}
        pageSize={rowSize}
        onPageChange={(page) => onPageChange(page)}
      />
    </>
  )
}

export default SeegeneInInvitationTable
