'use client'

// 라이브러리 관리 목록

import { usePathname, useRouter } from 'next/navigation'
import { Breadcrumb, ButtonMui, ContentBox, ContextButton, FilterItem, Icons, SearchIcoInput, SelectMui } from 'ui'
import { PageListTab } from '@components/common/PageListTab'
import { AlgoPackParamsType } from '@type/algorithm/pack'
import AlgorithmPackTable from '@components/algorithm/table/AlgorithmPackTable'
import { useEffect, useState } from 'react'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { useMenu } from 'library'
const pageTitleList = ['algorithm']
const tabData = [
  { tabName: 'Library', href: '/algorithm/library-manage' },
  { tabName: 'Custom Code', href: '/algorithm/custom-code' },
  { tabName: 'Algorithm Pack', href: '/algorithm/algorithm-pack' },
]

const initData = {
  size: 20,
}

const optionList = [
  {
    name: 'Algorithm pack name',
    value: 'name',
  },
]
const AlgoLibraryList = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const [tab, setTab] = useState('name')
  const contextOption = [
    { name: 'Add Library', onClick: () => router.push('/algorithm/library-manage/add') },
    { name: 'Add Custom Code', onClick: () => router.push('/algorithm/custom-code/add') },
    { name: 'Add Algorithm Pack', onClick: () => router.push('/algorithm/algorithm-pack/add') },
  ]

  const { valueParam, resetSearcFilterParams, onValueParamChange, onResetFilter, onSearch, isParamsLoading } = useSearchFilter<AlgoPackParamsType>(initData)

  useEffect(() => {
    return () => {
      resetSearcFilterParams()
    }
  }, [])
  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Algorithm</h1>
          </div>
          <div className="rgt">
            <ContextButton disabled={getPathInfo(pathname).crtYn !== 'Y'} options={contextOption} uiType="dropdown">
              <div className={`btn primary lg ${getPathInfo(pathname).crtYn !== 'Y' ? 'disabled' : ''}`}>
                <Icons.PlusIcon width={16} height={16} fill="#fff" />
                <span className="mr_8 white">Add</span>
                <i className="ico_angle down">
                  <Icons.AngleIcon width={16} height={16} classname="down" fill="#fff" />
                </i>
              </div>
            </ContextButton>
          </div>
        </ContentBox>
        <PageListTab tabData={tabData} activeTab={2} />
      </div>

      <ContentBox>
        <div className="align">
          <div className="lft gap_10">
            {/* MEMO: SearchIcoInput, Select uiType 스타일 프롭스 명칭 변경되었습니다. */}
            <FilterItem label="Keyword">
              <div className="grid6">
                <SearchIcoInput
                  uiType="addSelect"
                  clearValue={() => onValueParamChange('', 'name')}
                  onSearchClick={() => onSearch('name')}
                  onSearch={(event) => onSearch(event, 'name')}
                  value={valueParam || ''}
                  onChangeSearch={onValueParamChange}
                  placeholder="Enter keyword"
                >
                  <SelectMui value={tab} placeholder="Select" size="full" options={optionList} uiType="multi" onChange={(e) => setTab(e.target.value)} />
                </SearchIcoInput>
              </div>
            </FilterItem>
            <ButtonMui
              size="xsmall"
              type="outlined"
              color="gray"
              uiType="reset_btn"
              icon="ResetIcon"
              iconStyle={{ width: 20, height: 20, fill: '#354165' }}
              onClick={() => onResetFilter(initData)}
            />
          </div>
        </div>

        {!isParamsLoading && <AlgorithmPackTable />}
      </ContentBox>
    </>
  )
}
export default AlgoLibraryList
