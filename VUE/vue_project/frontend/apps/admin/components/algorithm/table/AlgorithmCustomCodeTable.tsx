import React from 'react'
import { useRouter } from 'next/navigation'
import { useAlgoCustomCodeQuery } from '@store/server/algorithm/useAlogCodeQuery'
import { BoardTable, NoData, Pagenation } from 'ui'
import { algorithmCustomHeader } from 'library'
import { CustomParamsType } from '@type/algorithm/custom-code'
import { useSearchFilter } from '@hook/useSearchFIlter'
const AlgorithmCustomCodeTable = () => {
  const router = useRouter()
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<CustomParamsType>()

  const { algorithmCustomCodeList, isSuccess } = useAlgoCustomCodeQuery({ searchFilterParams, currentPage })

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '8%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr>
            {algorithmCustomHeader?.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isSuccess && algorithmCustomCodeList?.content.length === 0 ? (
            <tr className="nodata">
              <td colSpan={6}>
                <NoData text="There are custom codes registered" className="full" />
              </td>
            </tr>
          ) : (
            <>
              {algorithmCustomCodeList?.content?.map((algorithm, index) => (
                <tr key={algorithm.id} onClick={() => router.push(`/algorithm/custom-code/detail?partialCodeId=${algorithm.id}`)}>
                  <td>{searchFilterParams.size * currentPage + index + 1}</td>
                  <td>{algorithm.name}</td>
                  <td>{algorithm.desc}</td>
                  <td>{algorithm.latestPartialCodeVer?.version}</td>
                  <td>{algorithm.releaseDt}</td>
                  <td>{algorithm.createdBy}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={algorithmCustomCodeList?.totalPages}
        pageSize={searchFilterParams?.size}
        onPageChange={onPageChange}
        totalCount={algorithmCustomCodeList?.totalElements}
      />
    </>
  )
}
export default AlgorithmCustomCodeTable
