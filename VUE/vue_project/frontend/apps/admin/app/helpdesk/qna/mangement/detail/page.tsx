'use client'

import { ContentBox, Breadcrumb, DetailTable } from 'ui'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import QnaManageMemberTable from '@components/helpdesk/qna/management/QnaManageMemberTable'
import { checkedAtom } from '@store/client/qna'
import { useSetAtom } from 'jotai'
import { changeTimeLocal } from 'library'
import { useQnaManageDetailList } from '@store/server/useQnaQuery'

const pageTitleList = ['QnA', 'QnA Management', 'QnA Management detail']

const QnaManageDetailPage = () => {
  const searchParams = useSearchParams()
  const [category, moduleVal] = [searchParams.get('category'), searchParams.get('module')]
  const setCheckReset = useSetAtom(checkedAtom)
  const { isSuccess, qnaMangeDetailList } = useQnaManageDetailList({ category, module: moduleVal })

  useEffect(() => {
    return () => {
      setCheckReset([])
    }
  }, [])

  return (
    <>
      {isSuccess ? (
        <>
          <div className="sticky_wrap">
            <ContentBox type="top_content">
              {/* lft/rgt 가 좌우로 정렬됩니다.  */}
              <div className="lft">
                <Breadcrumb pageTitleList={pageTitleList} />
                <h1 className="headline1">QnA Management Detail</h1>
              </div>
            </ContentBox>
          </div>
          <ContentBox>
            <article>
              <div className="cont_title_box">
                <p className="title1">Basic Information</p>
              </div>
              <DetailTable
                colgroup={
                  <colgroup>
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '35%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '35%' }} />
                  </colgroup>
                }
              >
                <tr>
                  <th>No.</th>
                  <td>{qnaMangeDetailList?.no}</td>
                  <th>Module</th>
                  <td>{qnaMangeDetailList?.mdCdNm}</td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>{qnaMangeDetailList?.ctCdNm}</td>
                  <th>Last updated date</th>
                  <td>{changeTimeLocal({ time: qnaMangeDetailList?.modifyDate, type: 'yyyy-MM-dd' })}</td>
                </tr>
                <tr>
                  <th>Person in charge</th>
                  <td>{qnaMangeDetailList?.mbrCnt} members</td>
                </tr>
              </DetailTable>
            </article>

            <QnaManageMemberTable />
          </ContentBox>
        </>
      ) : null}
    </>
  )
}
export default QnaManageDetailPage
