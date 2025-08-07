// 작업자 : 최유희

'use client'
import { useEffect, useState } from 'react'
import { ContentBox, Breadcrumb } from 'ui'
import AlgoPackEditorForm from '@components/algorithm/AlgoPackEditorForm'
import { useParamsData } from 'library'
import { AlgoPackAddParamsType } from '@type/algorithm/pack'
import { useAlgoPackEditor } from '@hook/useAlgoPackEditor'

const initData = {
  type: 'DSP 1.0',
  ctType: '2ct',
  desc: '',
  filter: '',
  note: '',
}

const AlgorithmPackAdd = () => {
  const pageTitleList = ['Algorithm', 'Add Algorithm Pack']
  const { isParamsLoading, resetParams } = useParamsData<AlgoPackAddParamsType>(initData)
  const { setReleaseNote, setSelectData } = useAlgoPackEditor()

  useEffect(() => {
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
            <h1 className="headline1">Algorithm</h1>
            {/* <Dl listData={descListData} /> */}
          </div>
        </ContentBox>
      </div>

      <ContentBox>{!isParamsLoading && <AlgoPackEditorForm />}</ContentBox>
    </>
  )
}

export default AlgorithmPackAdd
