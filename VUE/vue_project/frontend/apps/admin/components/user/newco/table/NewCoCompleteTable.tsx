import { useRouter } from 'next/navigation'
import { Badge, BoardTable, NoData, Pagenation } from 'ui'
import { changeTimeLocal } from 'library'
import { NewCoCompleteUser, NewCoCompleteListReturnType } from '@type/user/user'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'library/i18n/client'

interface NewCoCompleteTableProps {
  size: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  completeList: NewCoCompleteListReturnType
}

const NewCoCompleteTable = (props: NewCoCompleteTableProps) => {
  const { t } = useTranslation('platform')
  const { size, currentPage, setCurrentPage, completeList } = props
  const route = useRouter()

  /**
   * useHandleDetail: 회원 클릭 시 동작하는 함수
   * - 유저 정보를 전역 관리한다. props drilling 방지와 양방향 데이터 이동 목적
   * - 해당 유저 상세 페이지로 이동
   * @param user 유저 정보
   */
  const handleDetail = (user: NewCoCompleteUser, no: number) => {
    sessionStorage.setItem('no', no.toString())
    route.push(`/user/newco/detail?no=${user.userUid}`)
  }

  /**
   * showUserInformation: 표에 유저 정보를 보여준다.
   * 1. 유저 정보를 보여준다.
   *    - 탈퇴 회원: 탈퇴회원 뱃지 노출 및 글씨색 변경
   *    - user role 변경: 뱃지 노출
   * 2. 유저 row를 클릭하면 상세화면으로 이동 (탈퇴 회원 제외)
   *
   * @param user: 유저 정보
   * @param index: 인덱스
   * @returns: 유저 정보를 담고있는 표 렌더링
   */
  const showUserInformation = (user: NewCoCompleteUser, index: number) => {
    let withdrawl = user.userStatusCode === 'WDR'
    let no = currentPage * size + index + 1
    return (
      <tr key={index} onClick={() => !withdrawl && handleDetail(user, no)}>
        <td>
          <span className={withdrawl ? 'typo500' : ''}>{no}</span>
        </td>
        <td>
          <span className={withdrawl ? 'typo500' : ''}>{user.hasOwnProperty('nation') && user.nation ? user.nation : '***'}</span>
        </td>
        <td>
          <span className={withdrawl ? 'typo500' : ''}>{'Level 2'}</span>
        </td>
        <td>
          <span className={withdrawl ? 'typo500' : ''}>{user.corporationName === '*' ? '***' : user.corporationName}</span>
        </td>
        <td>
          <span className={withdrawl ? 'typo500' : ''}>{user.fullName === '*' ? '***' : user.fullName}</span>
          {withdrawl && (
            <Badge className="ml_10">
              <span>{t('DWII')}</span>
            </Badge>
          )}
        </td>
        <td>
          <span className={withdrawl ? 'typo500' : ''}>{withdrawl ? '***@***.***.***' : user.emailId}</span>
        </td>
        <td>
          <span className={withdrawl ? 'typo500' : ''}>
            {withdrawl ? '***' : user.userRolName}
            {!withdrawl && user.roleRequestYn === 'Y' && (
              <Badge uiType="solid" className="ml_6">
                {t('VycD')}
              </Badge>
            )}
          </span>
        </td>
        <td className="pr_30">
          <span className={withdrawl ? 'typo500' : ''}>{withdrawl ? '***' : changeTimeLocal({ time: user.createDate, type: 'yyyy-MM-dd' })}</span>
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
          <col style={{ width: '7%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '17%' }} />
          <col style={{ width: '16%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '9.3%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>{t('YodX')}</th>
            <th>{t('imYZ')}</th>
            <th>{t('pFgM')}</th>
            <th>{t('orzY')}</th>
            <th>{t('CwmC')}</th>
            <th>{t('yMUt')}</th>
            <th>{t('onCl')}</th>
            <th className="pr_30">{t('GSqS')}</th>
          </tr>
        </thead>
        <tbody>
          {completeList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={8}>
                <NoData text={t('bwgU')} className="full" />
              </td>
            </tr>
          ) : (
            completeList?.content?.map((user: NewCoCompleteUser, index: number) => showUserInformation(user, index))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={completeList?.totalPages}
        totalCount={completeList?.totalElements}
        pageSize={size}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  )
}

export default NewCoCompleteTable
