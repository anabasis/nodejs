'use client'

import { RoundTab, BoardTable } from 'ui/components'
import { useCallback, useState } from 'react'
import UserInnerTd from 'ui/molecules/UserInnerTd'
import { useProjectMemberData, useProjectProcessData } from '@store/server/useProjectQuery'
import { ProjectBasicInfoType } from '@type/project/projectType'
import { getCdnFileUrl } from 'library/util'

export default function ProjectMemger({ projectInfo }: { projectInfo: ProjectBasicInfoType }) {
  const [selectedProcess, setSelectedProcess] = useState(0)

  const { data: processList } = useProjectProcessData(projectInfo.id, false)
  const { data: memberList } = useProjectMemberData(projectInfo)

  const handleTabChange = useCallback(({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setSelectedProcess(newIndex)
  }, [])

  return (
    <>
      <RoundTab tabData={processList} nameKey="name" value={selectedProcess} onChange={handleTabChange} />
      <div className="mt_20">
        <BoardTable className="max_h400 min_h400 bb">
          <colgroup>
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead className="sticky">
            <tr>
              <th>Name</th>
              <th>Organization</th>
              <th>Authority</th>
            </tr>
          </thead>
          <tbody>
            {memberList
              .filter(
                (item) =>
                  item.projectManagerYn === 'Y' ||
                  item.memberProcess.find((item) => item.processCodes.find((pro) => !!processList && pro === processList[selectedProcess]['value']))
              )
              .map((row) => (
                <tr key={row.memberId}>
                  <td>
                    <UserInnerTd name={row.usrNm} src={row.fileInfoResponse?.preSignedUrl ?? null} />
                  </td>
                  <td>{row.orgnNm || '-'}</td>
                  <td>
                    {row.projectManagerYn === 'Y'
                      ? 'Management'
                      : row.memberProcess.find((item) => item.processCodes.find((pro) => !!processList && pro === processList[selectedProcess]['value']))[
                          'processRoleCodeName'
                        ]}
                  </td>
                </tr>
              ))}
          </tbody>
        </BoardTable>
      </div>
    </>
  )
}
