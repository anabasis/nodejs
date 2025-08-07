'use client'

import { ChangeEvent, useCallback, useState, useEffect, useMemo } from 'react'
import { DetailTable, InputLabel, TooltipHover, Checkbox, TextArea, ButtonMui, SwitchToggle, MultiSelectMui, SelectChangeEvent } from 'ui'
import { getCode } from 'library/util'
import { useQueries } from '@tanstack/react-query'
import { useEditAuthorityMatation, useProjectInfoData, useProjectProcessData, useReqProjectParticipationMatation } from '@store/server/useProjectQuery'
import { useUser } from 'library/hook'
import { useToastPopup } from 'library/hook/useToastPopup'
import { useAlert } from 'library/hook/useAlert'

export default function RequestProject({ popupClose, id, type }: { popupClose: (type: string) => void; id: string; type: 'RQC' | 'RQJ' }) {
  const { userInfo } = useUser()
  const { toastOpen } = useToastPopup()
  const { alertOpen, alertClose } = useAlert()
  const commonCodes = { processRole: 'PFM018', requestPurposeCode: 'PFM026' }
  const codes = useQueries({
    queries: Object.values(commonCodes).map((v) => {
      return { queryKey: ['code', v], queryFn: () => getCode(v), staleTime: Infinity }
    }),
  })
  let cCode = {}
  Object.keys(commonCodes).forEach((v, i) => {
    cCode[v] = codes[i].data
  })

  const { data: projectBasicInfo } = useProjectInfoData(id)
  const { data: projectProcessInfo } = useProjectProcessData(id, false)

  const rqcMatation = useEditAuthorityMatation()
  const rqjMatation = useReqProjectParticipationMatation()

  const [requestProjectInfo, setRequestProjectInfo] = useState<{
    id: number
    processCodeList: { processRoleCode: string; processList: string[] }[]
    projectReqPurposeList: string[]
    reqResnCont: string
    prjRolCd: 'PJM' | 'PJB'
  }>({
    id: parseInt(id, 10),
    processCodeList: [],
    projectReqPurposeList: [],
    reqResnCont: '',
    prjRolCd: 'PJB',
  })

  const [processList, setProcessList] = useState<
    {
      value: string
      name: string
      prcsStsCode?: string
    }[]
  >([])
  const [isChange, setChange] = useState(false)

  useEffect(() => {
    if (!!projectProcessInfo) {
      setProcessList(
        projectProcessInfo
          .filter((item) => item['value'] !== 'ORDR' && item['value'] !== 'PRTP')
          .map((item) => item as { value: string; name: string; prcsStsCode?: string })
      )
    }
  }, [projectProcessInfo])

  useEffect(() => {
    if (type === 'RQC' && !!projectBasicInfo) {
      setRequestProjectInfo((prev) => {
        return {
          ...prev,
          prjRolCd: projectBasicInfo?.projectRoleCode === '' || projectBasicInfo?.projectRoleCode === 'PJB' ? 'PJB' : 'PJM',
          processCodeList: projectBasicInfo?.projectProcessRole.map((item) => {
            return { processRoleCode: item.processRoleCode, processList: item.processCodes }
          }),
        }
      })
    }
  }, [projectBasicInfo, type])

  const handleAuthorityChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setChange(true)
    setRequestProjectInfo((prev) => {
      return {
        ...prev,
        processCodeList: e.target.checked
          ? prev.processCodeList.find((item) => item.processRoleCode === e.target.name) !== undefined
            ? prev.processCodeList
            : prev.processCodeList.concat([{ processRoleCode: e.target.name, processList: [] }])
          : prev.processCodeList.filter((item) => item.processRoleCode !== e.target.name),
      }
    })
  }, [])

  const handlePurposeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRequestProjectInfo((prev) => {
      return {
        ...prev,
        projectReqPurposeList: e.target.checked
          ? prev.projectReqPurposeList.includes(e.target.name)
            ? prev.projectReqPurposeList
            : prev.projectReqPurposeList.concat([e.target.name])
          : prev.projectReqPurposeList.filter((item) => item !== e.target.name),
      }
    })
  }, [])

  const handleReaseon = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setRequestProjectInfo((prev) => {
      return { ...prev, reqResnCont: e.target.value }
    })
  }, [])

  const handleCancel = useCallback(() => {
    popupClose('cancel')
  }, [popupClose])

  const handleRequest = useCallback(() => {
    if (type === 'RQC') {
      rqcMatation.mutate(requestProjectInfo, {
        onSuccess(data, variables, context) {
          if (data.data['statusCode'] === 500114) {
            alertOpen({
              maxWidth: 's',
              title: 'Project participation request\nin progress',
              content: (
                <div className="align center mt_30">
                  <ButtonMui
                    size="xlarge"
                    onClick={() => {
                      alertClose()
                      popupClose('')
                    }}
                  >
                    OK
                  </ButtonMui>
                </div>
              ),
              textTitle: `A request to participate in the same project is already in progress.\nPlease wait for administrator approval.`,
              icon: 'warning',
            })
          } else {
            toastOpen({ icon: 'success', content: 'Request completed.' })
            popupClose('success')
          }
        },
        onError(error, variables, context) {},
      })
    }
    if (type === 'RQJ') {
      rqjMatation.mutate(requestProjectInfo, {
        onSuccess(data, variables, context) {
          if (data.data['statusCode'] === 500114) {
            alertOpen({
              maxWidth: 's',
              title: 'Project participation request\nin progress',
              content: (
                <div className="align center mt_30">
                  <ButtonMui
                    size="xlarge"
                    onClick={() => {
                      alertClose()
                      popupClose('')
                    }}
                  >
                    OK
                  </ButtonMui>
                </div>
              ),
              textTitle: `An authority change request is already in progress for the same project.\nPlease wait for administrator approval.`,
              icon: 'warning',
            })
          } else {
            toastOpen({ icon: 'success', content: 'Request completed.' })
            popupClose('success')
          }
        },
        onError(error, variables, context) {},
      })
    }
  }, [alertClose, alertOpen, popupClose, requestProjectInfo, rqcMatation, rqjMatation, toastOpen, type])

  const getProcessList = useCallback(
    (role) => {
      return processList?.filter(
        (item) => requestProjectInfo.processCodeList.find((pro) => pro.processRoleCode !== role && pro.processList.includes(item['value'])) === undefined
      ) as {
        value: string
        name: string
        prcsStsCode?: string
      }[]
    },
    [processList, requestProjectInfo.processCodeList]
  )

  const handleProjectManagementChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setChange(true)
      setRequestProjectInfo((prev) => {
        return {
          ...prev,
          prjRolCd: e.target.checked ? 'PJM' : 'PJB',
          processCodeList: e.target.checked ? [{ processRoleCode: 'MGMT', processList: processList.map((item) => item.value) }] : [],
        }
      })
    },
    [processList]
  )

  const handleProcessChange = useCallback((event: SelectChangeEvent<string[]>, authId: string) => {
    setChange(true)
    setRequestProjectInfo((prev) => {
      return {
        ...prev,
        processCodeList: prev.processCodeList.map((item) =>
          item.processRoleCode === authId
            ? { ...item, processList: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value }
            : item
        ),
      }
    })
  }, [])

  const isDisabled = useMemo(() => {
    if (type === 'RQJ') {
      return !(
        requestProjectInfo.processCodeList.length > 0 &&
        requestProjectInfo.processCodeList.find((item) => item.processRoleCode === '' || item.processList.length === 0) === undefined &&
        requestProjectInfo.projectReqPurposeList.length > 0
      )
    }
    if (type === 'RQC') {
      return !(
        isChange &&
        requestProjectInfo.processCodeList.length > 0 &&
        requestProjectInfo.processCodeList.find((item) => item.processRoleCode === '' || item.processList.length === 0) === undefined
      )
    }
    return true
  }, [isChange, requestProjectInfo, type])

  return (
    <>
      <DetailTable
        colgroup={
          <colgroup>
            <col style={{ width: '35%' }} />
            <col style={{ width: '66%' }} />
          </colgroup>
        }
      >
        <tr>
          <th>
            <InputLabel labelText="Project management" required>
              <TooltipHover>Project manager has authority to manage all processes and to modify and delete project information.</TooltipHover>
            </InputLabel>
          </th>
          <td>
            <SwitchToggle
              className="mg_0"
              id="projectManagerment"
              color="primary"
              value={requestProjectInfo.prjRolCd === 'PJM'}
              onChange={handleProjectManagementChange}
              disabled={userInfo?.corpNo !== projectBasicInfo?.corporate.corpId}
            />
          </td>
        </tr>
        <tr>
          <th className="va_top">
            <InputLabel className="ptb_8" labelText="Process authority" required>
              <TooltipHover>{`'Management' can manage all the process and 'edit' can use editing fuction and 'view' only browsing is possible.`}</TooltipHover>
            </InputLabel>
          </th>
          <td className="pr_0">
            {cCode['processRole']?.map((item) => (
              <div className="align mb_10 v_center" key={item.value}>
                <Checkbox
                  className="w35"
                  disabled={requestProjectInfo.prjRolCd === 'PJM' || (item.value === 'MGMT' && userInfo?.corpNo !== projectBasicInfo?.corporate.corpId)}
                  labelText={item.name}
                  id={item.value}
                  name={item.value}
                  onChange={handleAuthorityChange}
                  value={requestProjectInfo.processCodeList.find((auth) => auth.processRoleCode === item.value) !== undefined}
                />
                <div className="pl_20 w60">
                  <MultiSelectMui
                    noItem="No item to choose."
                    size="full"
                    placeholder="Select process."
                    options={getProcessList(item.value)}
                    value={
                      requestProjectInfo.processCodeList.find((auth) => auth.processRoleCode === item.value) === undefined
                        ? []
                        : requestProjectInfo.processCodeList.find((auth) => auth.processRoleCode === item.value).processList
                    }
                    onChange={(event: SelectChangeEvent<string[]>) => {
                      handleProcessChange(event, item.value)
                    }}
                    disabled={
                      requestProjectInfo.processCodeList.find((auth) => auth.processRoleCode === item.value) === undefined ||
                      requestProjectInfo.prjRolCd === 'PJM'
                    }
                  />
                </div>
              </div>
            ))}
          </td>
        </tr>
        {type == 'RQJ' && (
          <tr>
            <th className="va_top">
              <InputLabel labelText="Request purpose" required />
            </th>
            <td className="va_top">
              <div>
                {cCode['requestPurposeCode']?.map((item) => (
                  <Checkbox
                    labelText={item.name}
                    className="mb_10"
                    id={item.value}
                    name={item.value}
                    key={item.value}
                    value={requestProjectInfo.projectReqPurposeList.includes(item.value)}
                    onChange={handlePurposeChange}
                  />
                ))}
              </div>
            </td>
          </tr>
        )}
        <tr>
          <th className="va_top">
            <InputLabel className="ptb_8" labelText="Request reason" />
          </th>
          <td className="pr_0">
            <TextArea
              placeholder={type == 'RQJ' ? 'Please enter the reason for requesting participation.' : 'Please enter the reason for requesting authority change.'}
              value={requestProjectInfo.reqResnCont}
              onChange={handleReaseon}
              maxLength={500}
              height="h150"
            />
          </td>
        </tr>
      </DetailTable>
      <div className="align center mt_30">
        <ButtonMui size="xlarge" type="outlined" onClick={handleCancel}>
          Cancel
        </ButtonMui>
        <ButtonMui size="xlarge" disabled={isDisabled} onClick={handleRequest} isLoading={rqcMatation.isLoading || rqjMatation.isLoading}>
          Request
        </ButtonMui>
      </div>
    </>
  )
}
