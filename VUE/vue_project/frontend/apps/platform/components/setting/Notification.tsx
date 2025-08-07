'use client'

import { useNotificationListData, useModifyNotificationMutation } from '@store/server/useSettingQuery'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { ContentBox, SwitchToggle, BoxLinkItem, BoxLinkList } from 'ui'

export default function Notification() {
  const allNotificationList = useMemo(
    () => [
      { notificationCode: 'NT01', title: 'My page', description: 'Notification of role changes.', position: 'l' },
      { notificationCode: 'NT02', title: 'Notice', description: 'Notification of all new notice(includes must read).', position: 'l' },
      { notificationCode: 'NT03', title: 'Help desk', description: 'Notification of updates on inquiries.', position: 'l' },
      { notificationCode: 'NT04', title: 'Project', description: 'Notification of project information update.', position: 'l' },
      { notificationCode: 'NT08', title: 'Request', description: 'Notification of request information update. ', position: 'l' },
      { notificationCode: 'NT05', title: 'Seegene HQ', description: 'Notification of Seegene HQ Members updates.', position: 'r' },
      { notificationCode: 'NT06', title: 'NewCo', description: 'Notification of Seegene NewCo Members updates.', position: 'r' },
      { notificationCode: 'NT07', title: 'Help desk (admin)', description: 'Notification of update for inquiry in charge.', position: 'r' },
    ],
    []
  )
  const [notificationList, setNotificationList] = useState([])

  const { data: notificationInfo, refetch } = useNotificationListData()
  const notificationMutation = useModifyNotificationMutation()

  useEffect(() => {
    !!notificationInfo &&
      setNotificationList(
        notificationInfo.map((item) => {
          const temp = allNotificationList.find((target) => item.notificationCode === target.notificationCode)
          return { ...temp, receiveYn: item.receiveYn }
        })
      )
  }, [allNotificationList, notificationInfo])

  const handleNotificationChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, item) => {
      notificationMutation.mutate(item.notificationCode, {
        onSuccess: () => {
          refetch()
        },
        onError: () => {},
      })
    },
    [notificationMutation, refetch]
  )

  return (
    <ContentBox>
      <div className="cont_title_box">
        <p className="title1">Nofitication Setting</p>
        <p className="body2">Please set the notification.</p>
      </div>
      <div className="align top start">
        <div className="item">
          <BoxLinkList align="top">
            {notificationList
              .filter((item) => item.position === 'l')
              .map((item) => (
                <BoxLinkItem
                  // active style 적용
                  uiType={item.receiveYn === 'Y' ? 'active' : ''}
                  key={`noti-${item.notificationCode}`}
                  label={
                    <>
                      <p>{item.title}</p>
                      <span>{item.description}</span>
                    </>
                  }
                  action={
                    <SwitchToggle
                      color="primary"
                      id={`noti-toggle-${item.notificationCode}`}
                      value={item.receiveYn === 'Y'}
                      onChange={(e) => {
                        handleNotificationChange(e, item)
                      }}
                    />
                  }
                />
              ))}
          </BoxLinkList>
        </div>
        <div className="item">
          <BoxLinkList align="top">
            {notificationList
              .filter((item) => item.position === 'r')
              .map((item) => (
                <BoxLinkItem
                  uiType={item.receiveYn === 'Y' ? 'active' : ''}
                  key={`noti-${item.notificationCode}`}
                  label={
                    <>
                      <p>{item.title}</p>
                      <span>{item.description}</span>
                    </>
                  }
                  action={
                    <SwitchToggle
                      color="primary"
                      id={`noti-toggle-${item.notificationCode}`}
                      value={item.receiveYn === 'Y'}
                      onChange={(e) => {
                        handleNotificationChange(e, item)
                      }}
                    />
                  }
                />
              ))}
          </BoxLinkList>
        </div>
      </div>
    </ContentBox>
  )
}
