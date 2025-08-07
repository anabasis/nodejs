/**
 * 작성자 : 양수연
 * 화면 : AR1.2 알림 관리_알림 상세
 * path : /notification/detail?id=${id}
 */
'use client'
import { getNotificationDetail } from '@api/notification'
import BasicInformation from '@components/notification/detail/BasicInformation'
import DeleteNotification from '@components/notification/detail/DeleteNotification'
import MessageBoard from '@components/notification/detail/MessageBoard'
import { NotificationDetail } from '@type/notification/notificationType'
import { useMenu } from 'library'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Breadcrumb, ButtonMui, ContentBox } from 'ui'

const pageTitleList = [`Notification`, `Notification Detail`]

const NotificationDetail = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const notiId = searchParams.get('notiId')

  const [notiData, setNotiData] = useState<NotificationDetail>()

  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const init = async () => {
    getNotificationDetail({ notiId }).then((response) => {
      setNotiData(response.data)
    })
  }
  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{notiData?.title}</h1>
          </div>
          <div className="rgt">
            {/* alert */}
            <DeleteNotification notiId={notiId} />
            {/* update page */}
            <ButtonMui
              size="large"
              icon="EditIcon"
              onClick={() => router.push(`/notification/update?notiId=${notiId}`)}
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
            >
              Edit
            </ButtonMui>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        {/* Basic Information */}
        <BasicInformation notiData={notiData} />

        {/* String by Language */}
        <article>
          <div className="cont_box_title">
            <p className="title1">String by Language</p>
          </div>
          <MessageBoard notiData={notiData} />
        </article>
      </ContentBox>
    </>
  )
}

export default NotificationDetail
