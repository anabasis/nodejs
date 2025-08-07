import { useCode, FileListDataType, isEmptyAnyPropertyCheck, useToastPopup } from 'library'
import { LibraryCommonCodeType, LibraryManualListAddParamsType } from '@type/library'
import { useMemo } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useAtomValue, useSetAtom } from 'jotai'
import { checkedAtom, checkedCount } from '@store/client/corporatePartially'
import { useLibraryMuate } from '@store/server/useLibraryQuery'
const commonCodes = { openLevel: 'PFM013' }

type UseLibraryEditorType = {
  params: LibraryManualListAddParamsType
  setChangeParams?: (data: unknown) => void
}

const downloadOption = [
  { name: 'Unavailable', value: 'N' },
  { name: 'Available', value: 'Y' },
]

export const useLibraryEditor = ({ params, setChangeParams }: UseLibraryEditorType) => {
  const router = useRouter()
  const pathname = usePathname()
  const setCheckedPrtnUser = useSetAtom(checkedAtom)
  const searchParams = useSearchParams()
  const [isEdit, librCatNum, librNum, libTitle] = [pathname.includes('edit'), searchParams.get('manualsId'), searchParams.get('id'), searchParams.get('title')]

  const { toastOpen, getToastState } = useToastPopup()
  const { libraryManualsListAddMutate, libraryManualsListEditMutate, libraryAddLoading, libraryEditLoading } = useLibraryMuate()
  const { cCode } = useCode(commonCodes) as { cCode: LibraryCommonCodeType }
  const corporateCheckedCount = useAtomValue(checkedCount)

  const isSaveLoading = useMemo(() => (isEdit ? libraryEditLoading : libraryAddLoading), [libraryAddLoading, libraryEditLoading])

  const selectData = useMemo(() => {
    if (!cCode || isEmptyAnyPropertyCheck(cCode)) {
      return []
    }

    const { openLevel } = cCode

    return { openLevel }
  }, [cCode]) as LibraryCommonCodeType

  const saveLibrary = (files: FileListDataType) => {
    const { openLevelCode: openLvlCd, fileInfoResponses, partiallyOpenRequests: ptlCorpCode, ...rest } = params
    const manualsFileNum = files?.map((file) => file.fileNumber)

    const param = {
      ...rest,
      librCatNum: +librCatNum,
      openLvlCd,
      ptlCorpCode: [],
    }

    if (openLvlCd === 'PTL') {
      Object.assign(param, {
        ptlCorpCode: ptlCorpCode?.map((item) => item.corporationNum || item),
      })
    } else {
      Object.assign(param, {
        ptlCorpCode: [],
      })
    }

    isEdit
      ? libraryManualsListEditMutate(
          { params: { ...param, librNum: +librNum, manualsDetailFileNum: manualsFileNum } },
          {
            onSuccess: () => {
              toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
              router.push(`/library/list/?manualsId=${librCatNum}&title=${libTitle}`)
            },
          }
        )
      : libraryManualsListAddMutate(
          { params: { ...param, manualsFileNum } },
          {
            onSuccess: () => {
              toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
              router.push(`/library/list/?manualsId=${librCatNum}&title=${libTitle}`)
            },
          }
        )
  }

  const cancelLibrary = () => {
    router.push(`/library/list/?manualsId=${librCatNum}&title=${libTitle}`)
  }
  const getDisabled = () => {
    if (!params) return

    const isPtlMemberCheck = params?.openLevelCode === 'PTL' && (!params?.partiallyOpenRequests || params?.partiallyOpenRequests.length === 0)
    return isPtlMemberCheck
  }

  return {
    isSaveLoading,
    libraryAddLoading,
    libraryEditLoading,
    librNum,
    selectData,
    isEdit,
    corporateCheckedCount,
    downloadOption,
    setCheckedPrtnUser,
    saveLibrary,
    cancelLibrary,
    getDisabled,
  }
}
