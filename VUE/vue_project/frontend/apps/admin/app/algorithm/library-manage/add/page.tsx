'use client'

// 라이브러리 등록
import { useRouter } from 'next/navigation'

import { Breadcrumb, ContentBox } from 'ui'
import { useParamsData } from 'library'
import { useAlogoMutate } from '@store/server/algorithm/useAlogLibQuery'
import { useEffect } from 'react'
import AlogoAddForm from '@components/algorithm/AlogoAddForm'
const pageTitleList = ['algorithm', 'Add Library']

const initData = {
  name: '',
  type: 'DSP 1.0',
  desc: '',
}

const infoData = {
  name: 'Library name',
  desc: 'Description',
  placeholder: 'Please enter the library name.',
}

const AlgoLibraryAdd = () => {
  const router = useRouter()
  const { algohmLibAdd, algoLibAddLoading } = useAlogoMutate()
  const { params, resetParams } = useParamsData(initData)

  useEffect(() => {
    return () => resetParams()
  }, [])

  const cancel = () => router.push('/algorithm/library-manage')

  const add = () => {
    algohmLibAdd({ params })
  }

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Algorithm</h1>
          </div>
        </ContentBox>
      </div>

      <AlogoAddForm algoAddLoading={algoLibAddLoading} add={add} cancel={cancel} info={infoData} />
    </>
  )
}
export default AlgoLibraryAdd
