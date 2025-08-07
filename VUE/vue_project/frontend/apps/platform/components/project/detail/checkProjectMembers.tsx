'use client'

import { BoardTable, RoundTab } from 'ui/components'
import { useCallback, useEffect, useMemo, useState } from 'react'
import UserInnerTd from 'ui/molecules/UserInnerTd'
import { ProjectBasicInfoType, ProjectMemberDetailType } from '@type/project/projectType'
import { useProjectMemberDetailData, useProjectProcessData } from '@store/server/useProjectQuery'
import { changeTimeLocal, getCdnFileUrl } from 'library/util'
import { useUser } from 'library/hook'

export default function CheckProjectMembers({ projectInfo }: { projectInfo: ProjectBasicInfoType }) {
  const { userInfo } = useUser()
  const [processList, setProcessList] = useState<{ prjPrcsNumber: number; prcsName: string; prcsCode: string }[]>([])
  const [selectedProcess, setSelectedProcess] = useState(0)

  const { data: projectProcessInfo } = useProjectProcessData(projectInfo.id, true)
  const { data: memberList } = useProjectMemberDetailData(projectInfo.id)

  useEffect(() => {
    if (!!projectProcessInfo) {
      setProcessList(
        [{ prcsName: 'All', prjPrcsNumber: 0, prcsCode: 'all' }].concat(
          projectProcessInfo.map(
            (item) =>
              item as {
                prcsCode: string
                prjPrcsNumber: number
                prcsName: string
              }
          )
        )
      )
    }
  }, [projectProcessInfo])

  const handleTabChange = useCallback(({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setSelectedProcess(newIndex)
  }, [])

  const getMemberFilterList = useMemo(() => {
    return memberList?.filter(
      (row: ProjectMemberDetailType) =>
        selectedProcess === 0 ||
        row.projectManager === 'PJM' ||
        row.memberProcess.find((item) => item.processCodes.find((code) => code === processList[selectedProcess].prcsCode))
    )
  }, [memberList, processList, selectedProcess])

  return (
    <>
      <RoundTab tabData={processList} value={selectedProcess} onChange={handleTabChange} nameKey="prcsName" />
      <div className="mt_20">
        <BoardTable className="max_h400 min_h400 bb">
          <colgroup>
            <col width="auto" />
            <col width="15%" />
            <col width="30%" />
            <col width="15%" />
            <col width="20%" />
          </colgroup>
          <thead className="sticky">
            <tr>
              <th>Name</th>
              <th>Organization</th>
              <th>Process Authority</th>
              <th>Member Status</th>
              <th>Participation Period</th>
            </tr>
          </thead>
          <tbody>
            {getMemberFilterList?.map((row) => (
              <tr key={row.memberId} className={row.participation === 'Withdrawal' ? 'disabled' : ''}>
                <td className="va_top pt_22">
                  <UserInnerTd
                    name={row.usrNm}
                    disabled={row.participation === 'Withdrawal'}
                    required={row.memberId === userInfo.usrUid}
                    src={row.fileInfoResponse?.preSignedUrl ?? null}
                  />
                </td>
                <td className="va_top pt_24">{row.orgnNm || '-'}</td>
                <td className="ptb_0">
                  {row.projectManager === 'PJM' ? (
                    <div className="align start min_h66 ptb_10">
                      <div className="grid1_9">Management</div>
                      <div className="flex1 ellipsis">{projectProcessInfo?.map((item) => item.prcsName).join(', ')}</div>
                    </div>
                  ) : (
                    row.memberProcess?.map((authItem, authIndex) => (
                      <>
                        <div className="align start min_h66 ptb_10" key={`auth-${authIndex}`}>
                          <div className="grid1_9">{authItem.processRoleCodeName}</div>
                          <div className="flex1 ellipsis">{authItem.processName.join(', ')}</div>
                        </div>
                        {authIndex < row.memberProcess.length - 1 && <hr className="mtb_0 bg" />}
                      </>
                    ))
                  )}
                </td>
                <td className="va_top pt_24">{row.participation}</td>
                <td className="va_top pt_24">{`${changeTimeLocal({ time: row.startDat, type: 'yyyy-MM-dd' })}~${
                  !!row.endDat ? changeTimeLocal({ time: row.endDat, type: 'yyyy-MM-dd' }) : ''
                }`}</td>
              </tr>
            ))}
          </tbody>
        </BoardTable>
      </div>
    </>
  )
}
