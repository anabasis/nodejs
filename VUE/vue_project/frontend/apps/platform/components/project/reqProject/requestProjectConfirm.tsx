'use client'

import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import {
  DetailTable,
  InputLabel,
  TooltipHover,
  Checkbox,
  ButtonMui,
  AvatarMui,
  EllipsisTypo,
  SwitchToggle,
  MultiSelectMui,
  SelectChangeEvent,
  StatusLabel,
  PreTypo,
} from 'ui'
import InnerTd from 'ui/molecules/InnerTd'
import { SelectChangeEventType } from 'ui/mui/Select'
import { getCdnFileUrl, getCode } from 'library/util'
import { useQueries } from '@tanstack/react-query'
import {
  useEditProjectAuthorityMutation,
  useEditProjectParticipationDemandMutation,
  useProjectAuthorityDetailData,
  useProjectParticipationConfirmDetailData,
  useProjectProcessData,
} from '@store/server/useProjectQuery'
import { RequestJoinConfirmType } from '@type/project/projectType'

export default function RequestProject({
  projectId,
  popupClose,
  type,
  result,
  requestId,
}: {
  projectId: string
  popupClose: () => void
  type: 'RQC' | 'RQJ'
  result: 'APV' | 'RJT' | null
  requestId: number
}) {
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
  const [requestProjectInfo, setRequestProjectInfo] = useState<RequestJoinConfirmType>({
    id: 0,
    prjRolCd: '',
    reqResnCont: '',
    userNm: '',
    orgnNm: '',
    prcsAuth: [],
    fileInfoResponse: null,
    projectReqPurposeList: [],
    approvalCode: null,
  })

  const [processList, setProcessList] = useState<
    {
      value: string
      name: string
      prcsStsCode?: string
    }[]
  >([])

  const { data: projectProcessInfo } = useProjectProcessData(projectId, false)
  const { data: confirmJoinData } = useProjectParticipationConfirmDetailData(requestId, type)
  const { data: confirmChangeData } = useProjectAuthorityDetailData(requestId, type)

  const editProjectAuthorityMutation = useEditProjectAuthorityMutation()
  const editProjectParticipationDemandMutation = useEditProjectParticipationDemandMutation()

  useEffect(() => {
    if (!!confirmJoinData) {
      setRequestProjectInfo({ ...confirmJoinData })
    }
  }, [confirmJoinData])

  useEffect(() => {
    if (!!confirmChangeData) {
      setRequestProjectInfo({ ...confirmChangeData })
    }
  }, [confirmChangeData])

  useEffect(() => {
    if (!!projectProcessInfo) {
      setProcessList(
        projectProcessInfo
          .filter((item) => item['value'] !== 'ORDR' && item['value'] !== 'PRTP')
          .map((item) => item as { value: string; name: string; prcsStsCode?: string })
      )
    }
  }, [projectProcessInfo])

  const handleProcessChange = useCallback((event: SelectChangeEvent<string[]>, authId: string) => {
    setRequestProjectInfo((prev) => {
      return {
        ...prev,
        prcsAuth: prev.prcsAuth.map((item) =>
          item.processRoleCode === authId
            ? { ...item, processCodes: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value }
            : item
        ),
      }
    })
  }, [])

  const handleAuthorityChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRequestProjectInfo((prev) => {
      return {
        ...prev,
        prcsAuth: e.target.checked
          ? prev.prcsAuth.find((item) => item.processRoleCode === e.target.name) !== undefined
            ? prev.prcsAuth
            : prev.prcsAuth.concat([{ processRoleCode: e.target.name, processCodes: [] }])
          : prev.prcsAuth.filter((item) => item.processRoleCode !== e.target.name),
      }
    })
  }, [])

  const handleProjectManagementChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRequestProjectInfo((prev) => {
        return {
          ...prev,
          prjRolCd: e.target.checked ? 'PJM' : 'PJB',
          prcsAuth: e.target.checked ? [{ processRoleCode: 'MGMT', processCodes: processList.map((item) => item.value) }] : [],
        }
      })
    },
    [processList]
  )

  const handleDeny = useCallback(() => {
    if (type === 'RQC') {
      editProjectAuthorityMutation.mutate(
        {
          ...requestProjectInfo,
          processCodeList: requestProjectInfo.prcsAuth.map((item) => {
            return { processRoleCode: item.processRoleCode, processList: item.processCodes }
          }),
          approvalCode: 'RJT',
        },
        {
          onSuccess(data, variables, context) {
            popupClose()
          },
          onError(error, variables, context) {},
        }
      )
    } else if (type === 'RQJ') {
      editProjectParticipationDemandMutation.mutate(
        {
          ...requestProjectInfo,
          processCodeList: requestProjectInfo.prcsAuth.map((item) => {
            return { processRoleCode: item.processRoleCode, processList: item.processCodes }
          }),
          approvalCode: 'RJT',
        },
        {
          onSuccess(data, variables, context) {
            popupClose()
          },
          onError(error, variables, context) {},
        }
      )
    }
  }, [editProjectAuthorityMutation, editProjectParticipationDemandMutation, popupClose, requestProjectInfo, type])

  const handleGrant = useCallback(() => {
    if (type === 'RQC') {
      editProjectAuthorityMutation.mutate(
        {
          ...requestProjectInfo,
          processCodeList: requestProjectInfo.prcsAuth.map((item) => {
            return { processRoleCode: item.processRoleCode, processList: item.processCodes }
          }),
          approvalCode: 'APV',
        },
        {
          onSuccess(data, variables, context) {
            popupClose()
          },
          onError(error, variables, context) {},
        }
      )
    } else if (type === 'RQJ') {
      editProjectParticipationDemandMutation.mutate(
        {
          ...requestProjectInfo,
          processCodeList: requestProjectInfo.prcsAuth.map((item) => {
            return { processRoleCode: item.processRoleCode, processList: item.processCodes }
          }),
          approvalCode: 'APV',
        },
        {
          onSuccess(data, variables, context) {
            popupClose()
          },
          onError(error, variables, context) {},
        }
      )
    }
  }, [editProjectAuthorityMutation, editProjectParticipationDemandMutation, popupClose, requestProjectInfo, type])

  const getStatusType = useCallback((status) => {
    return status === null ? 'Standby' : status === 'APV' ? 'Request granted' : status === 'RJT' ? 'Request denied' : status
  }, [])

  const getProcessList = useCallback(
    (role) => {
      return processList?.filter(
        (item) => requestProjectInfo.prcsAuth.find((pro) => pro.processRoleCode !== role && pro.processCodes.includes(item['value'])) === undefined
      ) as {
        value: string
        name: string
        prcsStsCode?: string
      }[]
    },
    [processList, requestProjectInfo.prcsAuth]
  )

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
            <InputLabel labelText="Name" />
          </th>
          <td>
            <InnerTd>
              <AvatarMui
                type="circular"
                data={[
                  {
                    src: requestProjectInfo.fileInfoResponse?.preSignedUrl ?? null,
                    alt: requestProjectInfo.userNm,
                  },
                ]}
              />
              <EllipsisTypo>
                <span className="plr_10 w30">{requestProjectInfo.userNm}</span>
                <i className="navy50">|</i>
                <span className="plr_10 w60">{requestProjectInfo.orgnNm ? requestProjectInfo.orgnNm : '-'}</span>
              </EllipsisTypo>
            </InnerTd>
          </td>
        </tr>
        {type == 'RQC' && (
          <tr>
            <th className="va_top">
              <InputLabel labelText="Current process authority" />
            </th>
            <td>
              {cCode['processRole']?.map((item) => (
                <div className="align mb_10" key={`${item.value}_cureent`}>
                  <div className="w30">
                    <span className="body2">{item.name}</span>
                  </div>
                  <span className="body2" style={{ color: '#E9EBF0' }}>
                    |
                  </span>
                  <div className="pl_10 w60">
                    <EllipsisTypo className="body2">
                      {!!requestProjectInfo?.currentPrcsAuth?.find((auth) => auth.processRoleCode === item.value)
                        ? requestProjectInfo?.currentPrcsAuth?.find((auth) => auth.processRoleCode === item.value).processName.join(', ')
                        : '-'}
                    </EllipsisTypo>
                  </div>
                </div>
              ))}
            </td>
          </tr>
        )}
        <tr>
          <th>
            <InputLabel labelText="Project management" required>
              <TooltipHover>Project manager has authority to manage all processes and to modify and delete project information.</TooltipHover>
            </InputLabel>
          </th>
          <td>
            <SwitchToggle
              id="projectManagerment"
              color="primary"
              value={requestProjectInfo.prjRolCd === 'PJM'}
              onChange={handleProjectManagementChange}
              disabled={result !== null}
            />
          </td>
        </tr>
        <tr>
          <th className="va_top">
            <InputLabel labelText="Process authority" required>
              <TooltipHover>{`'Management' can manage all the process and 'edit' can use editing fuction and 'view' only browsing is possible.`}</TooltipHover>
            </InputLabel>
          </th>
          <td>
            {cCode['processRole']?.map((item) => (
              <div className="align mb_10" key={`${item.value}`}>
                <div className="w30">
                  <Checkbox
                    disabled={requestProjectInfo.prjRolCd === 'PJM' || result !== null}
                    labelText={item.name}
                    className="mb_10"
                    id={item.value}
                    name={item.value}
                    onChange={handleAuthorityChange}
                    value={requestProjectInfo.prcsAuth.find((auth) => auth.processRoleCode === item.value) !== undefined}
                  />
                </div>
                <div className="pl_20 w70">
                  <MultiSelectMui
                    noItem="No item to choose."
                    size="full"
                    placeholder="-"
                    options={getProcessList(item.value)}
                    value={
                      requestProjectInfo.prcsAuth.find((auth) => auth.processRoleCode === item.value) === undefined
                        ? []
                        : requestProjectInfo.prcsAuth.find((auth) => auth.processRoleCode === item.value).processCodes
                    }
                    onChange={(event: SelectChangeEvent<string[]>) => {
                      handleProcessChange(event, item.value)
                    }}
                    disabled={
                      requestProjectInfo.prcsAuth.find((auth) => auth.processRoleCode === item.value) === undefined ||
                      requestProjectInfo.prjRolCd === 'PJM' ||
                      result !== null
                    }
                  />
                </div>
              </div>
            ))}
          </td>
        </tr>
        {type == 'RQJ' && (
          <tr>
            <th>
              <InputLabel labelText="Request purpose" />
            </th>
            <td>
              <div className="align wrap">{requestProjectInfo.projectReqPurposeList.join(', ')}</div>
            </td>
          </tr>
        )}
        <tr>
          <th className="va_top">
            <InputLabel labelText="Request reason" />
          </th>
          <td>
            <PreTypo>{requestProjectInfo.reqResnCont}</PreTypo>
          </td>
        </tr>
        {result !== null && (
          <tr>
            <th>
              <InputLabel labelText="Request Result " />
            </th>
            <td>
              <StatusLabel status={getStatusType(result).split(' ').join('')}>{getStatusType(result)}</StatusLabel>
            </td>
          </tr>
        )}
      </DetailTable>
      {result === null && (
        <div className="align center mt_30">
          <ButtonMui size="xlarge" type="outlined" onClick={handleDeny}>
            Deny
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={handleGrant}>
            Grant
          </ButtonMui>
        </div>
      )}
    </>
  )
}
