import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useMemo, useState } from 'react'
import { TermsCommonCodes, TermsDetailType } from '@type/terms'

import { isEmptyAnyPropertyCheck, isArrayEmptyPropertyCheck, isEmptyEveryCheck, changeTimeServer } from 'library'
import { CommonSelectOptionType } from 'library/type/common'
import { commonDataAtom, termsVersionAtom, editorFormAtom, editorFormEditAtom, paramsDataAtom } from '@store/client/terms'
import uuid from 'react-uuid'
import { usePathname } from 'next/navigation'
import { useTermskMuate } from '@store/server/useTermsQuery'
import { cloneDeep } from 'lodash-es'
export const useTermsEditor = () => {
  const [commonData, setCommonData] = useAtom(commonDataAtom)
  const pathname = usePathname()
  const isUpdate = pathname.includes('update')
  const setEditorInitLists = useSetAtom(editorFormEditAtom)
  const [editorList, setEditorList] = useAtom(editorFormAtom)
  const [termsVersion, setTermsVersion] = useAtom(termsVersionAtom)
  const params = useAtomValue(paramsDataAtom) as TermsDetailType
  const { termsAddMutate, termsEditMutate, termsAddLoading, termsEditLoading } = useTermskMuate()

  const isSaveLoading = useMemo(() => (isUpdate ? termsEditLoading : termsAddLoading), [termsAddLoading, termsEditLoading])

  const selectData = useMemo(() => {
    if (!commonData || isEmptyAnyPropertyCheck(commonData)) {
      return []
    }

    const { countryCode, langCode, termsCategoryCode } = commonData
    return { countryCode, langCode, termsCategoryCode }
  }, [commonData]) as TermsCommonCodes

  const langOptionData = useMemo(() => {
    if (!selectData || isEmptyAnyPropertyCheck(selectData)) {
      return []
    }
    if (!params?.conditionsDetail) return
    const newItem = {
      value: '',
      name: 'No item to choose.',
      disabled: true,
      hidden: false,
    }
    const isSeletedLangCode = ['en', ...editorList.map((lang) => lang.langCode)]

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
    if (!params?.conditionsDetail) return []

    const codtionData = [...(params.conditionsDetail || [])]
    return codtionData?.splice(1, params.conditionsDetail?.length - 1).map((el, i) => {
      return {
        id: uuid(),
        ...el,
      }
    })
  }, [params?.conditionsDetail])

  const addLanguageEditor = () => {
    setEditorList((prev) => [...prev, ...getEditorForm()])
  }

  const getEditorForm = () => {
    return Array.from({ length: 1 }, (_, index) => {
      return {
        id: uuid(),
        langCode: '',
        content: '',
      }
    })
  }

  const removeEditorForm = (id: number) => {
    setEditorList((prev) => prev.filter((editor, i) => editor.id !== id))
  }
  const getDisabled = () => {
    if (!params) return
    const paramsCheck = isEmptyEveryCheck(params)
    const editorListCheck = editorList.length === 0 ? false : isArrayEmptyPropertyCheck(editorList)
    const versionCheck = termsVersion ? +params.version <= +termsVersion || isNaN(+params.version) : isNaN(+params.version)

    return paramsCheck || editorListCheck || versionCheck
  }

  const updateTerms = () => {
    const { termsCategoryName, ...restParams } = params
    const cloneParams = cloneDeep(restParams)
    const conditionsDetailParams = cloneParams.conditionsDetail?.splice(0, 1).map(({ langName, ...rest }) => rest) || []
    const conditionsDetailEditorList = editorList.map(({ id, langName, ...rest }) => rest)
    const releaseDate = changeTimeServer({ time: restParams?.releaseDate, type: 'yyyy-MM-dd 23:59:59' })
    const param = {
      ...restParams,
      releaseDate,
      conditionsDetail: [...conditionsDetailParams, ...conditionsDetailEditorList],
    }

    termsEditMutate({ params: param })
  }

  const addTerms = () => {
    const param = {
      ...params,
      conditionsDetail: [...params.conditionsDetail, ...editorList.map(({ id, ...rest }) => rest)],
    }
    termsAddMutate({ params: param })
  }

  const saveTerms = () => {
    isUpdate ? updateTerms() : addTerms()
  }

  return {
    isSaveLoading,
    isUpdate,
    editAddLangFormList,
    selectData,
    editorList,
    termsVersion,
    termsAddLoading,
    termsEditLoading,
    langOptionData,
    setEditorInitLists,
    setCommonData,
    setEditorList,
    setTermsVersion,
    getDisabled,
    removeEditorForm,
    addLanguageEditor,
    saveTerms,
  }
}
