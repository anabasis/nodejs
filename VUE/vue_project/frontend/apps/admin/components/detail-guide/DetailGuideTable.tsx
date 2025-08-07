'use client'

import { useRouter } from 'next/navigation'
import Pagenation from 'ui/components/common/Pagenation'
import { useDetailGuideQuery } from '@store/server/useDetailGuideQuery'
import { BoardTable, NoData } from 'ui/components'
import { detailGuideHeader, changeTimeLocal } from 'library'
import { DetailGuideParamsType } from '@type/detail-guilde'
import { useSearchFilter } from '@hook/useSearchFIlter'

const DetailGuideTable = () => {
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<DetailGuideParamsType>()
  const { detailGuideList, isSuccess } = useDetailGuideQuery({ searchFilterParams, currentPage })

  const router = useRouter()

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '8%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '150px' }} />
        </colgroup>
        <thead>
          <tr>
            {detailGuideHeader.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isSuccess && detailGuideList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={4}>
                <NoData text="There are no registered detailed guides." className="full" />
              </td>
            </tr>
          ) : (
            detailGuideList?.content?.map((detailGuide, index) => (
              <tr key={index} onClick={() => router.push(`/detail-guide/detail?guideNumber=${detailGuide.guideNumber}`)}>
                <td>{searchFilterParams.size * currentPage + index + 1}</td>
                <td>{detailGuide.title}</td>
                <td>{detailGuide.moveParameter}</td>
                <td>{changeTimeLocal({ time: detailGuide.createDate, type: 'yyyy-MM-dd' })}</td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={detailGuideList?.totalPages}
        onPageChange={onPageChange}
        totalCount={detailGuideList?.totalElements}
        pageSize={searchFilterParams.size}
      />
    </>
  )
}

export default DetailGuideTable
