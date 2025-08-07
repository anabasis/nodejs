'use client'

import { ProjectBasicInfoType, RequestHistoryType, ProjectAdditionalInfoType, ProcessType } from '@type/project/projectType'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ContentBox,
  BoardTable,
  LabelBadgeStatus,
  TooltipHover,
  Badge,
  ButtonMui,
  RoundTab,
  ProjectCard,
  DetailTable,
  LabelTag,
  StatusLabel,
  Icons,
  NoData,
  PreTypo,
} from 'ui'
import Pagenation from 'ui/components/common/Pagenation'
import { useModal } from 'library/hook/useModal'
import CheckProjectMembers from './checkProjectMembers'
import UserInnerTd from 'ui/molecules/UserInnerTd'
import SwiperCompo from './SwiperCompo'
import { changeTimeLocal, getCdnFileUrl, scrollTopMain } from 'library/util'
import { useProjectMemberData } from '@store/server/useProjectQuery'

export default function Overview({
  projectInfo,
  projectAdditionalInfo,
  processInfo,
}: {
  projectInfo: ProjectBasicInfoType
  projectAdditionalInfo: ProjectAdditionalInfoType
  processInfo: ProcessType[]
}) {
  const router = useRouter()
  const { modalOpen, modalClose } = useModal()

  const [quickTab] = useState([
    { tabName: 'Process History', name: 'processInformation' },
    // { tabName: 'Request History', name: 'requestHistory'},
    { tabName: 'Basic Infomation', name: 'basicInformation' },
    { tabName: 'Additional Infomation', name: 'additionalInformation' },
    { tabName: 'Member', name: 'member' },
  ])
  const [quickTabValue, setQuickTabValue] = useState(0)
  const [processList, setProcessList] = useState<{ prcsName: string; prcsCode: string }[]>([{ prcsName: 'All', prcsCode: 'All' }])
  const [processValue, setProcessValue] = useState(0)
  const [memberPagination, setMemberPagination] = useState({ pageSize: 5, currentPage: 0 })
  const [requesthistoryPagination, setRequesthistoryPagination] = useState({ pageSize: 5, currentPage: 0 })
  const [requesthistoryList] = useState<RequestHistoryType[]>([])

  const { data: memberList, refetch: refetchMemberList } = useProjectMemberData(projectInfo)

  useEffect(() => {
    if (!!processInfo) {
      setProcessList([{ prcsName: 'All', prcsCode: 'All' }].concat(processInfo))
    }
  }, [processInfo])

  const handleQuickTabClick = useCallback(
    (index: number) => {
      return new Promise<boolean>(function (resolve) {
        setQuickTabValue(index)
        scrollTopMain(document.getElementById(quickTab[index].name).offsetTop)
        resolve(true)
      })
    },
    [quickTab]
  )

  const handleProcessTabClick = useCallback(({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setMemberPagination((prev) => {
      return { ...prev, currentPage: 0 }
    })
    setProcessValue(newIndex)
  }, [])

  const handleMemberActivity = useCallback(() => {
    modalOpen({
      title: 'Check project members',
      linetitle: true,
      textTitle: 'Check the activities of members who have participated or currently participating in the project by process.',
      maxWidth: 'xl',
      content: <CheckProjectMembers projectInfo={projectInfo} />,
    })
  }, [modalOpen, projectInfo])

  const handleRequestPagenation = useCallback((page: number) => {
    setRequesthistoryPagination((prev) => {
      return { ...prev, currentPage: page }
    })
  }, [])

  const handleMemberPaginationChange = useCallback(
    (page: number) => {
      refetchMemberList()
      setMemberPagination((prev) => {
        return { ...prev, currentPage: page }
      })
    },
    [refetchMemberList]
  )

  const getMemberFilterList = useMemo(() => {
    return memberList?.filter(
      (row) =>
        processValue === 0 ||
        row.projectManagerYn === 'Y' ||
        row.memberProcess.find((item) => item.processCodes.find((pro) => pro === processList[processValue].prcsCode))
    )
  }, [memberList, processList, processValue])

  return (
    <ContentBox>
      <RoundTab tabData={quickTab} value={quickTabValue} onTabClick={handleQuickTabClick} />
      <article className="mt_30">
        <div>
          <SwiperCompo projectInfo={projectInfo} />
        </div>
      </article>
      <article style={{ display: 'none' }}>
        <div className="cont_title_box">
          <p className="title1">Request History</p>
        </div>
        <BoardTable>
          <colgroup>
            <col width="15%" />
            <col width="10%" />
            <col width="auto" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
            <col width="14px" />
          </colgroup>
          <thead>
            <tr>
              <th>Process</th>
              <th>ID</th>
              <th>Request Title</th>
              <th>Start Date</th>
              <th>Last Modified Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {requesthistoryList.map((item, index) => (
              <tr key={`request-${index}`}>
                <td>
                  <p className="body3">{item.processName}</p>
                </td>
                <td>{item.requestId}</td>
                <td>{item.requestName}</td>
                <td>{item.startDate}</td>
                <td>{item.lastUpdtDate}</td>
                <td>
                  <StatusLabel status={item.statusCd}>{item.statusCd}</StatusLabel>
                </td>
              </tr>
            ))}
            {requesthistoryList.length === 0 && (
              <tr className="nodata">
                <td colSpan={7}>
                  <NoData size="sm" text="There are no requests." />
                </td>
              </tr>
            )}
          </tbody>
        </BoardTable>
        {requesthistoryList.length > 0 && (
          <Pagenation
            currentPage={requesthistoryPagination.currentPage}
            totalCount={5}
            pageSize={requesthistoryPagination.pageSize}
            onPageChange={handleRequestPagenation}
          />
        )}
      </article>
      <article>
        <a id="basicInformation"></a>
        <div className="cont_title_box">
          <p className="title1">Basic Information</p>
        </div>
        <DetailTable
          colgroup={
            <colgroup>
              <col width="15%" />
              <col width="35%" />
              <col width="15%" />
              <col width="35%" />
            </colgroup>
          }
        >
          <tr>
            <th>Project ID</th>
            <td>{projectInfo?.id}</td>
            <th>Purpose</th>
            <td>{projectInfo?.devPups} </td>
          </tr>
          <tr>
            <th>Product category</th>
            <td>{projectInfo?.dissCat}</td>
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
            <td colSpan={3}>
              <PreTypo>{!!projectInfo?.prjDscrp ? projectInfo?.prjDscrp : '-'}</PreTypo>
            </td>
          </tr>
        </DetailTable>
      </article>
      <article>
        <a id="additionalInformation"></a>
        <div className="cont_title_box">
          <p className="title1">Additional Information</p>
        </div>
        <DetailTable
          colgroup={
            <colgroup>
              <col width="15%" />
              <col width="35%" />
              <col width="15%" />
              <col width="35%" />
            </colgroup>
          }
        >
          <tr>
            <th className="va_top">
              <div className="align start">
                <span className="">Product name</span>
                <TooltipHover>Please enter the name when developing a commercialized product.</TooltipHover>
              </div>
            </th>
            <td className="va_top">{projectAdditionalInfo?.prdNm !== '' ? projectAdditionalInfo?.prdNm : '-'}</td>
            <th className="va_top">
              <span className="align start">
                Task code
                <TooltipHover>Please enter task code if available.</TooltipHover>
              </span>
            </th>
            <td className="va_top">{projectAdditionalInfo?.taskCd !== '' ? projectAdditionalInfo?.taskCd : '-'}</td>
          </tr>
          <tr>
            <th className="va_top">
              <span className="align start">
                Regulatory affair
                <TooltipHover>Please select if there is a country need to regulatory affair.</TooltipHover>
              </span>
            </th>
            <td className="va_top">
              {projectAdditionalInfo?.regulatoryAffairNameList?.length > 0 ? projectAdditionalInfo?.regulatoryAffairNameList.join(',') : '-'}
            </td>
            <th className="va_top">
              <span className="align start">
                Target market
                <TooltipHover> Select the country where product will be launched.</TooltipHover>
              </span>
            </th>
            <td className="va_top">
              {projectAdditionalInfo?.targetCountryNameList?.length > 0 ? projectAdditionalInfo?.targetCountryNameList.join(',') : '-'}
            </td>
          </tr>
        </DetailTable>
      </article>
      <article>
        <a id="member"></a>
        <div className="cont_title_box align start">
          <p className="title1 mr_10">Member</p>
          <Badge uiType="solid" color="blue" style="count" size="sm">
            {memberList?.length}
          </Badge>
        </div>
        <div className="align top">
          <div className="lft" style={{ width: 'calc(100% - 125px)' }}>
            <RoundTab tabData={processList} onChange={handleProcessTabClick} value={processValue} nameKey="prcsName" />
          </div>
          <div className="rgt">
            <ButtonMui color="black" size="medium" type="contained" onClick={handleMemberActivity}>
              Member Activity
            </ButtonMui>
          </div>
        </div>
        <BoardTable className="min_h380">
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
              .map((row, index) => (
                <tr key={row.memberId}>
                  <td className="va_top pt_18">
                    <UserInnerTd name={row.usrNm} src={row.fileInfoResponse?.preSignedUrl ?? null} guest={row.guestYn === 'Y'} />
                  </td>
                  <td className="va_top pt_23">{row.orgnNm === '' || row.orgnNm === undefined ? '-' : row.orgnNm}</td>
                  <td className="va_top pt_23">{row.jobTitle === '' || row.jobTitle === undefined ? '-' : row.jobTitle}</td>
                  <td className="va_top pt_23">
                    {row.projectManagerYn === 'Y' && (
                      <Badge uiType="solid" style="round">
                        Project Manager
                      </Badge>
                    )}
                  </td>
                  <td className="ptb_0 pr_30">
                    {row.projectManagerYn === 'Y' && (
                      <div className="align start min_h66 ptb_10">
                        <div className="grid1_9">Management</div>
                        <div className="flex1 ellipsis">{processInfo?.map((item) => item.prcsName).join(', ')}</div>
                      </div>
                    )}
                    {row.projectManagerYn === 'N' &&
                      row.memberProcess?.map((authItem, authIndex) => (
                        <>
                          <div className="align start min_h66 ptb_10" key={`auth-${authIndex}`}>
                            <div className="grid1_9">{authItem.processRoleCodeName}</div>
                            <div className="flex1 ellipsis">{authItem.processName.join(', ')}</div>
                          </div>
                          {authIndex < row.memberProcess.length - 1 && <hr className="bg mtb_0" />}
                        </>
                      ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </BoardTable>
        <Pagenation
          currentPage={memberPagination.currentPage}
          totalCount={getMemberFilterList?.length}
          pageSize={memberPagination.pageSize}
          onPageChange={handleMemberPaginationChange}
        />
      </article>
    </ContentBox>
  )
}
