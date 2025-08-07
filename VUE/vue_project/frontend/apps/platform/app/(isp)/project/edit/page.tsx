'use client'

import MemberSettingList, { MemberSettingHandleType } from '@components/project/add/memberSettings'
import AdditionalInformation from '@components/project/add/additionalInformation'
import BasicInformationEdit from '@components/project/add/basicInformationEdit'
import ProcessSetting from '@components/project/add/processSetting'
import { MemberType, ProcessItemType, ProjectInfoEditType } from '@type/project/projectType'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import { Breadcrumb } from 'ui/components'
import { ContentBox } from 'ui/layouts'
import { useToastPopup } from 'library/hook/useToastPopup'
import {
  useEditProjectMutation,
  useProcessCodeData,
  useProjectAdditionalInfoData,
  useProjectInfoData,
  useProjectMemberData,
  useProjectProcessData,
} from '@store/server/useProjectQuery'
import axios from 'axios'
import { ButtonMui } from 'ui/mui'

export default function Page() {
  const router = useRouter()
  const { toastOpen } = useToastPopup()
  const searchParams = useSearchParams()
  const [projectId] = useState(searchParams.get('id'))
  const pageTitleList = ['Project', 'Project Detail', 'Edit Project']
  const [projectInfo, setProjectInfo] = useState<ProjectInfoEditType>({
    devPupsCd: '',
    prjNm: '',
    prjDscrp: '',
    dissCatCd: '',
    startDat: '',
    endDat: '',
    members: [],
    prdNm: '',
    processCodes: [],
    regulatoryAffairCodeList: [],
    targetCountryCodeList: [],
    taskCd: '',
    projectRoleCode: '',
    projectProcessRole: [],
  })
  const [selectedProcessList, setSelectedProcessList] = useState<
    {
      value: string
      name: string
      prcsStsCode?: string
      sortNum: number
    }[]
  >([])
  const [memberList, setMemberList] = useState<MemberType[]>([])
  const [operationMemberList, setOperationMemberList] = useState<MemberType[]>([])
  const [isChange, setChange] = useState<boolean>(false)

  const memberSettingRef = useRef<MemberSettingHandleType>(null)

  const { data: projectBasicInfo, isError: isProjectInfoError, error: projectInfoError } = useProjectInfoData(projectId)
  const { data: projectAdditionalInfo } = useProjectAdditionalInfoData(projectId)
  const { data: projectProcessInfo } = useProjectProcessData(projectId, false)
  const { data: processList } = useProcessCodeData()
  const { data: projectMemberList } = useProjectMemberData(projectBasicInfo)

  const editProject = useEditProjectMutation()

  useEffect(() => {
    if (!!isProjectInfoError) {
      if (axios.isAxiosError(projectInfoError)) {
        router.replace('/error/404')
      }
    }
  }, [isProjectInfoError])

  useEffect(() => {
    if (projectBasicInfo) {
      setProjectInfo((prev) => {
        return { ...prev, ...projectBasicInfo }
      })
    }
  }, [projectBasicInfo])

  useEffect(() => {
    if (projectAdditionalInfo) {
      setProjectInfo((prev) => {
        return { ...prev, ...projectAdditionalInfo }
      })
    }
  }, [projectAdditionalInfo])

  useEffect(() => {
    if (!!projectProcessInfo && !!processList) {
      setSelectedProcessList(
        projectProcessInfo.map((item) => {
          return { ...item, sortNum: processList.find((target) => target.value === item.value)?.sortNum || 0 }
        }) as {
          value: string
          name: string
          sortNum: number
          prcsStsCode?: string
        }[]
      )
    }
  }, [projectProcessInfo, processList])

  useEffect(() => {
    if (!!projectMemberList && !!projectProcessInfo) {
      setMemberList(
        projectMemberList.map((item) =>
          item.projectManagerYn === 'Y'
            ? { ...item, memberProcess: [{ processRoleCode: 'MGMT', processCodes: projectProcessInfo.map((item) => item.value) }] }
            : item
        )
      )
    }
  }, [projectMemberList, projectProcessInfo])

  useEffect(() => {
    if (selectedProcessList.length > 0) {
      const deleteProcess = projectProcessInfo.filter(
        (item: { name: string; value: string }) => selectedProcessList.find((target) => target.value === item.value) === undefined
      )
      const addProcess = selectedProcessList.filter(
        (item) => projectProcessInfo.find((target: { name: string; value: string }) => target.value === item.value) === undefined
      )
      setProjectInfo((prev) => {
        return {
          ...prev,
          processCodes: deleteProcess
            .map((item: { name: string; value: string }) => {
              return { processOperation: 'DELETE', processCode: item.value }
            })
            .concat(
              addProcess.map((item) => {
                return { processOperation: 'ADD', processCode: item.value }
              })
            ) as {
            processOperation: 'ADD' | 'DELETE'
            processCode: string
          }[],
        }
      })
    }
  }, [selectedProcessList])

  const handleChangeProcessCode = (processCode: string, isChecked: boolean | undefined, processList: ProcessItemType[]) => {
    if (memberSettingRef.current) {
      memberSettingRef.current.handleChangeProcess(processCode, isChecked, processList)
    }
  }

  const handleCancel = useCallback(() => {
    router.push(`/project/detail?id=${projectId}`)
  }, [projectId, router])

  const handleSave = useCallback(() => {
    if (memberList.find((item) => item.projectManagerYn === 'Y') === undefined) {
      toastOpen({ content: 'Please grant management authority to at least one person.', icon: 'warning' })
      return
    }
    editProject.mutate(
      { ...projectInfo, members: operationMemberList },
      {
        onSuccess(data, variables, context) {
          toastOpen({ content: 'Successfully saved.', icon: 'success' })
          router.push(`/project/detail?id=${projectId}`)
        },
        onError(error, variables, context) {
          toastOpen({ content: 'Save failed.', icon: 'warning' })
        },
      }
    )
  }, [editProject, memberList, operationMemberList, projectId, projectInfo, router, toastOpen])

  const isValidation = useMemo(() => {
    //!(operationMemberList.length > 0 || projectInfo.processCodes.length > 0 || isChange) || isMember
    let isMemberValidation = true
    memberList.forEach((item) => {
      item.memberProcess.forEach((auth) => {
        if (auth.processRoleCode === '' || auth.processCodes.length === 0) {
          isMemberValidation = false
        }
      })
    })

    return (isMemberValidation && operationMemberList.length > 0) || (projectInfo.processCodes.length > 0 && selectedProcessList.length > 0) || isChange
  }, [memberList, operationMemberList, projectInfo.processCodes, selectedProcessList, isChange])

  return (
    <>
      {/* 페이지 상단 박스 케이스 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} type="project" />
            <h1 className="headline1">{projectBasicInfo?.prjNm}</h1>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        {projectInfo.projectRoleCode === 'PJM' && (
          <BasicInformationEdit<ProjectInfoEditType> projectInfo={projectInfo} setProjectInfo={setProjectInfo} setChange={setChange} />
        )}
        {projectInfo.projectRoleCode === 'PJM' && (
          <AdditionalInformation<ProjectInfoEditType> projectInfo={projectInfo} setProjectInfo={setProjectInfo} setChange={setChange} />
        )}
        {projectInfo.projectRoleCode === 'PJM' && (
          <ProcessSetting<ProjectInfoEditType>
            projectInfo={projectInfo}
            processList={processList}
            selectedProcessList={selectedProcessList}
            setSelectedProcessList={setSelectedProcessList}
            type="edit"
            onChangeProcessCode={handleChangeProcessCode}
          />
        )}
        <MemberSettingList
          memberList={memberList}
          processList={selectedProcessList}
          setMemberList={setMemberList}
          operationMemberList={operationMemberList}
          setOperationMemberList={setOperationMemberList}
          projectName={projectInfo.prdNm}
          type="edit"
          projectRoleCode={projectInfo.projectRoleCode}
          projectProcessRole={projectInfo.projectProcessRole}
          ref={memberSettingRef}
        />
        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui type="outlined" size="xlarge" onClick={handleCancel}>
              Cancel
            </ButtonMui>
            <ButtonMui
              disabled={!isValidation}
              type="contained"
              size="xlarge"
              onClick={handleSave}
              isLoading={editProject.isLoading}
              iconStyle={{ fill: '#fff' }}
            >
              Save
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}
