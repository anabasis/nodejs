'use client'

import { useRouter } from 'next/navigation'
import { useQnaManageListData } from '@store/server/useQnaQuery'
import { BoardTable, NoData, Pagenation } from 'ui'
import { changeTimeLocal, qnaManageListHeader, filterNonEmptyValues } from 'library'
import { QnaAdminParamsType } from '@type/qna'
import { useSearchFilter } from '@hook/useSearchFIlter'

const QnaManageTable = () => {
  const router = useRouter()
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<QnaAdminParamsType>()

  const { qnaMangeList, isSuccess } = useQnaManageListData({ searchFilterParams, currentPage })

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '10%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: 'auto' }} />
        </colgroup>
        <thead>
          <tr>
            {qnaManageListHeader?.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isSuccess && qnaMangeList?.content.length === 0 ? (
            <tr className="nodata">
              <td colSpan={8}>
                <NoData text="There are no registered QnA Mangement" className="full" />
              </td>
            </tr>
          ) : (
            qnaMangeList?.content?.map((qna) => (
              <tr key={qna.no} onClick={() => router.push(`/helpdesk/qna/mangement/detail?category=${qna.ctCd}&module=${qna.mdCd}`)}>
                <td>{qna.no}</td>
                <td>{qna.ctCdNm}</td>
                <td>{qna.mdCdNm}</td>
                <td> {qna.mbrCnt > 0 ? `${qna.mbrCnt} members` : ''} </td>
                <td>{qna.modifyDate.split(' ')[0] === '1900-01-01' ? '' : changeTimeLocal({ time: qna.modifyDate, type: 'yyyy-MM-dd' })}</td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={qnaMangeList?.totalPages}
        pageSize={searchFilterParams?.size}
        onPageChange={onPageChange}
        totalCount={qnaMangeList?.totalElements}
      />
    </>
  )
}

export default QnaManageTable
