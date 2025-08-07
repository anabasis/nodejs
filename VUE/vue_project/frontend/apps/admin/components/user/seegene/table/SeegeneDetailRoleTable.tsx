/**
 * 화면: 해당 seegene 회원의 역할 정보 테이블
 */

import { selectedSeegeneRoleChangeAtom } from '@store/client/user'
import {
  useApproveOrNotSeegeneAdminRole,
  useApproveOrNotSeegeneUserRole,
  useSeegeneAdminRoleData,
  useSeegeneUserRoleData,
} from '@store/server/useSeegeneUserQuery'
import { useAtom } from 'jotai'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Badge, ButtonMui, DetailTable, MultiSelectMui, SelectChangeEvent, SelectMui, TooltipHover } from 'ui'
import { AlertType, useAlert, useMenu } from 'library'
import { useQueryClient } from '@tanstack/react-query'
import { SeegeneDetailInfo } from '@type/user/user'
import DeclineRole from '@components/user/popup/DeclineRole'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'library/i18n/client'

interface SeegeneDetailRoleTableProps {
  uid: string // detail api에서 uid 정보는 넘기지 않음.
  isRoleChangeSuccess: Dispatch<SetStateAction<boolean>>
  isRoleChangeDeclined: Dispatch<SetStateAction<boolean>>
  data: SeegeneDetailInfo
}

const SeegeneDetailRoleTable = (props: SeegeneDetailRoleTableProps) => {
  const { uid, isRoleChangeSuccess, isRoleChangeDeclined, data } = props
  const { t } = useTranslation('platform')

  const [roleChange, setRoleChange] = useAtom(selectedSeegeneRoleChangeAtom)
  const queryClient = useQueryClient()
  const seegeneUserRoleList = useSeegeneUserRoleData()
  const seegeneAdminRoleList = useSeegeneAdminRoleData()
  const mutateApproveOrNotUserRole = useApproveOrNotSeegeneUserRole()
  const mutateApproveOrNotAdminRole = useApproveOrNotSeegeneAdminRole()

  const [userRoleChange, setUserRoleChange] = useState<string>('')
  const [adminRoleChange, setAdminRoleChange] = useState([])

  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const { alertOpen } = useAlert()

  const handleAlert = (condition: string) => {
    // roleDeclineAlert: 역할 거절 alert
    const roleDeclineAlert: AlertType = {
      icon: 'info',
      title: t('PCyN'),
      textTitle: t('yEhH', { name: data.userName }),
      content: <DeclineRole level={'seegene'} uid={uid} condition={condition} userRoleChange={userRoleChange} isRoleChangeDeclined={isRoleChangeDeclined} />,
    }
    alertOpen(roleDeclineAlert)
  }

  /**
   * approveUserRole: 어드민 역할 요청 승인
   * - 승인 API 호출
   * - 역할 승인 후 toastPopup 제공
   * - 역할 승인 후 상세 페이지 새로고침
   */
  const approveUserRole = () => {
    let param = {
      usrUid: uid,
      aprvRslCd: 'APV',
      usrRolId: userRoleChange,
    }
    mutateApproveOrNotUserRole.mutate(param, {
      onSuccess: () => {
        queryClient.invalidateQueries(['seegeneDetailData'])
        queryClient.invalidateQueries(['seegeneRoleChange'])
        isRoleChangeSuccess(true)
      },
    })
  }

  /**
   * approveAdminRole: 어드민 역할 요청 승인
   * - 승인 API 호출
   * - 역할 승인 후 toastPopup 제공
   * - 역할 승인 후 상세 페이지 새로고침
   */
  const approveAdminRole = () => {
    let addAdminRole = !!adminRoleChange ? adminRoleChange.join(',') : ''
    let param = {
      usrUid: uid,
      aprvRslCd: 'APV',
      addAdmRolIds: addAdminRole,
    }

    mutateApproveOrNotAdminRole.mutate(param, {
      onSuccess: () => {
        queryClient.invalidateQueries(['seegeneDetailData'])
        queryClient.invalidateQueries(['seegeneRoleChange'])
        isRoleChangeSuccess(true)
      },
    })
  }

  /**
   * handleChangeAdminRole: 어드민 역할 select box handling 하는 함수
   * - none을 클릭: None만 선택됨
   * - None만 있을 경우 다른 것을 누를 경우: None은 해제
   * - None을 제외한 나머지를 해제할 경우: None을 선택
   * - 그 외에는 선택과 해제가 동작
   * @param value : 가장 최근 클릭한 어드민 역할
   */
  const handleChangeAdminRole = (event: SelectChangeEvent<string[]>) => {
    adminRoleChange.find((item) => !event.target.value.includes(item)) !== undefined
      ? setAdminRoleChange(adminRoleChange.filter((item) => event.target.value.includes(item)))
      : setAdminRoleChange([...adminRoleChange, event.target.value.at(-1)])
  }

  // 배열 동등 비교
  const checkList = (wannaRoles: { roleId: number; roleName: string }[], selectedChangeRoles: number[]) => {
    let wannaRoleIdList = wannaRoles?.map((item) => item.roleId).sort() || []
    let flag = wannaRoleIdList?.length === selectedChangeRoles?.length && selectedChangeRoles.sort().toString() === wannaRoleIdList.toString()
    return !flag
  }

  // 유저의 사용자 역할과 어드민 역할을 select box에 초기값으로 넣기 위한 렌더링
  useEffect(() => {
    const init = () => {
      setUserRoleChange(data.userRole.roleId.toString())
      data.hasOwnProperty('adminRoles') ? setAdminRoleChange(data.adminRoles.map((item) => item.roleId.toString())) : setAdminRoleChange([])
    }
    init()
  }, [data.adminRoles])

  return (
    <DetailTable
      colgroup={
        <colgroup>
          <col style={{ width: '15%' }} />
          <col style={{ width: '35%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '35%' }} />
        </colgroup>
      }
    >
      <tr>
        <th className="va_top">
          <span>{t('WObJ')}</span>
          <TooltipHover placements="top-start">
            <p>{t('UfQN')}</p>
          </TooltipHover>
        </th>
        <td className="va_top">
          <div className="w100">
            <div className="align start top round8 mb_10 gap_10">
              <p className="max_w368 min_w368">
                <Badge uiType="solid" disabled={!roleChange.hasOwnProperty('userRole') || roleChange.userRole.roleName === ''}>
                  {t('VycD')}
                </Badge>
                <span className="ml_6">{roleChange.hasOwnProperty('userRole') ? `${roleChange.userRole.roleName}` : t('xUqk')}</span>
              </p>
              {roleChange.hasOwnProperty('userRole') && getPathInfo(pathname).uptYn === 'Y' && (
                <ButtonMui
                  type="outlined"
                  size="small"
                  disabled={mutateApproveOrNotUserRole.isLoading}
                  uiType={mutateApproveOrNotUserRole.isLoading ? 'loading' : ''}
                  onClick={() => handleAlert('user')}
                >
                  {t('guSK')}
                </ButtonMui>
              )}
            </div>
            <div className="align start gap_10">
              {/* align className 안에 고정 + 동적 컨텐츠 가 들어갈때  min_width:0 과 flex:1 을 사용해주면 고정사이즈는 영향받지않음 */}
              {/* select을 감싸고있는 div 는 동적 사이즈! */}
              <div className="min_w0 flex1">
                <SelectMui
                  size="full"
                  options={seegeneUserRoleList}
                  value={userRoleChange}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setUserRoleChange(event.target.value.toString())}
                />
              </div>
              {/*버튼은 고정 compo */}
              <ButtonMui
                color="black"
                size="medium"
                disabled={Number(userRoleChange) === data.userRole.roleId || mutateApproveOrNotUserRole.isLoading || getPathInfo(pathname).uptYn !== 'Y'}
                uiType={mutateApproveOrNotUserRole.isLoading ? 'loading' : ''}
                onClick={() => approveUserRole()}
              >
                {t('VAXY')}
              </ButtonMui>
            </div>
          </div>
        </td>
        <th className="va_top">
          <span className="mr_6">{t('Lyvz')}</span>
          <TooltipHover placements="top-start">
            <p>{t('Vaiq')}</p>
          </TooltipHover>
        </th>
        <td className="va_top">
          <div className="w100">
            <div className="align start top round8 mb_10 gap_10">
              <p className="max_w290 min_w368">
                <Badge uiType="solid" disabled={!roleChange.adminRoleReq}>
                  {t('VycD')}
                </Badge>
                <span className="ml_6">
                  {roleChange.adminRoles.length > 0
                    ? roleChange.adminRoles.map((item) => item.roleName.toString()).join(',')
                    : roleChange.adminRoleReq
                    ? '-'
                    : t('xUqk')}
                </span>
              </p>
              {roleChange.adminRoleReq === 'REQ' && getPathInfo(pathname).uptYn === 'Y' && (
                <ButtonMui
                  type="outlined"
                  size="small"
                  disabled={mutateApproveOrNotAdminRole.isLoading}
                  uiType={mutateApproveOrNotAdminRole.isLoading ? 'loading' : ''}
                  onClick={() => handleAlert('admin')}
                >
                  {t('guSK')}
                </ButtonMui>
              )}
            </div>
            <div className="align start gap_10">
              <div className="min_w0 flex1">
                <MultiSelectMui
                  size="full"
                  options={seegeneAdminRoleList}
                  value={adminRoleChange}
                  onChange={(event: SelectChangeEvent<string[]>) => handleChangeAdminRole(event)}
                  placeholder={'-'}
                />
              </div>
              <ButtonMui
                color="black"
                size="medium"
                disabled={!checkList(data.adminRoles, adminRoleChange) || mutateApproveOrNotAdminRole.isLoading || getPathInfo(pathname).uptYn !== 'Y'}
                uiType={mutateApproveOrNotAdminRole.isLoading ? 'loading' : ''}
                onClick={() => approveAdminRole()}
              >
                {t('VAXY')}
              </ButtonMui>
            </div>
          </div>
        </td>
      </tr>
    </DetailTable>
  )
}

export default SeegeneDetailRoleTable
