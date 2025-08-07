'use client'

import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ProcessType, ProjectBasicInfoType } from '@type/project/projectType'
import { useProcessStatusMutation, useProjectProcessData, useProjectProcessStatusData } from '@store/server/useProjectQuery'
import { getCode } from 'library/util'
import { ButtonMui, SelectChangeEvent, SelectMui } from 'ui'
import { useAlert } from 'library/hook/useAlert'
import { getMGAuth } from '../projectCommon'
import { useToastPopup } from 'library/hook/useToastPopup'

export default function ProcessStatusSelect({ projectInfo, processCode }: { projectInfo: ProjectBasicInfoType; processCode: string }) {
  const { alertOpen, alertClose } = useAlert()
  const { toastOpen } = useToastPopup()
  const { data: processStatuCodeList } = useQuery({ queryKey: ['code', 'PFM025'], queryFn: () => getCode('PFM025'), staleTime: Infinity })

  const [processStatus, setProcessStatus] = useState({ stageProgress: '' })
  const [processStatusList, setProcessStatusList] = useState<{ name: string; value: string }[]>([])

  const { data: projectProcessInfo, refetch: processFetch } = useProjectProcessData(`${projectInfo.id}`, true)
  const { data: processStatusInfo, refetch: processStatusFetch } = useProjectProcessStatusData(`${projectInfo.id}`, processCode)
  const processStatusMutation = useProcessStatusMutation()

  useEffect(() => {
    if (!!processStatuCodeList && !!processStatusInfo) {
      setProcessStatus(processStatusInfo)
      setProcessStatusList(
        processStatuCodeList.map((item) => {
          if (processStatusInfo.stageProgress === 'PCWT') {
            return item.value === 'PCNG' ? { ...item, disabled: false } : { ...item, disabled: true }
          } else if (processStatusInfo.stageProgress === 'PCNG') {
            return item.value === 'PCWT' ? { ...item, disabled: true } : { ...item, disabled: false }
          } else if (processStatusInfo.stageProgress === 'PCFN') {
            return item.value === 'PCNG' ? { ...item, disabled: false } : { ...item, disabled: true }
          } else if (processStatusInfo.stageProgress === 'PCST') {
            return item.value === 'PCNG' ? { ...item, disabled: false } : { ...item, disabled: true }
          }
          return { ...item, disabled: true }
        })
      )
    }
  }, [processStatuCodeList, processStatusInfo])

  const changeProcessStatus = useCallback(
    (processCodeStatus) => {
      alertClose()
      processStatusMutation.mutate(
        { id: projectInfo.id, projectProcess: processCode, projectProcessProgress: processCodeStatus },
        {
          onSettled: () => {
            processStatusFetch()
            processFetch()
          },
          onSuccess(data, variables, context) {
            toastOpen({ content: 'Successfully changed.', icon: 'success' })
          },
          onError(error, variables, context) {
            toastOpen({ content: 'Change failed.', icon: 'warning' })
          },
        }
      )
    },
    [alertClose, processStatusMutation, projectInfo.id, processCode, processStatusFetch, processFetch, toastOpen]
  )

  const handleProcessStatus = useCallback(
    (e: SelectChangeEvent) => {
      let isSkip = false

      for (let process of projectProcessInfo as ProcessType[]) {
        if (process.prcsCode === processCode) {
          break
        }
        if (process.prcsStsCode === 'PCWT' || process.prcsStsCode === 'PCST') {
          isSkip = true
          break
        }
      }

      if (processStatusInfo.stageProgress === 'PCFN' && e.target.value === 'PCNG') {
        alertOpen({
          maxWidth: 's',
          title: `Would you like to change ${projectProcessInfo.find((item: ProcessType) => item.prcsCode === processCode)['prcsName']} to 'Ongoing' again?`,
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
                  changeProcessStatus(e.target.value)
                }}
              >
                OK
              </ButtonMui>
            </div>
          ),
          textTitle: `Afterwards, the process will change to a pause status and\n able to proceed again according to the process.`,
          icon: 'info',
        })
      } else if (isSkip) {
        alertOpen({
          maxWidth: 's',
          title: `Would you like to change ${projectProcessInfo.find((item: ProcessType) => item.prcsCode === processCode)['prcsName']} to 'Ongoing'?`,
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
                  changeProcessStatus(e.target.value)
                }}
              >
                OK
              </ButtonMui>
            </div>
          ),
          textTitle: `All previous processes will change to 'Done' status.`,
          icon: 'info',
        })
      } else {
        changeProcessStatus(e.target.value)
      }
    },
    [alertClose, alertOpen, changeProcessStatus, processCode, processStatusInfo, projectProcessInfo]
  )

  return (
    <SelectMui disabled={!getMGAuth(projectInfo, processCode)} options={processStatusList} onChange={handleProcessStatus} value={processStatus.stageProgress} />
  )
}
