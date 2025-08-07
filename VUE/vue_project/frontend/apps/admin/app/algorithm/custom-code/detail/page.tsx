'use client'

import AlogorthmCodeVersionTable from '@components/algorithm/version/AlogorthmCodeVersionTable'
import { ContentBox, ButtonMui, Breadcrumb, DetailTable, PreTypo, BaseInput, TextArea } from 'ui'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getAlgorithmCustomCodeDetail } from '@api/algorithm/custom-code'
import { useEffect, useState } from 'react'
import { AlgoCodeDetailType } from '@type/algorithm/custom-code'
import { useMenu } from 'library'

const pageTitleList = ['Algorithm', 'Custom Code Detail']

const AlgoCodeDetail = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const PartialCodeId = searchParams.get('partialCodeId')
  const [algoCodeData, setAlgoCodeData] = useState<AlgoCodeDetailType>()
  const [editState, setEditState] = useState(false)
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const init = async () => {
    try {
      const data = await getAlgorithmCustomCodeDetail({ PartialCodeId })
      setAlgoCodeData(data)
    } catch (e) {
      console.error(e)
    }
  }

  const getBreadCrumb = () => (editState ? [...pageTitleList, 'Edit Custom Code Detail'] : pageTitleList)

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      {algoCodeData && (
        <>
          <div className="sticky_wrap">
            <ContentBox type="top_content">
              {/* lft/rgt 가 좌우로 정렬됩니다.  */}
              <div className="lft">
                <Breadcrumb pageTitleList={getBreadCrumb()} />
                <h1 className="headline1" onClick={() => setEditState(false)}>
                  {algoCodeData?.latestPartialCodeVer?.name}
                </h1>
              </div>
              <div className="rgt">
                <ButtonMui
                  size="large"
                  icon="EditIcon"
                  disabled={getPathInfo(pathname).crtYn !== 'Y'}
                  iconStyle={{ fill: '#fff' }}
                  onClick={() => router.push(`/algorithm/custom-code/edit?partialCodeId=${PartialCodeId}`)}
                >
                  Edit
                </ButtonMui>
              </div>
            </ContentBox>
          </div>

          <ContentBox>
            <article>
              <div className="cont_title_box">
                <p className="title1">Basic Information</p>
              </div>
              <DetailTable
                colgroup={
                  <colgroup>
                    <col width="220px" />
                    <col width="auto" />
                  </colgroup>
                }
              >
                <tr>
                  <th className="">Custom code name</th>
                  <td>{editState ? <BaseInput disabled value={algoCodeData?.name} /> : algoCodeData?.name}</td>
                </tr>
                <tr>
                  <th className="va_top pt_20">Description</th>
                  <td className={`va_top ${editState ? '' : 'pt_20'}`}>
                    {/* textarea로 작성된 내용이 들어갑니다  */}
                    {editState ? (
                      <TextArea height={100} value={algoCodeData?.desc} maxLength={500} />
                    ) : (
                      <PreTypo className="max_h200 ovf_a">{algoCodeData?.desc}</PreTypo>
                    )}
                  </td>
                </tr>
              </DetailTable>
            </article>

            <AlogorthmCodeVersionTable PartialCodeId={PartialCodeId} />
          </ContentBox>
        </>
      )}
    </>
  )
}
export default AlgoCodeDetail
