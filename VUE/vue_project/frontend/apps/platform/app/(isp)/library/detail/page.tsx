'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Breadcrumb, ContentBox, Dl, FileCard, ButtonMui } from 'ui'
import { getLibraryDetail } from '@api/library'
import { LibraryDetailReturnType } from 'library/type/library'
import { changeTimeLocal, createMarkup, downloadFiles, getCdnFileUrl, setDescListData, viewPdf } from 'library/util'

const pageTitleList = ['library', 'Manual List', 'Manual Detail']

function LibraryDetailPage() {
  const searchParams = useSearchParams()
  const manualsDetailId = searchParams.get('manualsId')

  const [detailData, setDetailData] = useState<LibraryDetailReturnType>()

  const init = async () => {
    try {
      const res: LibraryDetailReturnType = await getLibraryDetail({ manualsDetailId })
      if (res) {
        setDetailData(res)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const setDescList = useMemo(() => {
    if (!detailData) return []

    const { crtrDt, mdfDt } = detailData
    const descTitleArr = ['Date', 'Update']
    const listInfoValueArr = [changeTimeLocal({ time: crtrDt, type: 'yyyy-MM-dd' }), changeTimeLocal({ time: mdfDt, type: 'yyyy-MM-dd' })]

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
            <h1 className="headline1">{detailData?.titl}</h1>

            {/* QNA와 공통적으로 사용 하게 되면 해당 부분은 작업 되어야 합니다. 사용 안할시 Dl 삭제 하시면 됩니다. */}
            <Dl listData={setDescList} />
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        {detailData?.fileInfoResponses?.length > 0 && (
          <>
            <div className="mb_10">
              <span className="capH typo500 pr_8 mr_8">Attachment</span>
            </div>

            <div className="align start gap_10">
              {detailData?.fileInfoResponses?.map((file, index) => (
                <FileCard
                  view={detailData?.dowlUseYn === 'N'}
                  onClick={() => (detailData?.dowlUseYn === 'N' ? viewPdf(file) : null)}
                  file={file}
                  key={index}
                  icon={file.fileExtension}
                >
                  {file.displayFileName}
                </FileCard>
              ))}
            </div>
            <hr className="mt_30" />
          </>
        )}

        <div className="ck-content mt_30" dangerouslySetInnerHTML={createMarkup(detailData?.cont)} />
      </ContentBox>
    </>
  )
}

export default LibraryDetailPage
