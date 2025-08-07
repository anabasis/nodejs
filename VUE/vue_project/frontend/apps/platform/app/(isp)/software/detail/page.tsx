/**
 * 작성자 : 양수연
 * 화면 : SW1.1 : 소프트웨어 상세
 * path : /guide/software/[id]
 */
'use client'
import BasicInformation from '@components/software/detail/BasicInformation'
import VersionBoard from '@components/software/detail/VersionBoard'
import { SoftwareBasicInfo } from '@type/software/softwareType'
import { api } from 'library/util'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Breadcrumb, ContentBox } from 'ui'

const pageTitleList = [`Apps Download`, `Apps Download Detail`]

const SoftwareDetail = () => {
  const searchParams = useSearchParams()
  const appsId = searchParams.get('appsId')

  const [basicInfo, setBasicInfo] = useState<SoftwareBasicInfo>()

  //1. Basic information API
  const getBasicInfo = async () => {
    const response = await api.get(`/software/${appsId}/detail`)
    setBasicInfo(response.data)
  }
  useEffect(() => {
    getBasicInfo()
  }, [])
  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{basicInfo?.softwareName}</h1>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        {/* 기본 정보 */}
        <BasicInformation basicInfo={basicInfo} />
        {/* 버전 히스토리 */}
        <article>
          <div className="cont_title_box">
            <p className="title1">Version History</p>
          </div>

          <VersionBoard appsId={appsId} />
        </article>
      </ContentBox>
    </>
  )
}

export default SoftwareDetail
