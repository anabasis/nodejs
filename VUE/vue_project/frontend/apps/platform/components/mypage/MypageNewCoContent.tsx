/**
 * 마이페이지 메인 NewCO 회원정보 부분
 */

import { AdminRole, LoginLogList, MyInfoType, UserRequestRole, UserRole, UserRoleList } from '@type/mypage/myInfoType'
import { ModalType, changeTimeLocal, isEmptyCheck } from 'library'
import { useModal } from 'library/hook/useModal'
import { Badge, ButtonMui, DetailTable } from 'ui'
import LoginHistory from './popup/history/page'
import { api } from 'library'
import { useEffect, useState } from 'react'

type ProfileResponse = {
  userInfo: MyInfoType
  userRole?: UserRole
  userRoleChangeRequested?: UserRequestRole
  adminRole?: AdminRole[]
  loginList?: LoginLogList[]
}

const MypageNewCoContent = (props: ProfileResponse) => {
  // 마이페이지를 로그인할 때 다 불러와서 store에 저장을 할 것인지 혹은
  const { userInfo, userRole, userRoleChangeRequested, loginList } = props

  const { modalOpen } = useModal()

  const modalLoginHistory: ModalType = {
    title: 'Last access date',
    textTitle: 'The login history provides up to 300 records from the last 90 days.',
    maxWidth: 'l',
    content: <LoginHistory loginHistory={loginList} />,
  }

  const [userRoleList, setUserRoleList] = useState<UserRoleList[]>()

  // User Role API
  const getRoles = async () => {
    const response = await api.get(`/common/usr-role/list`)

    setUserRoleList(response.data)
    // setAdminRoleList(response.data.admRolList)
  }

  const userRoleListSelect = userRoleList
    ?.filter((data) => data.corpLv === 'LV2')
    .map((item) => {
      return {
        name: item.name,
        value: item.id,
      }
    })

  //현재 user role
  const existUserRole = userRoleListSelect?.find((item) => item.value === parseInt(userRole[0]?.usrRolNum))

  //요청 user role
  // const requestUserRole = userRoleListSelect?.find((item) => item.value === (userRole?.length > 0 ? parseInt(userRole[0]?.usrRolNum) : '-'))
  const requestUserRole = userRoleListSelect?.find((item) => item.value === parseInt(userRole[0]?.usrRolReqNum))

  useEffect(() => {
    getRoles()
  }, [])

  return (
    isEmptyCheck(props) && (
      <>
        <article className="mt_40">
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
              <th>Password</th>
              <td>****</td>
            </tr>
            <tr>
              <th>Job</th>
              <td>{userInfo?.jobNm ? userInfo?.jobNm : '-'}</td>
              <th>Date of registration</th>
              <td>{changeTimeLocal({ time: userInfo?.crtDt, type: 'yyyy-MM-dd' })}</td>
            </tr>
            <tr>
              <th></th>
              <td></td>
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
          <p className="title1">Role</p>
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
              <th className="va_top ptb_8">
                <span>User role</span>
              </th>
              <td>
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
            </tr>
          </DetailTable>
        </article>
      </>
    )
  )
}

export default MypageNewCoContent
