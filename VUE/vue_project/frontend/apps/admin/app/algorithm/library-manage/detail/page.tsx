'use client'

import AlogorthmLibVersionTable from '@components/algorithm/version/AlogorthmLibVersionTable'
import { ContentBox, ButtonMui, Breadcrumb, DetailTable, PreTypo, BaseInput, TextArea } from 'ui'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getAlgorithmLibListDetail } from '@api/algorithm/library'
import { useEffect, useState } from 'react'
import { AlgoLibDetailType } from '@type/algorithm/library'
import { useMenu } from 'library'
const pageTitleList = ['Algorithm', 'Library Detail']

const AlgoLibraryDetail = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const libId = searchParams.get('libId')
  const [algoLibData, setAlgoLibData] = useState<AlgoLibDetailType>()
  const [editState, setEditState] = useState(false)
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const init = async () => {
    try {
      const data = await getAlgorithmLibListDetail({ libId })
      setAlgoLibData(data)
    } catch (e) {
      console.error(e)
    }
  }

  const getBreadCrumb = () => (editState ? [...pageTitleList, 'Edit Library Detail'] : pageTitleList)

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      {algoLibData && (
        <>
          <div className="sticky_wrap">
            <ContentBox type="top_content">
              {/* lft/rgt 가 좌우로 정렬됩니다.  */}
              <div className="lft">
                <Breadcrumb pageTitleList={getBreadCrumb()} />
                <h1 className="headline1" onClick={() => setEditState(false)}>
                  {algoLibData?.name}
                </h1>
              </div>
              <div className="rgt">
                <ButtonMui
                  size="large"
                  icon="EditIcon"
                  disabled={getPathInfo(pathname).crtYn !== 'Y'}
                  iconStyle={{ fill: '#fff' }}
                  onClick={() => router.push(`/algorithm/library-manage/edit?libId=${libId}`)}
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
                  <th className="">Library name</th>
                  <td>{editState ? <BaseInput disabled value={algoLibData?.name} /> : algoLibData?.name}</td>
                </tr>
                <tr>
                  <th className="va_top pt_20">Description</th>
                  <td className="va_top pt_20">
                    {/* textarea로 작성된 내용이 들어갑니다  */}
                    {editState ? (
                      <TextArea height={100} value={algoLibData?.desc} maxLength={500} />
                    ) : (
                      <PreTypo className="max_h200 ovf_a">{algoLibData?.desc}</PreTypo>
                    )}
                  </td>
                </tr>
              </DetailTable>
            </article>

            <AlogorthmLibVersionTable libId={libId} />
          </ContentBox>
        </>
      )}
    </>
  )
}
export default AlgoLibraryDetail
