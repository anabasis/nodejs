'use client'

import { BaseInput, DetailTable, InputLabel, RadioBox, Steps, Stepper, Badge } from 'ui/components'
import { ButtonMui, SelectMui } from 'ui/mui'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { useAtom } from 'jotai'
import { oligoDesignRequestStep } from '@store/client/project'
import { useAddRequestMutation } from '@store/server/useProjectQuery'
import { useToastPopup } from 'library/hook/useToastPopup'
import { useQueries } from '@tanstack/react-query'
import { getCode } from 'library/util'

export default function OligoDesignRequest({ projectId, processCode, onClose }: { projectId: number; processCode: string; onClose: (type: string) => void }) {
  const commonCodes = { designType: 'ODS002', enzyme: 'ODS003', appType: 'ODS001' }
  const codes = useQueries({
    queries: Object.values(commonCodes).map((v) => {
      return { queryKey: ['code', v], queryFn: () => getCode(v), staleTime: Infinity }
    }),
  })
  let cCode = {}
  Object.keys(commonCodes).forEach((v, i) => {
    cCode[v] = codes[i].data
  })

  const { toastOpen } = useToastPopup()
  const [requestStep, setRequestStep] = useAtom(oligoDesignRequestStep)
  const [requestInfo, setRequestInfo] = useState<{
    prjNum: number
    prcsCd: string
    appTpCd?: string
    reqNm: string
    reqStsCd?: string
    anlTpCd?: string
    dsignTpCd?: string
    enzmCd?: string
  }>({ prjNum: projectId, prcsCd: processCode, appTpCd: undefined, reqNm: '', reqStsCd: 'ONG', anlTpCd: '', dsignTpCd: '', enzmCd: '' })

  const requestMutation = useAddRequestMutation()

  const handleCancel = useCallback(() => {
    onClose('cancel')
  }, [onClose])

  const handleNext = useCallback(() => {
    setRequestStep(2)
  }, [setRequestStep])

  const handlePrevious = useCallback(() => {
    setRequestStep(1)
  }, [setRequestStep])

  const handleCreate = useCallback(() => {
    requestMutation.mutate(requestInfo, {
      onSuccess(data, variables, context) {
        toastOpen({ content: 'Successfully added.', icon: 'success' })
        onClose('save')
      },
      onError(error, variables, context) {
        toastOpen({ content: 'Add failed.', icon: 'warning' })
      },
    })
  }, [onClose, requestInfo, requestMutation, toastOpen])

  const handleAppTypeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setRequestInfo((prev) => {
        return { ...prev, appTpCd: e.target.value }
      })
    }
  }, [])

  const handleRequestName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRequestInfo((prev) => {
      return { ...prev, reqNm: e.target.value }
    })
  }, [])

  const handleDesignType = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRequestInfo((prev) => {
      return { ...prev, dsignTpCd: e.target.value }
    })
  }, [])

  const handleEnzyme = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRequestInfo((prev) => {
      return { ...prev, enzmCd: e.target.value }
    })
  }, [])

  const handleAnalyteType = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRequestInfo((prev) => {
      return { ...prev, anlTpCd: e.target.value }
    })
  }, [])

  const isDisabledCreate = useMemo(() => {
    if (requestInfo.appTpCd === 'OD') {
      return (
        requestInfo.reqNm === '' ||
        requestInfo.dsignTpCd === '' ||
        requestInfo.dsignTpCd === undefined ||
        requestInfo.enzmCd === '' ||
        requestInfo.enzmCd === undefined
      )
    }
    return true
  }, [requestInfo])

  return (
    <>
      {requestStep === 1 && (
        <>
          <Steps uiType="hor" index={1} current={1} title="Please select the App type for Oligo design." />
          <div className="mt_20">
            {cCode['appType']?.map((item) => (
              <div key={item.value} className="mb_10">
                <RadioBox
                  name="appType"
                  id={item.value}
                  text={item.name}
                  onChange={handleAppTypeChange}
                  value={item.value}
                  disabled={item.value !== 'OD'}
                  checked={requestInfo.appTpCd === item.value}
                />
              </div>
            ))}
          </div>
          <div className="align center mt_30">
            <ButtonMui size="xlarge" type="outlined" onClick={handleCancel}>
              Cancel
            </ButtonMui>
            <ButtonMui size="xlarge" onClick={handleNext} disabled={requestInfo.appTpCd === undefined || requestInfo.appTpCd === ''}>
              Next
            </ButtonMui>
          </div>
        </>
      )}
      {requestStep === 2 && (
        <>
          <Steps uiType="hor" index={requestStep} current={requestStep} title="Please enter basic information for adding Oligo design Request." />
          <DetailTable
            className="mt_10"
            colgroup={
              <colgroup>
                <col style={{ width: '180px' }} />
                <col style={{ width: 'auto' }} />
              </colgroup>
            }
          >
            <tr>
              <td>
                <InputLabel labelText="Request name" />
              </td>
              <td className="pr_0">
                <BaseInput placeholder="Please enter request name." value={requestInfo.reqNm} onChange={handleRequestName} />
              </td>
            </tr>
            {['OD'].includes(requestInfo.appTpCd) && (
              <tr>
                <td className="">
                  <InputLabel labelText="Design type" />
                </td>
                <td className="pr_0">
                  <SelectMui options={cCode['designType']} size="full" placeholder="Please select." value={requestInfo.dsignTpCd} onChange={handleDesignType} />
                </td>
              </tr>
            )}
            {['OD'].includes(requestInfo.appTpCd) && (
              <tr>
                <td>
                  <InputLabel labelText="Enzyme" />
                </td>
                <td className="pr_0">
                  <SelectMui options={cCode['enzyme']} size="full" placeholder="Please select." value={requestInfo.enzmCd} onChange={handleEnzyme} />
                </td>
              </tr>
            )}
            {['SC', 'MO'].includes(requestInfo.appTpCd) && (
              <tr>
                <td>
                  <InputLabel labelText="Analyte type" />
                </td>
                <td className="pr_0">
                  <SelectMui options={[]} size="full" placeholder="Please select." value={requestInfo.anlTpCd} onChange={handleAnalyteType} />
                </td>
              </tr>
            )}
          </DetailTable>
          <div className="align center mt_30">
            <ButtonMui size="xlarge" type="outlined" onClick={handlePrevious}>
              Previous
            </ButtonMui>
            <ButtonMui size="xlarge" onClick={handleCreate} disabled={isDisabledCreate} isLoading={requestMutation.isLoading}>
              Create
            </ButtonMui>
          </div>
        </>
      )}
    </>
  )
}
