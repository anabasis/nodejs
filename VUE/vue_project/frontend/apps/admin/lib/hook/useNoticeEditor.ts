import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useMemo } from 'react'
import { NoticeCommonCodesType, NoticeAddParamsType } from '@type/notice'
import { isEmptyAnyPropertyCheck, isArrayEmptyPropertyCheck, isEmptyEveryCheck, getCode, getSelectPromiseSettled, FileListDataType, paramsAtom } from 'library'
import { commonDataAtom, editorFormAtom, editorFormEditAtom } from '@store/client/notice'
import { checkedAtom, checkedCount } from '@store/client/corporatePartially'
import { getCommonLanguageList } from '@api/common'
import uuid from 'react-uuid'
import { usePathname, useSearchParams } from 'next/navigation'
import { useNoticeMuate } from '@store/server/useNotcieQuery'
import { cloneDeep } from 'lodash-es'
import { CommonSelectOptionType } from 'library/type/common'

const paramsDataAtom = atom((get) => get(paramsAtom))

const commonCodes = {
  category: 'PFM001',
  exposureTypeCode: 'PFM002',
  exposurePeriodTypeCode: 'PFM003',
  exposureFrequencyCode: 'PFM004',
  type: 'PFM005',
  openLevel: 'PFM013',
  langCode: 'init',
}

export const useNoticeEditor = () => {
  const params = useAtomValue(paramsDataAtom) as NoticeAddParamsType
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [noticeId, isEdit] = [searchParams.get('noticeId'), pathname.includes('edit')]
  const [commonData, setCommonData] = useAtom(commonDataAtom)
  const setEditorInitLists = useSetAtom(editorFormEditAtom)
  const [editorList, setEditorList] = useAtom(editorFormAtom)
  const corporateCheckedCount = useAtomValue(checkedCount)
  const setCheckedPrtnUser = useSetAtom(checkedAtom)
  const { noticeEditMutate, noticeAddMutate, noticeAddLoading, noticeEditLoading } = useNoticeMuate()

  const isSaveLoading = useMemo(() => (isEdit ? noticeEditLoading : noticeAddLoading), [noticeAddLoading, noticeEditLoading])

  const selectData = useMemo(() => {
    if (!commonData || isEmptyAnyPropertyCheck(commonData)) {
      return []
    }

    const { category, type, openLevel, exposureFrequencyCode, exposurePeriodTypeCode, exposureTypeCode, corporate, langCode } = commonData

    return { category, type, openLevel, exposureFrequencyCode, exposurePeriodTypeCode, exposureTypeCode, corporate, langCode }
  }, [commonData]) as NoticeCommonCodesType

  const langOptionData = useMemo(() => {
    if (!selectData || isEmptyAnyPropertyCheck(selectData)) {
      return []
    }

    if (!params?.noticeMultiLanguage) return
    const newItem = {
      value: '',
      name: 'No item to choose.',
      disabled: true,
      hidden: false,
    }
    const isSeletedLangCode = ['en', ...editorList.map((lang) => lang.languageCode)]

    const cloneLangOption = cloneDeep(selectData.langCode)?.map((lang) => {
      if (editorList.length === 0) return lang
      return {
        ...lang,
        value: lang.value,
        name: lang.name,
        hidden: isSeletedLangCode.includes(lang.value),
      }
    })
    const allFalse = cloneLangOption?.every((lang) => lang.hidden)

    return allFalse ? [...cloneLangOption, newItem] : cloneLangOption
  }, [selectData, editorList]) as CommonSelectOptionType[]

  const editAddLangFormList = useMemo(() => {
    if (!params?.noticeMultiLanguage) return []

    const codtionData = [...(params.noticeMultiLanguage || [])]
    return codtionData?.splice(1, params.noticeMultiLanguage?.length - 1).map((el, i) => {
      return {
        id: uuid(),
        ...el,
      }
    })
  }, [params?.noticeMultiLanguage])

  const addLanguageEditor = () => {
    setEditorList((prev) => [...prev, ...getEditorForm()])
  }

  const getEditorForm = () => {
    return Array.from({ length: 1 }, (_, index) => {
      return {
        id: uuid(),
        title: '',
        languageCode: '',
        content: '',
      }
    })
  }

  const removeEditorForm = (id: number) => {
    setEditorList((prev) => prev.filter((editor, i) => editor.id !== id))
  }
  const getDisabled = () => {
    if (!params) return
    const { exposureFrequencyCode, exposurePeriodTypeCode, ...rest } = params
    const paramsCheck = isEmptyEveryCheck(params.exposureTypeCode === 'NP02' ? params : rest)
    const editorListCheck = editorList.length === 0 ? false : isArrayEmptyPropertyCheck(editorList)
    const isPtlMemberCheck = params?.openLevelCode === 'PTL' && (!params?.partiallyOpenRequests || params?.partiallyOpenRequests.length === 0)

    return paramsCheck || editorListCheck || isPtlMemberCheck
  }

  const isSelected = useMemo(() => {
    return params?.exposureTypeCode === 'NP01'
  }, [params?.exposureTypeCode])

  const saveNotice = (files: FileListDataType) => {
    /* 수정 */
    const {
      exposureFrequencyCode,
      exposurePeriodTypeCode,
      exposureTypeCode,
      noticeMultiLanguage,
      openLevelCode,
      partiallyOpenRequests: noticePartiallyOpenRequests,
      noticeAttachmentRequests,
      ...rest
    } = params
    const cloenLanguageParams = [...params.noticeMultiLanguage]
    const noticeMultiLanguageParams = cloenLanguageParams.splice(0, 1) || []
    const noticeMultiLanguageEditorList = editorList.map(({ id, langName, ...rest }) => rest)

    const param = {
      ...rest,
      openLevelCode,
      exposureTypeCode,
      noticeAttachmentRequests: files.map(({ fileNumber }) => ({ fileNumber })),
      noticeMultiLanguage: [...noticeMultiLanguageParams, ...noticeMultiLanguageEditorList],
    }

    if (openLevelCode === 'PTL') {
      Object.assign(param, {
        noticePartiallyOpenRequests,
      })
    } else {
      delete param.noticePartiallyOpenRequests
    }
    if (exposureTypeCode === 'NP02') {
      Object.assign(param, {
        exposureFrequencyCode,
        exposurePeriodTypeCode,
      })
    }

    isEdit
      ? noticeEditMutate({
          noticeId,
          params: param,
        })
      : noticeAddMutate({ params: param })
  }

  const initCodes = async () => {
    const res = (await getSelectPromiseSettled<NoticeCommonCodesType>(commonCodes, [
      getCode('PFM001'),
      getCode('PFM002'),
      getCode('PFM003'),
      getCode('PFM004'),
      getCode('PFM005'),
      getCode('PFM013'),
      getCommonLanguageList(),
    ])) as NoticeCommonCodesType

    setCommonData(res)
  }

  return {
    selectData,
    editAddLangFormList,
    editorList,
    isSelected,
    corporateCheckedCount,
    commonData,
    isEdit,
    langOptionData,
    isSaveLoading,
    saveNotice,
    setCheckedPrtnUser,
    setCommonData,
    setEditorInitLists,
    setEditorList,
    getDisabled,
    removeEditorForm,
    addLanguageEditor,
    initCodes,
  }
}
