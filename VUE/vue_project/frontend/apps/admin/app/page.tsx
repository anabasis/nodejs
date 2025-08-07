'use client'

import 'ui/styles/global/_dashboard.scss'
import { ContentBox, NoticeSwiper, Footer } from 'ui'
import { WrapQnAList, HomeProgressItem } from '@components/dashboard'
import { useEffect, useMemo, useState } from 'react'
import { useUser } from 'library'
import { getHomeHqUserCount, getHomeNewcoReqCount, getHomeNewcoCorporate, getQnaHomeWaitCount, getQnaHomeCommentCount } from '@api/home'
import { homeUserInfoType, UserCallback, ProgressInfoType } from '@type/home'
import { initData, progerssInfo, roleCodeArr } from '@constant/home'
import { format } from 'date-fns'

export default function AdminHome() {
  const { adminRole } = useUser()
  const [userCountInfo, setUserConutInfo] = useState<homeUserInfoType>(initData)
  const [datetime, setDatetime] = useState('')

  const getRole = (admRolCd: string) => adminRole?.filter((role) => role.admRolCd === admRolCd).length > 0

  const checkedRole = () => roleCodeArr.map((code) => getRole(code))

  const [isServiceManager, isPlatformManager, isOperationManager, isItManage] = useMemo(() => {
    if (!adminRole || adminRole?.length === 0) {
      const length = 4
      return Array.from({ length }, () => false)
    }

    return checkedRole()
  }, [adminRole])

  const getUserCallback = (): UserCallback => {
    let res = [getQnaHomeWaitCount()]

    if (isPlatformManager && isItManage) {
      return {
        callback: [getHomeHqUserCount(), getHomeNewcoReqCount(), getHomeNewcoCorporate(), ...res, getQnaHomeCommentCount()],
        keys: ['hqInfo', 'newcoInfo', 'getNewcoCorporateInfo', 'qnaInquiryInfo', 'qnaCommentInfo'],
      }
    }
    if (isServiceManager && isPlatformManager) {
      return {
        callback: [getHomeHqUserCount(), getHomeNewcoReqCount(), ...res],
        keys: ['hqInfo', 'newcoInfo', 'qnaInquiryInfo'],
      }
    }

    if (isOperationManager || isItManage) {
      return {
        callback: [...res, getQnaHomeCommentCount()],
        keys: ['qnaInquiryInfo', 'qnaCommentInfo'],
      }
    }

    if (isServiceManager) {
      return {
        callback: [getHomeHqUserCount(), ...res],
        keys: ['hqInfo', 'qnaInquiryInfo'],
      }
    }

    if (isPlatformManager) {
      return {
        callback: [getHomeNewcoReqCount(), getHomeNewcoCorporate(), ...res],
        keys: ['newcoInfo', 'getNewcoCorporateInfo', 'qnaInquiryInfo'],
      }
    }

    return {
      callback: [],
      keys: [],
    }
  }

  const init = () => {
    const { callback, keys } = getUserCallback()

    Promise.allSettled([...callback])
      .then((result) => {
        const res = result.reduce((acc, cur, i) => {
          if (cur.status === 'fulfilled') {
            const data = cur.value
            const key = keys?.[i]
            acc[key] = data
          }
          return acc
        }, {} as homeUserInfoType)
        setUserConutInfo(res)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setDatetime(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
      })
    return
  }

  const getCountProgressInfo = (value: string) => {
    const {
      hqInfo: { inviteUserCount: hqInviteConut, requestUserCount: hqRequestCount } = {},
      newcoInfo: { inviteUserCount: newcoInviteConut, requestUserCount: newcoRequestConut } = {},
      getNewcoCorporateInfo: { activeCorporateCount } = {},
      qnaCommentInfo = 0,
      qnaInquiryInfo = 0,
    } = userCountInfo

    const progressObj = {
      sign: isServiceManager && isPlatformManager ? hqRequestCount + newcoRequestConut : isServiceManager ? hqRequestCount : newcoRequestConut,
      invite: isServiceManager && isPlatformManager ? hqInviteConut + newcoInviteConut : isServiceManager ? hqInviteConut : newcoInviteConut,
      corporate: activeCorporateCount,
      qna: qnaInquiryInfo,
      qnaComment: qnaCommentInfo,
    }

    return progressObj[value] || 0
  }

  const getShouldRendering = (value: string) => {
    const progressObj = {
      sign: isServiceManager || isPlatformManager,
      invite: isServiceManager || isPlatformManager,
      corporate: !!isPlatformManager,
      qna: true,
      qnaComment: isOperationManager || isItManage,
    }
    return progressObj[value]
  }
  const getSrcPage = (value: string) => {
    const baseUrl = '/user'
    const newCoUrl = `${baseUrl}/newco?tab`
    const seegeneUrl = `${baseUrl}/seegene?tab`

    const progressObj = {
      sign: isServiceManager && isPlatformManager ? `${newCoUrl}=progress` : isServiceManager ? `${seegeneUrl}=progress` : `${newCoUrl}=progress`,
      invite: isServiceManager && isPlatformManager ? `${newCoUrl}=invitation` : isServiceManager ? `${seegeneUrl}=invitation` : `${newCoUrl}=invitation`,
      corporate: '/corporate',
      qna: '/helpdesk/qna/',
      qnaComment: '/helpdesk/qna/',
    }
    return progressObj[value]
  }

  const getParamsInfo = (progerssInfo: ProgressInfoType) => {
    const { value, ...rest } = progerssInfo

    return {
      ...rest,
      count: getCountProgressInfo(value),
      shouldRender: getShouldRendering(value),
      src: getSrcPage(value),
    }
  }
  useEffect(() => {
    if (adminRole) {
      init()
    }
  }, [adminRole])

  return (
    <>
      <ContentBox type="dashboard">
        <div className="cont_title_box">
          <p className="title1">
            <span className="mr_10">Admin update</span>
            <span className="body2 mt_0">{datetime}</span>
          </p>
        </div>
        <div className="align start gap_18 stretch">
          {progerssInfo && Object.entries(progerssInfo).map((info, key) => <HomeProgressItem key={key} {...getParamsInfo(progerssInfo?.[info[0]])} />)}
        </div>
      </ContentBox>

      <WrapQnAList />
      <ContentBox type="dashboard" className="ptb_20">
        <NoticeSwiper />
        <Footer />
      </ContentBox>
    </>
  )
}
