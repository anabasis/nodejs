'use client'

import RequestProjectConfirm from '@components/project/reqProject/requestProjectConfirm'
import Pagenation from 'ui/components/common/Pagenation'
import UserInnerTd from 'ui/molecules/UserInnerTd'
import { useModal } from 'library/hook/useModal'
import { useCallback, useEffect, useState } from 'react'
import { BoardTable, Breadcrumb, ContentBox, Badge, StatusLabel, NoData } from 'ui'
import { useSearchParams } from 'next/navigation'
import { RequestsToProjectType } from '@type/project/projectType'
import { useProjectAuthorityListData, useProjectInfoData } from '@store/server/useProjectQuery'
import { changeTimeLocal, getCdnFileUrl } from 'library/util'

export default function Page() {
  const { modalOpen, modalClose } = useModal()
  const searchParams = useSearchParams()
  const [projectId] = useState(searchParams.get('id'))
  const [pageTitleList, setPageTitleList] = useState<string[]>([])
  const [pagination, setPagination] = useState({ pageSize: 20, currentPage: 0 })

  const { data: projectBasicInfo } = useProjectInfoData(projectId)
  const { data: projectAuthorityList, refetch: fetchListData } = useProjectAuthorityListData(projectId, pagination)

  useEffect(() => {
    if (!!projectBasicInfo) {
      setPageTitleList(['Project List', projectBasicInfo.prjNm, 'Requests To Project'])
    }
  }, [projectBasicInfo])

  const getStatusType = useCallback((status): string => {
    return status === null ? 'Standby' : status === 'APV' ? 'Request granted' : status === 'RJT' ? 'Request denied' : status
  }, [])

  const getType = (rowData: RequestsToProjectType) => {
    return <Badge size="sm">{rowData.reqTpCd === 'RQC' ? 'Change authority' : rowData.reqTpCd === 'RQJ' ? 'Request participate' : rowData.reqTpCd}</Badge>
  }

  const handelClosePopup = useCallback(() => {
    fetchListData()
    modalClose()
  }, [fetchListData, modalClose])

  const handleColClick = useCallback(
    (rowData, rowIndex, colIndex) => {
      if (rowData.reqTpCd === 'RQJ') {
        modalOpen({
          linetitle: true,
          content: (
            <RequestProjectConfirm
              projectId={projectId}
              requestId={rowData.id}
              type={rowData.reqTpCd}
              popupClose={handelClosePopup}
              result={rowData.aprvRslCd}
            />
          ),
          title: 'Confirmation of request to participate',
          textTitle: `Please check the request to participate the project ${projectBasicInfo.prjNm}.`,
          maxWidth: 'm',
        })
      } else if (rowData.reqTpCd === 'RQC') {
        modalOpen({
          linetitle: true,
          content: <RequestProjectConfirm projectId={projectId} requestId={rowData.id} type="RQC" popupClose={handelClosePopup} result={rowData.aprvRslCd} />,
          title: 'Confirm project authority change request',
          textTitle: `Please check the request for the project ${projectBasicInfo.prjNm}.`,
          maxWidth: 'm',
        })
      }
    },
    [handelClosePopup, modalOpen, projectBasicInfo, projectId]
  )

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => {
      return { ...prev, currentPage: page }
    })
  }, [])

  return (
    <>
      {/* 페이지 상단 박스 케이스 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} type="project" />
            <h1 className="headline1">Requests To Project</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <BoardTable>
          <colgroup>
            <col style={{ width: '12%' }} />
            <col style={{ width: '13%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Status</th>
              <th>Request Type</th>
              <th>Name</th>
              <th>Organization</th>
              <th>Process Authority</th>
              <th>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {projectAuthorityList?.content.map((row, index) => (
              <tr key={`request-${row.id}`}>
                <td
                  onClick={() => {
                    handleColClick(row, index, 0)
                  }}
                >
                  <StatusLabel status={getStatusType(row.aprvRslCd).split(' ').join('')} type="circle">
                    {getStatusType(row.aprvRslCd)}
                  </StatusLabel>
                </td>
                <td
                  onClick={() => {
                    handleColClick(row, index, 1)
                  }}
                >
                  {getType(row)}
                </td>
                <td
                  onClick={() => {
                    handleColClick(row, index, 2)
                  }}
                >
                  <UserInnerTd name={row.userNm} src={row.fileInfoResponse?.preSignedUrl ?? null} />
                </td>
                <td
                  onClick={() => {
                    handleColClick(row, index, 3)
                  }}
                >
                  {row.orgnNm || '-'}
                </td>
                <td
                  onClick={() => {
                    handleColClick(row, index, 4)
                  }}
                >
                  {row.memberProcess.map((auth, index) => (
                    <>
                      {index !== 0 ? ', ' : ''}
                      <span className="body3">{auth.processRoleCodeName}</span>
                      {`(${auth.processName.join(', ')})`}
                    </>
                  ))}
                </td>
                <td
                  onClick={() => {
                    handleColClick(row, index, 6)
                  }}
                >
                  {changeTimeLocal({ time: row.crtDt, type: 'yyyy-MM-dd' })}
                </td>
              </tr>
            ))}
            {projectAuthorityList?.content.length === 0 && (
              <tr className="nodata">
                <td colSpan={6}>
                  <NoData text="There are no requests for project participation." className="full" />
                </td>
              </tr>
            )}
          </tbody>
        </BoardTable>
        <Pagenation
          currentPage={pagination.currentPage}
          onPageChange={handlePageChange}
          pageSize={pagination.pageSize}
          totalCount={projectAuthorityList?.totalElements}
        />
      </ContentBox>
    </>
  )
}
