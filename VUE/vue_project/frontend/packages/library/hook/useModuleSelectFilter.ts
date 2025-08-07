import { useCallback, useEffect, useMemo, useState } from 'react'
import { selectInitValue } from '../util/fn'
import { SelectChangeEventType } from '../../ui/mui/Select'

import { CommonSelectCodesType, CommonSelectOptionType } from '../type/common'

type QnaCommonCodes = {
  module: CommonSelectOptionType[]
  type: CommonSelectOptionType[]
  category: CommonSelectOptionType[]
  status?: CommonSelectOptionType[]
  openLevel?: CommonSelectOptionType[]
}

export const useModuleSelectFilter = <T extends { category?: string }>({
  cCode,
  params,
  isInit = true,
}: {
  cCode: QnaCommonCodes
  params: T
  isInit?: boolean
}) => {
  const [moduleData, setModuleData] = useState<CommonSelectOptionType[]>([])

  const selectData: CommonSelectCodesType = useMemo(() => {
    let rerangeCode: QnaCommonCodes = { ...cCode }

    if (cCode) {
      rerangeCode.module = moduleData
    }

    return !!isInit ? selectInitValue(rerangeCode) : rerangeCode
  }, [cCode, isInit, moduleData])

  const getMdoduleSelect = useCallback(
    (moduleArr: string[]) => {
      if (!cCode?.module) return
      return cCode?.module?.filter((code) => moduleArr.includes(code.value))
    },
    [cCode.module]
  )

  const [m1, m2, m3, m4] = useMemo(
    () => [
      getMdoduleSelect(['ACC', 'SEC', 'PRJ', 'ETC']),
      getMdoduleSelect(['AUM', 'MOO', 'MLO', 'MLT']),
      getMdoduleSelect(['SCT', 'SCM', 'MDB', 'MDB']),
      getMdoduleSelect(['CDB', 'MOC', 'OGM', 'WET', 'SCO', 'DAT', 'ETC']),
    ],
    [getMdoduleSelect]
  )

  const moduleObj: { [key in string]: CommonSelectOptionType[] | undefined } = useMemo(() => {
    return {
      SVM: m1,
      OLG: m2,
      SQM: m3,
      TOL: m4,
    }
  }, [m1, m2, m3, m4])

  const changeSelectData = (event: SelectChangeEventType, select: string) => {
    if (select.toLocaleLowerCase() === 'category') {
      setModuleData(moduleObj[event.target.value] ?? [])
    }
  }
  useEffect(() => {
    if (cCode) {
      setModuleData(moduleObj[params.category || ''] ?? [])
    }
  }, [cCode])

  return {
    selectData,
    setModuleData,
    moduleObj,
    changeSelectData,
  }
}
