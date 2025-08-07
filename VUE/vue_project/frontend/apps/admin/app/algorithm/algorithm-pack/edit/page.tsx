// 작업자 : 최유희

'use client'
import { useEffect, useState } from 'react'
import { ContentBox, Breadcrumb } from 'ui'
import AlgoPackEditorForm from '@components/algorithm/AlgoPackEditorForm'
import { getAlgorithmPackDetail } from '@api/algorithm/pack'
import { useParamsData } from 'library'
import { AlgoPackAddParamsType, PackDetailType, AlgoPartialCodeType } from '@type/algorithm/pack'
import { useSearchParams } from 'next/navigation'
import { useAlgoPackEditor } from '@hook/useAlgoPackEditor'
import { pick } from 'lodash-es'
const keyArr = ['BPN', 'DSP', 'PostProc', 'CtCalc', 'MuDT', 'Crosstalk']

const AlgorithmPackEditPage = () => {
  const searchParams = useSearchParams()
  const algoPackId = searchParams.get('algoPackId')
  const pageTitleList = ['Algorithm', 'Algorithm Pack Detail', 'Edit Algorithm Pack']
  const [packDetailData, setPackDetailData] = useState<PackDetailType>()
  const { eidtInitParams, isParamsLoading, resetParams } = useParamsData<AlgoPackAddParamsType>()
  const { getCustomSelectedNote, getCustomSelectedVersion, setReleaseNote, setSelectData } = useAlgoPackEditor()

  const initCustomCodeNoteData = async (PartialCodeId, PartialCodeVerId) => {
    await getCustomSelectedVersion({ PartialCodeId, name: 'version' })
    await getCustomSelectedNote({ PartialCodeId, PartialCodeVerId, selectedKey: 'version' })
  }

  const getObjectWithVersion = (obj: AlgoPartialCodeType) => {
    if (!obj) return
    return {
      ...obj,
      libVerId: obj?.libVerId?.toString(),
    }
  }

  const initParams = (data: PackDetailType) => {
    const {
      algoType: { BPN, CtCalc, DSP, MuDT, PostProc, Crosstalk },
      note,
    } = data

    const params = {
      type: 'DSP 1.0',
      ctType: '2ct',
      filter: data.filter,
      desc: data.desc,
      name: data.name,
      bpn: getObjectWithVersion(BPN),
      dsp: getObjectWithVersion(DSP),
      postproc: getObjectWithVersion(PostProc),
      ctcalc: getObjectWithVersion(CtCalc),
      mudt: getObjectWithVersion(MuDT),
      crosstalk: getObjectWithVersion(Crosstalk),
      note,
      status: data.status,
      partialCodeVerId: null,
    }
    if (data['partialCode']) {
      Object.assign(params, {
        partialCodeVerId: data?.partialCode?.partialCodeId,
        version: data?.partialCode?.partialCodeVerId,
      })
      initCustomCodeNoteData(data?.partialCode?.partialCodeId, data?.partialCode?.partialCodeVerId)
    }

    eidtInitParams(params)
  }

  const init = async () => {
    try {
      const data = await getAlgorithmPackDetail({ algoPackId })
      if (data) {
        const sortedRes = pick(data.algoType, keyArr)

        initParams(data)
        setPackDetailData({
          ...data,
          algoType: { ...sortedRes },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    init()
    return () => {
      resetParams()
      setReleaseNote(null)
      setSelectData(null)
    }
  }, [])

  return (
    <>
      {/* 헤더 */}
      <div className="sticky_wrap">
        {/* 페이지 상단 박스 케이스 */}
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{packDetailData?.name}</h1>
          </div>
        </ContentBox>
      </div>

      <ContentBox>{!isParamsLoading && <AlgoPackEditorForm packDetailData={packDetailData} />}</ContentBox>
    </>
  )
}

export default AlgorithmPackEditPage
