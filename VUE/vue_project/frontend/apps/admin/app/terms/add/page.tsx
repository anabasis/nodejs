'use client'
import { useEffect } from 'react'
import { Breadcrumb, ContentBox } from 'ui'
import { getCode, getSelectPromiseSettled, useParamsData } from 'library'
import TermsContent from '@components/terms/TermsContent'
import { TermsAddParamsType, TermsCommonCodes } from '@type/terms'

import { getCommonCountryGruop, getCommonLanguageList } from '@api/common'
import { useTermsEditor } from '@hook/useTermsEditor'

const commonCodes = {
  countryCode: ['countryGroupId', 'countryGroupName'],
  langCode: 'init',
  termsCategoryCode: 'PFM047',
}
const pageTitleList = ['Terms & Conditions', 'Add Terms & Conditions']

const initData = {
  termsCategoryCode: '',
  version: '',
  countryCode: '',
  releaseDate: '',
  conditionsDetail: [{ langCode: 'en', content: '' }],
}

const TermsAddPage = () => {
  const { setCommonData, setEditorList } = useTermsEditor()
  const { resetParams, isParamsLoading } = useParamsData<TermsAddParamsType>(initData)

  const init = async () => {
    const res = (await getSelectPromiseSettled<TermsCommonCodes>(commonCodes, [
      getCommonCountryGruop(),
      getCommonLanguageList(),
      getCode('PFM047'),
    ])) as TermsCommonCodes
    setCommonData(res)
  }

  useEffect(() => {
    init()

    return () => {
      resetParams()
      setEditorList([])
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Add Terms & Conditions</h1>
          </div>
        </ContentBox>
      </div>

      <ContentBox>{!isParamsLoading && <TermsContent />}</ContentBox>
    </>
  )
}

export default TermsAddPage
