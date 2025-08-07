'use client'

import { ProcessItemType, ProjectAdditionalInfoType } from '@type/project/projectType'
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect } from 'react'
import { useAlert } from 'library/hook/useAlert'
import { ButtonMui, TextToggle } from 'ui'
import { useToastPopup } from 'library/hook/useToastPopup'

interface ProjectProcessSettingProp<T> {
  type: string
  projectInfo: T
  processList: ProcessItemType[]
  selectedProcessList: ProcessItemType[]
  setSelectedProcessList: Dispatch<
    SetStateAction<
      {
        value: string
        name: string
        sortNum: number
        prcsStsCode?: string
      }[]
    >
  >
  onChangeProcessCode: (processCode: string, isChecked: boolean, processList: ProcessItemType[]) => void
}

export default function ProcessSetting<T = ProjectAdditionalInfoType>({
  type,
  projectInfo,
  processList,
  selectedProcessList,
  setSelectedProcessList,
  onChangeProcessCode,
}: ProjectProcessSettingProp<T>) {
  const { alertOpen, alertClose } = useAlert()
  const { toastOpen } = useToastPopup()

  const changeProcess = useCallback(
    (isChecked: boolean, data: ProcessItemType, isPopup?: boolean) => {
      alertClose()
      const temp =
        isChecked && selectedProcessList.find((item) => item.value === data.value) === undefined
          ? selectedProcessList.concat([data])
          : !isChecked && selectedProcessList.find((item) => item.value === data.value) !== undefined
          ? selectedProcessList.filter((item) => item.value !== data.value)
          : selectedProcessList
      const tempSort = temp.sort((a, b) => a.sortNum - b.sortNum)
      setSelectedProcessList(tempSort)
      if (!!isPopup) {
        toastOpen({ content: 'Successfully disabled.', icon: 'success' })
      }
      onChangeProcessCode(data.value, isChecked, tempSort)
    },
    [alertClose, onChangeProcessCode, selectedProcessList, setSelectedProcessList, toastOpen]
  )

  const handleChangeProcess = useCallback(
    (event: ChangeEvent<HTMLInputElement>, data: { value: string; name: string; sortNum: number; prcsStsCode?: string }) => {
      if (type === 'edit' && event.target.checked === false) {
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
                  changeProcess(false, data, true)
                }}
              >
                Disable
              </ButtonMui>
            </div>
          ),
          textTitle: `Do you want to remove ${data.name} process authority?`,
          icon: 'info',
        })
      } else {
        changeProcess(event.target.checked, data)
      }
    },
    [alertClose, alertOpen, changeProcess, type]
  )

  const getCheckedProcess = useCallback(
    (data): boolean => {
      return selectedProcessList.find((item) => item.value === data.value) !== undefined
    },
    [selectedProcessList]
  )

  const getProcessStatus = useCallback(
    (data): boolean => {
      const target = selectedProcessList.find((item) => item.value === data.value)
      return !!target ? target.prcsStsCode === 'PCFN' || target.prcsStsCode === 'PCST' || target.prcsStsCode === 'PCNG' : false
    },
    [selectedProcessList]
  )

  return (
    <article>
      <div className="cont_title_box">
        <p className="title1">Process Setting</p>
      </div>
      <div className="align start gap_10">
        {processList?.map((process) => (
          <TextToggle
            key={`processSetting-${process.value}`}
            id={process.value}
            onChange={(event) => handleChangeProcess(event, process)}
            value={getCheckedProcess(process)}
            disabled={getProcessStatus(process) || projectInfo['projectRoleCode'] === 'PJB'}
          >
            {process.name}
          </TextToggle>
        ))}
      </div>
    </article>
  )
}
