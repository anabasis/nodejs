/**
 * 마이페이지 메인 씨젠 회원정보 부분
 */

import { AdminRequestRole, AdminRole, AdminRoleList, LoginLogList, MyInfoType, UserRequestRole, UserRole, UserRoleList } from '@type/mypage/myInfoType'
import { api, changeTimeLocal, isEmptyCheck } from 'library'
import { ModalType, useModal } from 'library/hook/useModal'
import { useEffect, useRef, useState } from 'react'
import { Badge, ButtonMui, DetailTable } from 'ui'
import LoginHistory from './popup/history/page'

type ProfileResponse = {
  userInfo: MyInfoType
  userRole?: UserRole
  userRoleChangeRequested?: UserRequestRole
  adminRole?: AdminRole[]
  adminRoleChangeRequested?: AdminRequestRole[]
  loginList?: LoginLogList[]
}

const MypageSeegeneContent = (props: ProfileResponse) => {
  const { userInfo, userRole, userRoleChangeRequested, adminRole, adminRoleChangeRequested, loginList } = props
  const prop = useRef(props)
  const { modalOpen } = useModal()

  const modalLoginHistory: ModalType = {
    title: 'Last access date',
    textTitle: 'The login history provides up to 300 records from the last 90 days.',
    maxWidth: 'l',
    content: <LoginHistory loginHistory={loginList} />,
  }

  const [userRoleList, setUserRoleList] = useState<UserRoleList[]>()
  const [adminRoleList, setAdminRoleList] = useState<AdminRoleList[]>()

  // User Role API
  const getRoles = async () => {
    const response = await api.get(`/common/usr-role/list`)
    setUserRoleList(response.data)
  }
  // Admin Role API
  const getAdminRoles = async () => {
    const response = await api.get(`/common/adm-role/list`)
    setAdminRoleList(response.data)
  }
  const userRoleListSelect = userRoleList
    ?.filter((data) => data.corpLv === 'LV1')
    .map((item) => {
      return {
        name: item.name,
        value: item.id,
      }
    })

  const adminRoleListSelect = adminRoleList?.map((item) => {
    return {
      name: item.admRolNm,
      value: item.admRolNum,
    }
  })

  //현재 user role
  const existUserRole = userRoleListSelect?.find((item) => item.value === parseInt(userRole[0]?.usrRolNum))
  //요청 user role
  const requestUserRole = userRoleListSelect?.find((item) => item.value === parseInt(userRole[0]?.usrRolReqNum))

  //현재 admin role
  const existAdminRoles = adminRole?.map((item) => item.admRolNm).join(', ')
  //요청 admin role
  const requestAdminRole = adminRoleChangeRequested?.map((item) => item.admRolNm).join(', ')

  useEffect(() => {
    getRoles()
    getAdminRoles()
  }, [])

  useEffect(() => {
    prop.current !== props
  }, [props])

  const adminRoleString = adminRole?.map((item) => item.admRolNum).join(',')
  const adminRequestRoleString = adminRoleChangeRequested?.map((item) => item.admRolNum).join(',')

  return (
    isEmptyCheck(props) && (
      <>
        <article className="mt_30">
          {/* 최유희 : 테이블 컴포넌트 통일 (no_border -> DetailTable) */}
          <DetailTable
            colgroup={
              <colgroup>
                <col style={{ width: '12%' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '38%' }} />
              </colgroup>
            }
          >
            <tr>
              <th>Job title</th>
              <td>{userInfo?.jobTitl ? userInfo?.jobTitl : '-'}</td>
              <th>Date of registration</th>
              <td>{changeTimeLocal({ time: userInfo?.crtDt, type: 'yyyy-MM-dd' }) || ''}</td>
            </tr>
            <tr>
              <th>Job</th>
              <td>{userInfo?.jobNm ? userInfo.jobNm : '-'}</td>
              <th>Last access date</th>
              <td>
                <ButtonMui
                  type="text"
                  icon="AngleIcon"
                  iconStyle={{ fill: 'var(--navy800)' }}
                  positions="right"
                  onClick={() => modalOpen(modalLoginHistory)}
                  className="tl"
                >
                  {loginList && (
                    <em className="body3">{`${changeTimeLocal({ time: loginList[0].loginDt })} / ${loginList[0].ipAddr} / ${
                      loginList[0].cntryNm === 'Korea (the Republic of)' ? 'REPUBLIC OF KOREA' : loginList[0].cntryNm
                    }`}</em>
                  )}
                </ButtonMui>
              </td>
            </tr>
          </DetailTable>
        </article>
        <article>
          {/* 복수랍니다 : 김수연 */}
          <p className="title1">Roles</p>
          <DetailTable
            colgroup={
              <colgroup>
                <col style={{ width: '12%' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '38%' }} />
              </colgroup>
            }
          >
            <tr>
              <th className="va_top ptb_9">
                <span>User role</span>
              </th>
              <td className="va_top">
                <div>{userRole[0]?.usrRolNum ? existUserRole?.name : '-'}</div>
                {userRoleChangeRequested && userRoleChangeRequested[0]?.userRolNm ? (
                  <div className="ptb_6 mt_10">
                    <Badge uiType="solid">Change requested</Badge>
                    <span className="ml_10">{userRoleChangeRequested[0]?.userRolNm}</span>
                  </div>
                ) : (
                  <div className="ptb_6 mt_10">
                    <Badge disabled uiType="solid">
                      Change requested
                    </Badge>
                    <span className="ml_10">-</span>
                  </div>
                )}
              </td>

              <th className="va_top ptb_9">Admin role</th>
              <td className="va_top">
                {existAdminRoles ? existAdminRoles : '-'}
                {adminRoleChangeRequested?.length === undefined || (adminRoleChangeRequested && adminRoleChangeRequested === null) ? ( //admin role x, request admin role x
                  <div className="ptb_6 mt_10">
                    <Badge disabled uiType="solid">
                      Change requested
                    </Badge>
                    <span className="ml_10">-</span>
                  </div>
                ) : adminRoleChangeRequested?.length === 0 ? ( //admin === request admin => none
                  <div className="ptb_6 mt_10">
                    <Badge uiType="solid">Change requested</Badge>
                    <span className="ml_10">-</span>
                  </div>
                ) : (
                  <div className="ptb_6 mt_10">
                    <Badge uiType="solid">Change requested</Badge>
                    <span className="ml_10">{requestAdminRole}</span>
                  </div>
                )}
              </td>
            </tr>
          </DetailTable>
        </article>
      </>
    )
  )
}

export default MypageSeegeneContent
