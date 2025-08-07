'use client'

// 라이브러리 등록
import { useRouter } from 'next/navigation'

import { Breadcrumb, ContentBox } from 'ui'
import { useParamsData } from 'library'
import { useAlogoCodeMutate } from '@store/server/algorithm/useAlogCodeQuery'
import { useEffect } from 'react'
import AlogoAddForm from '@components/algorithm/AlogoAddForm'
import { CustomAddParamsType } from '@type/algorithm/custom-code'
const pageTitleList = ['algorithm', 'Add Custom Code']

const initData = {
  name: '',
  type: 'customcode',
  desc: '',
}

const infoData = {
  name: 'Custom code name',
  desc: 'Description',
  placeholder: 'Please enter custom code name.',
}

const AlgoCustomAdd = () => {
  const router = useRouter()
  const { algoCodeAdd, algoCodeAddLoading } = useAlogoCodeMutate()
  const { params, resetParams } = useParamsData<CustomAddParamsType>(initData)

  useEffect(() => {
    return () => resetParams()
  }, [])

  const cancel = () => router.push('/algorithm/custom-code')

  const add = () => {
    algoCodeAdd({ params })
  }

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Add Custom Code</h1>
          </div>
        </ContentBox>
      </div>

      <AlogoAddForm add={add} algoAddLoading={algoCodeAddLoading} cancel={cancel} info={infoData} />
    </>
  )
}
export default AlgoCustomAdd
