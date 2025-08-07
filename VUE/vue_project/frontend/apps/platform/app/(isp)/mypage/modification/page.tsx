'use client'

/**
 * 화면: 마이페이지 수정
 * 경로: /mypage/modification
 */

import MyNewCoProfileEdit from '@components/mypage/MyNewCoProfileEdit'
import MySeegeneProfileEdit from '@components/mypage/MySeegeneProfileEdit'
import ChangePassword from '@components/mypage/popup/password/change'
import { findUserEmailCorp } from '@store/client/mypage'
import { useQuery } from '@tanstack/react-query'
import { MypageMyInfoType } from '@type/mypage/myInfoType'
import { ModalType, api } from 'library'
import { Breadcrumb, ContentBox } from 'ui'

const pageTitleList = [{ mnuName: 'My Page', mnuUrl: '/mypage/', mnuIcon: '/images/i-mypage.png' }, 'Edit My Information']

const MyModification = () => {
  const getUserInformation = async () => {
    const response = await api.get(`/mypage/myinfo/detail`)
    return response.data
  }
  const { data: userInfo } = useQuery<MypageMyInfoType>(['userInfo'], () => getUserInformation())

  const modalChangePassword: ModalType = {
    title: 'Change password',
    maxWidth: 'm',
    textTitle: (
      <span>
        Protect your information with a secure password.
        <br />
        The new password must contain uppercase and lowercase letters, numbers, and special
        <br />
        characters includes (~!@#$%^&*_-+=`|\(){}[]:;&apos;&quot;&lt;&gt;,.?/).
        <br />
        Please enter at least 8 characters and less than 20 characters.
      </span>
    ),
    linetitle: true,
    content: <ChangePassword userInfo={userInfo?.userInformation[0]} />,
  }
  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Edit My Information</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        {/* 
        수정 데이터 디자인 변경 테이블 ::  형식으로 변경*/}
        {findUserEmailCorp(userInfo?.userInformation[0].emlId) === 'seegene' ? (
          <MySeegeneProfileEdit
            userInfo={userInfo?.userInformation[0]}
            userRole={userInfo?.userRole}
            userRoleChangeRequested={userInfo?.userRoleChangeRequested}
            adminRole={userInfo?.adminRole}
            adminRoleChangeRequested={userInfo?.adminRoleChangeRequested}
            loginList={userInfo?.LoginLogList[0]}
            popup={modalChangePassword}
          />
        ) : (
          <MyNewCoProfileEdit
            userInfo={userInfo?.userInformation[0]}
            userRole={userInfo?.userRole}
            userRoleChangeRequested={userInfo?.userRoleChangeRequested}
            loginList={userInfo?.LoginLogList[0]}
            popup={modalChangePassword}
          />
        )}
      </ContentBox>
    </>
  )
}

export default MyModification
