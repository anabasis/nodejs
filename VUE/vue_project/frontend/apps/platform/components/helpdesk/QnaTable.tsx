'use client'

import { useRouter } from 'next/navigation'
import { useQnaListData } from '@store/server/useQnaQuery'
import { BoardTable, NoData, Pagenation, StatusLabel } from 'ui'
import { qnaListHeader, changeTimeLocal } from 'library'
import { QnaParamsType } from '@type/qna'
import { useSearchFilter } from '@hook/useSearchFIlter'
const QnaTable = () => {
  const router = useRouter()
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<QnaParamsType>()

  const { qnaList, isSuccess } = useQnaListData({ searchFilterParams, currentPage })

  const setLabelColor = (status: string) => {
    const obj = {
      WFR: 'pause',
      RSC: 'done',
      ASN: 'ongoing',
    }

    return obj[status]
  }
  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '8%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            {qnaListHeader?.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isSuccess && qnaList?.content.length === 0 ? (
            <tr className="nodata">
              <td colSpan={8}>
                <NoData text="There are no registered QnA inquiry." className="full" />
              </td>
            </tr>
          ) : (
            qnaList?.content?.map((qna) => (
              <tr key={qna.qnaNum} onClick={() => router.push(`/helpdesk/qna/detail?qnaNum=${qna.qnaNum}`)}>
                <td>{qna.qnaTpCd}</td>
                <td>{qna.qnaCatCd}</td>
                <td>{qna.mdlTpCd}</td>
                <td>{qna.inqrTitl}</td>

                <td>
                  <StatusLabel status={setLabelColor(qna.status)} type="circle">
                    {qna.qnaStsCd}
                  </StatusLabel>
                </td>

                <td>{qna.usrNm}</td>
                <td>{changeTimeLocal({ time: qna.createDate, type: 'yyyy-MM-dd' })}</td>
                <td>{changeTimeLocal({ time: qna.modifyDate, type: 'yyyy-MM-dd' })}</td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPage={qnaList?.totalPages}
        pageSize={searchFilterParams?.size}
        totalCount={qnaList?.totalElements}
      />
    </>
  )
}

export default QnaTable
