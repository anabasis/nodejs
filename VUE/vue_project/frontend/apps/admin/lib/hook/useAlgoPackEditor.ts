import { useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { getAlgoNameVer, getAlgorithmLibVerDetail } from '@api/algorithm/library'
import { getAlgorithmCustomCodeVer, getAlgorithmCustomCodeList, getAlgorithmCustomCodeDetailVer } from '@api/algorithm/custom-code'
import { AlogrithmCustomCodeListReturnType, CustomCodeContent, latestPartialCodeVerType } from '@type/algorithm/custom-code'
import { LibContentType, LibVerWidthIdListType } from '@type/algorithm'
import { every, has } from 'lodash-es'
import { useUser } from 'library'
import { useAlogoPackMutate } from '@store/server/algorithm/useAlogPackQuery'
import { usePathname, useSearchParams } from 'next/navigation'
import { atom, useAtom } from 'jotai'
const libValidArr = ['bpn', 'dsp', 'postproc', 'ctcalc', 'mudt']
const keyArr = [...libValidArr, 'crosstalk', 'custom']

type SelectType = {
  bpn: LibContentType
  dsp: LibContentType
  post: LibContentType
  ct: LibContentType
  mudt: LibContentType
  cross: LibContentType
  custom: AlogrithmCustomCodeListReturnType
  version?: latestPartialCodeVerType[]
}

const relaseAtom = atom({})
const selectOptionAtom = atom({})
export const useAlgoPackEditor = (params?) => {
  const { userInfo } = useUser()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [isEdit, isDetail, algoPackId] = [pathname.includes('edit'), pathname.includes('detail'), searchParams.get('algoPackId')]

  const [selectData, setSelectData] = useAtom(selectOptionAtom)
  const [releaseNote, setReleaseNote] = useAtom(relaseAtom)

  const [isEditorLoading, setIsEitorLoading] = useState(true)
  const { algohmPackAdd, algohmPackPut, algoPackAddLoading, algoPackEditLoading } = useAlogoPackMutate()

  const isSaveLoading = useMemo(() => (isEdit ? algoPackEditLoading : algoPackAddLoading), [algoPackAddLoading, algoPackEditLoading])

  const algoPackName = useMemo(() => {
    const today = new Date()
    const formattedDate = format(today, 'yyyyMMddHHmm')
    return `ALP${formattedDate}`
  }, [])

  const getLibSelectedNote = async ({ libId, libVerId, name }) => {
    try {
      const res: LibVerWidthIdListType[] = await getAlgorithmLibVerDetail({ libId, libVerId })
      if (res) {
        setReleaseNote((prev) => {
          return {
            ...prev,
            [name]: res,
          }
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getCustomSelectedNote = async ({ PartialCodeId, PartialCodeVerId, selectedKey }) => {
    try {
      const res: latestPartialCodeVerType[] = await getAlgorithmCustomCodeDetailVer({ PartialCodeId, PartialCodeVerId })
      if (res) {
        setReleaseNote((prev) => {
          return {
            ...prev,
            [selectedKey]: res,
          }
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getCustomSelectedVersion = async ({ PartialCodeId, name }) => {
    try {
      const res: latestPartialCodeVerType[] = await getAlgorithmCustomCodeVer({ currentPage: 0, PartialCodeId })
      if (res) {
        const newData = res.map((custom) => {
          return {
            ...custom,
            value: custom.id.toString(),
            name: custom.version,
          }
        })
        setSelectData((prev) => {
          return {
            ...prev,
            [name]: newData,
          }
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getCustomVersion = (partialCodeId: number, selectedKey: string) => {
    const customInfo: CustomCodeContent[] = selectData[selectedKey]
    const { value: PartialCodeId } = customInfo.filter((custom) => custom.value === partialCodeId.toString())[0]

    getCustomSelectedVersion({ PartialCodeId, name: 'version' })
  }

  const selectedCustomNote = (PartialCodeVerId: number, selectedKey: string) => {
    getCustomSelectedNote({ PartialCodeId: params?.partialCodeVerId, PartialCodeVerId, selectedKey })
  }

  const selectedLibNote = (libVerId: number, selectedKey: string) => {
    if (libVerId === -1) {
      setReleaseNote((prev) => {
        return {
          ...prev,
          [selectedKey]: null,
        }
      })

      return
    }

    const libId = selectData[selectedKey].id
    const name = selectData[selectedKey].name.toLocaleLowerCase()

    getLibSelectedNote({ libId, libVerId, name })
  }

  const init = () => {
    Promise.allSettled([
      getAlgoNameVer({ libName: 'BPN' }),
      getAlgoNameVer({ libName: 'DSP' }),
      getAlgoNameVer({ libName: 'PostProc' }),
      getAlgoNameVer({ libName: 'CtCalc' }),
      getAlgoNameVer({ libName: 'MuDT' }),
      getAlgoNameVer({ libName: 'Crosstalk' }),
      getAlgorithmCustomCodeList({ currentPage: 0, searchFilterParams: { size: 50 } }),
    ])
      .then((result) => {
        const res = result.reduce((acc, cur, i) => {
          if (cur.status === 'fulfilled') {
            const data = cur.value

            if (data?.libVerWithIdList) {
              const libVerWithIdList = data.libVerWithIdList.map((item) => ({
                value: item.id.toString(),
                name: item.version,
                ...item,
              }))

              acc[keyArr[i]] = {
                ...data,
                libVerWithIdList,
              }

              return acc
            }

            if (keyArr[i] === 'custom') {
              acc[keyArr[i]] = data?.content.map((item) => ({
                ...item,
                value: item.id.toString(),
              }))

              return acc
            }

            acc[keyArr[i]] = data
          }
          return acc
        }, {} as SelectType)

        setSelectData((prev) => {
          return {
            ...prev,
            ...res,
          }
        })
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsEitorLoading(false)
      })
  }

  const editSave = () => {
    const { bpn, ctcalc, mudt, dsp, postproc, crosstalk, version, status, partialCodeVerId, ...rest } = params
    const libVerIdList = [bpn, ctcalc, mudt, dsp, postproc, crosstalk].map((el) => el?.libId)
    const param = {
      name: algoPackName,
      requestBy: userInfo?.usrNm,
      requestEmail: userInfo?.emlId,
      libVerIdList: [...libVerIdList, version].filter((item) => item),
      ...rest,
    }
    if (partialCodeVerId) {
      Object.assign(param, {
        partialCodeVerId: +version,
      })
    }

    algohmPackPut({ algoPackId, params: param, status: status === 'Released' ? 'RELEASED' : 'DEVELOPED' })
  }

  const addSave = () => {
    const { bpn, ctcalc, mudt, dsp, postproc, version, partialCodeVerId, crosstalk, ...rest } = params

    const param = {
      name: algoPackName,
      requestBy: userInfo?.usrNm,
      requestEmail: userInfo?.emlId,
      libVerIdList: [+bpn, +ctcalc, +mudt, +dsp, +postproc, +crosstalk].filter((item) => item >= 0),
      ...rest,
    }

    if (partialCodeVerId) {
      Object.assign(param, {
        partialCodeVerId: +version,
      })
    }

    algohmPackAdd({ params: param })
  }
  const save = () => {
    isEdit ? editSave() : addSave()
  }

  const libVerValid = () => every(libValidArr, (value) => has(params, value))

  useEffect(() => {
    !isDetail && init()
  }, [])

  return {
    isEdit,
    isDetail,
    algoPackName,
    selectData,
    releaseNote,
    isEditorLoading,
    isSaveLoading,
    setSelectData,
    libVerValid,
    setReleaseNote,
    getLibSelectedNote,
    getCustomSelectedNote,
    getCustomSelectedVersion,
    getAlgorithmCustomCodeDetailVer,
    selectedLibNote,
    getCustomVersion,
    selectedCustomNote,
    save,
  }
}
