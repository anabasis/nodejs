'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Pagenation from 'ui/components/common/Pagenation'
import { useParamsData } from 'library/hook/useParamsData'
import { useLibraryManualListQuery } from '@store/server/useLibraryQuery'
import { libraryListHeader } from 'library/constant/table'
import { BoardTable, NoData } from 'ui/components'
import { LibraryManualType } from '@type/library'
import { createMarkup, changeTimeLocal } from 'library'
import { useSearchFilter } from '@hook/useSearchFIlter'
const LibraryListTable = () => {
  const searchParams = useSearchParams()
  const manualsId = searchParams.get('manualsId')
  const libTitle = searchParams.get('title')
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<LibraryManualType>()

  const { libraryManualList, isSuccess } = useLibraryManualListQuery({ searchFilterParams, currentPage })
  const router = useRouter()

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '10%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr>
            {libraryListHeader.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {isSuccess && libraryManualList?.content?.length === 0 ? (
            // <ListError text="There are no registered notice." />
            <tr className="nodata">
              <td colSpan={6}>
                <NoData text="There are no registered library." className="full" />
              </td>
            </tr>
          ) : (
            <>
              {libraryManualList?.content?.map((library, index) => (
                <tr key={index} onClick={() => router.push(`/library/list/detail?manualsId=${manualsId}&id=${library.librNum}&title=${libTitle}`)}>
                  <td>{searchFilterParams.size * currentPage + index + 1}</td>
                  <td>{library.titl}</td>
                  <td>
                    <div className="editor_ellipsis" dangerouslySetInnerHTML={createMarkup(library.cont)}></div>
                  </td>
                  <td>{changeTimeLocal({ time: library?.crtrDt, type: 'yyyy-MM-dd' })}</td>
                  <td>{changeTimeLocal({ time: library?.mdfDt, type: 'yyyy-MM-dd' })}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        totalPage={libraryManualList?.totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalCount={libraryManualList?.totalElements}
        pageSize={searchFilterParams.size}
      />
    </>
  )
}

export default LibraryListTable
