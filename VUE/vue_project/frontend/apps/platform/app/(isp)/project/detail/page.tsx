'use client'

import CommentBar from '@components/project/detail/commentBar'
import OligoDesign from '@components/project/detail/oligodesign'
import Planning from '@components/project/detail/planning'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Badge, BaseTab, Breadcrumb, ButtonMui, ContentBox, ContextButton, Dl, Icons, StatusLabel, TooltipHover } from 'ui'
import { useModal } from 'library/hook/useModal'
import Overview from '@components/project/detail/overview'
import { useAlert } from 'library/hook/useAlert'
import ProjectMemger from '@components/project/detail/projectMember'
import RequestProject from '@components/project/requestProject'
import { useToastPopup } from 'library/hook/useToastPopup'
import {
  useDeleteProjectMutation,
  useModifyProjectStatusMatation,
  useProjectAdditionalInfoData,
  useProjectInfoData,
  useProjectMemberData,
  useProjectProcessData,
} from '@store/server/useProjectQuery'
import { api, axios, changeTimeLocal, getCdnFileUrl, scrollTopMain } from 'library/util'
import { ProcessType } from '@type/project/projectType'
import Ordering from '@components/project/detail/ordering'
import Feasibility from '@components/project/detail/feasibility'
import Verification from '@components/project/detail/verification'
import Validation from '@components/project/detail/validation'
import Followup from '@components/project/detail/followup'
import CommentArea from '@components/project/detail/CommentArea' //FloatingBtnArea 대신
import { Avatar } from '@mui/material'
import { useUser } from 'library/hook'
import Prototype from '@components/project/detail/prototype'
import { vistSend } from '@api/project'

export default function Page() {
  const pageTitleList = ['Project List', { mnuName: 'Project Detail', mnuIcon: '/images/i-project.png' }]
  const { userRole, userInfo } = useUser()
  //탭스티키 초기셋 처리 필요
  document.documentElement.style.setProperty('--contentbox-height', '144px')

  const router = useRouter()
  const { modalOpen, modalClose } = useModal()
  const { alertOpen, alertClose } = useAlert()
  const { toastOpen } = useToastPopup()
  const searchParams = useSearchParams()
  const [projectId] = useState(searchParams.get('id'))
  const [seletedProcess] = useState(searchParams.get('process'))
  const [selectedTabList, setSelectedTabList] = useState<{ tabName: string; id: string; num: number; isVisit: boolean; index: number }[]>([
    { tabName: 'Overview', id: 'over', num: 0, isVisit: true, index: 0 },
  ])
  const [tabIndex, setTabIndex] = useState(0)

  const { data: projectBasicInfo, refetch: projectBasicInfoFetch, isError: isProjectInfoError, error: projectInfoError } = useProjectInfoData(projectId)
  const { data: projectAdditionalInfo } = useProjectAdditionalInfoData(projectId)
  const { data: projectProcessInfo } = useProjectProcessData(projectId, true)
  const { data: memberList } = useProjectMemberData(projectBasicInfo)
  const projectStatusMutation = useModifyProjectStatusMatation()
  const deleteProjectMutation = useDeleteProjectMutation()

  useEffect(() => {
    if (!!isProjectInfoError) {
      if (axios.isAxiosError(projectInfoError)) {
        router.replace('/error/404')
      }
    }
  }, [isProjectInfoError])

  const tabData = useMemo(() => {
    return [
      {
        tabName: 'Overview',
        content: <Overview projectInfo={projectBasicInfo} projectAdditionalInfo={projectAdditionalInfo} processInfo={projectProcessInfo as ProcessType[]} />,
      },
      { tabName: 'Planning', content: <Planning projectInfo={projectBasicInfo} processInfo={projectProcessInfo as ProcessType[]} /> },
      { tabName: 'Oligo Design', content: <OligoDesign projectInfo={projectBasicInfo} processInfo={projectProcessInfo as ProcessType[]} /> },
      { tabName: 'Ordering', content: <Ordering projectInfo={projectBasicInfo} /> },
      { tabName: 'Feasibility', content: <Feasibility projectInfo={projectBasicInfo} /> },
      { tabName: 'Prototype', content: <Prototype projectInfo={projectBasicInfo} /> },
      { tabName: 'Verification', content: <Verification projectInfo={projectBasicInfo} /> },
      { tabName: 'Validation', content: <Validation projectInfo={projectBasicInfo} /> },
      { tabName: 'Follow up', content: <Followup projectInfo={projectBasicInfo} /> },
    ]
  }, [projectAdditionalInfo, projectBasicInfo, projectProcessInfo])

  useEffect(() => {
    if (!!projectProcessInfo && !!projectBasicInfo) {
      if (projectBasicInfo.projectRoleCode === 'PJM') {
        const processList = [{ tabName: 'Overview', id: 'over', num: 0, isVisit: false, index: 0 }].concat(
          projectProcessInfo.map((item, index) => {
            return { tabName: item.prcsName, id: item.prcsCode, num: item.prjPrcsNumber, isVisit: false, index }
          })
        )
        if (!!seletedProcess && processList.findIndex((item) => item.id === seletedProcess.toUpperCase())) {
          const targetIndex = processList.findIndex((item) => item.id === seletedProcess.toUpperCase())
          setTabIndex(targetIndex)
          vistSend({
            title: projectBasicInfo.prjNm,
            content: `Project > Project detail > ${processList[targetIndex].tabName}`,
            pageUrl: `/project/detail?id=${projectBasicInfo.id}&process=${processList[targetIndex].id}`,
          })
          setSelectedTabList(processList.map((item, index) => (index === targetIndex ? { ...item, isVisit: true } : item)))
        } else {
          vistSend({ title: projectBasicInfo.prjNm, content: 'Project > Project detail > Overview', pageUrl: `/project/detail?id=${projectBasicInfo.id}` })
          setSelectedTabList(processList.map((item, index) => (index === 0 ? { ...item, isVisit: true } : item)))
        }
      } else if (projectBasicInfo.projectRoleCode === 'PJB') {
        let processList = [{ tabName: 'Overview', id: 'over', num: 0, isVisit: false, index: 0 }].concat(
          projectBasicInfo.projectProcessRole
            .flatMap((item) => item.processCodes)
            .map((item: string) => {
              const processInfoIndex = projectProcessInfo.findIndex((target) => target.prcsCode === item)
              const processInfo = projectProcessInfo[processInfoIndex] as ProcessType
              return { tabName: processInfo.prcsName, id: processInfo.prcsCode, num: processInfo.prjPrcsNumber, isVisit: false, index: processInfoIndex }
            })
        )
        processList = processList.sort((a, b) => a.index - b.index)
        if (!!seletedProcess && processList.findIndex((item) => item.id === seletedProcess.toUpperCase()) > 0) {
          const targetIndex = processList.findIndex((item) => item.id === seletedProcess.toUpperCase())
          setTabIndex(targetIndex)
          vistSend({
            title: projectBasicInfo.prjNm,
            content: `Project > Project detail > ${processList[targetIndex].tabName}`,
            pageUrl: `/project/detail?id=${projectBasicInfo.id}&process=${processList[targetIndex].id}`,
          })
          setSelectedTabList(processList.map((item, index) => (index === targetIndex ? { ...item, isVisit: true } : item)))
        } else {
          vistSend({ title: projectBasicInfo.prjNm, content: 'Project > Project detail > Overview', pageUrl: `/project/detail?id=${projectBasicInfo.id}` })
          setSelectedTabList(processList.map((item, index) => (index === 0 ? { ...item, isVisit: true } : item)))
        }
      } else {
        setSelectedTabList([{ tabName: 'Overview', id: 'over', num: 0, isVisit: true, index: 0 }])
        vistSend({ title: projectBasicInfo.prjNm, content: 'Project > Project detail > Overview', pageUrl: `/project/detail?id=${projectBasicInfo.id}` })
      }
    }
  }, [projectBasicInfo, projectProcessInfo, seletedProcess])

  const deleteProject = useCallback(() => {
    alertClose()
    deleteProjectMutation.mutate(projectId, {
      onSuccess(data, variables, context) {
        toastOpen({ content: 'Successfully deleted.', icon: 'success' })
        router.push(`/project`)
      },
      onError(error, variables, context) {
        toastOpen({ content: 'Delete failed.', icon: 'warning' })
      },
    })
  }, [alertClose, deleteProjectMutation, projectId, router, toastOpen])

  const closeChangeProjectAuth = useCallback(() => {
    modalClose()
  }, [modalClose])

  const closeJoinProject = useCallback(
    (result: string) => {
      modalClose()
    },
    [modalClose]
  )

  const handleDeleteProject = useCallback(() => {
    alertOpen({
      maxWidth: 's',
      title: 'Are you sure to delete?',
      content: (
        <div className="align center mt_30">
          {/* 팝업의 버튼은 xlarge 사이즈 입니다.  */}
          <ButtonMui
            type="outlined"
            size="xlarge"
            onClick={() => {
              alertClose()
            }}
          >
            Cancel
          </ButtonMui>
          <ButtonMui
            size="xlarge"
            onClick={() => {
              deleteProject()
            }}
          >
            Delete
          </ButtonMui>
        </div>
      ),
      textTitle: `If you click the delete button, it cannot be recovered.`,
      icon: 'info',
    })
  }, [alertClose, alertOpen, deleteProject])

  const handleGoToProjectAuthList = useCallback(() => {
    router.push(`/project/reqproject?id=${projectId}`)
  }, [projectId, router])

  const handleGoToProjectEdit = useCallback(() => {
    router.push(`/project/edit?id=${projectId}`)
  }, [router, projectId])

  const handleEditProjectAuth = useCallback(() => {
    modalOpen({
      title: 'Authority change request',
      linetitle: true,
      textTitle: `Please enter information to request Authority change in the project ${projectBasicInfo.prjNm}.`,
      maxWidth: 'm',
      content: <RequestProject id={projectId} popupClose={closeChangeProjectAuth} type="RQC" />,
    })
  }, [modalOpen, projectBasicInfo, projectId, closeChangeProjectAuth])

  const handleRequestProject = useCallback(() => {
    modalOpen({
      title: 'Project Participation Request',
      linetitle: true,
      textTitle: `Please enter information to request participation in the project ${projectBasicInfo.prjNm}.`,
      maxWidth: 'm',
      content: <RequestProject id={projectId} popupClose={closeJoinProject} type="RQJ" />,
    })
  }, [modalOpen, projectBasicInfo, projectId, closeJoinProject])

  const goToDetail = useCallback(
    (processCode) => {
      alertClose()
      setTabIndex(selectedTabList.findIndex((item) => item.id === processCode) | 0)
    },
    [alertClose, selectedTabList]
  )

  const handleProjectComplete = useCallback(() => {
    const process = projectProcessInfo.find((item) => item.prcsStsCode !== 'PCFN') as ProcessType
    if (process !== undefined) {
      alertOpen({
        maxWidth: 's',
        title: 'The project cannot be completed',
        content: (
          <div className="align center mt_30">
            <ButtonMui
              type="outlined"
              size="xlarge"
              onClick={() => {
                alertClose()
              }}
            >
              Cancel
            </ButtonMui>
            <ButtonMui
              size="xlarge"
              onClick={() => {
                goToDetail(process.prcsCode)
              }}
            >
              Details
            </ButtonMui>
          </div>
        ),
        textTitle: `The project cannot be completed because ${process.prcsName} status is ${process.prcsStsName}.`,
        icon: 'warning',
      })
    } else {
      projectStatusMutation.mutate(
        { prjStsCd: 'CMP', id: projectBasicInfo.id },
        {
          onSuccess(data, variables, context) {
            projectBasicInfoFetch()
          },
          onError(error, variables, context) {},
        }
      )
    }
  }, [alertClose, alertOpen, goToDetail, projectBasicInfo, projectBasicInfoFetch, projectProcessInfo, projectStatusMutation])

  const handleProjectAbort = useCallback(() => {
    const process = projectProcessInfo.find((item) => item.prcsStsCode === 'PCNG') as ProcessType
    if (process != undefined) {
      alertOpen({
        maxWidth: 's',
        title: 'The project cannot be aborted',
        content: (
          <div className="align center mt_30">
            <ButtonMui
              type="outlined"
              size="xlarge"
              onClick={() => {
                alertClose()
              }}
            >
              Cancel
            </ButtonMui>
            <ButtonMui
              size="xlarge"
              onClick={() => {
                goToDetail(process.prcsCode)
              }}
            >
              Details
            </ButtonMui>
          </div>
        ),
        textTitle: `The project cannot be aborted because ${process.prcsName} status is ${process.prcsStsName}.`,
        icon: 'warning',
      })
    } else {
      projectStatusMutation.mutate(
        { prjStsCd: 'ABR', id: projectBasicInfo.id },
        {
          onSuccess(data, variables, context) {
            projectBasicInfoFetch()
          },
          onError(error, variables, context) {},
        }
      )
    }
  }, [alertClose, alertOpen, goToDetail, projectBasicInfo, projectBasicInfoFetch, projectProcessInfo, projectStatusMutation])

  const handleProjelctInProcess = useCallback(() => {
    projectStatusMutation.mutate(
      { prjStsCd: 'ONG', id: projectBasicInfo.id },
      {
        onSuccess(data, variables, context) {
          projectBasicInfoFetch()
        },
        onError(error, variables, context) {},
      }
    )
  }, [projectBasicInfo, projectBasicInfoFetch, projectStatusMutation])

  const contextMenuList = useMemo(() => {
    return [
      {
        name: 'Authority change request list',
        onClick: handleGoToProjectAuthList,
        roleCodes: ['PJM'],
      },
      {
        name: 'Authority change request',
        onClick: handleEditProjectAuth,
        roleCodes: ['PJB'],
      },
      {
        name: 'Edit project info',
        onClick: handleGoToProjectEdit,
        roleCodes: ['PJM', 'PJB'],
        processRoleCode: ['MGMT'],
      },
      {
        name: 'Project Complete',
        onClick: handleProjectComplete,
        roleCodes: ['PJM'],
        projectStatus: ['ONG'],
      },
      {
        name: 'Project Abort',
        onClick: handleProjectAbort,
        roleCodes: ['PJM'],
        projectStatus: ['ONG'],
      },
      {
        name: 'Project in progress',
        onClick: handleProjelctInProcess,
        roleCodes: ['PJM'],
        projectStatus: ['ABR', 'CMP'],
      },
      { name: 'Project Delete', onClick: handleDeleteProject, roleCodes: ['PJM'] },
      {
        name: 'Participate project request',
        onClick: handleRequestProject,
        roleCodes: [''],
      },
    ].filter((item) => {
      let status = true
      let role = true

      if (!!item.projectStatus && !item.projectStatus.includes(projectBasicInfo?.prjStsCd)) {
        status = false
      }

      if (!!item.processRoleCode && projectBasicInfo?.projectRoleCode === 'PJB') {
        role = projectBasicInfo.projectProcessRole.find((role) => item.processRoleCode.includes(role.processRoleCode)) !== undefined
      } else {
        role = item.roleCodes.includes(projectBasicInfo?.projectRoleCode)
      }

      return status && role
    })
  }, [
    handleDeleteProject,
    handleEditProjectAuth,
    handleGoToProjectAuthList,
    handleGoToProjectEdit,
    handleProjectAbort,
    handleProjectComplete,
    handleProjelctInProcess,
    handleRequestProject,
    projectBasicInfo,
  ])

  const handleTabChange = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      setTabIndex(newIndex)
      scrollTopMain()
      if (selectedTabList[newIndex].isVisit === false) {
        setSelectedTabList(selectedTabList.map((item, index) => (index === newIndex ? { ...item, isVisit: true } : item)))
        vistSend({
          title: projectBasicInfo.prjNm,
          content: `Project > Project detail > ${selectedTabList[newIndex].tabName}`,
          pageUrl: `/project/detail?id=${projectBasicInfo.id}&process=${selectedTabList[newIndex].id}`,
        })
      }
    },
    [projectBasicInfo, selectedTabList]
  )

  const handleMore = useCallback(() => {
    modalOpen({
      title: (
        <div className="align start">
          <p className="mr_10">Project member</p>
          <Badge uiType="solid" color="blue" style="count" size="md">
            {memberList?.length}
          </Badge>
        </div>
      ),
      linetitle: true,
      textTitle: 'Members involved in the project.',
      maxWidth: 'xl',
      content: <ProjectMemger projectInfo={projectBasicInfo} />,
    })
  }, [memberList?.length, modalOpen, projectBasicInfo])

  const getContent = () => {
    return tabData.find((item) => item.tabName === selectedTabList[tabIndex].tabName).content
  }

  return (
    // flex_wrapper :: 는 dashborad/projectDetail에서 사용되는 클래스 입니다.
    <div className="flex_wrapper">
      {/* 프로젝트 상세 레이아웃:: content_left, content_right 로 구분 */}
      <div className="content_left">
        <div className="sticky_wrap">
          <ContentBox type="top_content">
            {/* lft/rgt 가 좌우로 정렬됩니다. */}
            <div className="lft">
              <Breadcrumb pageTitleList={pageTitleList} type="project" />
              <div className="page_title align start gap_12">
                <h1 className="headline1">{projectBasicInfo?.prjNm}</h1>
                <div className="item">
                  {/* 아바타 hover시 툴팁이 나와야 한다면...현재 만들어둔 컴포넌트 활용불가입니다. */}
                  <div className="hover_avartar_group">
                    {projectBasicInfo?.memberInfoList.map((item) => {
                      return (
                        // 사이즈가 변경될시 따로 추가 필요 :: 기본 30x30
                        <TooltipHover
                          className="hover_avartar"
                          placements="top"
                          key={item.memberName}
                          component={<Avatar className="avartar" src={item.fileInfo?.preSignedUrl ?? null} alt={item.memberName} />}
                        >
                          {item.memberName}
                        </TooltipHover>
                      )
                    })}
                  </div>
                  <button className="ml_10 body2 navy400" onClick={handleMore}>
                    <span>more</span>
                    <Icons.AngleIcon width={14} height={14} fill={'#A2ADC1'} />
                  </button>
                </div>
                <StatusLabel status={projectBasicInfo?.prjStsNm.toLowerCase()}>{projectBasicInfo?.prjStsNm}</StatusLabel>
              </div>
              <Dl
                listData={[
                  { listTitle: 'Product Category', listInfo: projectBasicInfo?.dissCatCd },
                  { listTitle: 'Purpose', listInfo: projectBasicInfo?.devPups },
                  {
                    listTitle: 'Due Date',
                    listInfo: `${changeTimeLocal({ time: projectBasicInfo?.startDat, type: 'yyyy-MM-dd' })} ~ ${changeTimeLocal({
                      time: projectBasicInfo?.endDat,
                      type: 'yyyy-MM-dd',
                    })}`,
                  },
                ]}
              />
            </div>
            <div className="rgt pt_5">
              <ContextButton options={contextMenuList} />
            </div>
          </ContentBox>
          <BaseTab tabData={selectedTabList} value={tabIndex} onChange={handleTabChange} />
        </div>
        {getContent()}
      </div>
      <div className="content_right">
        {/* 코멘트 사이드바 영역 */}
        <CommentBar projectId={projectId} projectInfo={projectBasicInfo} />
        {/* 플로팅 버튼, 팝업 영역 */}

        {projectBasicInfo?.projectRoleCode && <CommentArea projectId={projectId} processNum={selectedTabList[tabIndex].num} />}
      </div>
    </div>
  )
}
