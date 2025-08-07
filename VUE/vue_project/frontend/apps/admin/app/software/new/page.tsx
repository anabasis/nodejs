/**
 * 작성자 : 양수연
 * 화면 : AW1.1 앱 관리_앱 등록
 * path : /software/new
 */

'use client'
import { useSoftwareMutation } from '@store/server/useSoftwareQuery'
import { NewSoftwareType, SoftwareCommonCodes } from '@type/software/softwareType'
import { AlertType, getCdnPreviewUrl, iconFileExtension, isEmptyAnyPropertyCheck, useAlert, useCode, useDragFileUpload } from 'library'
import { debounce as _debounce } from 'lodash-es'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { BaseInput, Breadcrumb, ButtonMui, ContentBox, DetailTable, FileUpload, InputLabel, SelectChangeEvent, SelectMui, TextArea } from 'ui'

const pageTitleList = [`Apps Manage`, `Add Apps Manage`]
const commonCodes = {
  type: 'PFM028',
}

const NewSoftware = () => {
  const [imgPreview, setImgPreview] = useState<string>('')
  const { dropRef, isDragActive, uploadFiles, fileInputRef, getfileSize, removeUploadCard, changeFileInput } = useDragFileUpload({
    tableName: 'TSW_SW',
    storageTypeCode: 'PUB',
    fileValidReg: iconFileExtension,
  })

  const router = useRouter()
  const { alertOpen, alertClose } = useAlert()
  const { addSoftwareMutation, addSoftwareIsLoading } = useSoftwareMutation()

  const { cCode } = useCode(commonCodes) as { cCode: SoftwareCommonCodes }
  //버튼 로딩중?
  const [loading, isLoading] = useState<boolean>(false)

  const [newSoftware, setNewSoftware] = useState<NewSoftwareType>({
    fileNumber: null,
    softwareName: '',
    ivdRuoCode: '',
    description: '',
  })

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSoftware({
      ...newSoftware,
      [event.target.name]: event.target.value,
    })
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    setNewSoftware({
      ...newSoftware,
      [event.target.name]: event.target.value,
    })
  }

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewSoftware({
      ...newSoftware,
      [event.target.name]: event.target.value,
    })
  }

  const cancel = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.push(`/software`)}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  //type
  const selectData = useMemo(() => {
    if (!cCode || isEmptyAnyPropertyCheck(cCode)) {
      return []
    }
    const { type } = cCode
    return { type }
  }, [cCode]) as SoftwareCommonCodes

  const handleAddSoftware = _debounce(async () => {
    if (loading) {
      return
    }
    isLoading(true)
    addSoftwareMutation({ newSoftware })
    isLoading(false)
  }, 300)

  const isValid = () => {
    return (
      newSoftware.softwareName.length === 0 ||
      newSoftware.ivdRuoCode.length === 0 ||
      newSoftware.description.length === 0 ||
      newSoftware.softwareName.length > 100 ||
      newSoftware.description.length > 500
    )
  }

  useEffect(() => {
    setImgPreview(getCdnPreviewUrl(uploadFiles[0]))
    setNewSoftware({
      ...newSoftware,
      fileNumber: uploadFiles[0]?.fileNumber ?? null,
    })
  }, [uploadFiles])

  return (
    <>
      {/* 헤더 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Add Apps Manage</h1>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        <form className="flex1 align column">
          <article>
            {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
            <div className="cont_title_box">
              <p className="title1">Basic Information</p>
            </div>
            <DetailTable
              //className="w95"
              colgroup={
                <colgroup>
                  <col width="180px" />
                  <col width="*" />
                  <col width="180px" />
                  <col width="*" />
                </colgroup>
              }
            >
              <tr>
                <th className="va_top">
                  <InputLabel labelText="Icon" id="ipt01" />
                </th>
                <td className="pt_0">
                  <div className="grid6_6">
                    <FileUpload
                      isDragActive={isDragActive}
                      dropRef={dropRef}
                      fileInputRef={fileInputRef}
                      getfileSize={getfileSize}
                      removeUploadCard={removeUploadCard}
                      changeFileInput={changeFileInput}
                      uploadFiles={uploadFiles}
                      fileCapactiy={1}
                      customFormat="File format: png, jpg, jpeg / Size: 512*512 / Capacity : Up to 1MB"
                      inputAccept="image/png,image/jpg,image/jpeg"
                    />
                  </div>
                </td>
                <th className="va_top">
                  <InputLabel labelText="Preview" id="ipt01" />
                </th>
                <td className="va_top pt_0">
                  {imgPreview ? (
                    <img src={imgPreview} style={{ maxWidth: '150px' }} alt="preview image" />
                  ) : (
                    <div className="grid6 bg_second50 ptb_10 plr_16">
                      <p className="caption navy200">Preview image.</p>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <InputLabel labelText="App name" id="ipt01" />
                </th>
                <td>
                  <div className="grid6_6">
                    <BaseInput name="softwareName" placeholder="Please enter app name." onChange={handleNameChange} maxLength={100} />
                  </div>
                </td>
                <th>
                  <InputLabel labelText="Type" id="ipt01" />
                </th>
                <td>
                  <div className="grid6">
                    <SelectMui
                      name="ivdRuoCode"
                      placeholder="Please select a type"
                      size="full"
                      options={selectData?.type}
                      onChange={(event) => {
                        handleSelectChange(event)
                      }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th className="va_top pt_18">
                  <InputLabel labelText="Description" id="ipt01" />
                </th>
                <td colSpan={3}>
                  <TextArea name="description" onChange={handleContentChange} placeholder="Please enter a description." maxLength={500} />
                </td>
              </tr>
            </DetailTable>
          </article>

          <div className="cont_bottom_box">
            <div className="align end">
              <ButtonMui
                type="outlined"
                size="xlarge"
                onClick={() => {
                  cancel()
                }}
              >
                Cancel
              </ButtonMui>
              <ButtonMui
                disabled={isValid()}
                type="contained"
                size="xlarge"
                isLoading={addSoftwareIsLoading}
                onClick={() => {
                  handleAddSoftware()
                }}
              >
                Add
              </ButtonMui>
            </div>
          </div>
        </form>
      </ContentBox>
    </>
  )
}
export default NewSoftware
