'use client'

import { DetailTable, InputLabel, BaseInput, TextArea } from 'ui/components'
import DateRangePicker from 'ui/datepicker/DateRangePicker'
import { SelectChangeEvent, SelectMui } from 'ui/mui'
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react'
import { ProjectInfoAddType } from '@type/project/projectType'
import { getCode } from 'library/util'
import { useQueries } from '@tanstack/react-query'

export default function BasicInformation({
  projectInfo,
  setProjectInfo,
}: {
  projectInfo: ProjectInfoAddType
  setProjectInfo: Dispatch<SetStateAction<ProjectInfoAddType>>
}) {
  const commonCodes = { diseaseCategory: 'PFM020', purpose: 'PFM015' }
  const codes = useQueries({
    queries: Object.values(commonCodes).map((v) => {
      return { queryKey: ['code', v], queryFn: () => getCode(v), staleTime: Infinity }
    }),
  })
  let cCode = {}
  Object.keys(commonCodes).forEach((v, i) => {
    cCode[v] = codes[i].data
  })

  const handleDiseaseCategoryCodeChange = useCallback(
    (event: SelectChangeEvent) => {
      setProjectInfo((prev) => {
        return { ...prev, dissCatCd: event.target.value }
      })
    },
    [setProjectInfo]
  )

  const handleDueDateChange = useCallback(
    ({ startDate, endDate }: { startDate: string; endDate: string }) => {
      setProjectInfo((prev) => {
        return { ...prev, startDat: startDate, endDat: endDate }
      })
    },
    [setProjectInfo]
  )

  const handlePurposeCodeChange = useCallback(
    (event: SelectChangeEvent) => {
      setProjectInfo((prev) => {
        return { ...prev, devPupsCd: event.target.value }
      })
    },
    [setProjectInfo]
  )

  const handleProjectNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setProjectInfo((prev) => {
        return { ...prev, prjNm: event.target.value }
      })
    },
    [setProjectInfo]
  )

  const handleProjectMemoChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setProjectInfo((prev) => {
        return { ...prev, prjDscrp: event.target.value }
      })
    },
    [setProjectInfo]
  )

  return (
    <article>
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
          <th>
            <InputLabel required labelText="Product category" />
          </th>
          <td>
            <SelectMui
              size="large"
              options={cCode['diseaseCategory']}
              placeholder="Please select product category."
              value={projectInfo.dissCatCd}
              onChange={handleDiseaseCategoryCodeChange}
            />
          </td>
          <th>
            <InputLabel required labelText="Due date" />
          </th>
          <td>
            <div className="max_w368">
              <DateRangePicker isEditMode width="large" onChangePickerDate={handleDueDateChange} placeholderText="Select period" />
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <InputLabel required labelText="Purpose" />
          </th>
          <td>
            <SelectMui
              size="large"
              options={cCode['purpose']}
              placeholder="Please select purpose."
              onChange={handlePurposeCodeChange}
              value={projectInfo.devPupsCd}
            />
          </td>
          <th></th>
          <td></td>
        </tr>
        <tr>
          <th>
            <InputLabel required labelText="Project name" />
          </th>
          <td colSpan={3}>
            <BaseInput placeholder="Please enter project title." value={projectInfo.prjNm} onChange={handleProjectNameChange} maxLength={100} />
          </td>
        </tr>
        <tr>
          <th className="va_top pt_18">
            <InputLabel labelText="Description" />
          </th>
          <td colSpan={3}>
            <TextArea placeholder="Please enter project content." value={projectInfo.prjDscrp} onChange={handleProjectMemoChange} maxLength={500} />
          </td>
        </tr>
      </DetailTable>
    </article>
  )
}
