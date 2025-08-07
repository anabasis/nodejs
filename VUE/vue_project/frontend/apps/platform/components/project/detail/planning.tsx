'use client'

import Pagenation from 'ui/components/common/Pagenation'
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react'
import { ContextButton, ContentBox, Badge, SelectMui, ButtonMui, BoardTable, EllipsisTypo, DetailTable, SearchIcoInput, SelectChangeEvent, NoData } from 'ui'
import FilterItem from 'ui/molecules/FilterItem'
import InnerTd from 'ui/molecules/InnerTd'
import { useModal } from 'library/hook/useModal'
import { useToastPopup } from 'library/hook/useToastPopup'
import { useAlert } from 'library/hook/useAlert'
import UploadFile from './uploadFile'
import { changeTimeLocal, downloadFiles, getCdnFileUrl, getCode, getPrvFileUrl } from 'library/util'
import { useQueries } from '@tanstack/react-query'
import { PlanningDocumentType, ProcessType, ProjectBasicInfoType, ProjectPaginationType } from '@type/project/projectType'
import {
  useDeleteDocumentMutation,
  usePlanningDetailData,
  usePlanningDocumentData,
  usePlanningDocumentStatusMutation,
  usePlanningInfoMutation,
} from '@store/server/useProjectQuery'
import ProcessStatusSelect from './processStatusSelect'
import { useUser } from 'library/hook'
import { getEditAuth, getMGAuth } from '../projectCommon'

export default function Planning({ projectInfo, processInfo }: { projectInfo: ProjectBasicInfoType; processInfo: ProcessType[] }) {
  const ProcessCode = 'PLNG'
  const commonCodes = { productType: 'PFM021', dataType: 'PFM022', projectFileType: 'PFM024', fileStatus: 'PFM065' }
  const codes = useQueries({
    queries: Object.values(commonCodes).map((v) => {
      return { queryKey: ['code', v], queryFn: () => getCode(v), staleTime: Infinity }
    }),
  })
  let cCode = {}
  Object.keys(commonCodes).forEach((v, i) => {
    if ((v === 'projectFileType' || v === 'fileStatus') && typeof codes[i].data === 'object') {
      cCode[v] = [{ name: 'All', value: '' }].concat(codes[i].data)
    } else {
      cCode[v] = codes[i].data
    }
  })

  const { modalOpen, modalClose } = useModal()
  const { toastOpen } = useToastPopup()
  const { alertOpen, alertClose } = useAlert()
  const { userInfo } = useUser()
  const [processNumber, setProcessNumber] = useState<number>(-1)
  const [filterInfo, setFilterInfo] = useState<{ fileStatus: string; fileType: string; keyword: string }>({ fileStatus: '', fileType: '', keyword: '' })
  const [keyword, setKeyword] = useState('')
  const [paginationInfo, setPaginationInfo] = useState<ProjectPaginationType>({ pageSize: 10, currentPage: 0 })
  const [planningInfoData, setPlanningInfoData] = useState<{
    productType: string
    dataType: string
  }>({ productType: '', dataType: '' })

  const { data: planningInfo, refetch: planningFetch } = usePlanningDetailData(projectInfo.id)
  const { data: planningDocumentList, refetch: reFetchPlanningDocument } = usePlanningDocumentData(`${projectInfo.id}`, filterInfo, paginationInfo)

  const documentDeleteMutation = useDeleteDocumentMutation()
  const planningEditMutation = usePlanningInfoMutation()
  const documentStatusMutaion = usePlanningDocumentStatusMutation()

  useEffect(() => {
    if (!!planningInfo) {
      setPlanningInfoData(planningInfo)
    }
  }, [planningInfo])

  useEffect(() => {
    if (!!processInfo) {
      const process = processInfo.find((item) => item.prcsCode === ProcessCode)
      if (process) {
        setProcessNumber(process.prjPrcsNumber)
      }
    }
  }, [processInfo])

  useEffect(() => {
    if (!!planningDocumentList) {
      if (paginationInfo.currentPage !== 0 && planningDocumentList.content.length === 0) {
        setPaginationInfo((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))
      }
    }
  }, [planningDocumentList])

  const handleFileAlertDelete = useCallback(
    (data: PlanningDocumentType) => {
      alertClose()
      documentDeleteMutation.mutate(data.fileInfoResponse.fileNumber, {
        onSuccess: () => {
          reFetchPlanningDocument()
          toastOpen({ content: 'Successfully deleted.', icon: 'success' })
        },
        onError: () => {
          toastOpen({ content: 'Delete failed.', icon: 'warning' })
        },
      })
    },
    [alertClose, documentDeleteMutation, reFetchPlanningDocument, toastOpen]
  )

  const handleChangeStatus = useCallback(
    (data: PlanningDocumentType) => {
      documentStatusMutaion.mutate(
        { projectId: `${projectInfo.id}`, fileNum: `${data.fileInfoResponse.fileNumber}` },
        {
          onSuccess(data, variables, context) {
            reFetchPlanningDocument()
            toastOpen({ content: 'Document version change complete.', icon: 'success' })
          },
        }
      )
    },
    [documentStatusMutaion, projectInfo, reFetchPlanningDocument, toastOpen]
  )

  const handleFileDelete = useCallback(
    (data: PlanningDocumentType) => {
      alertOpen({
        icon: 'info',
        maxWidth: 's',
        title: 'Are you sure to delete?',
        textTitle: 'If you click the delete button, it cannot be recovered.',
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
                handleFileAlertDelete(data)
              }}
            >
              Delete
            </ButtonMui>
          </div>
        ),
      })
    },
    [alertClose, alertOpen, handleFileAlertDelete]
  )

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
    (rowData: PlanningDocumentType) => {
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

  const getOptions = useCallback(
    (rowData: PlanningDocumentType) => {
      if (
        projectInfo.projectRoleCode === 'PJM' ||
        !!projectInfo.projectProcessRole.find((item) => item.processRoleCode === 'MGMT' && item.processCodes.includes(ProcessCode))
      ) {
        return [
          { name: rowData.fnlYn === 'Y' ? 'Undo as final version' : 'Set as final version', onClick: handleChangeStatus },
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
          { name: 'Delete file', onClick: handleFileDelete },
        ]
      }
      if (rowData.usrUid === userInfo.usrUid) {
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
          { name: 'Delete file', onClick: handleFileDelete },
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
    [filePath, handleChangeStatus, handleFileDelete, projectInfo, setFileUrl, userInfo]
  )

  const handleUploadClose = useCallback(
    (type?: string) => {
      modalClose()
      if (type === 'save') {
        reFetchPlanningDocument()
      }
    },
    [modalClose, reFetchPlanningDocument]
  )

  const handleUpload = useCallback(() => {
    modalOpen({
      title: 'Upload Planning file',
      linetitle: true,
      textTitle: 'Upload your documents by category and fill out the details.',
      maxWidth: 'm',
      content: <UploadFile onClose={handleUploadClose} processNumber={processNumber} />,
    })
  }, [handleUploadClose, modalOpen, processNumber])

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  const handleFileTypeChange = useCallback((e: SelectChangeEvent) => {
    setFilterInfo((prev) => {
      return { ...prev, fileType: e.target.value }
    })
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setFilterInfo((prev) => {
      return { ...prev, fileStatus: e.target.value }
    })
  }, [])

  const handlePagination = useCallback((page: number) => {
    setPaginationInfo((prev) => {
      return { ...prev, currentPage: page }
    })
  }, [])

  const handleProductTypeChange = useCallback(
    (e: SelectChangeEvent) => {
      planningEditMutation.mutate(
        { ...planningInfoData, id: projectInfo.id, productType: e.target.value },
        {
          onSuccess: () => {
            planningFetch()
          },
          onError: () => {
            planningFetch()
          },
        }
      )
    },
    [planningEditMutation, planningFetch, planningInfoData, projectInfo]
  )

  const handleDataTypeChange = useCallback(
    (e: SelectChangeEvent) => {
      planningEditMutation.mutate(
        { ...planningInfoData, id: projectInfo.id, dataType: e.target.value },
        {
          onSettled: () => {
            planningFetch()
          },
        }
      )
    },
    [planningEditMutation, planningFetch, planningInfoData, projectInfo]
  )

  const handleSearchClick = useCallback(() => {
    setFilterInfo((prev) => {
      return { ...prev, keyword: keyword }
    })
  }, [keyword])

  const handleSearchKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key == 'Enter') {
        setFilterInfo((prev) => {
          return { ...prev, keyword: keyword }
        })
      }
    },
    [keyword]
  )

  return (
    <ContentBox>
      <article>
        <div className="cont_title_box">
          <div className="align">
            <div className="lft">
              <p className="title1">Planning Basic Information</p>
            </div>
            <div className="rgt">
              <ProcessStatusSelect projectInfo={projectInfo} processCode={ProcessCode} />
            </div>
          </div>
        </div>
        <DetailTable
          className="mt_0"
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
            <th>Product type</th>
            <td>
              <SelectMui
                size="large"
                placeholder="Select product type."
                onChange={handleProductTypeChange}
                options={cCode['productType']}
                value={planningInfoData.productType}
                disabled={!getMGAuth(projectInfo, ProcessCode)}
              />
            </td>
            <th>Data type</th>
            <td>
              <SelectMui
                size="large"
                placeholder="Select data type."
                onChange={handleDataTypeChange}
                options={cCode['dataType']}
                value={planningInfoData?.dataType}
                disabled={!getMGAuth(projectInfo, ProcessCode)}
              />
            </td>
          </tr>
        </DetailTable>
      </article>
      <article className="mt_50">
        <div className="cont_title_box">
          <p className="title1 align start">
            <span className="mr_10">Planning Document List</span>
            <Badge uiType="solid" color="blue" style="count" size="sm">
              {planningDocumentList?.totalElements}
            </Badge>
          </p>
        </div>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Status">
              <SelectMui options={cCode['fileStatus']} onChange={handleStatusChange} value={filterInfo.fileStatus} />
            </FilterItem>
            <FilterItem label="File type">
              <SelectMui options={cCode['projectFileType']} onChange={handleFileTypeChange} value={filterInfo.fileType} />
            </FilterItem>
            <FilterItem label="Keyword">
              <SearchIcoInput
                placeholder="Enter keyword"
                value={keyword}
                onChangeSearch={handleSearchChange}
                onSearch={handleSearchKey}
                onSearchClick={handleSearchClick}
              />
            </FilterItem>
          </div>
          <div className="rgt">
            <FilterItem>
              <ButtonMui color="black" uiType="etc" onClick={handleUpload} size="medium" type="contained" disabled={!getEditAuth(projectInfo, ProcessCode)}>
                Upload File
              </ButtonMui>
            </FilterItem>
          </div>
        </div>
        <BoardTable className="h700">
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '7%' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '6%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>File Type</th>
              <th>ID</th>
              <th>File Name</th>
              <th>Uploader</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {planningDocumentList?.content.map((row) => (
              <tr key={`${row.fileInfoResponse.fileNumber}`} className="h66">
                <td>
                  {row.fnlYn === 'Y' ? (
                    <InnerTd>
                      <EllipsisTypo>{row.fileType}</EllipsisTypo>
                      <Badge>Final</Badge>
                    </InnerTd>
                  ) : (
                    row.fileType
                  )}
                </td>
                <td>{row.fileInfoResponse.fileNumber}</td>
                <td>
                  <button onMouseEnter={() => setFileUrl(row)}>
                    <a href={filePath.find((item) => item.fileNumber === row.fileInfoResponse.fileNumber)?.path} download target="_blank">
                      {`${row.fileInfoResponse.displayFileName}.${row.fileInfoResponse.fileExtension}`}
                    </a>
                  </button>
                </td>
                <td>{row.usrNm}</td>
                <td>{changeTimeLocal({ time: row.mdfDt, type: 'yyyy-MM-dd' })}</td>
                <td className="">
                  <ContextButton<PlanningDocumentType> rotate={true} iconsize={20} rowData={row} options={getOptions(row)} />
                </td>
              </tr>
            ))}
            {planningDocumentList?.totalElements === 0 && (
              <tr className="nodata">
                <td colSpan={6}>
                  <NoData text="There are no documents uploaded." />
                </td>
              </tr>
            )}
          </tbody>
        </BoardTable>
        {planningDocumentList?.totalElements > 0 && (
          <Pagenation
            currentPage={paginationInfo.currentPage}
            onPageChange={handlePagination}
            pageSize={paginationInfo.pageSize}
            totalCount={planningDocumentList?.totalElements}
            totalPage={planningDocumentList?.totalPages}
          />
        )}
      </article>
    </ContentBox>
  )
}
