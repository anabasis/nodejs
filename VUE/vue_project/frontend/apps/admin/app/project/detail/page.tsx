'use client'

import { BoardTable, Breadcrumb, DetailTable, Badge, RoundTab, PreTypo } from 'ui/components'
import Pagenation from 'ui/components/common/Pagenation'
import { ContentBox } from 'ui/layouts'
import { ButtonMui } from 'ui/mui'
import { notFound, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import UserInnerTd from 'ui/molecules/UserInnerTd'
import { useProjectInfoData, useProjectMemberListData, useProjectProcessListData } from '@store/server/useProjectQuery'
import { changeTimeLocal, getCdnFileUrl } from 'library/util'
import { ProjectProcessType } from '@type/project/projectType'
import { useMenu } from 'library'

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const searchParams = useSearchParams()
  const [projectId] = useState(searchParams.get('id'))
  const pageTitleList = ['Project', 'Project Detail']
  const [memberPagination, setMemberPagination] = useState({ pageSize: 5, currentPage: 0 })
  const [processTab, setProcessTab] = useState(0)

  const { data: projectInfo, isError: isProjectInfo, error: projectError } = useProjectInfoData(projectId)
  const { data: projectMembeList } = useProjectMemberListData(projectId)
  const { data: projectProcessList } = useProjectProcessListData(projectId)

  useEffect(() => {
    if (!!isProjectInfo) {
      router.push('/error/404')
    }
  }, [isProjectInfo])

  const handleEdit = useCallback(() => {
    router.push(`/project/edit?id=${projectId}`)
  }, [projectId, router])

  const handleMemberPaginationChange = useCallback((pageIndex: number) => {
    setMemberPagination((prev) => {
      return { ...prev, currentPage: pageIndex }
    })
  }, [])

  const handleProcessTabChange = useCallback(({ oldIndex, newIndex }) => {
    setProcessTab(newIndex)
  }, [])

  const getMemberFilterList = useMemo(() => {
    const memberList = projectMembeList?.filter(
      (row) =>
        processTab === 0 ||
        row.projectManagerYn === 'Y' ||
        row.prcsRolCd.find((item) => item.processCodes.find((pro) => pro === projectProcessList[processTab - 1]['prcsCd']))
    )

    setMemberPagination((prev) => {
      return { ...prev, currentPage: 0 }
    })

    return memberList
  }, [processTab, projectMembeList, projectProcessList])

  return (
    <>
      {/* 페이지 상단 박스 케이스 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{projectInfo?.prjNm}</h1>
          </div>
          <div className="rgt">
            <ButtonMui color="primary" icon="EditIcon" onClick={handleEdit} size="large" type="contained" disabled={getPathInfo(pathname).uptYn !== 'Y'}>
              Edit
            </ButtonMui>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <article>
          {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
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
              <th>Project ID</th>
              <td>{projectInfo?.id}</td>
              <th>Purpose</th>
              <td>{projectInfo?.purposeNm}</td>
            </tr>
            <tr>
              <th>Product category</th>
              <td>{projectInfo?.dissCatCd}</td>
              <th>Due date</th>
              <td>{`${changeTimeLocal({ time: projectInfo?.startDat, type: 'yyyy-MM-dd' })} ~ ${changeTimeLocal({
                time: projectInfo?.endDat,
                type: 'yyyy-MM-dd',
              })}`}</td>
            </tr>
            <tr>
              <th>Project name</th>
              <td colSpan={3}>{projectInfo?.prjNm}</td>
            </tr>
            <tr>
              <th className="va_top">Description</th>
              <td colSpan={3} className="">
                <PreTypo>{projectInfo?.prjDscrp || '-'}</PreTypo>
              </td>
            </tr>
            <tr>
              <th>Corporate</th>
              <td colSpan={3}>{projectInfo?.corporateNm}</td>
            </tr>
          </DetailTable>
        </article>
        <article>
          {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
          <div className="cont_title_box">
            <div className="align start">
              <p className="title1 mr_10">Member</p>
              <Badge uiType="solid" color="blue" style="count" size="sm">
                {projectMembeList?.length}
              </Badge>
            </div>
          </div>
          <div className="align">
            <div className="lft">
              <RoundTab
                tabData={!!projectProcessList ? [{ prcsNm: 'All', prcsCd: 'all' }].concat(projectProcessList as ProjectProcessType[]) : []}
                nameKey="prcsNm"
                value={processTab}
                onChange={handleProcessTabChange}
              />
            </div>
          </div>
          <BoardTable>
            <colgroup>
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
            <thead>
              <tr>
                <th>Name</th>
                <th>Organization</th>
                <th>Job Title</th>
                <th>Project Management</th>
                <th>Process Authority</th>
              </tr>
            </thead>
            <tbody>
              {getMemberFilterList
                ?.slice(memberPagination.currentPage * memberPagination.pageSize, (memberPagination.currentPage + 1) * memberPagination.pageSize)
                .map((row) => (
                  <tr key={row.prjMbrNum}>
                    <td>
                      <UserInnerTd name={row.usrNm} src={row.fileInfoResponse?.preSignedUrl ?? null} guest={row.guestYn === 'Y'} />
                    </td>
                    <td>{row.orgnNm || '-'}</td>
                    <td>{row.jobTitle || '-'}</td>
                    <td className="min_h66">
                      {row.projectManagerYn === 'Y' && (
                        <Badge uiType="solid" color="blue" style="round">
                          Project Manager
                        </Badge>
                      )}
                    </td>
                    <td className="ptb_0">
                      {row.projectManagerYn === 'Y' && (
                        <div className="align start min_h66 ptb_10">
                          <div className="grid1_9">Management</div>
                          <div className="flex1 ellipsis">{projectProcessList?.map((item) => item.prcsNm).join(', ')}</div>
                        </div>
                      )}
                      {row.projectManagerYn === 'N' &&
                        row.prcsRolCd.map((authItem, authIndex) => (
                          <>
                            <div className="align start min_h66 ptb_10" key={`auth-${authIndex}`}>
                              <div className="grid1_9">{authItem.processRoleCodeName}</div>
                              <div className="flex1 ellipsis">{authItem.processName.join(', ')}</div>
                            </div>
                            {authIndex < row.prcsRolCd.length - 1 && <hr className="mtb_0 bg" />}
                          </>
                        ))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </BoardTable>
          <Pagenation
            currentPage={memberPagination.currentPage}
            pageSize={memberPagination.pageSize}
            totalCount={getMemberFilterList?.length}
            onPageChange={handleMemberPaginationChange}
          />
        </article>
      </ContentBox>
    </>
  )
}
