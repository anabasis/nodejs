/**
 * 작성자 : 양수연
 * path : /software/update?id=${id}
 */
'use client'
import VersionBoard from '@components/software/detail/VersionBoard'
import { useSoftwareMutation } from '@store/server/useSoftwareQuery'
import { NewSoftwareType, SoftwareBasicInfo, SoftwareCommonCodes } from '@type/software/softwareType'
import { AlertType, apiAdmin, getCdnFileUrl, getCdnPreviewUrl, iconFileExtension, isEmptyAnyPropertyCheck, useAlert, useCode, useDragFileUpload } from 'library'
import { debounce as _debounce } from 'lodash-es'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { AvatarMui, BaseInput, Breadcrumb, ButtonMui, ContentBox, DetailTable, FileUpload, InputLabel, SelectMui, TextArea } from 'ui'

const pageTitleList = [`Apps Manage`, `Apps Manage Detail`, `Edit Apps Manage`]
const commonCodes = {
  type: 'PFM028',
}

const SoftwareUpdate = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const appsId = searchParams.get('appsId')
  const { cCode } = useCode(commonCodes) as { cCode: SoftwareCommonCodes }
  //버튼 로딩중?
  const [loading, isLoading] = useState<boolean>(false)

  const { alertOpen, alertClose } = useAlert()
  const [basicInfo, setBasicInfo] = useState<SoftwareBasicInfo>()
  const { modifySoftwareMutation, modifySoftwareIsLoading } = useSoftwareMutation()

  const [newSoftware, setNewSoftware] = useState<NewSoftwareType>({
    fileNumber: null,
    softwareName: '',
    ivdRuoCode: '',
    description: '',
  })

  const [imgPreview, setImgPreview] = useState<string>('')
  const { dropRef, fileInputRef, isDragActive, setUploadFiles, getfileSize, removeUploadCard, changeFileInput, uploadFiles } = useDragFileUpload({
    tableName: 'TSW_SW',
    storageTypeCode: 'PUB',
    fileValidReg: iconFileExtension,
  })
  useEffect(() => {
    getBasicInfo()
  }, [])

  //1. Apps manage information API
  const getBasicInfo = async () => {
    apiAdmin.get(`/software-management/${appsId}/detail`).then((response) => {
      if (response.data.iconFile) {
        setUploadFiles([{ ...response.data.iconFile }])
      }
      setBasicInfo(response.data)
      setNewSoftware(response.data)
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setNewSoftware({
      ...newSoftware,
      [name]: value,
    })
  }

  //type
  const selectData = useMemo(() => {
    if (!cCode || isEmptyAnyPropertyCheck(cCode)) {
      return []
    }

    const { type } = cCode

    return { type }
  }, [cCode]) as SoftwareCommonCodes

  const handleEditSoftware = _debounce(async () => {
    if (loading) {
      return
    }
    isLoading(true)
    modifySoftwareMutation({ newSoftware })
    isLoading(false)
  }, 300)

  const isValid = () => {
    return (
      basicInfo?.iconFile?.displayFileName === uploadFiles[0]?.displayFileName &&
      basicInfo?.softwareName === newSoftware?.softwareName &&
      basicInfo?.ivdRuoCode === newSoftware?.ivdRuoCode &&
      basicInfo?.description === newSoftware?.description
    )
  }

  const formLength =
    newSoftware.softwareName.length === 0 ||
    newSoftware.ivdRuoCode.length === 0 ||
    newSoftware.description.length === 0 ||
    newSoftware.softwareName.length > 100 ||
    newSoftware.description.length > 500

  useEffect(() => {
    setImgPreview(getCdnPreviewUrl(uploadFiles[0]))
    setNewSoftware({
      ...newSoftware,
      fileNumber: uploadFiles[0]?.fileNumber ?? null,
    })
  }, [uploadFiles])

  const cancel = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.push(`/software/detail?appsId=${appsId}`)}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{basicInfo?.softwareName}</h1>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        <article>
          {/* 기본 정보 */}
          <div className="cont_title_box">
            <p className="title1">Basic Information</p>
          </div>
          {basicInfo && (
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
                  <InputLabel labelText="Icon" />
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
                    <div className="align start gap_10">
                      <AvatarMui
                        size="medium"
                        type="circular"
                        data={[
                          {
                            src: uploadFiles[0] ? getCdnFileUrl(basicInfo?.iconFile) : '/images/no_icon.png',
                            alt: 'Profile',
                          },
                        ]}
                      />
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <th>App Name</th>
                <td>
                  <div className="grid6_6">
                    <BaseInput name="softwareName" value={newSoftware?.softwareName || ''} onChange={handleChange} maxLength={100} innerBoxSize="full" />
                  </div>
                </td>
                <th>Type</th>
                <td>
                  <div className="grid6_6">
                    <SelectMui
                      name="ivdRuoCode"
                      value={newSoftware?.ivdRuoCode}
                      size="full"
                      options={selectData?.type}
                      onChange={(event) => {
                        handleChange(event)
                      }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th className="va_top pt_18">Description</th>
                <td colSpan={3}>
                  {/* 사이즈 규정 추가 필요 */}
                  <TextArea
                    name="description"
                    value={newSoftware?.description || ''}
                    onChange={(event) => {
                      handleChange(event)
                    }}
                  />
                </td>
              </tr>
            </DetailTable>
          )}
        </article>

        {/* 버전 히스토리 */}
        <article>
          <VersionBoard appsId={appsId} pathname={pathname} />
        </article>

        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui type="outlined" size="xlarge" onClick={() => cancel()}>
              Cancel
            </ButtonMui>
            <ButtonMui
              disabled={isValid() || formLength}
              type="contained"
              size="xlarge"
              isLoading={modifySoftwareIsLoading}
              onClick={() => {
                handleEditSoftware()
              }}
            >
              Save
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}

export default SoftwareUpdate
