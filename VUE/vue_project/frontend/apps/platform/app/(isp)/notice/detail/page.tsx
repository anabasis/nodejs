'use client'

import { Breadcrumb, ButtonMui, ContentBox, Dl, Badge, FileCard } from 'ui'
import { Icons } from 'ui/components/Icons'
import { useEffect, useMemo, useState } from 'react'
import { getNoticeListDetail } from '@api/notice'
import { NoticeDetailReturnType } from '@type/notice'
import { useSearchParams } from 'next/navigation'
import { useMosueHoverCopy, createMarkup, setDescListData, changeTimeLocal, downloadFiles, getCdnFileUrl } from 'library'
import { isEmpty } from 'lodash-es'
const pageTitleList = ['Notice', 'Notice Detail']

const descListData = [
  { listTitle: 'Date', listInfo: '2023-04-20' },
  { listTitle: '조회', listInfo: '34,231' },
]

function NoticeDetailPage() {
  const searchParams = useSearchParams()
  const noticeId = searchParams.get('noticeId')
  const [detailData, setDetailData] = useState<NoticeDetailReturnType>()
  const { handleMouseEnter, handleMouseLeave, isHovering, handleCopyClipBoard } = useMosueHoverCopy()

  const init = async () => {
    try {
      const res = await getNoticeListDetail({ noticeId })
      if (res) {
        setDetailData(res)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const setDescList = useMemo(() => {
    if (!detailData) return []

    const { noticeCreateDate } = detailData
    const descTitleArr = ['Date']
    const listInfoValueArr = [changeTimeLocal({ time: noticeCreateDate, type: 'yyyy-MM-dd' })]

    return setDescListData(descTitleArr, listInfoValueArr)
  }, [detailData])

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{detailData?.noticeDetailMlgResponse?.title}</h1>
            <Dl listData={setDescList} />
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        <div className="detail">
          <div className="align mt_10">
            <div className="lft">{detailData?.noticeType === 'NTE' && <Badge>Must Read</Badge>}</div>

            <div className="rgt">
              <ButtonMui type="text" size="small" icon="CopyUrlIcon" iconStyle={{ fill: isHovering ? '#3357ff' : '#354165' }}>
                <span
                  style={{ color: isHovering && 'var(--blue400)' }}
                  onClick={() => handleCopyClipBoard()}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Copy URL
                </span>
              </ButtonMui>
            </div>
          </div>

          <div className="">
            {!isEmpty(detailData?.fileInfoResponses) && (
              <div className="pt_20 mt_20 bt">
                <div className="mb_20">
                  <ul className="align start mb_10">
                    <li className="capH typo500">Attachment</li>
                  </ul>
                  {detailData?.fileInfoResponses?.map((file, index) => (
                    <FileCard file={file} key={index} icon={file.fileExtension}>
                      {file.displayFileName}
                    </FileCard>
                  ))}
                </div>
              </div>
            )}
            <div className="linecont mt_20 min_h360">
              <div className="ck-content" dangerouslySetInnerHTML={createMarkup(detailData?.noticeDetailMlgResponse?.content)} />
            </div>
          </div>
        </div>
      </ContentBox>
    </>
  )
}

export default NoticeDetailPage
