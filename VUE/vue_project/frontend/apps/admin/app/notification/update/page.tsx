/**
 * 작성자 : 양수연
 * 화면 : AR.1.2.2 알림 관리_알림 상세_알림 수정
 * path : /notification/update?id=${id}
 */
'use client'
import { getCommonLanguageList } from '@api/common'
import { getNotificationDetail } from '@api/notification'
import AddMessage from '@components/notification/detail/AddMessage'
import MessagePopup from '@components/notification/detail/MessagePopup'
import { newListAtom, notificationBasicAtom } from '@store/client/notification'
import { useNotificationMutation } from '@store/server/useNotificationQuery'
import { NotificationCommonCodes, NotificationDetail, NotificationMultiLanguage } from '@type/notification/notificationType'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { AlertType, isEmptyAnyPropertyCheck, useAlert, useCode } from 'library'
import { ModalType, useModal } from 'library/hook/useModal'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { BaseInput, BoardTable, Breadcrumb, ButtonMui, ContentBox, DetailTable, SelectMui } from 'ui'

const pageTitleList = [`Notification`, `Notification Detail`, `Edit Notification`]
const commonCodes = {
  type: 'PFM046', //Notification Type Code
}

const NotificationUpdate = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const notiId = searchParams.get('notiId')

  const { cCode } = useCode(commonCodes) as { cCode: NotificationCommonCodes }

  const { modalOpen } = useModal()
  const { alertOpen, alertClose } = useAlert()

  const { modifyNotificationMutate, modifyNotificationIsLoading } = useNotificationMutation()

  //Db
  const [notiData, setNotiData] = useState<NotificationDetail>()

  //jotai(exist)
  const [notiFormAtom, setNotiFormAtom] = useAtom(notificationBasicAtom)

  //jotai(new)
  const newList = useAtomValue(newListAtom)
  const setList = useSetAtom(newListAtom)

  const [languageCode, setLanguageCode] = useState([])
  const [disableButton, isDisableButton] = useState<boolean>(true)

  useEffect(() => {
    getCommonLanguageList().then((response) => {
      setLanguageCode(response)
    })
  }, [])

  const init = () => {
    getNotificationDetail({ notiId }).then((response) => {
      setNotiData(response.data)
      setNotiFormAtom(response.data)
      setList([]) //ko 추가 -> 뒤로가기 -> 다른 알림 이동 -> 편집시 남아있음 방지
      isDisableButton(true)
    })
  }
  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (isEmpty()) {
      isDisableButton(true)
    }
    if (newList.length !== 0) {
      isDisableButton(false)
    }
    if (notiFormAtom?.notificationMultiLanguage !== notiData?.notificationMultiLanguage) {
      isDisableButton(false)
    }
  }, [notiData, notiFormAtom, newList])

  //폼 필드 값 변경되면 상태 업데이트
  const handleUpdateForm = (event) => {
    isDisableButton(false)
    const { name, value } = event.target
    setNotiFormAtom((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  //type
  const selectData = useMemo(() => {
    if (!cCode || isEmptyAnyPropertyCheck(cCode)) {
      return []
    }

    const { type } = cCode

    return { type }
  }, [cCode]) as NotificationCommonCodes

  const isEnglish = notiData?.notificationMultiLanguage.map((data) => data.languageCode).includes('en')

  //Add
  const modalState: ModalType = {
    maxWidth: 'm',
    title: 'Add notification language',
    textTitle: 'Please select language for notification and enter the string.',
    linetitle: true,
    content: <AddMessage isEnglish={isEnglish} />,
  }

  //Language Detail
  const detailModal = (noti: NotificationMultiLanguage): ModalType => ({
    key: '1',
    maxWidth: 'm',
    title: 'Notification details by language',
    textTitle: 'Check notification contents by language.',
    linetitle: true,
    content: <MessagePopup noti={noti} />,
  })

  //휴지통(기 존재)
  const handleRemoveNotiFormList = (itemToRemove) => {
    isDisableButton(false)

    // notiFormAtom 배열에서 itemToRemove를 고유한 식별자로 찾아 삭제
    const updatedList = notiFormAtom.notificationMultiLanguage.filter((item) => {
      return item.languageCode !== itemToRemove.languageCode
    })
    // newList 업데이트
    setNotiFormAtom((prevAtom) => ({
      ...prevAtom,
      notificationMultiLanguage: [...updatedList],
    }))
  }

  //휴지통(현재 추가)
  const handleRemoveFormList = (itemToRemove) => {
    isDisableButton(false)

    // newList 배열에서 itemToRemove.languageCode를 기준으로 삭제
    const updatedList = newList.filter((item) => {
      return item.languageCode !== itemToRemove.languageCode
    })
    // newList 업데이트
    setList(updatedList)
  }

  //폼 submit
  const handleNotiFormSubmit = async () => {
    const newResponses = [...notiFormAtom.notificationMultiLanguage, ...newList]

    const params = {
      ...notiFormAtom,
      notificationMultiLanguage: newResponses,
    }
    modifyNotificationMutate({ notiId, params })
  }

  const isEmpty = () => {
    return (
      notiFormAtom.landingUrl.length === 0 ||
      notiFormAtom.notificationCode.length === 0 ||
      notiFormAtom.notificationTypeCode.length === 0 ||
      notiFormAtom.title.length === 0
    )
  }

  const cancel = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui
            size="xlarge"
            onClick={() => {
              setList([])
              router.push('/notification')
            }}
          >
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  const existFormName = notiFormAtom.notificationMultiLanguage.map((item) => item.languageCode)
  const newFormName = newList.map((item) => item.languageCode)
  const languageNamesA = existFormName.map((code) => {
    const language = languageCode.find((lang) => lang.languageCode === code)
    return language ? language.languageName : code
  })
  const languageNamesB = newFormName.map((code) => {
    const language = languageCode.find((lang) => lang.languageCode === code)
    return language ? language.languageName : code
  })

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{notiData?.title}</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <form>
          {/* Basic Information */}
          <article>
            <div className="cont_box_title">
              <p className="title1">Basic Information</p>
            </div>
            <DetailTable
              colgroup={
                <colgroup>
                  <col width="15%" />
                  <col width="35%" />
                  <col width="15%" />
                  <col width="35%" />
                </colgroup>
              }
            >
              <tr>
                <th>No.</th>
                <td>
                  <BaseInput disabled value={notiId} />
                </td>
                <th />
              </tr>
              <tr>
                <th>Notification type</th>
                <td>
                  <SelectMui
                    name="notificationTypeCode"
                    options={selectData?.type}
                    size="full"
                    value={notiFormAtom.notificationTypeCode}
                    onChange={(event) => {
                      handleUpdateForm(event)
                    }}
                  />
                </td>
                <th>Title</th>
                <td>
                  {}
                  <BaseInput
                    name="title"
                    value={notiFormAtom.title}
                    onChange={(event) => {
                      handleUpdateForm(event)
                    }}
                    maxLength={100}
                  />
                </td>
              </tr>
              <tr>
                <th>Code</th>
                <td>
                  <BaseInput
                    name="notificationCode"
                    value={notiFormAtom.notificationCode}
                    onChange={(event) => {
                      handleUpdateForm(event)
                    }}
                    maxLength={26}
                  />
                </td>
                <th>Path parameter</th>
                <td>
                  <BaseInput
                    name="landingUrl"
                    value={notiFormAtom.landingUrl}
                    onChange={(event) => {
                      handleUpdateForm(event)
                    }}
                    maxLength={480}
                  />
                </td>
              </tr>
            </DetailTable>
          </article>

          {/* String By Language */}
          <article>
            <div className="cont_box_title">
              <div className="align">
                <p className="title1">String By Language</p>
                {/* modal */}
                <ButtonMui
                  color="black"
                  onClick={() => {
                    modalOpen(modalState)
                  }}
                  size="medium"
                >
                  Add notification language
                </ButtonMui>
              </div>
            </div>

            <BoardTable>
              <colgroup>
                <col style={{ width: '20%' }} />
                <col style={{ width: '70%' }} />
                <col style={{ width: '3%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Language</th>
                  <th>String</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {notiFormAtom?.notificationMultiLanguage?.map((noti: NotificationMultiLanguage, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        modalOpen(detailModal(noti))
                      }}
                    >
                      <td>{languageNamesA[index]}</td>
                      <td>{noti.text}</td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <ButtonMui
                          disabled={noti.languageCode === 'en'}
                          type="text"
                          size="xsmall"
                          color="error"
                          icon="DeleteIcon"
                          iconStyle={{
                            width: 20,
                            height: 20,
                            fill: noti.languageCode === 'en' ? 'var(--navy100)' : 'var(--navy800)',
                          }}
                          onClick={() => {
                            handleRemoveNotiFormList(noti)
                          }}
                        />
                      </td>
                    </tr>
                  )
                })}
                {newList?.map((noti: NotificationMultiLanguage, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        modalOpen(detailModal(noti))
                      }}
                    >
                      <td>{languageNamesB[index]}</td>
                      <td>{noti.text}</td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <ButtonMui
                          disabled={noti.languageCode === 'en'}
                          type="text"
                          size="xsmall"
                          color="error"
                          icon="DeleteIcon"
                          iconStyle={{
                            width: 20,
                            height: 20,
                            fill: noti.languageCode === 'en' ? 'var(--navy100)' : 'var(--navy800)',
                          }}
                          onClick={() => {
                            handleRemoveFormList(noti)
                          }}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </BoardTable>
          </article>
        </form>
        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui type="outlined" size="xlarge" onClick={() => cancel()}>
              Cancel
            </ButtonMui>
            <ButtonMui
              disabled={disableButton}
              type="contained"
              size="xlarge"
              onClick={() => {
                handleNotiFormSubmit()
              }}
              isLoading={modifyNotificationIsLoading}
            >
              Save
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}

export default NotificationUpdate
