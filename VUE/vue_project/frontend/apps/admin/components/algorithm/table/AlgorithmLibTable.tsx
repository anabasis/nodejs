import React from 'react'
import { useRouter } from 'next/navigation'
import { useAlgoLibListData } from '@store/server/algorithm/useAlogLibQuery'
import { BoardTable, NoData, Pagenation } from 'ui'
import { algorithmLibHeader } from 'library'
import { LibParamsType } from '@type/algorithm/library'
import { useSearchFilter } from '@hook/useSearchFIlter'
const AlgorithmTable = () => {
  const router = useRouter()
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<LibParamsType>()

  const { algorithmLibraryList, isSuccess } = useAlgoLibListData({ searchFilterParams, currentPage })

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            {algorithmLibHeader?.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isSuccess && algorithmLibraryList?.content.length === 0 ? (
            <tr className="nodata">
              <td colSpan={6}>
                <NoData text="There are no registered libraries." className="full" />
              </td>
            </tr>
          ) : (
            algorithmLibraryList?.content?.map((algorithm, index) => (
              <tr key={algorithm.id} onClick={() => router.push(`/algorithm/library-manage/detail?libId=${algorithm.id}`)}>
                <td>{searchFilterParams.size * currentPage + index + 1}</td>
                <td>{algorithm.name}</td>
                <td>{algorithm.desc}</td>
                <td>{algorithm.latestLibVer?.version}</td>
                <td>{algorithm.releaseDt}</td>
                <td>{algorithm.createdBy}</td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>

      <Pagenation
        currentPage={currentPage}
        totalPage={algorithmLibraryList?.totalPages}
        pageSize={searchFilterParams.size}
        onPageChange={onPageChange}
        totalCount={algorithmLibraryList?.totalElements}
      />
    </>
  )
}
export default AlgorithmTable
