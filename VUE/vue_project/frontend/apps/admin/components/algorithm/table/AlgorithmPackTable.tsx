import React from 'react'
import { useRouter } from 'next/navigation'
import { useAlgoPackData } from '@store/server/algorithm/useAlogPackQuery'
import { BoardTable, NoData, Pagenation } from 'ui'
import { algorithmPackHeader } from 'library'
import { AlgoPackParamsType } from '@type/algorithm/pack'
import { useSearchFilter } from '@hook/useSearchFIlter'
const AlgorithmPackTable = () => {
  const router = useRouter()
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<AlgoPackParamsType>()

  const { algorithmPackList, isSuccess } = useAlgoPackData({ searchFilterParams, currentPage })

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '6%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '40%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '8%' }} />
        </colgroup>
        <thead>
          <tr>
            {algorithmPackHeader?.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isSuccess && algorithmPackList?.content.length === 0 ? (
            <tr className="nodata">
              <td colSpan={6}>
                <NoData text="There are no registered AlgorithmPack Pack" className="full" />
              </td>
            </tr>
          ) : (
            algorithmPackList?.content?.map((algorithm, index) => (
              <tr key={algorithm.id} onClick={() => router.push(`/algorithm/algorithm-pack/detail?algoPackId=${algorithm.id}`)}>
                <td>{searchFilterParams.size * currentPage + index + 1}</td>
                <td>{algorithm.name}</td>
                <td>{algorithm.desc}</td>
                <td>{algorithm.createdDt}</td>
                <td>{algorithm.releaseDt}</td>
                <td>{algorithm.createdBy}</td>
                <td>{algorithm.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={algorithmPackList?.totalPages}
        pageSize={searchFilterParams.size}
        onPageChange={onPageChange}
        totalCount={algorithmPackList?.totalElements}
      />
    </>
  )
}
export default AlgorithmPackTable
