'use client'

import AddProjectMember from '@components/project/edit/addProjectMember'
import { BaseInput, BoardTable, Breadcrumb, DetailTable, Badge, RoundTab, SwitchToggle, TextArea } from 'ui/components'
import Pagenation from 'ui/components/common/Pagenation'
import DateRangePicker from 'ui/datepicker/DateRangePicker'
import { ContentBox } from 'ui/layouts'
import ButtonGroup from 'ui/molecules/ButtonGroup'
import { ButtonMui, MultiSelectMui, SelectChangeEvent, SelectMui } from 'ui/mui'
import { useModal } from 'library/hook/useModal'
import UserInnerTd from 'ui/molecules/UserInnerTd'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useToastPopup } from 'library/hook/useToastPopup'
import { getCode } from 'library/util'
import { useQueries } from '@tanstack/react-query'
import {
  useCorporateListData,
  useProjectInfoData,
  useProjectInfoEditMatation,
  useProjectMemberListData,
  useProjectProcessListData,
} from '@store/server/useProjectQuery'
import { MemberOperationType, ProjectDetailType, ProjectMemberType } from '@type/project/projectType'
import { useAlert } from 'library/hook/useAlert'
import { useMenu } from 'library'

export default function Page() {
  const commonCodes = { diseaseCategory: 'PFM020', purpose: 'PFM015', processRole: 'PFM018' }
  const codes = useQueries({
    queries: Object.values(commonCodes).map((v) => {
      return { queryKey: ['code', v], queryFn: () => getCode(v), staleTime: Infinity }
    }),
  })
  let cCode = {}
  Object.keys(commonCodes).forEach((v, i) => {
    cCode[v] = codes[i].data
  })
  const router = useRouter()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const { alertOpen, alertClose } = useAlert()
  const { modalOpen, modalClose } = useModal()
  const { toastOpen } = useToastPopup()
  const searchParams = useSearchParams()
  const [projectId] = useState(searchParams.get('id'))
  const pageTitleList = ['Project', 'Project Detail', 'Edit Project']

  const [projectInfo, setProjectInfo] = useState<ProjectDetailType>({
    corporateCd: 0,
    dissCatCd: '',
    startDat: '',
    endDat: '',
    purposeCd: '',
    id: 0,
    prjDscrp: '',
    prjNm: '',
  })
  const [memberList, setMemberList] = useState<ProjectMemberType[]>([])
  const [operationMemberList, setOperationMemberList] = useState<MemberOperationType[]>([])
  const [memberPagenationInfo, setMemberPagenationInfo] = useState({ currentPage: 0, pageSize: 5 })
  const [processTab, setProcessTab] = useState(0)

  const { data: projectInfoData } = useProjectInfoData(projectId)
  const { data: projectMembeListData } = useProjectMemberListData(projectId)
  const { data: projectProcessList } = useProjectProcessListData(projectId, false)
  const { data: corporateListData } = useCorporateListData()

  const projectEditMutation = useProjectInfoEditMatation()

  useEffect(() => {
    if (!!projectInfoData) {
      setProjectInfo({ ...projectInfoData })
    }
  }, [projectInfoData])

  useEffect(() => {
    if (!!projectMembeListData && !!projectProcessList) {
      setMemberList(
        projectMembeListData.map((item) =>
          item.projectManagerYn === 'Y'
            ? { ...item, prcsRolCd: [{ processRoleCode: 'MGMT', processCodes: projectProcessList.map((item) => item['value']) }] }
            : { ...item }
        )
      )
    }
  }, [projectMembeListData, projectProcessList])

  const handleMemberPagenationChagne = useCallback(
    (page: number) => {
      setMemberPagenationInfo({ ...memberPagenationInfo, currentPage: page })
    },
    [setMemberPagenationInfo, memberPagenationInfo]
  )

  const handleAddMemberPopupClose = useCallback(
    (type: string, selectedMember?: ProjectMemberType[]) => {
      if (type === 'cancel') {
        modalClose()
      } else if (type === 'add') {
        if (!!selectedMember && selectedMember.length > 0) {
          setOperationMemberList((prev) => {
            return prev.concat(
              selectedMember.map((item) => {
                return { projectMemberOperation: 'ADD', memberId: item.usrUid, projectManagerYn: item.projectManagerYn, memberProcess: item.prcsRolCd }
              })
            )
          })
          setMemberList((prev) => {
            return prev.concat(selectedMember)
          })
        }
        modalClose()
      }
    },
    [modalClose]
  )

  const handleAddMember = useCallback(() => {
    modalOpen({
      title: 'Add project member',
      textTitle: `Please select and add people to the project ${projectInfoData.prjNm}.`,
      maxWidth: 'l',
      linetitle: true,
      content: <AddProjectMember onClose={handleAddMemberPopupClose} memberList={memberList} corporateName={projectInfoData.corporateNm} />,
    })
  }, [modalOpen, projectInfoData, handleAddMemberPopupClose, memberList])

  const getAuthorityList = (rowData, index) =>
    cCode['processRole']?.filter(
      (item) =>
        !(rowData.guestYn === 'Y' && item.value === 'MGMT') &&
        rowData.prcsRolCd.find((authItem, authIndex) => index !== authIndex && authItem.processRoleCode === item.value) === undefined
    )

  const handleDeleteAuth = useCallback(
    (rowData: ProjectMemberType, authIndex: number) => {
      const target = operationMemberList.find((item) => item.memberId === rowData.usrUid)
      !!target
        ? setOperationMemberList((prev) => {
            return prev.map((item) => {
              return item.memberId !== rowData.usrUid ? item : { ...item, memberProcess: rowData.prcsRolCd.filter((item, index) => index !== authIndex) }
            })
          })
        : setOperationMemberList((prev) =>
            prev.concat([
              {
                memberId: rowData.usrUid,
                memberProcess: rowData.prcsRolCd.filter((item, index) => index !== authIndex),
                projectManagerYn: rowData.projectManagerYn,
                projectMemberOperation: 'UPDATE',
              },
            ])
          )
      setMemberList((prev) => {
        return prev.map((item) => {
          return item.usrUid === rowData.usrUid ? { ...item, prcsRolCd: item.prcsRolCd.filter((item, index) => index !== authIndex) } : item
        })
      })
    },
    [operationMemberList]
  )

  const handleAuthorityChange = useCallback(
    (e: SelectChangeEvent, rowData: ProjectMemberType, authIndex: number) => {
      const target = operationMemberList.find((item) => item.memberId === rowData.usrUid)
      !!target
        ? setOperationMemberList((prev) => {
            return prev.map((item) => {
              return item.memberId !== rowData.usrUid
                ? item
                : {
                    ...item,
                    memberProcess: rowData.prcsRolCd.map((authData, index) => {
                      return index === authIndex ? { ...authData, processRoleCode: e.target.value } : authData
                    }),
                  }
            })
          })
        : setOperationMemberList((prev) =>
            prev.concat([
              {
                memberId: rowData.usrUid,
                memberProcess: rowData.prcsRolCd.map((authData, index) => {
                  return index === authIndex ? { ...authData, processRoleCode: e.target.value } : authData
                }),
                projectManagerYn: rowData.projectManagerYn,
                projectMemberOperation: 'UPDATE',
              },
            ])
          )
      setMemberList((prev) => {
        return prev.map((item) => {
          return item.usrUid === rowData.usrUid
            ? {
                ...item,
                prcsRolCd: item.prcsRolCd.map((authData, index) => {
                  return index === authIndex ? { ...authData, processRoleCode: e.target.value } : authData
                }),
              }
            : item
        })
      })
    },
    [operationMemberList]
  )

  const handleProcessChange = useCallback(
    (event: SelectChangeEvent<string[]>, rowData: ProjectMemberType, authIndex: number) => {
      const target = operationMemberList.find((item) => item.memberId === rowData.usrUid)
      !!target
        ? setOperationMemberList((prev) => {
            return prev.map((item) => {
              return item.memberId !== rowData.usrUid
                ? item
                : {
                    ...item,
                    memberProcess: rowData.prcsRolCd.map((authData, index) => {
                      return index === authIndex
                        ? { ...authData, processCodes: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value }
                        : authData
                    }),
                  }
            })
          })
        : setOperationMemberList((prev) =>
            prev.concat([
              {
                memberId: rowData.usrUid,
                memberProcess: rowData.prcsRolCd.map((authData, index) => {
                  return index === authIndex
                    ? { ...authData, processCodes: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value }
                    : authData
                }),
                projectManagerYn: rowData.projectManagerYn,
                projectMemberOperation: 'UPDATE',
              },
            ])
          )
      setMemberList((prev) => {
        return prev.map((item) => {
          return item.usrUid === rowData.usrUid
            ? {
                ...item,
                prcsRolCd: item.prcsRolCd.map((authData, index) => {
                  return index === authIndex
                    ? { ...authData, processCodes: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value }
                    : authData
                }),
              }
            : item
        })
      })
    },
    [operationMemberList]
  )

  const handleDeleteMember = useCallback(
    (row: ProjectMemberType) => {
      const member = memberList.filter((item) => item.usrUid !== row.usrUid)
      setMemberPagenationInfo((prev) => {
        return {
          ...prev,
          totalCount: member.length,
          currentPage: prev.currentPage > Math.ceil(member.length / prev.pageSize) ? Math.ceil(member.length / prev.pageSize) : prev.currentPage,
        }
      })
      const target = operationMemberList.find((item) => item.memberId === row.usrUid)
      !!target && target.projectMemberOperation === 'ADD'
        ? setOperationMemberList((prev) => prev.filter((item) => item.memberId !== row.usrUid))
        : target === undefined
        ? setOperationMemberList((prev) =>
            prev.concat([{ projectMemberOperation: 'DELETE', memberId: row.usrUid, projectManagerYn: row.projectManagerYn, memberProcess: [] }])
          )
        : setOperationMemberList((prev) =>
            prev.map((item) => (item.memberId === row.usrUid ? { ...item, projectMemberOperation: 'DELETE', memberProcess: [] } : item))
          )

      setMemberList(member)
    },
    [memberList, operationMemberList]
  )

  const handleAddAuthority = useCallback(
    (rowData: ProjectMemberType) => {
      const target = operationMemberList.find((item) => item.memberId === rowData.usrUid)
      !!target
        ? setOperationMemberList((prev) => {
            return prev.map((item) => {
              return item.memberId !== rowData.usrUid
                ? item
                : {
                    ...item,
                    memberProcess: rowData.prcsRolCd.concat({ processRoleCode: '', processCodes: [] }),
                  }
            })
          })
        : setOperationMemberList((prev) =>
            prev.concat([
              {
                memberId: rowData.usrUid,
                memberProcess: rowData.prcsRolCd.concat({ processRoleCode: '', processCodes: [] }),
                projectManagerYn: rowData.projectManagerYn,
                projectMemberOperation: 'UPDATE',
              },
            ])
          )
      setMemberList((prev) => {
        return prev.map((item) => {
          return item.usrUid === rowData.usrUid ? { ...item, prcsRolCd: item.prcsRolCd.concat({ processRoleCode: '', processCodes: [] }) } : item
        })
      })
    },
    [operationMemberList]
  )

  const getProcessList = (rowData, index) =>
    projectProcessList.filter(
      (item) => rowData.prcsRolCd.find((authItem, authIndex) => index !== authIndex && authItem.processCodes.includes(item['value'])) === undefined
    ) as { name: string; value: string }[]

  const editCancel = useCallback(() => {
    alertClose()
    router.push(`/project`)
  }, [alertClose, router])

  const handleCancel = useCallback(() => {
    // if (operationMemberList.length === 0) {
    //   router.push(`/project`)
    // } else {

    // }
    alertOpen({
      maxWidth: 's',
      title: 'Do you want to cancel writing?',
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
              editCancel()
            }}
          >
            OK
          </ButtonMui>
        </div>
      ),
      textTitle: `The contents you wrote will disappear and will not be registered.`,
      icon: 'info',
    })
  }, [alertClose, alertOpen, editCancel])

  const handleSave = useCallback(() => {
    if (memberList.filter((item) => item.projectManagerYn === 'Y').length === 0) {
      toastOpen({ content: 'Please grant Management authority to at least one person.', icon: 'warning' })
      return
    }
    projectEditMutation.mutate(
      { members: operationMemberList, id: projectId },
      {
        onSuccess(data, variables, context) {
          toastOpen({ content: 'Successfully saved.', icon: 'success' })
          router.push(`/project`)
        },
        onError(error, variables, context) {
          toastOpen({ content: 'Save failed.', icon: 'warning' })
        },
      }
    )
  }, [memberList, operationMemberList, projectEditMutation, projectId, router, toastOpen])

  const handleManagementChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, rowData) => {
      if (event.target.checked && memberList.filter((item) => item.projectManagerYn === 'Y').length >= 2) {
        toastOpen({ content: 'Management authority can be granted only to 2 people.', icon: 'warning' })
        return
      }
      const target = operationMemberList.find((item) => item.memberId === rowData.usrUid)
      !!target
        ? setOperationMemberList((prev) => {
            return prev.map((item) => {
              return item.memberId !== rowData.usrUid
                ? item
                : {
                    ...item,
                    projectManagerYn: event.target.checked ? 'Y' : 'N',
                    memberProcess: event.target.checked
                      ? [{ processRoleCode: 'MGMT', processCodes: projectProcessList.map((item) => item['value']) }]
                      : [{ processRoleCode: '', processCodes: [] }],
                  }
            })
          })
        : setOperationMemberList((prev) =>
            prev.concat([
              {
                memberId: rowData.usrUid,
                memberProcess: event.target.checked
                  ? [{ processRoleCode: 'MGMT', processCodes: projectProcessList.map((item) => item['value']) }]
                  : [{ processRoleCode: '', processCodes: [] }],
                projectManagerYn: event.target.checked ? 'Y' : 'N',
                projectMemberOperation: 'UPDATE',
              },
            ])
          )
      setMemberList((prev) => {
        return prev.map((item) => {
          return item.usrUid === rowData.usrUid
            ? {
                ...item,
                projectManagerYn: event.target.checked ? 'Y' : 'N',
                prcsRolCd: event.target.checked
                  ? [{ processRoleCode: 'MGMT', processCodes: projectProcessList.map((item) => item['value']) }]
                  : [{ processRoleCode: '', processCodes: [] }],
              }
            : item
        })
      })
    },
    [memberList, operationMemberList, projectProcessList, toastOpen]
  )

  const handleProcessTabChange = useCallback(({ oldIndex, newIndex }) => {
    setProcessTab(newIndex)
    setMemberPagenationInfo((prev) => {
      return { ...prev, currentPage: 0 }
    })
  }, [])

  const getMemberFilterList = useMemo(() => {
    return memberList.filter(
      (row) =>
        processTab === 0 ||
        row.projectManagerYn === 'Y' ||
        row.prcsRolCd.find((item) => item.processCodes.find((pro) => pro === projectProcessList[processTab - 1]['prcsCd']))
    )
  }, [memberList, processTab, projectProcessList])

  return (
    <>
      <div className="sticky_wrap">
        {/* 페이지 상단 박스 케이스 */}
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{projectInfo.prjNm}</h1>
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
              <th>Project ID</th>
              <td>
                <BaseInput value={`${projectInfo.id}`} disabled size="lg" />
              </td>
              <th>Purpose</th>
              <td>
                <SelectMui options={cCode['purpose']} size="large" value={projectInfo.purposeCd} disabled />
              </td>
            </tr>
            <tr>
              <th>Product category</th>
              <td>
                <SelectMui options={cCode['diseaseCategory']} size="large" value={projectInfo.dissCatCd} disabled />
              </td>
              <th>Due date</th>
              <td>
                <div className="max_w368">
                  <DateRangePicker
                    onChangePickerDate={() => {}}
                    disabled
                    defaultDate={{ startDate: projectInfo.startDat, endDate: projectInfo.endDat }}
                    width="large"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>Project name</th>
              <td colSpan={3}>
                <BaseInput value={projectInfo.prjNm} disabled />
              </td>
            </tr>
            <tr>
              <th className="va_top pt_18">Description</th>
              <td colSpan={3}>
                <TextArea value={projectInfo.prjDscrp} disabled placeholder=" " />
              </td>
            </tr>
            <tr>
              <th>Corporate</th>
              <td>
                <SelectMui options={corporateListData} size="large" value={`${projectInfo.corporateCd}`} disabled />
              </td>
            </tr>
          </DetailTable>
        </article>
        <article>
          <div className="cont_title_box">
            <p className="title1 align start">
              <span className="mr_10">Member Settings </span>
              <Badge uiType="solid" color="blue" style="count" size="sm">
                {memberList.length}
              </Badge>
            </p>
          </div>
          <div className="align top">
            <div className="lft" style={{ width: 'calc(100% - 125px)' }}>
              <RoundTab
                tabData={!!projectProcessList ? [{ name: 'All', value: 'all' }].concat(projectProcessList as { name: string; value: string }[]) : []}
                nameKey="name"
                value={processTab}
                onChange={handleProcessTabChange}
              />
            </div>
            <div className="rgt">
              <ButtonMui color="black" uiType="etc" onClick={handleAddMember} size="medium" type="contained">
                Add Member
              </ButtonMui>
            </div>
          </div>
          <BoardTable>
            <colgroup>
              <col width="17%" />
              <col width="13%" />
              <col width="10%" />
              <col width="10%" />
              <col width="auto" />
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
                .slice(memberPagenationInfo.currentPage * memberPagenationInfo.pageSize, (memberPagenationInfo.currentPage + 1) * memberPagenationInfo.pageSize)
                .map((row, index) => (
                  <tr key={row.prjMbrNum}>
                    <td>
                      <UserInnerTd name={row.usrNm} src={row.fileInfoResponse?.preSignedUrl ?? null} guest={row.guestYn === 'Y'} />
                    </td>
                    <td>{row.orgnNm || '-'}</td>
                    <td>{row.jobTitle || '-'}</td>
                    <td>
                      <SwitchToggle
                        id={`switch-${index}`}
                        color="primary"
                        value={row.projectManagerYn === 'Y'}
                        disabled={row.guestYn === 'Y'}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          handleManagementChange(event, row)
                        }}
                      />
                    </td>
                    <td className="pr_30">
                      <div>
                        {row.prcsRolCd.map((auth, authIndex) => (
                          <div key={authIndex}>
                            <div className="align start gap_12">
                              <div className="grid2_4">
                                <SelectMui
                                  disabled={row.projectManagerYn === 'Y'}
                                  size="full"
                                  options={getAuthorityList(row, authIndex)}
                                  placeholder="Select Authority."
                                  value={auth.processRoleCode}
                                  onChange={(event: SelectChangeEvent) => {
                                    handleAuthorityChange(event, row, authIndex)
                                  }}
                                />
                              </div>
                              <div className="w30 flex1">
                                <MultiSelectMui
                                  disabled={row.projectManagerYn === 'Y'}
                                  placeholder="Select process."
                                  size="full"
                                  options={getProcessList(row, authIndex)}
                                  value={auth.processCodes}
                                  onChange={(event: SelectChangeEvent<string[]>) => {
                                    handleProcessChange(event, row, authIndex)
                                  }}
                                />
                              </div>
                              <div className="item">
                                <ButtonMui
                                  disabled={row.projectManagerYn === 'Y' || row.prcsRolCd.length <= 1}
                                  color="black"
                                  iconStyle={{ fill: '#354165' }}
                                  icon="DeleteIcon"
                                  onClick={() => {
                                    handleDeleteAuth(row, authIndex)
                                  }}
                                  size="medium"
                                  type="outlined"
                                >
                                  Delete Authority
                                </ButtonMui>
                              </div>
                              {authIndex === 0 && (
                                <ButtonMui
                                  disabled={row.projectManagerYn === 'Y'}
                                  color="black"
                                  icon="DeleteIcon"
                                  onClick={() => {
                                    handleDeleteMember(row)
                                  }}
                                  size="medium"
                                  type="contained"
                                >
                                  Delete Member
                                </ButtonMui>
                              )}
                            </div>
                            <hr className="mt_10 mb_10" />
                          </div>
                        ))}
                        <div>
                          <ButtonMui
                            disabled={row.projectManagerYn === 'Y' || row.prcsRolCd.length >= 3 || (row.guestYn === 'Y' && row.prcsRolCd.length >= 2)}
                            color="black"
                            iconStyle={{ fill: '#354165' }}
                            icon="PlusIcon"
                            onClick={() => {
                              handleAddAuthority(row)
                            }}
                            size="medium"
                            type="outlined"
                          >
                            Add Authority
                          </ButtonMui>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </BoardTable>
          <Pagenation
            currentPage={memberPagenationInfo.currentPage}
            pageSize={memberPagenationInfo.pageSize}
            totalCount={getMemberFilterList.length}
            onPageChange={handleMemberPagenationChagne}
          />
        </article>
        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui type="outlined" size="xlarge" onClick={handleCancel}>
              Cancel
            </ButtonMui>
            <ButtonMui
              type="contained"
              size="xlarge"
              onClick={handleSave}
              disabled={operationMemberList.length === 0 || getPathInfo(pathname).uptYn !== 'Y'}
              iconStyle={{ fill: '#fff' }}
              isLoading={projectEditMutation.isLoading}
            >
              Save
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}
