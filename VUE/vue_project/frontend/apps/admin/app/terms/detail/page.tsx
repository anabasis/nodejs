'use client'

import { Breadcrumb, ButtonMui, ContentBox, BaseTab, Dl, ContentBoxWrap } from 'ui'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import LangauageTerms from '@components/terms/LangauageTerms'
import { termsDataAtom, termsIniData } from '@store/client/terms'
import { getTermDetail } from '@api/terms'
import { useAtom, useAtomValue } from 'jotai'
import { AlertType, changeTimeLocal, isEmptyCheck, scrollTopMain, setDescListData, useAlert, useMenu } from 'library'
import { TermsDetailType } from '@type/terms'
import { useTermskMuate } from '@store/server/useTermsQuery'
const pageTitleList = ['Terms & Conditions', 'Terms & Conditions Detail']

type TabCickType = {
  oldIndex: number
  newIndex: number
}

function TermsDetailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const versionNum = searchParams.get('versionNum')
  const [termsData, setTermsData] = useAtom(termsDataAtom)
  const { termsDeleteMutate } = useTermskMuate()
  const [tabIndex, setTabIndex] = useState(0)
  const { alertOpen, alertClose } = useAlert()

  const init = async () => {
    try {
      const res: TermsDetailType[] = await getTermDetail({ versionNum })
      if (res) {
        setTermsData(res?.[0])
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    init()
    return () => {
      if (!window.location.pathname.includes('update')) {
        setTermsData(null)
      }
    }
  }, [])

  const tabData = termsData?.conditionsDetail?.map((tab, index) => {
    return {
      tabName: tab.langName,
      content: <LangauageTerms key={index} index={index} />,
    }
  })

  const getContent = () => {
    if (!termsData?.conditionsDetail) return
    scrollTopMain()
    return tabData?.[tabIndex]?.content
  }

  const handleTabChange = ({ oldIndex, newIndex }: TabCickType) => {
    setTabIndex(newIndex)
  }
  const setDescList = useMemo(() => {
    if (!isEmptyCheck(termsData)) return []

    const { termsNum, termsCategoryName, countryName, releaseDate, version } = termsData
    const descTitleArr = ['No.', 'Category', 'Country Group', 'Release Date', 'Version']
    const listInfoValueArr = [String(termsNum), termsCategoryName, countryName, changeTimeLocal({ time: releaseDate, type: 'yyyy-MM-dd' }), version]

    return setDescListData(descTitleArr, listInfoValueArr)
  }, [termsData])

  const deleteTerms = () => {
    termsDeleteMutate({ termsofserviceId: versionNum })
    alertClose()
  }

  const deleteProcess = () => {
    const alertState: AlertType = {
      InfoType: 'delete',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => deleteTerms()}>
            Delete
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">
              {termsData?.termsCategoryName} V.{termsData?.version}
            </h1>
            <Dl listData={setDescList} />
          </div>
          <div className="rgt">
            {/* top_content btn size :: large */}
            <ButtonMui disabled={getPathInfo(pathname).crtYn !== 'Y'} color="secondary" icon="DeleteIcon" size="large" type="contained" onClick={deleteProcess}>
              Delete
            </ButtonMui>

            <ButtonMui
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
              color="primary"
              icon="ResetIcon"
              onClick={() => router.push(`/terms/update?versionNum=${versionNum}`)}
              size="large"
              type="contained"
            >
              Update
            </ButtonMui>
          </div>
        </ContentBox>
        <BaseTab tabData={tabData} onChange={handleTabChange} />
      </div>
      <ContentBox>{getContent()}</ContentBox>
    </>
  )
}

export default TermsDetailPage
