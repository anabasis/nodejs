// 작업자 : 최유희

'use client'
import { ContentBox, ButtonMui, ContentBoxWrap, DetailTable, BaseInput, TextArea, FileUpload, Breadcrumb, Dl } from 'ui'
import DatePicker from 'ui/datepicker/DatePicker'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlgoLibDetailType, LibVerAddParamsType } from '@type/algorithm/library'
import { AlertType, useAlert, useDragFileUpload, useParamsData } from 'library'
import { useEffect, useMemo, useState } from 'react'
import { getAlgorithmLibListDetail } from '@api/algorithm/library'
import { useAlogoMutate } from '@store/server/algorithm/useAlogLibQuery'

declare const btoa: (data: string) => string
declare const unescape: (data: string) => string

const initData = {
  releaseDt: '',
}
const pageTitleList = ['Algorithm', 'Library Detail', 'Add Library Version']

const AlgoLibAddVersion = () => {
  const searchParams = useSearchParams()
  const libId = searchParams.get('libId')
  const { alertOpen, alertClose } = useAlert()
  const router = useRouter()
  const { params, resetParams, setChangeParams, checkEmptyValue } = useParamsData<LibVerAddParamsType>(initData)
  const [algoLibData, setAlgoLibData] = useState<AlgoLibDetailType>()
  const { algohmLibVerAdd } = useAlogoMutate(libId)
  const { dropRef, isDragActive, drmValid, setDrmValid, removeRef, fileInputRef, getfileSize, removeUploadCard, changeFileInput, uploadFiles } =
    useDragFileUpload({
      isApiUpload: false,
    })

  const formData = new FormData()
  const defalutVersion = useMemo(() => (((algoLibData && +algoLibData?.latestLibVer?.version) || 0) + 0.1).toFixed(1), [algoLibData])

  const init = async () => {
    try {
      const data = await getAlgorithmLibListDetail({ libId })
      setAlgoLibData(data)
    } catch (e) {
      console.error(e)
    }
  }

  const add = () => {
    formData.append(
      'libVerRequestDto',
      JSON.stringify({
        version: defalutVersion,
        note: params.note,
        src: btoa(unescape(encodeURIComponent(params.src))),
        releaseDt: params.releaseDt,
      })
    )

    formData.append('file', uploadFiles[0] as Blob)

    algohmLibVerAdd({ libId, formData })
  }

  const cancel = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.push(`/algorithm/library-manage/detail?libId=${libId}`)}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  useEffect(() => {
    init()
    return () => {
      resetParams()
    }
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
            <h1 className="headline1">Add Library Version</h1>
            <Dl listData={[{ listTitle: 'Library Name', listInfo: algoLibData?.name }]} />
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        {/* [s] Library Version Basic Information */}

        {/* Library Version 등록 페이지 */}

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
                <span className="required">Version</span>
              </th>
              <td>
                <div className="grid6">{defalutVersion && <BaseInput disabled placeholder="placeholder" value={defalutVersion || ''} />}</div>
              </td>
              <th>
                <span className="required">Release date</span>
              </th>
              <td>
                <div className="grid6">
                  <DatePicker onChangePickerDate={(date) => setChangeParams(date, 'releaseDt')} />
                </div>
              </td>
            </tr>
            <tr>
              <th className="vt">Wrapper Code</th>
              <td colSpan={3}>
                <TextArea height={150} placeholder="Please enter wrapper code." onChange={(event) => setChangeParams(event, 'src')} />
              </td>
            </tr>
            <tr>
              <th className="vt">Release note</th>
              <td colSpan={3}>
                <TextArea height={150} placeholder="Please enter release note." onChange={(event) => setChangeParams(event, 'note')} />
              </td>
            </tr>
            <tr>
              <th className="vt">
                <span className="required">File upload</span>
              </th>
              <td colSpan={3}>
                <div className="grid6">
                  <FileUpload
                    isDragActive={isDragActive}
                    drmValid={drmValid}
                    setDrmValid={setDrmValid}
                    removeRef={removeRef}
                    customFormat="File format : wasm"
                    dropRef={dropRef}
                    fileInputRef={fileInputRef}
                    getfileSize={getfileSize}
                    removeUploadCard={removeUploadCard}
                    changeFileInput={changeFileInput}
                    uploadFiles={uploadFiles}
                  />
                </div>
              </td>
            </tr>
          </DetailTable>
        </article>

        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui type="outlined" size="xlarge" onClick={cancel}>
              Cancel
            </ButtonMui>

            <ButtonMui disabled={checkEmptyValue() || uploadFiles.length === 0} size="xlarge" onClick={add}>
              Add
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}
export default AlgoLibAddVersion
