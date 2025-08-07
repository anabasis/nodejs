// 작업자 : 최유희

'use client'
import { ContentBox, ButtonMui, ContentBoxWrap, DetailTable, PreTypo, Breadcrumb, Dl } from 'ui'
import { getAlgorithmCustomCodeDetailVer } from '@api/algorithm/custom-code'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlgoCodeVerDetailType } from '@type/algorithm/custom-code'
import { AlertType, changeTimeLocal, useAlert } from 'library'
import { useAlogoCodeMutate } from '@store/server/algorithm/useAlogCodeQuery'

const AlgoCustomDetailVersion = () => {
  const pageTitleList = ['Algorithm', 'Custom Code Detail', 'Custom Code Detail']
  const [versionData, setVersionData] = useState<AlgoCodeVerDetailType>()
  const searchParams = useSearchParams()
  const PartialCodeId = searchParams.get('partialCodeId')
  const PartialCodeVerId = searchParams.get('partialCodeVerId')
  const { alertOpen, alertClose } = useAlert()
  const { algoCodeVerDelete } = useAlogoCodeMutate(PartialCodeId)

  const init = async () => {
    try {
      const data = await getAlgorithmCustomCodeDetailVer({ PartialCodeId, PartialCodeVerId })
      if (data) {
        setVersionData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCustomVer = () => {
    algoCodeVerDelete(
      { PartialCodeId, PartialCodeVerId },
      {
        onSettled: () => {
          alertClose()
        },
      }
    )
  }

  const deleteProcess = () => {
    const alertState: AlertType = {
      InfoType: 'delete',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={deleteCustomVer}>
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
              {versionData?.name} {versionData?.version}
            </h1>
            <Dl listData={[{ listTitle: 'Custom Code Name', listInfo: versionData?.name }]} />
          </div>
          <div className="rgt">
            <ButtonMui color="primary" icon="DeleteIcon" onClick={deleteProcess} size="large" type="contained">
              Delete
            </ButtonMui>
          </div>
        </ContentBox>
      </div>
      <ContentBoxWrap>
        <ContentBox>
          {/* Library Version 상세 페이지 */}
          <article>
            <div className="cont_title_box">
              <p className="title1">Basic Information</p>
            </div>
            <DetailTable
              colgroup={
                <colgroup>
                  <col style={{ width: '180px' }} />
                  <col style={{ width: 'calc(50% - 180px)' }} />
                  <col style={{ width: '180px' }} />
                  <col style={{ width: 'calc(50% - 180px)' }} />
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
                <th className="vt">Release note</th>
                <td colSpan={3}>
                  <PreTypo className="ptb_10">{versionData?.note}</PreTypo>
                </td>
              </tr>
            </DetailTable>
          </article>

          <article>
            <div className="cont_title_box">
              <p className="title1">Code Detail</p>
            </div>
            <DetailTable
              colgroup={
                <colgroup>
                  <col width="180px" />
                  <col width="auto" />
                </colgroup>
              }
            >
              <tr>
                <th className="vt">Code 1</th>
                <td>
                  <div className="align start top mb_10">
                    <PreTypo className="ptb_10">{versionData?.src1}</PreTypo>
                  </div>
                </td>
              </tr>
              {versionData?.src2 && (
                <tr>
                  <th className="vt">Code 2</th>
                  <td>
                    <div className="align start top mb_10">
                      <PreTypo className="ptb_10">{versionData?.src2}</PreTypo>
                    </div>
                  </td>
                </tr>
              )}
            </DetailTable>
          </article>
        </ContentBox>
      </ContentBoxWrap>
    </>
  )
}

export default AlgoCustomDetailVersion
