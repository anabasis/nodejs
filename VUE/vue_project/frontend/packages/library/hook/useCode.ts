import { useEffect, useState } from 'react'
import { getCodeGroup } from '../util/fn'

/**
 * import { useCode } from 'library/hook/useCode'
 * const commonCodes = { category: 'PFM020', type: 'PFM015', cakes: 'PFM017' }
 * const { cCode } = useCode(commonCodes)
 * <SelectMui options={cCode['category']} placeholder="카테고리" />
 */
export const useCode = (commonCodes: { [key in string]: string }) => {
  const [cCode, setCcode] = useState({})
  const init = async () => setCcode(await getCodeGroup(commonCodes))

  useEffect(() => {
    init()
  }, [])

  return {
    cCode,
  }
}
