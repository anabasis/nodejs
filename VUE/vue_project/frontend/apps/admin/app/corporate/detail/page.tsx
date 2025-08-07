/**
 * 작성자 : 양수연
 * 화면 : AO1.2 Corporate_ Corporate 상세
 * path : /corporate/detail?id=${id}
 */
'use client'
import { getCorporateDetail } from '@api/corporate'
import BasicInformation from '@components/corporate/detail/BasicInformation'
import CorporateMemberBoard from '@components/corporate/detail/CorporateMemberBoard'
import CorporateProjectBoard from '@components/corporate/detail/CorporateProjectBoard'
import DeleteCorporate from '@components/corporate/detail/DeleteCorporate'
import { Corporate, CorporateBasicInfo } from 'lib/type/corporate/corporateType'
import { AlertType, useAlert, useMenu } from 'library'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Breadcrumb, ButtonMui, ContentBox } from 'ui'

const pageTitleList = [`Corporate`, `Corporate Detail`]

const CorporateDetail = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  //CorporateNumber
  const { alertOpen } = useAlert()
  const id = searchParams.get('id')

  const [basicInfo, setBasicInfo] = useState<Corporate & CorporateBasicInfo>()
  const [corporateName, setCorporateName] = useState()
  const [memberCount, setMemberCount] = useState(0)

  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const init = async () => {
    const response = await getCorporateDetail(id)
    setBasicInfo(response)
    setCorporateName(response.corporationName)
    setMemberCount(response.memberCount)
  }
  useEffect(() => {
    init()
  }, [])

  const alertState: AlertType = {
    icon: 'info',
    title: 'Delete corporate',
    maxWidth: 's',
    textTitle: (
      <>
        <span>
          If corporate deleted, all members of the company will be withdrawn,
          <br />
          also domain information will be deleted.
          <br />
          Projects undertaken by companies will be stored for archival purposes.
        </span>
        <hr className="mt_30" />
      </>
    ),
    content: <DeleteCorporate corporateId={id} corporateName={corporateName} />,
  }

  return (
    <>
      {/* 헤더 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            {/* {기업명} */}
            <h1 className="headline1"> {corporateName}</h1>
          </div>
          <div className="rgt">
            {/* alert */}
            <ButtonMui
              color="secondary"
              icon="DeleteIcon"
              onClick={() => {
                alertOpen(alertState)
              }}
              size="large"
              type="contained"
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
            >
              Delete
            </ButtonMui>
            <ButtonMui
              color="primary"
              icon="EditIcon"
              onClick={() => {
                router.push(`/corporate/update?id=${id}`)
              }}
              size="large"
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
            >
              Edit
            </ButtonMui>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        {/* 기본 정보 */}
        <article>
          <div className="align">
            <p className="title1">Basic Information</p>
            <div className="rgt"></div>
          </div>
          <BasicInformation basicInfo={basicInfo} />
        </article>

        {/* Corporate 프로젝트 */}
        <article>
          <CorporateProjectBoard id={id} />
        </article>

        {/* Corporate 멤버 */}
        <article>
          <CorporateMemberBoard id={id} memberCount={memberCount} />
        </article>
      </ContentBox>
    </>
  )
}

export default CorporateDetail
