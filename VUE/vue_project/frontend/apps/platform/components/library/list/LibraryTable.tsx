'use client'

import { useRouter } from 'next/navigation'
import Pagenation from 'ui/components/common/Pagenation'
import { libraryListHeader, changeTimeLocal, createMarkup } from 'library'
import { LibraryParamsType } from 'library/type/library'
import { useLibraryQuery } from '@store/server/useLibraryQuery'
import { BoardTable, NoData } from 'ui/components'
import { useSearchFilter } from '@hook/useSearchFIlter'

const LibraryTable = () => {
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<LibraryParamsType>()

  const { libraryList, isSuccess } = useLibraryQuery({ searchFilterParams, currentPage })

  const router = useRouter()

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '50%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            {libraryListHeader.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isSuccess && libraryList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={5}>
                <NoData text="There are no registered posts." className="full" />
              </td>
            </tr>
          ) : (
            libraryList?.content?.map((library, index) => (
              <tr key={index} onClick={() => router.push(`/library/detail?manualsId=${library.librCatNum}`)}>
                <td>{searchFilterParams.size * currentPage + index + 1}</td>
                <td>{library.titl}</td>
                <td>
                  <div className="editor_ellipsis" dangerouslySetInnerHTML={createMarkup(library.cont)} />
                </td>
                <td>{changeTimeLocal({ time: library.crtrDt, type: 'yyyy-MM-dd' })}</td>
                <td>{changeTimeLocal({ time: library.mdfDt, type: 'yyyy-MM-dd' })}</td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={libraryList?.totalPages}
        onPageChange={onPageChange}
        pageSize={searchFilterParams?.size}
        totalCount={libraryList?.totalElements}
      />
    </>
  )
}

export default LibraryTable
