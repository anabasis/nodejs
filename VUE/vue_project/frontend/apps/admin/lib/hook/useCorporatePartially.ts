import { checkedAtom, prtnUserAtom } from '@store/client/corporatePartially'
import { useAtom, useAtomValue } from 'jotai'
import { CorporatePartiallyType } from 'library/type/common'
import { useEffect, useState } from 'react'
import { getCommonCorporateList } from '@api/common'
import { useModal, useParamsData } from 'library'

export const useCorporatePartially = () => {
  const { params, setChangeParams } = useParamsData()
  const [checkedPrtnUser, setCheckedPrtnUser] = useAtom(checkedAtom)
  const [prtnUserSearchList, setPrtnUserSearchList] = useState<CorporatePartiallyType[]>()
  const [tempChecked, setTempChecked] = useState<CorporatePartiallyType[]>([])
  const [keyWord, setKeyWord] = useState('')
  const prtnUserList = useAtomValue(prtnUserAtom)
  const { modalClose } = useModal()

  const checkedOnChange = (event: React.ChangeEvent<HTMLInputElement>, item: CorporatePartiallyType) => {
    const checked = event.target.checked

    if (checked) {
      setTempChecked((prev) => [...prev, item])
    }
    if (!checked) {
      setTempChecked((prev) => prev.filter((data) => data?.corporationNum !== item.corporationNum))
    }
  }

  const getQnaPartiallyMember = async (type?: string) => {
    try {
      const res = await getCommonCorporateList({ keyWord })

      if (!res) return

      if (type === 'init' && checkedPrtnUser.length > 0) {
        const checkedDefault = res.filter((item) => {
          return checkedPrtnUser.map((el) => el?.corporationNum).includes(item.corporationNum)
        })

        setCheckedPrtnUser(checkedDefault)
        setTempChecked(checkedDefault)
      }
      if (res) {
        setPrtnUserSearchList(res)
      }
    } catch (err) {
      console.error(31, err)
    }
  }
  const onIconSearch = () => getQnaPartiallyMember()

  const onChangeEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      getQnaPartiallyMember()
    }
  }

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(event.target.value)
  }

  const cancelPatially = () => {
    setChangeParams({ openLevelCode: 'PRV' })
    modalClose()
  }

  const removeChecked = (corporationNum: number) => {
    setTempChecked((prev) => prev.filter((check) => check?.corporationNum !== corporationNum))
  }

  const savePatially = () => {
    const prtnUserList = tempChecked.map((check: CorporatePartiallyType) => {
      return { corporationNum: check?.corporationNum }
    })
    setChangeParams({ openLevelCode: 'PTL', partiallyOpenRequests: prtnUserList })
    setCheckedPrtnUser(tempChecked)
    modalClose()
  }

  useEffect(() => {
    getQnaPartiallyMember('init')
  }, [])

  return {
    keyWord,
    tempChecked,
    prtnUserSearchList,
    checkedPrtnUser,
    prtnUserList,
    removeChecked,
    onIconSearch,
    checkedOnChange,
    onChangeEnter,
    onChangeSearch,
    cancelPatially,
    savePatially,
  }
}
