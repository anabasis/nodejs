'use client'

// 라이브러리 관리 목록

import { usePathname, useRouter } from 'next/navigation'
import { Breadcrumb, ContentBox, ContextButton, Icons } from 'ui'
import { PageListTab } from '@components/common/PageListTab'
import { LibParamsType } from '@type/algorithm/library'
import AlgorithmTable from '@components/algorithm/table/AlgorithmLibTable'
import { useEffect } from 'react'
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

const AlgoLibraryList = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const contextOption = [
    { name: 'Add Library', onClick: () => router.push('/algorithm/library-manage/add') },
    { name: 'Add Custom Code', onClick: () => router.push('/algorithm/custom-code/add') },
    { name: 'Add Algorithm Pack', onClick: () => router.push('/algorithm/algorithm-pack/add') },
  ]

  const { isParamsLoading, resetSearcFilterParams } = useSearchFilter<LibParamsType>(initData)

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
        <PageListTab tabData={tabData} activeTab={0} />
      </div>

      <ContentBox>{!isParamsLoading && <AlgorithmTable />}</ContentBox>
    </>
  )
}
export default AlgoLibraryList
