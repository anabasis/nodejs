'use client'

import { Breadcrumb, ContentBox, Badge, ButtonMui, Icons, FileCard, RoundTab } from 'ui'
import { useEffect, useMemo, useState } from 'react'
import { AlertType, createMarkup, useAlert, isEmptyCheck, downloadFiles, useMenu } from 'library'
import { getNoticeListDetail } from '@api/notice'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import DetailContenTopItem from '@components/common/DetailContenTopItem'
import { useNoticeMuate } from '@store/server/useNotcieQuery'
import { useAtom } from 'jotai'
import { noticeDataAtom } from '@store/client/notice'

const pageTitleList = ['Notice', 'Notice Detail']

function NoticeDetailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const noticeId = searchParams.get('noticeId')
  const [tabIndex, setTabIndex] = useState(0)
  const { alertOpen, alertClose } = useAlert()
  const { noticeDeleteMutate } = useNoticeMuate()
  const [noticeData, setNoticeData] = useAtom(noticeDataAtom)
  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const isNoticeType = noticeData?.noticeTypeCode === 'NTE'

  const init = async () => {
    try {
      const res = await getNoticeListDetail({ noticeId })
      if (res) {
        setNoticeData(res)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const noticeDataHeader = useMemo(() => {
    if (!isEmptyCheck(noticeData)) return
    const { noticeCategory, openLevel, exposurePeriodType, exposureFrequency } = noticeData
    const nameArr = ['Category', 'Open level', 'Home exposure']
    const valueArr = [noticeCategory, openLevel, exposurePeriodType, exposureFrequency]
    return nameArr.reduce((acc, cur, i) => {
      if (!valueArr[i]) return acc
      if (i === nameArr.length - 1) return [...acc, ...[{ name: cur, value: [valueArr[i], valueArr[i + 1]] }]]
      return [...acc, ...[{ name: cur, value: valueArr[i] }]]
    }, [])
  }, [noticeData])

  const tabData = noticeData?.noticeMultiLanguage?.map((tab) => {
    const data = `
      <div class="body3 typo900 mb_10">${tab.title} </div>  
      ${tab.content}
    `

    return {
      tabName: tab.language,
      code: tab.languageCode,
      contents: (
        <div>
          <div key={tab.languageCode} className="ck-content" dangerouslySetInnerHTML={createMarkup(data)} />
        </div>
      ),
    }
  })
  const getContent = () => {
    if (noticeData?.noticeMultiLanguage?.length === 0) return
    return tabData?.[tabIndex]?.contents
  }

  const handleTabChange = ({ oldIndex, newIndex }) => {
    setTabIndex(newIndex)
  }

  const deleteProcess = () => {
    const alertState: AlertType = {
      InfoType: 'delete',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => noticeDeleteMutate({ noticeId })}>
            Delete
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  useEffect(() => {
    init()

    return () => {
      if (!window.location.pathname.includes('edit')) {
        setNoticeData(null)
      }
    }
  }, [])

  return (
    <>
      {/* 페이지 상단 박스 케이스 :: 공통 수정으로 전사 수정 - 김수연 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft" style={{ width: '70%' }}>
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{noticeData?.title}</h1>
          </div>
          <div className="rgt">
            {/* top_content btn size :: large */}
            <ButtonMui color="secondary" icon="DeleteIcon" onClick={deleteProcess} size="large" type="contained" disabled={getPathInfo(pathname).delYn !== 'Y'}>
              Delete
            </ButtonMui>
            <ButtonMui
              color="primary"
              icon="EditIcon"
              onClick={() => router.push(`/notice/edit?noticeId=${noticeId}`)}
              size="large"
              type="contained"
              disabled={getPathInfo(pathname).uptYn !== 'Y'}
            >
              Edit
            </ButtonMui>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <div className="align pb_20 bb mb_20">
          <div className="lft">
            {isNoticeType && <Badge>Must Read</Badge>}
            <div className={`align start gap_20 flex1 ${isNoticeType ? 'ml_20' : 'ml_0'}`}>
              {noticeDataHeader?.map((item) => (
                <DetailContenTopItem key={item.value} {...item} />
              ))}
            </div>
          </div>
        </div>
        {/* 파일 첨부영역 */}
        {noticeData?.noticeAttachment?.length > 0 && (
          <>
            <div className="mb_10">
              <span className="capH typo500 pr_8 mr_8">Attachment</span>
            </div>

            <div className="align start gap_10">
              {noticeData?.noticeAttachment?.map((file, index) => (
                <div key={index}>
                  <FileCard file={file} icon={file.fileExtension}>
                    {file.displayFileName}
                  </FileCard>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 에디터 view 영역 */}
        <div className={`${noticeData?.noticeAttachment?.length > 0 ? 'mb_10 mt_30' : 'mb_30'}`}>
          <RoundTab tabData={tabData} onChange={handleTabChange} />
          <div className="linecont mt_20 min_h360">{getContent()}</div>
        </div>
      </ContentBox>
    </>
  )
}

export default NoticeDetailPage
