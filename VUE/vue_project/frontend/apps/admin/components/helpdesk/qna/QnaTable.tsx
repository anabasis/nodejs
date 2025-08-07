'use client'

import { useRouter } from 'next/navigation'
import { useQnaListData } from '@store/server/useQnaQuery'
import { BoardTable, NoData, Pagenation, StatusLabel } from 'ui'
import { changeTimeLocal, qnaListHeader } from 'library'
import { QnaAdminParamsType } from '@type/qna'
import { useSearchFilter } from '@hook/useSearchFIlter'
const QnaTable = () => {
  const router = useRouter()
  const { searchFilterParams, currentPage, onPageChange } = useSearchFilter<QnaAdminParamsType>()

  const { qnaList, isSuccess } = useQnaListData({ searchFilterParams, currentPage })

  const setLabelColor = (qnaStsCd: string) => {
    const labelObj = {
      ASN: 'ongoing',
      RSC: 'done',
      WFR: 'pause',
    }

    return labelObj[qnaStsCd]
  }

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '8%' }} />
        </colgroup>
        <thead>
          <tr>
            {['No.', ...qnaListHeader]?.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isSuccess && qnaList?.content.length === 0 ? (
            <tr className="nodata">
              <td colSpan={9}>
                <NoData text="There are no registered QnA inquiry." className="full" />
              </td>
            </tr>
          ) : (
            qnaList?.content?.map((qna, index) => (
              <tr key={qna.qnaNumber} onClick={() => router.push(`/helpdesk/qna/detail?qnaNum=${qna.qnaNumber}`)}>
                <td>{searchFilterParams.size * currentPage + index + 1}</td>
                <td>{qna.type}</td>
                <td>{qna.category}</td>
                <td>{qna.module}</td>
                <td>{qna.title}</td>

                <td>
                  <StatusLabel status={setLabelColor(qna.qnaStsCd)} type="circle">
                    {qna.status}
                  </StatusLabel>
                </td>

                <td>{qna.writer}</td>
                <td>{changeTimeLocal({ time: qna.createDate, type: 'yyyy-MM-dd' })}</td>
                <td>{changeTimeLocal({ time: qna.modifyDate, type: 'yyyy-MM-dd' })}</td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={qnaList?.totalPages}
        pageSize={searchFilterParams.size}
        onPageChange={onPageChange}
        totalCount={qnaList?.totalElements}
      />
    </>
  )
}

export default QnaTable
