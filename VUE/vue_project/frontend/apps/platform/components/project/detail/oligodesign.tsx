'use client'

import { BoardTable, Badge, LabelBadgeStatus, Icons, SearchIcoInput, NoData } from 'ui/components'
import Pagenation from 'ui/components/common/Pagenation'
import { ContentBox } from 'ui/layouts'
import FilterItem from 'ui/molecules/FilterItem'
import { ButtonMui, ContextButton, SelectChangeEvent, SelectMui } from 'ui/mui'
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useModal } from 'library/hook/useModal'
import { useAlert } from 'library/hook/useAlert'
import { useToastPopup } from 'library/hook/useToastPopup'
import OligoDesignRequest from './oligoDesignRequest'
import OligoDesignDocumentUpload from './oligoDesignDocumentUpload'
import OligoDesignDocumentUploadEdit from './oligoDesignDocumentUploadEdit'
import { changeTimeLocal, downloadFiles, getCdnFileUrl, getCode, getPrvFileUrl, getRootUrl, isDev } from 'library/util'
import { useQueries } from '@tanstack/react-query'
import { oligoDesignRequestStep, oligoDesignDocumentEdit } from '@store/client/project'
import { useAtom } from 'jotai'
import {
  useCopyRequestMutation,
  useDeleteDocumentMutation,
  useDeleteRequestMutation,
  useEditRequestFavoriteMutation,
  useOligoDesignDocumentListData,
  useOligoDesignRequestListData,
} from '@store/server/useProjectQuery'
import { OligoDesignDocumentType, OligoDesignRequestType, ProcessType, ProjectBasicInfoType, ProjectPaginationType } from '@type/project/projectType'
import ProcessStatusSelect from './processStatusSelect'
import { useRouter } from 'next/navigation'
import { getEditAuth } from '../projectCommon'
import { useUser } from 'library/hook'

export default function OligoDesign({ projectInfo, processInfo }: { projectInfo: ProjectBasicInfoType; processInfo: ProcessType[] }) {
  const ProcessCode = 'OLDS'
  const commonCodes = { requestStatus: 'ODS052', appType: 'ODS001' }
  const codes = useQueries({
    queries: Object.values(commonCodes).map((v) => {
      return { queryKey: ['code', v], queryFn: () => getCode(v), staleTime: Infinity }
    }),
  })
  let cCode = {}
  Object.keys(commonCodes).forEach((v, i) => {
    if (typeof codes[i].data === 'object') {
      cCode[v] = [{ name: 'All', value: 'all' }].concat(codes[i].data)
    }
  })

  const router = useRouter()

  const { modalOpen, modalClose, modalUpdate } = useModal()
  const { alertOpen, alertClose } = useAlert()
  const { toastOpen } = useToastPopup()
  const { userInfo } = useUser()
  const [processNumber, setProcessNumber] = useState<number>(-1)
  const [requestStep, setRequestStep] = useAtom(oligoDesignRequestStep)
  const [isDocumentEdit, setDocumentEdit] = useAtom(oligoDesignDocumentEdit)
  const [requestFilterInfo, setRequestFilterInfo] = useState({ reqStsCd: 'all', appTpCd: 'all', keyword: '' })
  const [oligoDesignRequestPagination, setOligoDesignRequestPagination] = useState<ProjectPaginationType>({ currentPage: 0, pageSize: 5 })
  const [fileFilterInfo, setFileFilterInfo] = useState({ keyword: '' })
  const [fileKeyword, setFileKeyword] = useState('')
  const [requestKeyword, setRequestKeyword] = useState('')
  const [filePagination, setFilePagination] = useState({ currentPage: 0, pageSize: 5 })

  const { data: oligoDesignRequestList, refetch: requestRefetch } = useOligoDesignRequestListData(projectInfo, requestFilterInfo, oligoDesignRequestPagination)
  const { data: oligoDesignDocumentList, refetch: documentRefetch } = useOligoDesignDocumentListData(projectInfo.id, filePagination, fileFilterInfo)

  const documentDeleteMutation = useDeleteDocumentMutation()
  const copyRequestMutation = useCopyRequestMutation()
  const deleteRequestMutation = useDeleteRequestMutation()
  const editRequestFavofiteMutation = useEditRequestFavoriteMutation()

  useEffect(() => {
    if (!!processInfo) {
      const process = processInfo.find((item) => item.prcsCode === ProcessCode)
      if (process) {
        setProcessNumber(process.prjPrcsNumber)
      }
    }
  }, [processInfo])

  useEffect(() => {
    modalUpdate('request', {
      title: (
        <>
          Add Oligo design request<span className="ml_10 typo500">{`${requestStep}/2`}</span>
        </>
      ),
    })
  }, [requestStep, modalUpdate])

  useEffect(() => {
    if (!!oligoDesignRequestList) {
      if (oligoDesignRequestPagination.currentPage !== 0 && oligoDesignRequestList.content.length === 0) {
        setOligoDesignRequestPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))
      }
    }
  }, [oligoDesignRequestList])

  useEffect(() => {
    if (!!oligoDesignDocumentList) {
      if (filePagination.currentPage !== 0 && oligoDesignDocumentList.content.length === 0) {
        setFilePagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))
      }
    }
  }, [oligoDesignDocumentList])

  const handleOligoDesignRequestClose = useCallback(
    (type: string) => {
      if (type === 'save') {
        requestRefetch()
      }
      setRequestStep(1)
      modalClose()
    },
    [modalClose, requestRefetch, setRequestStep]
  )

  const handleNewRequest = useCallback(() => {
    setRequestStep(1)
    modalOpen({
      title: (
        <>
          Add Oligo design request<span className="ml_10 typo500">1/2</span>
        </>
      ),
      linetitle: true,
      textTitle: 'Select and enter basic information for request creation.',
      maxWidth: 'm',
      content: <OligoDesignRequest onClose={handleOligoDesignRequestClose} projectId={projectInfo.id} processCode={ProcessCode} />,
      deleteKey: 'request',
    })
  }, [handleOligoDesignRequestClose, modalOpen, projectInfo.id, setRequestStep])

  const handleRequestCopuAlert = useCallback(
    (data: OligoDesignRequestType) => {
      alertClose()
      copyRequestMutation.mutate(data.reqId, {
        onSuccess(data, variables, context) {
          toastOpen({ content: 'Successfully copied.', icon: 'success' })
          requestRefetch()
        },
        onError(error, variables, context) {
          toastOpen({ content: 'Copy failed.', icon: 'error' })
        },
      })
    },
    [alertClose, copyRequestMutation, requestRefetch, toastOpen]
  )

  const handleRequestCopy = useCallback(
    (data) => {
      alertOpen({
        title: 'Copy request',
        textTitle: 'All Analyte and Multiflex information of the request is being copied. The copied request information can be modified.',
        content: (
          <div className="align center mt_30">
            <ButtonMui
              type="outlined"
              size="xlarge"
              onClick={() => {
                alertClose()
              }}
            >
              Cancel
            </ButtonMui>
            <ButtonMui
              size="xlarge"
              onClick={() => {
                handleRequestCopuAlert(data)
              }}
            >
              Copy
            </ButtonMui>
          </div>
        ),
      })
    },
    [alertClose, alertOpen, handleRequestCopuAlert]
  )

  const handleRequestDeleteAlert = useCallback(
    (data: OligoDesignRequestType) => {
      alertClose()
      deleteRequestMutation.mutate(data.reqId, {
        onSuccess(data, variables, context) {
          toastOpen({ content: 'Successfully deleted.', icon: 'success' })
          requestRefetch()
        },
        onError(error, variables, context) {
          toastOpen({ content: 'Delete failed.', icon: 'warning' })
        },
      })
    },
    [alertClose, deleteRequestMutation, requestRefetch, toastOpen]
  )

  const handleRequestDelete = useCallback(
    (data) => {
      alertOpen({
        icon: 'info',
        maxWidth: 's',
        title: 'Are you sure to delete?',
        textTitle: `If you click the delete button, it cannot be recovered.`,
        content: (
          <div className="align center mt_30">
            {/* 팝업의 버튼은 xlarge 사이즈 입니다.  */}
            <ButtonMui
              type="outlined"
              size="xlarge"
              onClick={() => {
                alertClose()
              }}
            >
              Cancel
            </ButtonMui>
            <ButtonMui
              size="xlarge"
              onClick={() => {
                handleRequestDeleteAlert(data)
              }}
            >
              Delete
            </ButtonMui>
          </div>
        ),
      })
    },
    [alertClose, alertOpen, handleRequestDeleteAlert]
  )

  const handleOligoDesignDocumentClose = useCallback(
    (result?: string) => {
      modalClose()
      if (result === 'save') {
        documentRefetch()
      }
    },
    [documentRefetch, modalClose]
  )

  const handleUpload = useCallback(() => {
    modalOpen({
      title: 'Upload Oligo design file',
      linetitle: true,
      textTitle: 'Upload documents by category and fill out the details.',
      maxWidth: 'm',
      content: <OligoDesignDocumentUpload processNumber={processNumber} onClose={handleOligoDesignDocumentClose} />,
    })
  }, [handleOligoDesignDocumentClose, modalOpen, processNumber])

  const handleFileDownload = useCallback((data) => {
    downloadFiles(data.fileInfoResponse)
  }, [])

  const handleDocumentEditClose = useCallback(
    (type: string) => {
      if (type === 'save') {
        documentRefetch()
      }
      modalClose()
    },
    [documentRefetch, modalClose]
  )

  const handleDocumentDeleteAlert = useCallback(
    (data) => {
      alertClose()
      documentDeleteMutation.mutate(data.fileInfoResponse.fileNumber, {
        onSuccess: () => {
          documentRefetch()
          toastOpen({ content: 'Successfully deleted.', icon: 'success' })
        },
        onError: () => {
          toastOpen({ content: 'Delete failed.', icon: 'warning' })
        },
      })
    },
    [alertClose, documentDeleteMutation, documentRefetch, toastOpen]
  )
  const handleDocumentDelete = useCallback(
    (data) => {
      alertOpen({
        icon: 'info',
        maxWidth: 's',
        title: 'Are you sure to delete?',
        textTitle: `If you click the delete button, it cannot be recovered.`,
        content: (
          <div className="align center mt_30">
            {/* 팝업의 버튼은 xlarge 사이즈 입니다.  */}
            <ButtonMui
              type="outlined"
              size="xlarge"
              onClick={() => {
                alertClose()
              }}
            >
              Cancel
            </ButtonMui>
            <ButtonMui
              size="xlarge"
              onClick={() => {
                handleDocumentDeleteAlert(data)
              }}
            >
              Delete
            </ButtonMui>
          </div>
        ),
      })
    },
    [alertClose, alertOpen, handleDocumentDeleteAlert]
  )

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFileKeyword(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setRequestFilterInfo((prev) => {
      return { ...prev, reqStsCd: e.target.value }
    })
  }, [])

  const handleAppTypeChange = useCallback((e: SelectChangeEvent) => {
    setRequestFilterInfo((prev) => {
      return { ...prev, appTpCd: e.target.value }
    })
  }, [])

  const handleSearchRequestChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRequestKeyword(e.target.value)
  }, [])

  const handleOligoDesignDecumentPageChange = useCallback((index) => {
    setFilePagination((prev) => {
      return { ...prev, currentPage: index }
    })
  }, [])

  useEffect(() => {
    if (isDocumentEdit) {
      modalUpdate('OligoDesignDocument', { title: 'Edit Oligo design document information', textTitle: 'Please edit the Oligo design document information.' })
    } else {
      modalUpdate('OligoDesignDocument', { title: 'Oligo design document information', textTitle: 'Please check oligo design document information.' })
    }
  }, [isDocumentEdit, modalUpdate])

  const openPopup = useCallback(
    (data) => {
      modalOpen({
        title: isDocumentEdit ? 'Edit Oligo design document information' : 'Oligo design document information',
        linetitle: true,
        textTitle: isDocumentEdit ? 'Please edit the Oligo design document information.' : 'Please check oligo design document information.',
        maxWidth: 'l',
        content: (
          <OligoDesignDocumentUploadEdit
            projectInfo={projectInfo}
            processCode={ProcessCode}
            onClose={handleDocumentEditClose}
            documentNum={data.fileInfoResponse.fileNumber}
            processNumber={processNumber}
          />
        ),
        deleteKey: 'OligoDesignDocument',
      })
    },
    [handleDocumentEditClose, isDocumentEdit, modalOpen, processNumber, projectInfo]
  )

  const handleDocumentEdit = useCallback(
    (data) => {
      setDocumentEdit(true)
      openPopup(data)
    },
    [openPopup, setDocumentEdit]
  )

  const handleOligoDesignDocumentClick = useCallback(
    (data: OligoDesignDocumentType, rowIndex: number, colIndex: number) => {
      setDocumentEdit(false)
      openPopup(data)
    },
    [openPopup, setDocumentEdit]
  )

  const requestKebabList = useMemo(() => {
    if (
      projectInfo.projectRoleCode === 'PJM' ||
      !!projectInfo.projectProcessRole.find((item) => item.processRoleCode === 'MGMT' && item.processCodes.includes(ProcessCode))
    ) {
      return [
        // { name: 'Copy request', onClick: handleRequestCopy },
        { name: 'Delete request', onClick: handleRequestDelete },
      ]
    }
    // if (!!projectInfo.projectProcessRole.find((item) => item.processRoleCode === 'EDIT' && item.processCodes.includes(ProcessCode))) {
    //   return [{ name: 'Copy request', onClick: handleRequestCopy }]
    // }
    return []
  }, [handleRequestDelete, projectInfo])

  const [filePath, setFilePath] = useState<{ fileNumber: number; path: string }[]>([])

  const setFilePathArr = useCallback(
    (rowData, res) => {
      const temp = filePath.find((item) => item.fileNumber === rowData.fileInfoResponse.fileNumber)
      if (!!temp) {
        setFilePath(
          filePath.map((item) =>
            item.fileNumber === rowData.fileInfoResponse.fileNumber ? { fileNumber: rowData.fileInfoResponse.fileNumber, path: res } : item
          )
        )
      } else {
        setFilePath(filePath.concat({ fileNumber: rowData.fileInfoResponse.fileNumber, path: res }))
      }
    },
    [filePath]
  )

  const setFileUrl = useCallback(
    (rowData: OligoDesignDocumentType) => {
      if (!!rowData.fileInfoResponse) {
        if (rowData.fileInfoResponse.storageTypeCode === 'PRV') {
          getPrvFileUrl(rowData.fileInfoResponse).then((res) => {
            if (res) {
              setFilePathArr(rowData, res)
            }
          })
        } else {
          setFilePathArr(rowData, getCdnFileUrl(rowData.fileInfoResponse))
        }
      }
    },
    [setFilePathArr]
  )

  const oligoDocumentKebabList = useCallback(
    (rowData: OligoDesignDocumentType) => {
      if (
        projectInfo.projectRoleCode === 'PJM' ||
        !!projectInfo.projectProcessRole.find((item) => item.processRoleCode === 'MGMT' && item.processCodes.includes(ProcessCode)) ||
        rowData.usrUid === userInfo?.usrUid
      ) {
        return [
          {
            name: 'Download file',
            element: (
              <button onMouseEnter={() => setFileUrl(rowData)}>
                <a href={filePath.find((item) => item.fileNumber === rowData.fileInfoResponse.fileNumber)?.path} download target="_blank">
                  Download file
                </a>
              </button>
            ),
          },
          { name: 'Edit file', onClick: handleDocumentEdit },
          { name: 'Delete file', onClick: handleDocumentDelete },
        ]
      }

      return [
        {
          name: 'Download file',
          element: (
            <button onMouseEnter={() => setFileUrl(rowData)}>
              <a href={filePath.find((item) => item.fileNumber === rowData.fileInfoResponse.fileNumber)?.path} download target="_blank">
                Download file
              </a>
            </button>
          ),
        },
      ]
    },
    [filePath, handleDocumentDelete, handleDocumentEdit, projectInfo, setFileUrl]
  )

  const handleRequestPagination = useCallback((page: number) => {
    setOligoDesignRequestPagination((prev) => {
      return { ...prev, currentPage: page }
    })
  }, [])

  const handleRequestFavorite = useCallback(
    (row) => {
      editRequestFavofiteMutation.mutate(
        { requestId: row.reqId, favYn: row.favYn ? 'N' : 'Y' },
        {
          onSuccess(data, variables, context) {
            requestRefetch()
          },
          onError(error, variables, context) {},
        }
      )
    },
    [editRequestFavofiteMutation, requestRefetch]
  )

  const handleSearchKeyChange = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key == 'Enter') {
        setFileFilterInfo((prev) => {
          return { ...prev, keyword: fileKeyword }
        })
      }
    },
    [fileKeyword]
  )

  const handleSearchClick = useCallback(() => {
    setFileFilterInfo((prev) => {
      return { ...prev, keyword: fileKeyword }
    })
  }, [fileKeyword])

  const handleSearchRequestKeyChange = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key == 'Enter') {
        setRequestFilterInfo((prev) => {
          return { ...prev, keyword: requestKeyword }
        })
      }
    },
    [requestKeyword]
  )

  const handleSearchRequestClick = useCallback(() => {
    setRequestFilterInfo((prev) => {
      return { ...prev, keyword: requestKeyword }
    })
  }, [requestKeyword])

  const handleRequest = useCallback((rowData: OligoDesignRequestType, rowIndex: number, colIndex: number) => {
    // location.href = `http://localhost:3030/request/?reqId=${data.reqId}`
    //http://localhost:3030/request/?reqId=RQ2300009
    ///isc/request/?reqId=RQ2300009
    // router.push(
    //   isDev ? `${process.env['NEXT_PUBLIC_URL_LOCAL_INSILICO']}/request/?reqId=${data.reqId}` ?? '' : `${getRootUrl()}/isc/request/?reqId=${data.reqId}`
    // )
    location.href = isDev
      ? `${process.env['NEXT_PUBLIC_URL_LOCAL_INSILICO']}/request/?reqId=${rowData.reqId}` ?? ''
      : `${getRootUrl()}/isc/request/?reqId=${rowData.reqId}`
  }, [])

  return (
    <ContentBox>
      <article>
        <div className="cont_title_box">
          <div className="align">
            <div className="lft">
              <p className="title1 align start">
                <span className="mr_10">Oligo Design Request List</span>
                <Badge uiType="solid" color="blue" style="count" size="sm">
                  {oligoDesignRequestList?.totalElements}
                </Badge>
              </p>
            </div>
            <div className="rgt">
              <ProcessStatusSelect projectInfo={projectInfo} processCode={ProcessCode} />
            </div>
          </div>
        </div>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Status">
              <SelectMui options={cCode['requestStatus']} onChange={handleStatusChange} value={requestFilterInfo.reqStsCd} />
            </FilterItem>
            <FilterItem label="App Type">
              <SelectMui options={cCode['appType']} onChange={handleAppTypeChange} value={requestFilterInfo.appTpCd} />
            </FilterItem>
            <FilterItem label="Keyword">
              <SearchIcoInput
                placeholder="Enter keyword"
                value={requestKeyword}
                onChangeSearch={handleSearchRequestChange}
                onSearch={handleSearchRequestKeyChange}
                onSearchClick={handleSearchRequestClick}
              />
            </FilterItem>
          </div>
          <div className="rgt">
            <FilterItem>
              <ButtonMui color="black" onClick={handleNewRequest} size="medium" type="contained" disabled={!getEditAuth(projectInfo, ProcessCode)}>
                Add Request
              </ButtonMui>
            </FilterItem>
          </div>
        </div>
        <BoardTable className="min_h305">
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '5%' }} />
            <col style={{ width: '6%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Status</th>
              <th>App Type</th>
              <th>ID</th>
              <th>Request Name</th>
              <th>Design Type</th>
              <th>Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {oligoDesignRequestList?.content.map((row, index) => (
              <tr key={row.reqId}>
                <td
                  onClick={() => {
                    handleRequest(row, index, 0)
                  }}
                >
                  <LabelBadgeStatus status={`${row.reqStsCdNm}`.toLowerCase()}>{row.reqStsCdNm}</LabelBadgeStatus>
                </td>
                <td
                  onClick={() => {
                    handleRequest(row, index, 1)
                  }}
                >
                  {row.appTpCdNm}
                </td>
                <td
                  onClick={() => {
                    handleRequest(row, index, 2)
                  }}
                >
                  {row.reqId}
                </td>
                <td
                  onClick={() => {
                    handleRequest(row, index, 3)
                  }}
                >
                  {row.reqNm}
                </td>
                <td
                  onClick={() => {
                    handleRequest(row, index, 4)
                  }}
                >
                  {row.reqDsignTpCdNm}
                </td>
                <td
                  onClick={() => {
                    handleRequest(row, index, 5)
                  }}
                >
                  {changeTimeLocal({ time: row.startDt, type: 'yyyy-MM-dd' })}
                </td>
                <td>
                  <ButtonMui
                    type="text"
                    size="xsmall"
                    onClick={() => {
                      handleRequestFavorite(row)
                    }}
                  >
                    <Icons.StarIcon width={20} height={20} fill={row.favYn ? '#9D9FFE' : '#FFFFFF'} stroke={row.favYn ? '#3357FF' : '#C6CDDA'} />
                  </ButtonMui>
                </td>
                <td>
                  {requestKebabList.length > 0 && (
                    <ContextButton<OligoDesignRequestType> rotate={true} iconsize={20} rowData={row} options={requestKebabList} />
                  )}
                </td>
              </tr>
            ))}
            {oligoDesignRequestList?.totalElements === 0 && (
              <tr className="nodata">
                <td colSpan={8}>
                  <NoData text="There are no requests." />
                </td>
              </tr>
            )}
          </tbody>
        </BoardTable>
        {oligoDesignRequestList?.totalElements > 0 && (
          <Pagenation
            currentPage={oligoDesignRequestPagination.currentPage}
            onPageChange={handleRequestPagination}
            pageSize={oligoDesignRequestPagination.pageSize}
            totalCount={oligoDesignRequestList?.totalElements}
            totalPage={oligoDesignRequestList?.totalPages}
          />
        )}
      </article>
      <article>
        <div className="cont_title_box">
          <p className="title1  align start">
            <span className="mr_10">Oligo Design Document List</span>
            <Badge uiType="solid" color="blue" style="count" size="sm">
              {oligoDesignDocumentList?.totalElements}
            </Badge>
          </p>
        </div>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Keyword">
              <SearchIcoInput
                placeholder="Enter keyword"
                value={fileKeyword}
                onChangeSearch={handleSearchChange}
                onSearch={handleSearchKeyChange}
                onSearchClick={handleSearchClick}
              />
            </FilterItem>
          </div>
          <div className="rgt">
            <FilterItem>
              <ButtonMui color="black" onClick={handleUpload} uiType="etc" size="medium" type="contained" disabled={!getEditAuth(projectInfo, ProcessCode)}>
                Upload File
              </ButtonMui>
            </FilterItem>
          </div>
        </div>
        <BoardTable className="min_h305">
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '6%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>ID</th>
              <th>File Name</th>
              <th>Uploader</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {oligoDesignDocumentList?.content.map((row, index) => (
              <tr key={`${row.fileInfoResponse.fileNumber}`}>
                <td
                  onClick={() => {
                    handleOligoDesignDocumentClick(row, index, 0)
                  }}
                >
                  {row.fileInfoResponse.fileNumber}
                </td>
                <td
                  onClick={() => {
                    handleOligoDesignDocumentClick(row, index, 1)
                  }}
                >{`${row.fileInfoResponse.displayFileName}.${row.fileInfoResponse.fileExtension}`}</td>
                <td
                  onClick={() => {
                    handleOligoDesignDocumentClick(row, index, 2)
                  }}
                >
                  {row.usrNm}
                </td>
                <td
                  onClick={() => {
                    handleOligoDesignDocumentClick(row, index, 3)
                  }}
                >
                  {changeTimeLocal({ time: row.mdfDt, type: 'yyyy-MM-dd' })}
                </td>
                <td>
                  {oligoDocumentKebabList.length > 0 && (
                    <ContextButton<OligoDesignDocumentType> rotate={true} iconsize={20} rowData={row} options={oligoDocumentKebabList(row)} />
                  )}
                </td>
              </tr>
            ))}
            {oligoDesignDocumentList?.totalElements === 0 && (
              <tr className="nodata">
                <td colSpan={5}>
                  <NoData text="There are no documents uploaded." />
                </td>
              </tr>
            )}
          </tbody>
        </BoardTable>
        {oligoDesignDocumentList?.totalElements > 0 && (
          <Pagenation
            currentPage={filePagination.currentPage}
            onPageChange={handleOligoDesignDecumentPageChange}
            pageSize={filePagination.pageSize}
            totalCount={oligoDesignDocumentList.totalElements}
            totalPage={oligoDesignDocumentList?.totalPages}
          />
        )}
      </article>
    </ContentBox>
  )
}
