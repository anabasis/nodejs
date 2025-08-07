'use client'

import { DetailTable, InputLabel, BaseInput, TextArea } from 'ui/components'
import DateRangePicker from 'ui/datepicker/DateRangePicker'
import { SelectMui } from 'ui/mui'
import { changeTimeLocal, changeTimeServer, getCode } from 'library/util'
import { useQueries } from '@tanstack/react-query'
import { ProjectBasicInfoType } from '@type/project/projectType'
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from 'react'

interface ProjectBasicInfoProp<T = unknown> {
  projectInfo: T
  setProjectInfo: Dispatch<SetStateAction<T>>
  setChange: Dispatch<SetStateAction<boolean>>
}

export default function BasicInformationEdit<T>({ projectInfo, setProjectInfo, setChange }: ProjectBasicInfoProp<T>) {
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

  const handleDueDateChange = useCallback(
    ({ startDate, endDate }: { startDate: string; endDate: string }) => {
      setChange(true)
      setProjectInfo((prev) => {
        return {
          ...prev,
          startDat: startDate,
          endDat: endDate,
        }
      })
    },
    [setChange, setProjectInfo]
  )

  const handleProjectMemoChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setChange(true)
      setProjectInfo((prev) => {
        return { ...prev, prjDscrp: event.target.value }
      })
    },
    [setChange, setProjectInfo]
  )

  const handleProjectNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setChange(true)
      setProjectInfo((prev) => {
        return { ...prev, prjNm: event.target.value }
      })
    },
    [setChange, setProjectInfo]
  )

  const handleProjectPurpose = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setChange(true)
      setProjectInfo((prev) => {
        return { ...prev, devPupsCd: event.target.value }
      })
    },
    [setChange, setProjectInfo]
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
            <InputLabel labelText="Project ID" />
          </th>
          <td>
            <BaseInput value={`${projectInfo['id']}`} disabled size="lg" />
          </td>
          <th>
            <InputLabel required labelText="Purpose" />
          </th>
          <td>
            <SelectMui
              size="large"
              options={cCode['purpose']}
              value={projectInfo['devPupsCd']}
              placeholder="Please select purpose."
              onChange={handleProjectPurpose}
              disabled={projectInfo['projectRoleCode'] === 'PJB'}
            />
          </td>
        </tr>
        <tr>
          <th>
            <InputLabel labelText="Product category" />
          </th>
          <td>
            <SelectMui size="large" disabled options={cCode['diseaseCategory']} value={projectInfo['dissCatCd']} />
          </td>
          <th>
            <InputLabel required labelText="Due date" />
          </th>
          <td className="">
            <div className="max_w368">
              <DateRangePicker
                width="large"
                onChangePickerDate={handleDueDateChange}
                placeholderText="Select period"
                disabled={projectInfo['projectRoleCode'] === 'PJB'}
                isEditMode
                defaultDate={{
                  startDate: changeTimeLocal({ time: projectInfo['startDat'], type: 'yyyy-MM-dd' }),
                  endDate: changeTimeLocal({ time: projectInfo['endDat'], type: 'yyyy-MM-dd' }),
                }}
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>
            <InputLabel required labelText="Project name" />
          </th>
          <td colSpan={3} className="">
            <BaseInput
              placeholder="Please enter project title."
              value={projectInfo['prjNm']}
              onChange={handleProjectNameChange}
              maxLength={100}
              disabled={projectInfo['projectRoleCode'] === 'PJB'}
            />
          </td>
        </tr>
        <tr>
          <th className="va_top pt_18">
            <InputLabel labelText="Description" />
          </th>
          <td colSpan={3} className="">
            <TextArea
              placeholder="Please enter project content."
              value={projectInfo['prjDscrp']}
              onChange={handleProjectMemoChange}
              maxLength={500}
              disabled={projectInfo['projectRoleCode'] === 'PJB'}
            />
          </td>
        </tr>
      </DetailTable>
    </article>
  )
}
