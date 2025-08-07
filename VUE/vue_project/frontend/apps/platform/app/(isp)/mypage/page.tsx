'use client'

/**
 * 화면 : 마이페이지
 * 경로 : /mypage
 */

import MyProfileInfo from '@components/mypage/MyProfileInfo'
import MypageNewCoContent from '@components/mypage/MypageNewCoContent'
import MypageSeegeneContent from '@components/mypage/MypageSeegeneContent'
import CheckPassword from '@components/mypage/popup/password/check'
import { findUserEmailCorp } from '@store/client/mypage'
import { MypageMyInfoType } from '@type/mypage/myInfoType'
import { api, useUser } from 'library'
import { ModalType, useModal } from 'library/hook/useModal'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Breadcrumb, ButtonMui, ContentBox } from 'ui'

const pageTitleList = [{ mnuName: 'My Page', mnuUrl: '/mypage/', mnuIcon: '/images/i-mypage.png' }]

const MyPage = () => {
  const { userInfo, updateUserAtom } = useUser()
  const [myInfo, setMyInfo] = useState<MypageMyInfoType>()

  //undefined
  const getMyInformation = async () => {
    if (userInfo?.usrUid) {
      const response = await api.get(`/mypage/myinfo/detail`)
      return response.data
    }
  }

  const route = useRouter()
  const { modalOpen } = useModal()

  const modalCheckPassword: ModalType = {
    key: '1',
    title: 'Verify password',
    textTitle: 'Please enter your password to verify account.',
    maxWidth: 'm',
    linetitle: true,
    content: <CheckPassword userInfo={myInfo?.userInformation[0]} />,
  }

  const handleMypageModification = () => {
    findUserEmailCorp(userInfo?.emlId) === 'seegene' ? route.push(`/mypage/modification`) : modalOpen(modalCheckPassword)
  }

  useEffect(() => {
    getMyInformation().then((response) => {
      setMyInfo(response)
    })
    updateUserAtom()
  }, [userInfo])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">My Page</h1>
          </div>
          <div className="rgt">
            {/* update page */}
            <ButtonMui size="large" icon="EditIcon" onClick={() => handleMypageModification()}>
              Edit
            </ButtonMui>
          </div>
        </ContentBox>
      </div>
      {myInfo && (
        <ContentBox>
          <MyProfileInfo myInfo={myInfo?.userInformation[0]} />
          {findUserEmailCorp(userInfo?.emlId) === 'seegene' ? (
            <MypageSeegeneContent
              userInfo={myInfo?.userInformation[0]}
              userRole={myInfo?.userRole}
              userRoleChangeRequested={myInfo?.userRoleChangeRequested}
              adminRole={myInfo?.adminRole}
              adminRoleChangeRequested={myInfo?.adminRoleChangeRequested}
              loginList={myInfo?.LoginLogList}
            />
          ) : (
            <MypageNewCoContent
              userInfo={myInfo?.userInformation[0]}
              userRole={myInfo?.userRole}
              userRoleChangeRequested={myInfo?.userRoleChangeRequested}
              adminRole={myInfo?.adminRole}
              loginList={myInfo?.LoginLogList}
            />
          )}

          <div className="cont_bottom_box">
            <div className="align">
              <ButtonMui type="outlined" color="gray" size="xlarge" onClick={() => route.push('/mypage/secession')}>
                Withdrawal
              </ButtonMui>
            </div>
          </div>
        </ContentBox>
      )}
    </>
  )
}

export default MyPage
