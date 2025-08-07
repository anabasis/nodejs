'use client'

import MemberSettingList, { MemberSettingHandleType } from '@components/project/add/memberSettings'
import AdditionalInformation from '@components/project/add/additionalInformation'
import BasicInformation from '@components/project/add/basicInformation'
import ProcessSetting from '@components/project/add/processSetting'
import { MemberType, ProcessItemType, ProjectInfoAddType } from '@type/project/projectType'
import { useRouter } from 'next/navigation'
import { useState, useCallback, useEffect, useRef } from 'react'
import { Breadcrumb, ButtonMui, ContentBox, ContentBoxWrap } from 'ui'
import ButtonGroup from 'ui/molecules/ButtonGroup'
import { useToastPopup } from 'library/hook/useToastPopup'
import { useProcessCodeData, useProjectMutation } from '@store/server/useProjectQuery'
import { useUser } from 'library/hook'
import { api } from 'library/util'

export default function Page() {
  const router = useRouter()
  const { toastOpen } = useToastPopup()
  const pageTitleList = ['Project', 'Create Project']
  const { data: processCodeList } = useProcessCodeData()
  const { userData, userInfo, userRole, adminRole } = useUser()
  const [projectInfo, setProjectInfo] = useState<ProjectInfoAddType>({
    dissCatCd: '',
    devPupsCd: '',
    prjNm: '',
    prjDscrp: '',
    startDat: '',
    endDat: '',
    members: [],
    prdNm: '',
    processCodes: [],
    regulatoryAffairCodeList: [],
    targetCountryCodeList: [],
    taskCd: '',
  })
  const [selectedProcessList, setSelectedProcessList] = useState<{ value: string; name: string; sortNum: number; prcsStsCode?: string }[]>([])
  const [memberList, setMemberList] = useState<MemberType[]>([])
  const [validation, setValidation] = useState(false)

  const memberSettingRef = useRef<MemberSettingHandleType>(null)

  const projectMutation = useProjectMutation()

  const getMyInformation = async () => {
    if (userInfo?.usrUid) {
      const response = await api.get(`/mypage/myinfo/detail`)
      return response.data
    }
  }

  useEffect(() => {
    if (!!userInfo) {
      getMyInformation().then((response) => {
        setMemberList([
          {
            memberId: response.userInformation[0].usrUid,
            usrNm: response.userInformation[0].usrNm,
            orgnNm: response.userInformation[0].orgnNm,
            jobTitle: response.userInformation[0].jobTitle,
            projectManagerYn: 'Y',
            guestYn: 'N',
            memberProcess: [{ processRoleCode: 'MGMT', processCodes: [] }],
            fileInfoResponse: response.userInformation[0].fileInfoPrvResponse,
          },
        ])
      })
    }
  }, [userInfo])

  useEffect(() => {
    let test = true
    if (projectInfo.dissCatCd === '') {
      setValidation(false)
      test = false
    }
    if (projectInfo.startDat === '' || projectInfo.endDat === '') {
      setValidation(false)
      test = false
    }
    if (projectInfo.devPupsCd === '') {
      setValidation(false)
      test = false
    }
    if (projectInfo.prjNm === '') {
      setValidation(false)
      test = false
    }
    if (selectedProcessList.length === 0) {
      setValidation(false)
      test = false
    }
    let isMemberValidation = true
    memberList.forEach((item) => {
      item.memberProcess.forEach((auth) => {
        if (auth.processRoleCode === '' || auth.processCodes.length === 0) {
          isMemberValidation = false
        }
      })
    })
    if (!!!isMemberValidation) {
      setValidation(false)
      test = false
    }
    if (test) {
      setValidation(true)
    }
  }, [projectInfo, selectedProcessList, memberList])

  const handleChangeProcessCode = (processCode: string, isChecked: boolean | undefined, processList: ProcessItemType[]) => {
    if (memberSettingRef.current) memberSettingRef.current.handleChangeProcess(processCode, isChecked, processList)
  }

  const handleCancel = useCallback(() => {
    router.push('/project')
  }, [router])

  const handleCreate = useCallback(() => {
    const projectResult = { ...projectInfo, members: memberList, processCodes: selectedProcessList.map((item) => item.value) }
    projectMutation.mutate(projectResult, {
      onSuccess: (result) => {
        toastOpen({ content: 'Successfully created. ', icon: 'success' })
        router.push(`/project/detail?id=${result.data.id}`)
      },
      onError: () => {
        toastOpen({ content: 'Create failed.', icon: 'warning' })
      },
    })
  }, [memberList, projectInfo, projectMutation, router, selectedProcessList, toastOpen])

  return (
    <>
      {/* 페이지 상단 박스 케이스 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} type="project" />
            <h1 className="headline1">Create Project</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <BasicInformation projectInfo={projectInfo} setProjectInfo={setProjectInfo} />
        <AdditionalInformation projectInfo={projectInfo} setProjectInfo={setProjectInfo} />
        <ProcessSetting
          projectInfo={projectInfo}
          processList={processCodeList}
          selectedProcessList={selectedProcessList}
          setSelectedProcessList={setSelectedProcessList}
          type="add"
          onChangeProcessCode={handleChangeProcessCode}
        />
        <MemberSettingList
          memberList={memberList}
          processList={selectedProcessList}
          setMemberList={setMemberList}
          type="add"
          projectName={projectInfo.prdNm}
          ref={memberSettingRef}
        />
        <ButtonGroup className="mt_20">
          <div className="align end">
            <ButtonMui type="outlined" size="xlarge" onClick={handleCancel}>
              Cancel
            </ButtonMui>
            <ButtonMui
              disabled={!validation}
              type="contained"
              size="xlarge"
              onClick={handleCreate}
              isLoading={projectMutation.isLoading}
              iconStyle={{ fill: '#fff' }}
            >
              Create
            </ButtonMui>
          </div>
        </ButtonGroup>
      </ContentBox>
    </>
  )
}
