'use client'

import { ProjectAdditionalInfoType } from '@type/project/projectType'
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react'
import { DetailTable, InputLabel, BaseInput } from 'ui/components'
import { TooltipHover, MultiSelectMui, SelectChangeEvent } from 'ui/mui'
import { getCode } from 'library/util'
import { useQueries } from '@tanstack/react-query'
import { useCountryListData } from '@store/server/useProjectQuery'

interface ProjectAdditionalInfoProp<T> {
  projectInfo: T
  setProjectInfo: Dispatch<SetStateAction<T>>
  setChange?: Dispatch<SetStateAction<boolean>>
}

export default function AdditionalInformation<T = ProjectAdditionalInfoType>({ projectInfo, setProjectInfo, setChange }: ProjectAdditionalInfoProp<T>) {
  const commonCodes = { regulatoryAffair: 'PFM023' }
  const codes = useQueries({
    queries: Object.values(commonCodes).map((v) => {
      return { queryKey: ['code', v], queryFn: () => getCode(v), staleTime: Infinity }
    }),
  })
  let cCode = {}
  Object.keys(commonCodes).forEach((v, i) => {
    cCode[v] = codes[i].data
  })

  const { data: countryList } = useCountryListData()

  const handleProductNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (setChange) {
        setChange(true)
      }
      setProjectInfo((prev) => {
        return { ...prev, prdNm: event.target.value }
      })
    },
    [setChange, setProjectInfo]
  )

  const handleTaskCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (setChange) {
        setChange(true)
      }
      setProjectInfo((prev) => {
        return { ...prev, taskCd: event.target.value }
      })
    },
    [setChange, setProjectInfo]
  )

  const handleRegulatoryAffairCodeChange = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      if (setChange) {
        setChange(true)
      }
      setProjectInfo((prev) => {
        return { ...prev, regulatoryAffairCodeList: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value }
      })
    },
    [setChange, setProjectInfo]
  )

  const handleTargetCountryCodeChange = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      if (setChange) {
        setChange(true)
      }
      setProjectInfo((prev) => {
        return { ...prev, targetCountryCodeList: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value }
      })
    },
    [setChange, setProjectInfo]
  )

  return (
    <article>
      <div className="cont_title_box">
        <p className="title1">Additional Information</p>
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
          <th>
            <InputLabel labelText="Product name">
              <TooltipHover>Please enter the name when developing a commercialized product.</TooltipHover>
            </InputLabel>
          </th>
          <td>
            <BaseInput
              size="lg"
              placeholder="Please enter the representative product name."
              value={projectInfo['prdNm']}
              onChange={handleProductNameChange}
              maxLength={100}
              disabled={projectInfo['projectRoleCode'] === 'PJB'}
            />
          </td>
          <th>
            <InputLabel labelText="Task code">
              <TooltipHover>Please enter task code if available.</TooltipHover>
            </InputLabel>
          </th>
          <td>
            <BaseInput
              size="lg"
              placeholder="Please enter task code."
              value={projectInfo['taskCd']}
              onChange={handleTaskCodeChange}
              maxLength={26}
              disabled={projectInfo['projectRoleCode'] === 'PJB'}
            />
          </td>
        </tr>
        <tr>
          <th>
            <InputLabel labelText="Regulatory affair">
              <TooltipHover>Please select if there is a country need to regulatory affair.</TooltipHover>
            </InputLabel>
          </th>
          <td>
            <div className="max_w368">
              <MultiSelectMui
                size="large"
                options={cCode['regulatoryAffair']}
                placeholder="Please select regulation."
                value={projectInfo['regulatoryAffairCodeList']}
                onChange={handleRegulatoryAffairCodeChange}
                disabled={projectInfo['projectRoleCode'] === 'PJB'}
              />
            </div>
          </td>
          <th>
            <InputLabel labelText="Target market">
              <TooltipHover>Select the country where product will be launched.</TooltipHover>
            </InputLabel>
          </th>
          <td>
            <div className="max_w368">
              <MultiSelectMui
                size="large"
                options={countryList}
                placeholder="Please select target market."
                value={projectInfo['targetCountryCodeList']}
                onChange={handleTargetCountryCodeChange}
                disabled={projectInfo['projectRoleCode'] === 'PJB'}
              />
            </div>
          </td>
        </tr>
      </DetailTable>
    </article>
  )
}
