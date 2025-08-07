'use client'
import DetailGuideContent from '@components/detail-guide/DetailGuideContent'
import { Breadcrumb, ContentBox } from 'ui'
import { FileListDataType, useParamsData } from 'library'
import { DetailGuideAddParamsType } from '@type/detail-guilde'
import { useEffect } from 'react'
import { useDetailGuideMuate } from '@store/server/useDetailGuideQuery'

const pageTitleList = ['Detail Guide', 'Add Detail Guide']

const initData = {
  title: '',
  moveParameter: '',
  guideAttachmentRequestList: [],
}

const DetailGuideAddPage = () => {
  const { params, resetParams, isParamsLoading } = useParamsData<DetailGuideAddParamsType>(initData)
  const { detailGuideAddMutate, detailGuideAddLoading } = useDetailGuideMuate()

  const save = (files: FileListDataType) => {
    /* 성공시 */
    const param = {
      ...params,
      guideAttachmentRequestList: files.map(({ fileNumber }) => ({ fileNumber })),
    }
    detailGuideAddMutate({ params: param })
  }

  useEffect(() => {
    return () => {
      resetParams()
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <Breadcrumb pageTitleList={pageTitleList} />
          <h1 className="headline1">Add Detail Guide</h1>
        </ContentBox>
      </div>

      {!isParamsLoading && <DetailGuideContent detailGuideLoading={detailGuideAddLoading} save={save} />}
    </>
  )
}

export default DetailGuideAddPage
