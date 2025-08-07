/**
 * 작성자 : 양수연
 * path : /software/detail?id=${id}
 */
'use client'
import { getSoftwareBasicInformation } from '@api/software'
import BasicInformation from '@components/software/detail/BasicInformation'
import Delete from '@components/software/detail/Delete'
import VersionBoard from '@components/software/detail/VersionBoard'
import { SoftwareBasicInfo } from '@type/software/softwareType'
import { AlertType, useAlert, useMenu } from 'library'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Breadcrumb, ButtonMui, ContentBox } from 'ui'

const pageTitleList = [`Apps Manage`, `Apps Manage Detail`]

const SoftwareDetail = () => {
  const router = useRouter()

  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const searchParams = useSearchParams()
  const appsId = searchParams.get('appsId')

  const isHistory = false

  const { alertOpen } = useAlert()
  const [basicInfo, setBasicInfo] = useState<SoftwareBasicInfo>()

  const init = () => {
    //1. Apps manage information API
    getSoftwareBasicInformation({ appsId }).then((response) => {
      setBasicInfo(response)
    })
  }

  useEffect(() => {
    init()
  }, [])

  //수정페이지 이동
  const handleClick = () => {
    router.push(`/software/update?appsId=${appsId}`)
  }

  // const alertState = (software: string): AlertType => ({
  const alertState: AlertType = {
    title: 'Are you sure to delete?',
    textTitle: <span>If you click the delete button, it cannot be recovered.</span>,
    maxWidth: 'xs', // maxwidth 없을 시 기본값 적용 (xs)
    icon: 'info',
    content: <Delete deleteId={appsId} isHistory={isHistory} />,
  }

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{basicInfo?.softwareName}</h1>
          </div>
          <div className="rgt">
            <ButtonMui
              color="secondary"
              size="large"
              icon="DeleteIcon"
              onClick={async () => {
                alertOpen(alertState)
              }}
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
            >
              Delete
            </ButtonMui>
            {/* <Delete appsId={appsId} /> */}
            <ButtonMui size="large" icon="EditIcon" onClick={() => handleClick()} disabled={getPathInfo(pathname).crtYn !== 'Y'}>
              Edit
            </ButtonMui>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        {/* 기본 정보 */}
        <BasicInformation basicInfo={basicInfo} />

        {/* 버전 히스토리 */}
        <article>
          <VersionBoard appsId={appsId} pathname={pathname} />
        </article>
      </ContentBox>
    </>
  )
}

export default SoftwareDetail
