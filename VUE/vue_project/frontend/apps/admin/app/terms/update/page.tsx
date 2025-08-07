'use client'
import { useEffect } from 'react'
import { Breadcrumb, ContentBox } from 'ui'
import { useSearchParams } from 'next/navigation'
import { isEmptyPropertyCheck, useParamsData, getSelectPromiseSettled, getCode, changeTimeLocal } from 'library'
import TermsContent from '@components/terms/TermsContent'
import { TermsCommonCodes, TermsDetailType } from '@type/terms'

import { getCommonCountryGruop, getCommonLanguageList } from '@api/common'
import { useTermsEditor } from '@hook/useTermsEditor'
import { termsDataAtom } from '@store/client/terms'
import { useAtom } from 'jotai'
import { getTermDetail } from '@api/terms'

const pageTitleList = ['Terms & Conditions', 'Terms & Conditions Detail', 'Terms & Conditions Update']

const commonCodes = {
  countryCode: ['countryGroupId', 'countryGroupName'],
  langCode: 'init',
  termsCategoryCode: 'PFM047',
}

const initData = {
  termsCategoryCode: '',
  version: '',
  countryCode: '',
  releaseDate: '',
  conditionsDetail: [{ langCode: 'en', content: '' }],
  termsNum: null,
  termsVersionNum: null,
  termsCategoryName: '',
}

const TermsUpdatePage = () => {
  const searchParams = useSearchParams()
  const termsVersionNum = searchParams.get('versionNum')
  const { setCommonData, setEditorInitLists, setTermsVersion, setEditorList } = useTermsEditor()
  const { params, resetParams, isParamsLoading, eidtInitParams } = useParamsData<TermsDetailType>()
  const [termsData, setTermsData] = useAtom(termsDataAtom)

  const init = () => {
    getCommonData()
    if (isEmptyPropertyCheck(termsData)) {
      eidtInitParams(initData, {
        ...termsData,
        releaseDate: changeTimeLocal({ time: termsData?.releaseDate, type: 'yyyy-MM-dd' }),
      })
      setTermsVersion(termsData.version)
      setEditorInitLists()
      return
    }
    getDetailData()
  }

  const getCommonData = async () => {
    const res = (await getSelectPromiseSettled<TermsCommonCodes>(commonCodes, [
      getCommonCountryGruop(),
      getCommonLanguageList(),
      getCode('PFM047'),
    ])) as TermsCommonCodes
    setCommonData(res)
  }

  const getDetailData = async () => {
    try {
      const res: TermsDetailType[] = await getTermDetail({ versionNum: termsVersionNum })
      if (res) {
        eidtInitParams(initData, {
          ...res[0],
          releaseDate: changeTimeLocal({ time: res[0]?.releaseDate, type: 'yyyy-MM-dd' }),
        })
        setTermsVersion(res[0]?.version)
        setEditorInitLists()
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    init()

    return () => {
      resetParams()
      setEditorList([])
      setTermsData(null)
      setTermsVersion(null)
      setCommonData(null)
    }
  }, [])

  return (
    <>
      {/* 헤더 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{params?.termsCategoryName}</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>{!isParamsLoading && <TermsContent />}</ContentBox>
    </>
  )
}

export default TermsUpdatePage
