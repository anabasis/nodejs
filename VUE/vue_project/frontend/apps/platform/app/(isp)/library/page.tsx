'use client'
import { useEffect, useState } from 'react'
import { Breadcrumb, ContentBox, NoData, Pagenation } from 'ui'
import { LibraryManualListReturnType } from 'library/type/library'
import { usePageNation } from 'library'
import { getLibraryManual } from '@api/library'
import { BasicGuideCard } from '@components/library/BasicGuideCard'
import { useRouter } from 'next/navigation'
import { useLibraryManualQuery } from '@store/server/useLibraryQuery'
function LibraryPage() {
  const router = useRouter()
  const pageTitleList = ['Library']
  const { currentPage, onPageChange } = usePageNation()
  const [libraryData, setLibraryData] = useState<LibraryManualListReturnType>()
  const { isSuccess } = useLibraryManualQuery({ currentPage })

  const init = async () => {
    try {
      const res = await getLibraryManual({ currentPage })
      if (res) {
        setLibraryData(res)
      }
    } catch (e) {
      console.error(e)
    }
  }
  const moveListPage = (manualsDetailId: number, title: string) => {
    router.push(`/library/list?manualsDetailId=${manualsDetailId}&title=${title}`)
  }
  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Library</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        {isSuccess && libraryData?.content.length === 0 ? (
          <NoData text="There are no registered posts." className="full align center column" />
        ) : (
          <div className="align start wrap gap_20">
            {libraryData?.content.map((library) => (
              <BasicGuideCard
                moveListPage={(manualsId, title) => moveListPage(manualsId, title)}
                key={library.librCatNum}
                manualsDetailId={library.librCatNum}
                title={library.titl}
                text={library.descrp}
                icon={library.crtrDt}
                imageFileName={library.imageFileName}
                linstnum={+library.manualsListCount}
              />
            ))}
          </div>
        )}
        {/* <div className="cont_bottom_box">
          <Pagenation currentPage={currentPage} totalCount={libraryData?.totalElements} pageSize={20} onPageChange={onPageChange} />
        </div> */}
      </ContentBox>
    </>
  )
}

export default LibraryPage
