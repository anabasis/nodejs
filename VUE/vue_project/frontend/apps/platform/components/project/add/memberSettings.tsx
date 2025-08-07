'use client'

import { Badge, RoundTab, BoardTable, SwitchToggle } from 'ui/components'
import UserInnerTd from 'ui/molecules/UserInnerTd'
import { ButtonMui, SelectMui, MultiSelectMui, SelectChangeEvent } from 'ui/mui'
import { ChangeEvent, Dispatch, ForwardedRef, Ref, SetStateAction, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react'
import AddProjectMember from './addProjectMember'
import Pagenation from 'ui/components/common/Pagenation'
import { useModal } from 'library/hook/useModal'
import { MemberType, MyCorporateMemberType, OtherCorporateMemberType, ProcessItemType } from '@type/project/projectType'
import { useAlert } from 'library/hook/useAlert'
import { useToastPopup } from 'library/hook/useToastPopup'
import { getCdnFileUrl, getCode } from 'library/util'
import { useQueries } from '@tanstack/react-query'
import { useUser } from 'library/hook'

interface MemberSettingListProps {
  memberList: MemberType[]
  processList: {
    value: string
    name: string
    sortNum?: number
  }[]
  setMemberList: Dispatch<SetStateAction<MemberType[]>>
  operationMemberList?: MemberType[]
  setOperationMemberList?: Dispatch<SetStateAction<MemberType[]>>
  projectName: string
  type: string
  projectRoleCode?: string
  projectProcessRole?: { processRoleCode: string; processCodes: string[] }[]
}

export interface MemberSettingHandleType {
  handleChangeProcess: (processCode: string, isChecked: boolean | undefined, selectedProcessList: ProcessItemType[]) => void
}

const MemberSettingList = forwardRef(
  (
    {
      memberList,
      processList,
      setMemberList,
      operationMemberList,
      setOperationMemberList,
      projectName,
      type,
      projectRoleCode,
      projectProcessRole,
    }: MemberSettingListProps,
    ref: Ref<MemberSettingHandleType>
  ) => {
    useImperativeHandle(
      ref,
      () => {
        return {
          handleChangeProcess: (processCode: string, isChecked: boolean, selectedProcessList: ProcessItemType[]) => {
            let tmepOperation = JSON.parse(JSON.stringify(operationMemberList || []))
            let tempMemper = JSON.parse(JSON.stringify(memberList))
            if (isChecked !== undefined) {
              setMemberList(
                tempMemper
                  .filter((member) => {
                    if (!isChecked && type === 'edit') {
                      const tempAuth = member.memberProcess.find((auth) => auth.processCodes.includes(processCode))
                      if (!!tempAuth) {
                        if (member.memberProcess.length === 1 && tempAuth.processCodes.length === 1) {
                          const operMember = tmepOperation.find((oper) => oper.memberId === member.memberId)
                          if (!!operMember) {
                            if (operMember.projectMemberOperation === 'ADD') {
                              tmepOperation = tmepOperation.filter((oper) => !(oper.memberId === member.memberId))
                            } else if (operMember.projectMemberOperation === 'UPDATE') {
                              tmepOperation = tmepOperation.map((oper) =>
                                oper.memberId === member.memberId ? { ...oper, projectMemberOperation: 'DELETE', memberProcess: [] } : oper
                              )
                            }
                          } else {
                            tmepOperation = tmepOperation.concat([{ ...member, projectMemberOperation: 'DELETE', memberProcess: [] }])
                          }
                          return false
                        }
                      }
                    }
                    return true
                  })
                  .map((member) => {
                    if (member.projectManagerYn === 'Y') {
                      return { ...member, memberProcess: [{ processRoleCode: 'MGMT', processCodes: selectedProcessList.map((process) => process.value) }] }
                    }
                    if (!isChecked) {
                      const tempAuth = member.memberProcess.find((auth) => auth.processCodes.includes(processCode))
                      if (!!tempAuth) {
                        let tempProcess = []
                        if (tempAuth.processCodes.length === 1 && type === 'edit') {
                          tempProcess = member.memberProcess.filter((auth) => !auth.processCodes.includes(processCode))
                        } else {
                          tempProcess = member.memberProcess.map((auth) => ({
                            ...auth,
                            processCodes: auth.processCodes.filter((pro) => pro !== processCode),
                          }))
                        }
                        if (type === 'edit') {
                          if (!!tmepOperation.find((oper) => oper.memberId === member.memberId)) {
                            tmepOperation = tmepOperation.map((operMember) =>
                              operMember.memberId === member.memberId ? { ...operMember, memberProcess: tempProcess } : operMember
                            )
                          } else {
                            tmepOperation = tmepOperation.concat([{ ...member, projectMemberOperation: 'UPDATE', memberProcess: tempProcess }])
                          }
                        }
                        return { ...member, memberProcess: tempProcess }
                      }
                    }
                    return member
                  })
              )
              if (type === 'edit') {
                setOperationMemberList(tmepOperation)
              }
            } else {
              setMemberList(
                tempMemper
                  .map((mem) => {
                    if (mem.projectManagerYn === 'Y') {
                      return { ...mem, memberProcess: [{ processRoleCode: 'MGMT', processCodes: selectedProcessList.map((process) => process.value) }] }
                    }
                    let isEdit = false
                    const tempMem = {
                      ...mem,
                      memberProcess: mem.memberProcess
                        .map((auth) => ({
                          ...auth,
                          processCodes: auth.processCodes.filter((code) => {
                            if (selectedProcessList.find((item) => item.value === code) !== undefined) {
                              return true
                            } else {
                              isEdit = true
                              return false
                            }
                          }),
                        }))
                        .filter((auth) => type === 'add' || auth.processCodes.length !== 0),
                    }

                    if (type === 'edit' && isEdit) {
                      if (!!tmepOperation.find((oper) => oper.memberId === tempMem.memberId)) {
                        tmepOperation = tmepOperation.map((operMember) =>
                          operMember.memberId === tempMem.memberId ? { ...operMember, memberProcess: tempMem.memberProcess } : operMember
                        )
                      } else {
                        tmepOperation = tmepOperation.concat([{ ...tempMem, projectMemberOperation: 'UPDATE' }])
                      }
                    }

                    return tempMem
                  })
                  .filter((mem) => {
                    if (type === 'add' || mem.memberProcess.length !== 0) {
                      return true
                    } else {
                      if (type === 'edit') {
                        if (!!tmepOperation.find((oper) => oper.memberId === mem.memberId)) {
                          tmepOperation = tmepOperation.map((operMember) =>
                            operMember.memberId === mem.memberId ? { ...operMember, projectMemberOperation: 'DELETE', memberProcess: [] } : operMember
                          )
                        } else {
                          tmepOperation = tmepOperation.concat([{ ...mem, projectMemberOperation: 'DELETE', memberProcess: [] }])
                        }
                      }
                      return false
                    }
                  })
              )
              if (type === 'edit') {
                setOperationMemberList(tmepOperation)
              }
            }
          },
        }
      },
      [memberList, operationMemberList, setMemberList, setOperationMemberList, type]
    )

    const commonCodes = { processRole: 'PFM018' }
    const codes = useQueries({
      queries: Object.values(commonCodes).map((v) => {
        return { queryKey: ['code', v], queryFn: () => getCode(v), staleTime: Infinity }
      }),
    })
    let cCode = {}
    Object.keys(commonCodes).forEach((v, i) => {
      cCode[v] = codes[i].data
    })
    const { userInfo } = useUser()
    const { modalOpen, modalClose } = useModal()
    const { alertOpen, alertClose } = useAlert()
    const { toastOpen } = useToastPopup()
    const [memberPagination, setMemberPagination] = useState({ currentPage: 0, pageSize: 5 })
    const [processTab, setProcessTab] = useState<number>(0)

    const handleProcessTabChange = useCallback(({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      setMemberPagination((prev) => {
        return { ...prev, currentPage: 0 }
      })
      setProcessTab(newIndex)
    }, [])

    const handleMemberPageChange = useCallback((page: number) => {
      setMemberPagination((prev) => {
        return { ...prev, currentPage: page }
      })
    }, [])

    const deleteMember = useCallback(
      (row: MemberType) => {
        alertClose()
        const member = memberList.filter((item) => item.memberId !== row.memberId)
        setMemberPagination((prev) => {
          return {
            ...prev,
            totalCount: member.length,
            currentPage: prev.currentPage > Math.ceil(member.length / prev.pageSize) ? Math.ceil(member.length / prev.pageSize) : prev.currentPage,
          }
        })
        setMemberList(member)
        if (type === 'edit') {
          let tempMember = operationMemberList.find((item) => item.memberId === row.memberId)
          if (tempMember === undefined) {
            setOperationMemberList((prev) => prev.concat([{ ...row, projectMemberOperation: 'DELETE', memberProcess: [] }]))
          } else if (tempMember.projectMemberOperation === 'ADD') {
            setOperationMemberList((prev) => prev.filter((item) => !(item.memberId === tempMember.memberId && item.projectMemberOperation === 'ADD')))
          } else if (tempMember.projectMemberOperation === 'UPDATE') {
            setOperationMemberList((prev) =>
              prev.map((item) => (item.memberId === tempMember.memberId ? { ...item, projectMemberOperation: 'DELETE', memberProcess: [] } : item))
            )
          }
          toastOpen({ content: 'Successfully deleted.', icon: 'success' })
        }
      },
      [alertClose, memberList, operationMemberList, setMemberList, setOperationMemberList, toastOpen, type]
    )

    const handleDeleteMember = useCallback(
      (row) => {
        if (type === 'edit') {
          alertOpen({
            maxWidth: 's',
            title: 'Are you sure to delete?',
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
                    deleteMember(row)
                  }}
                >
                  Delete
                </ButtonMui>
              </div>
            ),
            textTitle: `If you click the delete button, it cannot be recovered.`,
            icon: 'info',
          })
        } else {
          deleteMember(row)
        }
      },
      [alertClose, alertOpen, deleteMember, type]
    )

    const handleAddMemberClose = useCallback(
      (selectedList: MyCorporateMemberType[], otherList: OtherCorporateMemberType[]) => {
        modalClose()
        setMemberList(
          memberList
            .concat(
              selectedList.map((item) => {
                return { ...item, memberId: item.usrUid, memberProcess: [{ processRoleCode: '', processCodes: [] }], projectManagerYn: 'N', guestYn: 'N' }
              })
            )
            .concat(
              otherList.map((item) => {
                return { ...item, memberId: item.usrUid, memberProcess: [{ processRoleCode: '', processCodes: [] }], projectManagerYn: 'N', guestYn: 'Y' }
              })
            )
        )
        if (type === 'edit') {
          setOperationMemberList((prev) =>
            prev
              .concat(
                selectedList.map((item) => {
                  return {
                    ...item,
                    memberId: item.usrUid,
                    memberProcess: [{ processRoleCode: '', processCodes: [] }],
                    projectManagerYn: 'N',
                    projectMemberOperation: 'ADD',
                    guestYn: 'N',
                  }
                })
              )
              .concat(
                otherList.map((item) => {
                  return {
                    ...item,
                    projectMemberOperation: 'ADD',
                    memberId: item.usrUid,
                    memberProcess: [{ processRoleCode: '', processCodes: [] }],
                    projectManagerYn: 'N',
                    guestYn: 'Y',
                  }
                })
              )
          )
        }
      },
      [memberList, modalClose, setMemberList, setOperationMemberList, type]
    )

    const handleAddMemnber = useCallback(() => {
      modalOpen({
        title: 'Add project member',
        textTitle: `Please select and add people to the project ${projectName}.`,
        maxWidth: 'l',
        content: <AddProjectMember onClose={handleAddMemberClose} memberList={memberList} />,
      })
    }, [handleAddMemberClose, memberList, modalOpen, projectName])

    const handleAddAuthority = useCallback(
      (rowData: MemberType) => {
        if (type === 'edit') {
          let tempMember = operationMemberList.find((item) => item.memberId === rowData.memberId)
          if (tempMember === undefined) {
            setOperationMemberList((prev) =>
              prev.concat([
                { ...rowData, projectMemberOperation: 'UPDATE', memberProcess: rowData.memberProcess?.concat({ processRoleCode: '', processCodes: [] }) },
              ])
            )
          } else {
            setOperationMemberList((prev) =>
              prev.map((item) =>
                item.memberId === tempMember.memberId
                  ? { ...tempMember, memberProcess: rowData.memberProcess?.concat({ processRoleCode: '', processCodes: [] }) }
                  : item
              )
            )
          }
        }
        setMemberList((prev) =>
          prev.map((item) =>
            item.memberId === rowData.memberId ? { ...item, memberProcess: item.memberProcess?.concat({ processRoleCode: '', processCodes: [] }) } : item
          )
        )
      },
      [operationMemberList, setMemberList, setOperationMemberList, type]
    )

    const handleDeleteAuth = useCallback(
      (rowData: MemberType, authIndex) => {
        if (type === 'edit') {
          let tempMember = operationMemberList.find((item) => item.memberId === rowData.memberId)
          if (tempMember === undefined) {
            setOperationMemberList((prev) =>
              prev.concat([
                { ...rowData, projectMemberOperation: 'UPDATE', memberProcess: rowData.memberProcess?.filter((item, index) => index !== authIndex) },
              ])
            )
          } else {
            setOperationMemberList((prev) =>
              prev.map((item) =>
                item.memberId === tempMember.memberId
                  ? { ...tempMember, memberProcess: tempMember.memberProcess?.filter((item, index) => index !== authIndex) }
                  : item
              )
            )
          }
        }
        setMemberList((prev) => {
          return prev.map((item) => {
            return item.memberId === rowData.memberId ? { ...item, memberProcess: item.memberProcess?.filter((item, index) => index !== authIndex) } : item
          })
        })
      },
      [operationMemberList, setMemberList, setOperationMemberList, type]
    )

    const handleAuthorityChange = useCallback(
      (e: SelectChangeEvent, rowData: MemberType, authIndex: number) => {
        if (type === 'edit') {
          let tempMember = operationMemberList.find((item) => item.memberId === rowData.memberId)
          if (tempMember === undefined) {
            setOperationMemberList((prev) =>
              prev.concat([
                {
                  ...rowData,
                  projectMemberOperation: 'UPDATE',
                  memberProcess: rowData.memberProcess.map((authData, index) => {
                    return index === authIndex ? { ...authData, processRoleCode: e.target.value } : authData
                  }),
                },
              ])
            )
          } else {
            setOperationMemberList((prev) =>
              prev.map((item) =>
                item.memberId === tempMember.memberId
                  ? {
                      ...tempMember,
                      memberProcess: tempMember.memberProcess.map((authData, index) => {
                        return index === authIndex ? { ...authData, processRoleCode: e.target.value } : authData
                      }),
                    }
                  : item
              )
            )
          }
        }
        setMemberList((prev) => {
          return prev.map((item) => {
            return item.memberId === rowData.memberId
              ? {
                  ...item,
                  memberProcess: item.memberProcess.map((authData, index) => {
                    return index === authIndex ? { ...authData, processRoleCode: e.target.value } : authData
                  }),
                }
              : item
          })
        })
      },
      [operationMemberList, setMemberList, setOperationMemberList, type]
    )

    const changeProcess = useCallback(
      (processCodes: string[], rowData: MemberType, authIndex: number, isPopup?: boolean) => {
        if (type === 'edit') {
          if (!!isPopup) {
            alertClose()
          }
          let tempMember = operationMemberList.find((item) => item.memberId === rowData.memberId)
          if (tempMember === undefined) {
            setOperationMemberList((prev) =>
              prev.concat([
                {
                  ...rowData,
                  projectMemberOperation: 'UPDATE',
                  memberProcess: rowData.memberProcess.map((authData, index) => {
                    return index === authIndex ? { ...authData, processCodes: processCodes } : authData
                  }),
                },
              ])
            )
          } else {
            setOperationMemberList((prev) =>
              prev.map((item) =>
                item.memberId === tempMember.memberId
                  ? {
                      ...tempMember,
                      memberProcess: tempMember.memberProcess.map((authData, index) => {
                        return index === authIndex ? { ...authData, processCodes: processCodes } : authData
                      }),
                    }
                  : item
              )
            )
          }
          if (!!isPopup) {
            toastOpen({ content: 'Successfully disabled.', icon: 'success' })
          }
        }
        setMemberList((prev) => {
          return prev.map((item) => {
            return item.memberId === rowData.memberId
              ? {
                  ...item,
                  memberProcess: item.memberProcess.map((authData, index) => {
                    return index === authIndex ? { ...authData, processCodes: processCodes } : authData
                  }),
                }
              : item
          })
        })
      },
      [alertClose, operationMemberList, setMemberList, setOperationMemberList, toastOpen, type]
    )

    const handleProcessChange = useCallback(
      (e: SelectChangeEvent<string[]>, rowData: MemberType, authIndex: number) => {
        const processCodes = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value
        if (type === 'edit') {
          if (rowData.memberProcess[authIndex].processCodes.length > processCodes.length) {
            const process = rowData.memberProcess[authIndex].processCodes.find((code) => !processCodes.includes(code))
            alertOpen({
              maxWidth: 's',
              title: 'Disable process authority',
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
                      changeProcess(processCodes, rowData, authIndex, true)
                    }}
                  >
                    Disable
                  </ButtonMui>
                </div>
              ),
              textTitle: `Do you want to remove ${processList.find((item) => item.value === process)?.name || ''} process authority?`,
              icon: 'info',
            })
          } else {
            changeProcess(processCodes, rowData, authIndex)
          }
        } else {
          changeProcess(processCodes, rowData, authIndex)
        }
      },
      [type, alertOpen, processList, alertClose, changeProcess]
    )

    const handleManagementChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>, rowData) => {
        if (event.target.checked && memberList.filter((item) => item.projectManagerYn === 'Y').length >= 2) {
          toastOpen({ content: 'Management authority can be granted only to 2 people.', icon: 'warning' })
          return
        }
        if (type === 'edit') {
          let tempMember = operationMemberList.find((item) => item.memberId === rowData.memberId)
          if (tempMember === undefined) {
            setOperationMemberList((prev) =>
              prev.concat([
                {
                  ...rowData,
                  projectMemberOperation: 'UPDATE',
                  projectManagerYn: event.target.checked ? 'Y' : 'N',
                  memberProcess: event.target.checked
                    ? [{ processRoleCode: 'MGMT', processCodes: processList.map((item) => item.value) }]
                    : [{ processRoleCode: '', processCodes: [] }],
                },
              ])
            )
          } else {
            setOperationMemberList((prev) =>
              prev.map((item) =>
                item.memberId === tempMember.memberId
                  ? {
                      ...tempMember,
                      projectManagerYn: event.target.checked ? 'Y' : 'N',
                      memberProcess: event.target.checked
                        ? [{ processRoleCode: 'MGMT', processCodes: processList.map((item) => item.value) }]
                        : [{ processRoleCode: '', processCodes: [] }],
                    }
                  : item
              )
            )
          }
        }
        setMemberList((prev) => {
          return prev.map((item) => {
            return item.memberId === rowData.memberId
              ? {
                  ...item,
                  projectManagerYn: event.target.checked ? 'Y' : 'N',
                  memberProcess: event.target.checked
                    ? [{ processRoleCode: 'MGMT', processCodes: processList.map((item) => item.value) }]
                    : [{ processRoleCode: '', processCodes: [] }],
                }
              : item
          })
        })
      },
      [memberList, operationMemberList, processList, setMemberList, setOperationMemberList, toastOpen, type]
    )

    const getAuthorityList = (rowData: MemberType, index: number) =>
      cCode['processRole']?.filter(
        (item) =>
          !(rowData.guestYn === 'Y' && item.value === 'MGMT') &&
          rowData.memberProcess?.find((authItem, authIndex) => index !== authIndex && authItem.processRoleCode === item.value) === undefined
      )

    const getProcessList = (rowData: MemberType, index: number) =>
      projectRoleCode === 'PJB'
        ? processList
            ?.filter(
              (item) => rowData.memberProcess?.find((authItem, authIndex) => index !== authIndex && authItem.processCodes.includes(item.value)) === undefined
            )
            .map((item) => {
              const roleMGMT = projectProcessRole.find((role) => role.processRoleCode === 'MGMT') // managerment 권한이 있는 process 만 수정 가능함
              const rowMGMT = rowData.memberProcess?.find((role) => role.processRoleCode === 'MGMT')

              if (roleMGMT.processCodes.find((process) => process === item.value) !== undefined) {
                if (rowMGMT === undefined) {
                  return { ...item, disabled: false }
                }
                if (!!rowMGMT && rowMGMT.processCodes.find((process) => process === item.value) === undefined) {
                  return { ...item, disabled: false }
                }
                const operMember = operationMemberList.find((oper: MemberType) => oper.memberId === rowData.memberId)
                if (!!rowMGMT && rowMGMT.processCodes.find((process) => process === item.value) !== undefined && !!operMember) {
                  if (operMember.projectMemberOperation === 'ADD' || operMember.projectMemberOperation === 'UPDATE') {
                    return { ...item, disabled: false }
                  }
                }
              }
              return { ...item, disabled: true }
            })
        : processList?.filter(
            (item) => rowData.memberProcess?.find((authItem, authIndex) => index !== authIndex && authItem.processCodes.includes(item.value)) === undefined
          )

    const isDeleteMember = (rowData: MemberType) => {
      if (projectRoleCode === 'PJB') {
        if (operationMemberList.find((item) => item.memberId === rowData.memberId && item.projectMemberOperation === 'ADD') !== undefined) {
          return false
        }
        const roleMGMT = projectProcessRole.find((role) => role.processRoleCode === 'MGMT')

        const memberMGMT = rowData.memberProcess.find((role) => role.processRoleCode === 'MGMT')
        const memberEDIT = rowData.memberProcess.find((role) => role.processRoleCode === 'EDIT')
        const includesEDIT = memberEDIT?.processCodes.find((item) => !roleMGMT.processCodes.includes(item)) === undefined
        const memberVIEW = rowData.memberProcess.find((role) => role.processRoleCode === 'VIEW')
        const includesVIEW = memberVIEW?.processCodes.find((item) => !roleMGMT.processCodes.includes(item)) === undefined

        return !(includesEDIT && includesVIEW && !memberMGMT)
      }
      return false
    }

    const isDeleteAuth = (rowData: MemberType, index: number) => {
      if (rowData.memberProcess.length === 1) {
        return true
      }
      if (projectRoleCode === 'PJB') {
        const roleMGMT = projectProcessRole.find((role) => role.processRoleCode === 'MGMT')

        return !(
          (rowData.memberProcess[index].processRoleCode !== 'MGMT' &&
            rowData.memberProcess[index].processCodes.find((item) => !roleMGMT.processCodes.includes(item)) === undefined) ||
          (rowData.memberProcess[index].processRoleCode === 'MGMT' && rowData.memberProcess[index].processCodes.length === 0)
        )
      }
      return false
    }

    const getMemberFilterList = useMemo(() => {
      return memberList.filter(
        (row) =>
          processTab === 0 ||
          row.projectManagerYn === 'Y' ||
          row.memberProcess.find((item) => item.processCodes.find((pro) => pro === processList[processTab - 1].value))
      )
    }, [memberList, processList, processTab])

    return (
      <article>
        <div className="cont_title_box">
          <div className="align start">
            <p className="title1 mr_10">Member Setting</p>
            <Badge uiType="solid" color="blue" style="count" size="sm">
              {memberList.length}
            </Badge>
          </div>
        </div>
        <div className="align top">
          <div className="lft" style={{ width: 'calc(100% - 125px)' }}>
            <RoundTab tabData={[{ name: 'All', value: '000' }].concat(processList)} nameKey="name" value={processTab} onChange={handleProcessTabChange} />
          </div>
          <div className="rgt">
            <ButtonMui color="black" uiType="etc" onClick={handleAddMemnber} size="medium" type="contained">
              Add Member
            </ButtonMui>
          </div>
        </div>
        <BoardTable className="min_h380">
          <colgroup>
            <col width="15%" />
            <col width="10%" />
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
              .slice(memberPagination.currentPage * memberPagination.pageSize, (memberPagination.currentPage + 1) * memberPagination.pageSize)
              .map((row, index) => (
                <tr key={row.memberId}>
                  <td className="va_top pt_16">
                    <UserInnerTd name={row.usrNm} src={row.fileInfoResponse?.preSignedUrl ?? null} guest={row.guestYn === 'Y'} />
                  </td>
                  <td className="va_top pt_20">{row.orgnNm || '-'}</td>
                  <td className="va_top pt_20">{row.jobTitle || '-'}</td>
                  <td className="va_top pt_17 tc">
                    <SwitchToggle
                      id={`switch-${index}`}
                      color="primary"
                      disabled={row.guestYn === 'Y' || projectRoleCode === 'PJB' || (type === 'add' && row.memberId === userInfo?.usrUid)}
                      value={row.projectManagerYn === 'Y'}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        handleManagementChange(event, row)
                      }}
                    />
                  </td>
                  <td>
                    {row.memberProcess?.map((auth, authIndex) => (
                      <div key={authIndex}>
                        <div className="align start gap_12">
                          <div className="grid2_9">
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
                              placeholder={processList.length === 0 ? '-' : 'Select process.'}
                              size="full"
                              noItem="No item to choose."
                              options={getProcessList(row, authIndex)}
                              value={auth.processCodes}
                              onChange={(event: SelectChangeEvent<string[]>) => {
                                handleProcessChange(event, row, authIndex)
                              }}
                            />
                          </div>
                          <div className="item pr_30 grid5">
                            <ButtonMui
                              disabled={row.projectManagerYn === 'Y' || row.memberProcess.length <= 1 || isDeleteAuth(row, authIndex)}
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
                            {authIndex === 0 && (
                              <ButtonMui
                                disabled={row.projectManagerYn === 'Y' || isDeleteMember(row)}
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
                        </div>
                        <hr className="mt_10 mb_10" />
                      </div>
                    ))}
                    <div>
                      <ButtonMui
                        disabled={row.projectManagerYn === 'Y' || row.memberProcess?.length >= 3 || (row.guestYn === 'Y' && row.memberProcess?.length >= 2)}
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
                  </td>
                </tr>
              ))}
          </tbody>
        </BoardTable>
        <Pagenation
          currentPage={memberPagination.currentPage}
          pageSize={memberPagination.pageSize}
          totalCount={getMemberFilterList.length}
          onPageChange={handleMemberPageChange}
        />
      </article>
    )
  }
)

MemberSettingList.displayName = 'MemberSettingList'

export default MemberSettingList
