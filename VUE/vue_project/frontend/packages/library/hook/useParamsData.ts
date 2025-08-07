import { paramsAtom, setParamsAtom } from '../store/client/paramsState'
import { SelectChangeEventType } from '../../ui/mui/Select'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import { initDataWithRes, isEmptyEveryCheck } from '../util/fn'
import { isEmpty } from 'lodash-es'

export const useParamsData = <T>(initData?: T) => {
  const params: T = useAtomValue(paramsAtom) as T
  const updateParams = useSetAtom(paramsAtom)
  const setParams = useSetAtom(setParamsAtom)
  const [loading, setLoading] = useState(false)

  const isParamsLoading = useMemo(() => {
    if (!loading) return true

    return loading && isEmpty(params)
  }, [initData, loading])

  const eidtInitParams = (initData: { [key in string]: unknown }, param?: { [key in string]: unknown }) => {
    if (param && initData) {
      setLoading(true)
      updateParams(initDataWithRes(initData, param))
      return
    }
    if (initData) {
      setLoading(true)
      updateParams(initData)
    }
  }

  const resetParams = () => {
    updateParams({})
  }

  const setChangeParams = (data: unknown, key?: string) => {
    setParams({ data, key })
  }

  const checkEmptyValue = () => {
    if (!params) return true

    return isEmptyEveryCheck(params as { [key in string]: unknown | unknown[] })
  }

  useEffect(() => {
    if (initData) {
      setLoading(true)
      updateParams(initData)
    }
  }, [])

  return {
    params,
    isParamsLoading,
    eidtInitParams,
    setChangeParams,
    checkEmptyValue,
    resetParams,
    updateParams,
  }
}
