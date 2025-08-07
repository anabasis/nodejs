'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { useAtom } from 'jotai'
import { Breadcrumb, ContentBox, Dl, FileCard, ButtonMui } from 'ui'
import { LibraryManualListDetailType } from '@type/library'
import { useAlert, createMarkup, useToastPopup, isEmptyCheck, changeTimeLocal, setDescListData, AlertType, viewPdf, useMenu } from 'library'
import { useLibraryMuate } from '@store/server/useLibraryQuery'
import { libListDataAtom } from '@store/client/library'
import { getLibraryManualsListDetail } from '@api/library'
import DetailContenTopItem from '@components/common/DetailContenTopItem'

const pageTitleList = ['library', 'Manual List', 'Manual Detail']

const openlevelObj = {
  PUB: 'Public',
  PRV: 'Private',
  PTL: 'Partially open',
}
const dowlUseYnlObj = {
  Y: 'Available',
  N: 'Unavailable',
}

function LibraryDetailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { getPathInfo } = useMenu()
  const pathname = usePathname()
  const [manualsId, id, libTitle] = [searchParams.get('manualsId'), searchParams.get('id'), searchParams.get('title')]
  const { alertOpen, alertClose } = useAlert()
  const { getToastState, toastOpen } = useToastPopup()
  const { libraryManualsListDeleteMutate } = useLibraryMuate()
  const [libData, setLibData] = useAtom(libListDataAtom)

  const setDescList = useMemo(() => {
    if (!libData) return []

    const { crtrDt, mdfDt } = libData
    const descTitleArr = ['Date', 'Update']
    const listInfoValueArr = [changeTimeLocal({ time: crtrDt, type: 'yyyy-MM-dd' }), changeTimeLocal({ time: mdfDt, type: 'yyyy-MM-dd' })]
    return setDescListData(descTitleArr, listInfoValueArr)
  }, [libData])

  const libDataHeader = useMemo(() => {
    if (!isEmptyCheck(libData)) return
    const { openLvlCd, dowlUseYn } = libData
    const nameArr = ['Download setting', 'Open level']
    const valueArr = [dowlUseYnlObj[dowlUseYn], openlevelObj[openLvlCd]]
    return nameArr.reduce((acc, cur, i) => {
      if (!valueArr[i]) return acc
      return [...acc, ...[{ name: cur, value: valueArr[i] }]]
    }, [])
  }, [libData])

  const deleteLib = () => {
    libraryManualsListDeleteMutate(
      { id },
      {
        onSuccess: () => {
          toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
          router.push(`/library/list?manualsId=${libData?.librCatNum}&title=${libTitle}`)
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
          <ButtonMui size="xlarge" onClick={() => deleteLib()}>
            Delete
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  const init = async () => {
    try {
      const res: LibraryManualListDetailType = await getLibraryManualsListDetail({ id })
      if (res) {
        setLibData({
          ...res,
          openLevelCode: res.openLvlCd,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    init()

    return () => {
      if (!window.location.pathname.includes('edit')) {
        setLibData(null)
      }
    }
  }, [])
  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{libData?.titl}</h1>
            <Dl listData={setDescList} />
          </div>
          <div className="rgt">
            {/* top_content btn size :: large */}
            <ButtonMui color="secondary" disabled={getPathInfo(pathname).crtYn !== 'Y'} icon="DeleteIcon" onClick={deleteProcess} size="large" type="contained">
              Delete
            </ButtonMui>
            <ButtonMui
              color="primary"
              icon="EditIcon"
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
              onClick={() => router.push(`/library/list/edit?manualsId=${manualsId}&id=${id}&title=${libTitle}`)}
              size="large"
              type="contained"
            >
              Edit
            </ButtonMui>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <div className="align pb_20 bb mb_20">
          <div className="lft">
            <div className="align start gap_20 flex1">
              {libDataHeader?.map((item) => (
                <DetailContenTopItem key={item.value} {...item} />
              ))}
            </div>
          </div>
        </div>
        {/* 파일 첨부영역 */}
        {libData?.fileInfoResponses?.length > 0 && (
          <>
            <div className="mb_10">
              <span className="capH typo500 pr_8 mr_8">Attachment</span>
            </div>

            <div className="align start gap_10">
              {libData?.fileInfoResponses?.map((file, index) => (
                <FileCard
                  onClick={() => (libData?.dowlUseYn === 'N' ? viewPdf(file) : null)}
                  view={libData?.dowlUseYn === 'N'}
                  file={file}
                  key={index}
                  icon={file.fileExtension}
                >
                  {file.displayFileName}
                </FileCard>
              ))}
            </div>
            <hr className="mtb_30" />
          </>
        )}

        {/* 에디터 영역 */}
        <div className="ck-content" dangerouslySetInnerHTML={createMarkup(libData?.cont)} />
      </ContentBox>
    </>
  )
}

export default LibraryDetailPage
