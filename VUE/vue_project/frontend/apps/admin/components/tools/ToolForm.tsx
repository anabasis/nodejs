'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { ModalType, useModal, AlertType, useAlert } from 'library/hook'
import { useDragFileUpload, iconFileExtension, getCdnPreviewUrl, getCdnFileUrl } from 'library'
import { Breadcrumb, ContentBox, BaseInput, ButtonMui, DetailTable, TextArea, RadioBox, Icons, FileUpload } from 'ui'
import SelectMemberPop from '@components/tools/SelectMemberPop'
import { ITool, IToolPostFormat } from '@type/tools/toolType'
import { useRouter } from 'next/navigation'
import { useToolDetailQuery, useToolMutate } from '@store/server/useToolQuery'
import { initialToolData } from '@constant/toolManagement'
import { isEmpty, isEqual, map } from 'lodash-es'
import { FileResType } from 'library/type/common'
import Image from 'next/image'

export default function ToolForm({ pageTitleList, toolId }: { pageTitleList: string[]; toolId?: string }) {
  const router = useRouter()
  const { modalOpen, modalClose } = useModal()
  const { alertOpen, alertClose } = useAlert()

  const isAdd = toolId ? false : true

  const { data: toolData, isFetched } = useToolDetailQuery(toolId)
  const { editToolMutate, addToolMutate, isAddToolLoading, isEditToolLoading } = useToolMutate()

  // request 후 데이터 지정
  const [newToolData, setNewToolData] = useState<ITool>(initialToolData)
  const [isAllDataEntered, setIsAllDataEntered] = useState<boolean>(false)

  const [imgPreview, setImgPreview] = useState<string>('')
  const { dropRef, fileInputRef, isDragActive, getfileSize, removeUploadCard, changeFileInput, uploadFiles, setUploadFiles } = useDragFileUpload({
    tableName: 'TPJ_TOOL',
    storageTypeCode: 'PUB',
    fileValidReg: iconFileExtension,
  })

  const alertState: AlertType = {
    title: 'Do you want to cancel?',
    textTitle: <span>{`Entered or changed information will not be saved.`}</span>,
    maxWidth: 'xs', // maxwidth 없을 시 기본값 적용 (xs)
    icon: 'info',
    content: (
      // 버튼 센터 정렬 및 마진 class 입니다.
      <div className="align center mt_30">
        {/* 팝업의 버튼은 xlarge 사이즈 입니다.  */}
        <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui size="xlarge" onClick={() => router.push('/tools/')}>
          OK
        </ButtonMui>
      </div>
    ),
  }

  const selectMember: ModalType = {
    title: 'Select corporate to partially open',
    textTitle: 'Please select the company to open the tools.',
    maxWidth: 'l',
    content: <SelectMemberPop onClose={modalClose} isAdd={isAdd} newToolData={newToolData} setNewToolData={setNewToolData} />,
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewToolData((prev) => ({
      ...prev,
      toolName: e.target.value,
    }))
  }

  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewToolData((prev) => ({
      ...prev,
      toolUrl: e.target.value,
    }))
  }

  const handleExposureChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewToolData((prev) => ({
      ...prev,
      toolExposure: e.target.value as 'PRV' | 'PTL' | 'PUB',
    }))
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewToolData((prev) => ({
      ...prev,
      toolDescription: e.target.value,
    }))
  }

  const onCancelBtnClick = () => {
    // 취소 확인 팝업 오픈
    alertOpen(alertState)
  }

  const handleSubmit = () => {
    const postData: IToolPostFormat = {
      toolName: newToolData.toolName,
      toolDescription: newToolData.toolDescription,
      toolExposure: newToolData.toolExposure,
      toolExposureCorporate: map(newToolData.toolExposureCorp, 'id'),
      toolUrl: newToolData.toolUrl,
      toolFileNum: newToolData.fileInfoResponse.fileNumber,
    }

    if (isAdd) {
      addToolMutate(postData, { onSuccess: () => router.push('/tools/') })
    } else {
      editToolMutate({ modifiedTool: postData, toolId: parseInt(toolId) }, { onSuccess: () => router.push('/tools/') })
    }
  }

  useEffect(() => {
    const isFileNew = isAdd || !isEqual(toolData?.fileInfoResponse, uploadFiles[0])

    setImgPreview(isFileNew ? getCdnPreviewUrl(uploadFiles[0]) : getCdnFileUrl(uploadFiles[0] as FileResType))
    setNewToolData({
      ...newToolData,
      fileInfoResponse: {
        ...newToolData?.fileInfoResponse,
        fileNumber: uploadFiles[0]?.fileNumber ?? 0,
      },
    })
  }, [uploadFiles])

  useEffect(() => {
    // Submit button disable check section
    if (
      newToolData?.toolName?.length != 0 &&
      !isEqual(newToolData?.fileInfoResponse, initialToolData.fileInfoResponse) &&
      newToolData?.toolUrl?.length != 0 &&
      newToolData?.toolDescription?.length != 0 &&
      !isEmpty(uploadFiles)
    ) {
      setIsAllDataEntered(true)
    } else {
      setIsAllDataEntered(false)
    }
  }, [newToolData])

  useEffect(() => {
    // Data가 마운트시 fetch가 완료 되면 데이터를 입혀주는 부분
    if (!isAdd && isFetched) {
      setNewToolData(toolData)
      setUploadFiles([toolData.fileInfoResponse])
    }
  }, [isFetched])

  return (
    <>
      {/* 페이지 상단 박스 케이스 */}
      {/* 헤더 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{toolId ? toolData?.toolName : 'Add Tools'}</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <article>
          {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
          <div className="cont_title_box">
            <p className="title1">Basic Information</p>
          </div>
          <DetailTable
            colgroup={
              <colgroup>
                <col style={{ width: '15%' }} />
                <col style={{ width: '35%' }} />
                <col style={{ width: '15%' }} />
                <col style={{ width: '35%' }} />
              </colgroup>
            }
          >
            <tr>
              <th>
                <span className="">Tool name</span>
              </th>
              <td>
                <div className="grid6">
                  <BaseInput
                    innerBoxSize="full"
                    placeholder="Please enter tool name."
                    value={newToolData?.toolName}
                    onChange={handleNameChange}
                    maxLength={30}
                  />
                </div>
              </td>
              <th>
                <span className="">Open level</span>
              </th>
              <td colSpan={3}>
                <div className="align start">
                  <div className="item">
                    <RadioBox value="PUB" name="group" id="PUB" text="Public" checked={newToolData?.toolExposure === 'PUB'} onChange={handleExposureChange} />
                  </div>
                  <div className="item">
                    <RadioBox value="PRV" name="group" id="PRV" text="Private" checked={newToolData?.toolExposure === 'PRV'} onChange={handleExposureChange} />
                  </div>
                  <div className="item gap_10">
                    <RadioBox
                      value="PTL"
                      name="group"
                      id="PTL"
                      text="Partially open"
                      checked={newToolData?.toolExposure === 'PTL'}
                      onChange={handleExposureChange}
                    />
                    {newToolData?.toolExposure === 'PTL' && (
                      <ButtonMui
                        type="outlined"
                        color="black"
                        className="gap_4"
                        onClick={() => {
                          modalOpen(selectMember)
                        }}
                      >
                        <Icons.EditIcon width={16} height={16} />
                        <span>
                          Edit (<em>{newToolData?.toolExposureCorp.length}</em>)
                        </span>
                      </ButtonMui>
                    )}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th className="va_top pt_28">
                <span className="">Launcher icon</span>
              </th>
              <td className="va_top pt_19">
                <div className="grid6">
                  <FileUpload
                    dropRef={dropRef}
                    isDragActive={isDragActive}
                    fileInputRef={fileInputRef}
                    getfileSize={getfileSize}
                    removeUploadCard={removeUploadCard}
                    changeFileInput={changeFileInput}
                    uploadFiles={uploadFiles}
                    customFormat="File format: png, jpg, jpeg / Size: 512*512 / Capacity : Up to 1MB"
                    inputAccept="image/png,image/jpg,image/jpeg"
                  />
                </div>
              </td>
              <th className="va_top pt_28">
                <span className="">Preview</span>
              </th>
              <td className="va_top pt_19">
                {imgPreview ? (
                  <Image width={36} height={36} src={imgPreview} alt="icon" />
                ) : (
                  // <img src={imgPreview} style={{ maxWidth: '150px' }} alt="preview image" />
                  <div className="grid6 bg_second50 pd_10">
                    <p className="caption navy200">Preview image.</p>
                  </div>
                )}
              </td>
            </tr>
            <tr></tr>
            <tr>
              <th>
                <span className="">Tool link</span>
              </th>
              <td colSpan={3}>
                <BaseInput innerBoxSize="full" placeholder="Please enter tool link." value={newToolData?.toolUrl} onChange={handleLinkChange} />
              </td>
            </tr>
            <tr>
              <th className="vt">
                <span className="">Description</span>
              </th>
              <td colSpan={3}>
                <TextArea
                  placeholder="Please enter description."
                  value={newToolData?.toolDescription}
                  onChange={handleDescriptionChange}
                  maxLength={50}
                ></TextArea>
              </td>
            </tr>
          </DetailTable>
        </article>
        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui type="outlined" size="xlarge" onClick={onCancelBtnClick}>
              Cancel
            </ButtonMui>
            <ButtonMui
              type="contained"
              size="xlarge"
              onClick={handleSubmit}
              disabled={!isAllDataEntered || (isAdd ? isEqual(newToolData, initialToolData) : isEqual(toolData, newToolData))}
              isLoading={isAdd ? isAddToolLoading : isEditToolLoading}
            >
              {isAdd ? `Add` : `Save`}
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}
