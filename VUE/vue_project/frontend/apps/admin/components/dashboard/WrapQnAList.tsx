'use client'

import { useRouter } from 'next/navigation'
import { useHomeQuery } from '@store/server/useHomeQuery'
import { BoardTable, NoData, Pagenation, StatusLabel, ContentBox, Badge } from 'ui'
import { changeTimeLocal, qnaHomeListHeader, usePageNation } from 'library'
import { QnaAdminListReturnType } from '@type/qna'
import { startTransition, useEffect, useState } from 'react'
import { getQnaHomeWaitCount } from '@api/home'

const initData = {
  size: 4,
}

export const WrapQnAList = () => {
  const router = useRouter()

  const { currentPage, onPageChange } = usePageNation()

  const { qnaHomeList, isSuccess } = useHomeQuery({ params: initData, currentPage })

  const setLabelColor = (qnaStsCd: string) => {
    const labelObj = {
      ASN: 'ongoing',
      RSC: 'done',
      WFR: 'pause',
    }

    return labelObj[qnaStsCd]
  }

  return (
    <ContentBox type="dashboard_home">
      <div className="cont_title_box mb_0">
        <p className="title1">
          <span className="mr_10">QnA Inquiry</span>
          <Badge uiType="solid" size="sm" color="blue" style="count">
            {qnaHomeList?.totalElements || 0}
          </Badge>
        </p>
      </div>
      <BoardTable>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '5%' }} />
          <col style={{ width: '5%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '8%' }} />
        </colgroup>
        <thead>
          <tr>
            {qnaHomeListHeader?.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isSuccess && qnaHomeList?.content.length === 0 ? (
            <tr className="nodata">
              <td colSpan={8}>
                <NoData text="There are no registered QnA inquiry." />
              </td>
            </tr>
          ) : (
            qnaHomeList?.content?.map((qna, index) => (
              <tr key={qna.qnaNumber} onClick={() => router.push(`/helpdesk/qna/detail?qnaNum=${qna.qnaNumber}`)}>
                <td>{initData.size * currentPage + index + 1}</td>
                <td>{qna.category}</td>
                <td>{qna.module}</td>
                <td>
                  <StatusLabel status={setLabelColor(qna.qnaStsCd)} type="circle">
                    {qna.status}
                  </StatusLabel>
                </td>
                <td>{qna.title}</td>

                <td>{qna.writer}</td>
                <td>{changeTimeLocal({ time: qna.createDate, type: 'yyyy-MM-dd' })}</td>
                <td>{changeTimeLocal({ time: qna.modifyDate, type: 'yyyy-MM-dd' })}</td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation currentPage={currentPage} pageSize={initData.size} onPageChange={onPageChange} totalCount={qnaHomeList?.totalElements} />
    </ContentBox>
  )
}
