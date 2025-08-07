'use client'

import { useRouter } from 'next/navigation'
import Pagenation from 'ui/components/common/Pagenation'
import { noticeListHeader, changeTimeLocal } from 'library'
import { NoticeParamsType } from '@type/notice'
import { useNoticeQuery } from '@store/server/useNotcieQuery'
import { Badge, BoardTable, NoData } from 'ui/components'
import { useSearchFilter } from '@hook/useSearchFIlter'

const NoticeTable = () => {
  const { searchFilterParams, currentPage, onPageChange } = useSearchFilter<NoticeParamsType>()
  const { noticeList, isSuccess } = useNoticeQuery({ searchFilterParams, currentPage })
  const noticeHeaderCustom = [...noticeListHeader, 'Language']
  const router = useRouter()

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '6%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '35%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: 'auto' }} />
        </colgroup>
        <thead>
          <tr>
            {noticeHeaderCustom.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isSuccess && noticeList?.content?.length === 0 ? (
            // <ListError text="There are no registered notice." />
            <tr className="nodata">
              <td colSpan={6}>
                <NoData text="There are no registered notice." className="full" />
              </td>
            </tr>
          ) : (
            <>
              {noticeList?.content?.map((notice, index) => (
                <tr key={index} onClick={() => router.push(`/notice/detail?noticeId=${notice.noticeNumber}`)}>
                  <td>{searchFilterParams.size * currentPage + index + 1}</td>
                  <td>{notice.noticeCategory}</td>
                  <td>
                    <div className="align start">
                      <span className="ellipsis_1 w_auto">{notice.title}</span>
                      {notice?.noticeTypeCode === 'NTE' && <Badge>Must Read</Badge>}
                    </div>
                  </td>
                  <td>{notice.writer}</td>
                  <td>{changeTimeLocal({ time: notice?.createDate, type: 'yyyy-MM-dd' })}</td>
                  <td>{notice.languageCount}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={noticeList?.totalPages}
        onPageChange={onPageChange}
        pageSize={searchFilterParams.size}
        totalCount={noticeList?.totalElements}
      />
    </>
  )
}

export default NoticeTable
