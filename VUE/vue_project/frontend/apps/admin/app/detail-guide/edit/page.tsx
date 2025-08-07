'use client'
import DetailGuideContent from '@components/detail-guide/DetailGuideContent'
import { useSearchParams } from 'next/navigation'
import { Breadcrumb, ContentBox } from 'ui'
import { FileListDataType, isEmptyPropertyCheck, useParamsData } from 'library'
import { DetailGuideAddParamsType } from '@type/detail-guilde'
import { useAtom } from 'jotai'
import { detailGuideDataAtom } from '@store/client/detail-guide'
import { getDetailGuideListDetail } from '@api/detail-guide'
import { useEffect } from 'react'
import { useDetailGuideMuate } from '@store/server/useDetailGuideQuery'
const pageTitleList = ['Detail Guide', 'Detail Guide Edit']

const initData = {
  guideNumber: 0,
  title: '',
  moveParameter: '',
  guideAttachmentRequestList: [],
}

const DetailGuideEditPage = () => {
  const searchParams = useSearchParams()
  const guideNumber = searchParams.get('guideNumber')
  const [detailGuideData, setDetailGuideData] = useAtom(detailGuideDataAtom)
  const { params, resetParams, eidtInitParams, isParamsLoading } = useParamsData<DetailGuideAddParamsType>(initData)
  const { detailGuideEditMutate, detailGuideEditLoading } = useDetailGuideMuate()
  const init = () => {
    if (isEmptyPropertyCheck(detailGuideData)) {
      eidtInitParams(initData, detailGuideData)

      return
    }

    getDetailData()
  }

  const getDetailData = async () => {
    try {
      const res = await getDetailGuideListDetail({ guideNumber })

      if (res) {
        eidtInitParams(initData, res)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const save = (files: FileListDataType) => {
    const param = {
      ...params,
      guideAttachmentRequestList: files.map(({ fileNumber }) => ({ fileNumber })),
    }
    detailGuideEditMutate({ guideNumber, params: param })
  }

  useEffect(() => {
    init()
    return () => {
      resetParams()
      setDetailGuideData(null)
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <Breadcrumb pageTitleList={pageTitleList} />
          <h1 className="headline1">{params?.title}</h1>
        </ContentBox>
      </div>

      {!isParamsLoading && <DetailGuideContent detailGuideLoading={detailGuideEditLoading} save={save} />}
    </>
  )
}

export default DetailGuideEditPage
