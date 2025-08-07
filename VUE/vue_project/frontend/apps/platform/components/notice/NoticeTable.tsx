'use client'

import { useRouter } from 'next/navigation'
import Pagenation from 'ui/components/common/Pagenation'
import { noticeListHeader, changeTimeLocal } from 'library'
import { NoticeParamsType } from '@type/notice'
import { useNoticeQuery } from '@store/server/useNotcieQuery'
import { Badge, BoardTable, NoData } from 'ui/components'
import { useSearchFilter } from '@hook/useSearchFIlter'

const NoticeTable = () => {
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<NoticeParamsType>()
  const { noticeList, isSuccess } = useNoticeQuery({ searchFilterParams, currentPage })

  const router = useRouter()

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '65%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            {noticeListHeader.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isSuccess && noticeList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={5}>
                <NoData text="There are no registered notice." className="full" />
              </td>
            </tr>
          ) : (
            noticeList?.content?.map((notice, index) => (
              <tr key={index} onClick={() => router.push(`/notice/detail?noticeId=${notice.ntcNum}`)}>
                <td>{searchFilterParams.size * currentPage + index + 1}</td>
                <td>{notice.ntcCatCd}</td>
                <td>
                  <div className="align start">
                    <span className="ellipsis_1 w_auto">{notice.titl}</span>
                    {notice?.ntcTpCd === 'NTE' && <Badge>Must Read</Badge>}
                  </div>
                </td>
                <td>{notice.usrNm}</td>
                <td>{changeTimeLocal({ time: notice?.crtDt, type: 'yyyy-MM-dd' })}</td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        totalPage={noticeList?.totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={searchFilterParams?.size}
        totalCount={noticeList?.totalElements}
      />
    </>
  )
}

export default NoticeTable
