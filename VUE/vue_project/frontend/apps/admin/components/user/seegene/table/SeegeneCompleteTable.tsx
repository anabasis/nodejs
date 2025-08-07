import { useSeegeneCompleteData } from '@store/server/useSeegeneUserQuery'
import { SeegeneCompleteUser, SeegeneCompleteSearch } from '@type/user/user'
import { Badge, BoardTable, InnerTd, NoData, Pagenation, TextTooltip } from 'ui'
import { changeTimeLocal, useParamsData } from 'library'
import { useRouter } from 'next/navigation'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { useTranslation } from 'library/i18n/client'

const rowSize = 20

const SeegeneCompleteTable = () => {
  const { t } = useTranslation('platform')
  const { currentPage, searchFilterParams, onPageChange } = useSearchFilter<SeegeneCompleteSearch>()
  const { completeList, isSuccess } = useSeegeneCompleteData({ searchFilterParams, currentPage })

  const route = useRouter()

  /**
   * handleDetail: 회원 클릭 시 동작하는 함수
   * - 유저 정보를 전역 관리한다. props drilling 방지와 양방향 데이터 이동 목적
   * - 해당 유저 상세 페이지로 이동
   * @param user 유저 정보
   */
  const handleDetail = async (user: SeegeneCompleteUser, no: number) => {
    sessionStorage.setItem('no', no.toString())
    route.push(`/user/seegene/detail/?no=${user.userUUID}`)
  }

  /**
   * showUserInformation: 표에 유저 정보를 보여준다.
   * 1. 유저 정보를 보여준다.
   *    - 탈퇴 회원: 탈퇴회원 뱃지 노출 및 글씨색 변경
   *    - Admin Role이 2개 이상인 경우: hover시 툴팁 노출
   * 2. 유저 row를 클릭하면 상세화면으로 이동 (탈퇴 회원 제외)
   *
   * @param user: 유저 정보
   * @param index: 인덱스
   * @returns: 유저 정보를 담고있는 표 렌더링
   */
  const showUserInformation = (user: SeegeneCompleteUser, index: number) => {
    let withdrawl = user.usrStsCd === 'WDR'
    let no = currentPage * rowSize + 1 + index
    return (
      <tr key={index} onClick={() => !withdrawl && handleDetail(user, no)}>
        <td>
          <span className={withdrawl ? 'typo500' : ''}>{no}</span>
        </td>
        <td>
          <span className={withdrawl ? 'typo500' : ''}>{user.userName === '*' ? '***' : user.userName}</span>
          {withdrawl && <Badge className="ml_10">Withdrawl</Badge>}
        </td>
        <td>
          <span className={withdrawl ? 'typo500' : ''}>{withdrawl ? '***@***.***.***' : user.email}</span>
        </td>
        <td>
          <span className={withdrawl ? 'typo500' : ''}>{user.organization === '*' ? '***' : user.organization ? user.organization : '-'}</span>
        </td>
        <td>
          <span className={withdrawl ? 'typo500' : ''}>{withdrawl ? '***' : user.userRoleName}</span>
          {!withdrawl && user.userRolReqCount > 0 && (
            <Badge uiType="solid" className="ml_10">
              {t('VycD')}
            </Badge>
          )}
        </td>
        <td>
          <InnerTd>
            {withdrawl ? (
              <span className="typo500">***</span>
            ) : user.hasOwnProperty('adminRoleName') ? (
              user.adminRoleName.split(',').length > 1 ? (
                <TextTooltip placements="top" className="body2">
                  {user.adminRoleName.split(',').join(', ')}
                </TextTooltip>
              ) : (
                <span>{user.adminRoleName.split(',').join(', ')}</span>
              )
            ) : (
              <span>-</span>
            )}
            {!withdrawl && user.adminRolReqCount > 0 && (
              <Badge uiType="solid" className="ml_10">
                {t('VycD')}
              </Badge>
            )}
          </InnerTd>
        </td>
        <td className="pr_30">
          <span className={withdrawl ? 'typo500' : ''}>{withdrawl ? '***' : changeTimeLocal({ time: user.registerDate, type: 'yyyy-MM-dd' })}</span>
        </td>
      </tr>
    )
  }

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '6%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>{t('YodX')}</th>
            <th>{t('CwmC')}</th>
            <th>{t('yMUt')}</th>
            <th>{t('TPEV')}</th>
            <th>{t('onCl')}</th>
            <th>{t('nUKr')}</th>
            <th className="pr_30">{t('GSqS')}</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && completeList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={7}>
                <NoData text={t('bwgU')} className="full" />
              </td>
            </tr>
          ) : (
            completeList?.content?.map((user: SeegeneCompleteUser, index: number) => showUserInformation(user, index))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={completeList?.totalPages}
        totalCount={completeList?.totalElements || 0}
        pageSize={rowSize}
        onPageChange={(page) => onPageChange(page)}
      />
    </>
  )
}

export default SeegeneCompleteTable
