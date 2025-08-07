// 작업자 : 최유희

'use client'
import { ContentBox, ButtonMui, ContentBoxWrap, DetailTable, PreTypo, Breadcrumb, Dl, FileCard } from 'ui'
import { getAlgorithmLibVerDetail, getAlgorithmLibDownolad } from '@api/algorithm/library'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlgoLibVersionDetailType } from '@type/algorithm/library'
import { AlertType, changeTimeLocal, useAlert } from 'library'
import { useAlogoMutate } from '@store/server/algorithm/useAlogLibQuery'

const pageTitleList = ['Algorithm', 'Library Detail', 'Library Version Detail']

const AlgoLibDetailVersion = () => {
  const [versionData, setVersionData] = useState<AlgoLibVersionDetailType>()
  const searchParams = useSearchParams()
  const libId = searchParams.get('libId')
  const libVerId = searchParams.get('libVerId')
  const { alertOpen, alertClose } = useAlert()
  const { algohmLibVerDelete } = useAlogoMutate(libId)

  const init = async () => {
    try {
      const data = await getAlgorithmLibVerDetail({ libId, libVerId })
      if (data) {
        setVersionData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const deletedLibVer = () => {
    algohmLibVerDelete(
      { libId, libVerId },
      {
        onSettled: () => {
          alertClose()
        },
      }
    )
  }

  const download = async (libVerId: number, libFilName: string) => {
    try {
      const data = await getAlgorithmLibDownolad({ libVerId })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(data)
      a.download = `${libFilName}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error(error)
    }
  }

  const deletedProcess = () => {
    const alertState: AlertType = {
      InfoType: 'delete',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={deletedLibVer}>
            Delete
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }
  useEffect(() => {
    init()
  }, [])

  return (
    <>
      {/* 헤더 */}
      <div className="sticky_wrap">
        {/* 페이지 상단 박스 케이스 */}
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">
              {versionData?.libName} {versionData?.version}
            </h1>
            <Dl listData={[{ listTitle: 'Library Name', listInfo: versionData?.libName }]} />
          </div>
          <div className="rgt">
            <ButtonMui color="primary" icon="DeleteIcon" onClick={deletedProcess} size="large" type="contained">
              Delete
            </ButtonMui>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        {/* Library Version 상세 페이지 */}
        <article>
          <div className="cont_title_box">
            <p className="title1">Basic Information</p>
          </div>
          <DetailTable
            colgroup={
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
            }
          >
            <tr>
              <th>
                <span className="">Version</span>
              </th>
              <td>{versionData?.version}</td>
              <th>
                <span>Release date</span>
              </th>
              <td>{changeTimeLocal({ time: versionData?.releaseDt, type: 'yyyy-MM-dd' })}</td>
            </tr>
            <tr>
              <th className="vt">Wrapper code</th>
              <td colSpan={3}>
                <PreTypo className="ptb_10 white_space_pre">{versionData?.src}</PreTypo>
              </td>
            </tr>
            <tr>
              <th className="vt">Release note</th>
              <td colSpan={3}>
                <PreTypo className="max_h150 ovf_a ptb_10">{versionData?.note}</PreTypo>
              </td>
            </tr>
            <tr>
              <th className="vt">
                <span>File </span>
              </th>
              <td colSpan={3}>
                {/* 사이즈 , etc 확장자 아이콘 , 말줄임 추가 :: 개발 확인 필요 */}
                <FileCard icon="etc" onClick={() => download(versionData.id, versionData.libFilName)}>
                  {versionData?.libFilName}
                </FileCard>
              </td>
            </tr>
          </DetailTable>
        </article>
      </ContentBox>
    </>
  )
}

export default AlgoLibDetailVersion
