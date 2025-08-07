'use client'
import { Breadcrumb, ButtonMui, ContentBox, DetailTable, FileCard } from 'ui'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { detailGuideDataAtom } from '@store/client/detail-guide'
import { getDetailGuideListDetail } from '@api/detail-guide'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useAlert, AlertType, viewPdf, useMenu } from 'library'
import { useDetailGuideMuate } from '@store/server/useDetailGuideQuery'

const pageTitleList = ['Detail Guide', 'Detail Guide Detail']
const DetailGuideDetailPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const guideNumber = searchParams.get('guideNumber')
  const [detailGuideData, setDetailGuideData] = useAtom(detailGuideDataAtom)
  const { alertOpen, alertClose } = useAlert()
  const { detailGuideDeleteMutate } = useDetailGuideMuate()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const init = async () => {
    try {
      const res = await getDetailGuideListDetail({ guideNumber })
      if (res) {
        setDetailGuideData(res)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const deleteNotice = () => {
    detailGuideDeleteMutate({ guideNumber })
  }

  const deleteProcess = () => {
    const alertState: AlertType = {
      InfoType: 'delete',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => deleteNotice()}>
            Delete
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  useEffect(() => {
    init()

    return () => {
      if (!window.location.pathname.includes('edit')) {
        setDetailGuideData(null)
      }
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{detailGuideData?.title}</h1>
          </div>
          <div className="rgt">
            {/* top_content btn size :: large */}
            <ButtonMui type="contained" size="large" color="secondary" icon="DeleteIcon" disabled={getPathInfo(pathname).delYn !== 'Y'} onClick={deleteProcess}>
              Delete
            </ButtonMui>
            <ButtonMui
              type="contained"
              size="large"
              icon="EditIcon"
              disabled={getPathInfo(pathname).uptYn !== 'Y'}
              onClick={() => router.push(`/detail-guide/edit?guideNumber=${guideNumber}`)}
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

          {/* 최유희 : 테이블 컴포넌트 통일 (no_border -> DetailTable) */}
          <DetailTable
            colgroup={
              <colgroup>
                <col style={{ width: '180px' }} />
                <col style={{ width: '40%' }} />
                <col style={{ width: '180px' }} />
                <col style={{ width: '40%' }} />
              </colgroup>
            }
          >
            <tr>
              <th>Code</th>
              <td>{detailGuideData?.guideNumber}</td>
              <th></th>
            </tr>
            <tr>
              <th>Title</th>
              <td>
                <div className="grid6">
                  <p>{detailGuideData?.title}</p>
                </div>
              </td>
              <th>Path parameter</th>
              <td colSpan={3}>
                <div className="grid6 align start gap_10">
                  <p>{detailGuideData?.moveParameter}</p>
                </div>
              </td>
            </tr>
          </DetailTable>
        </article>
        {detailGuideData?.guideAttachmentRequestList.length > 0 && (
          <article>
            <div className="cont_title_box">
              <p className="title1">File upload</p>
              <p className="body2">Only Excel, PDF, Word files can be uploaded. Able toupload up to 5 items.</p>
            </div>

            <DetailTable
              colgroup={
                <colgroup>
                  <col style={{ width: '180px' }} />
                  <col style={{ width: 'auto' }} />
                </colgroup>
              }
            >
              <tr>
                <th className="va_top pt_18">File</th>
                <td colSpan={3}>
                  {detailGuideData?.guideAttachmentRequestList?.map((file, index) => (
                    <FileCard onClick={() => viewPdf(file)} key={index} icon={file.fileExtension} view>
                      {file.displayFileName}
                    </FileCard>
                  ))}
                </td>
              </tr>
            </DetailTable>
          </article>
        )}
      </ContentBox>
    </>
  )
}

export default DetailGuideDetailPage
