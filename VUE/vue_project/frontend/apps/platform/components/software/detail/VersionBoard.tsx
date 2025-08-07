'use client'
import { useQuery } from '@tanstack/react-query'
import { SoftwareHistoryParamsType, SoftwareHistoryReturnType } from '@type/software/softwareType'
import { getPrvFileUrl, usePageNation, useParamsData } from 'library'
import { ModalType, useModal } from 'library/hook/useModal'
import { api, changeTimeLocal, getCdnFileUrl, isEmptyCheck } from 'library/util'
import { BoardTable, ButtonMui, EllipsisTypo, NoData, Pagenation } from 'ui'
import VersionPopup from './VersionPopup'
import { useState } from 'react'
import { FileResType } from 'library/type/common'

const initData = {
  size: 5,
}

const VersionBoard = ({ appsId }: { appsId: string }) => {
  const { modalOpen } = useModal()
  const { currentPage, onPageChange } = usePageNation()
  const [filePath, setFilePath] = useState('')

  const setFileUrl = (file: FileResType) => {
    if (!file) return null
    if (file.storageTypeCode === 'PRV') {
      getPrvFileUrl(file).then((res) => {
        setFilePath(res)
      })
    } else {
      setFilePath(getCdnFileUrl(file) ?? '')
    }
  }

  const getHistoryBoardFetcher = async ({ params, currentPage }) => {
    const param = {
      ...params,
      page: currentPage,
    }
    const response = await api.get(`/software/${appsId}/history/list`, {
      params: param,
    })
    return response.data
  }

  const { params } = useParamsData<SoftwareHistoryParamsType>(initData)
  const { data: historyDownload, isSuccess } = useQuery<SoftwareHistoryReturnType>(
    ['historyDownload', appsId, params, currentPage],
    () => getHistoryBoardFetcher({ params, currentPage }),
    {
      enabled: isEmptyCheck(params),
    }
  )
  //1. Version History -> detail API
  const getVersionDetail = async (releaseNumber) => {
    try {
      const response = await api.get(`/software/version/${releaseNumber}/detail`)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const handleVersionClick = async (releaseNumber: number) => {
    const detailData = await getVersionDetail(releaseNumber)

    const modalState: ModalType = {
      title: 'App version details',
      textTitle: 'Please check the app version and download the file.',
      linetitle: true,
      content: <VersionPopup detailData={detailData} />,
    }
    modalOpen(modalState)
  }

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: 'auto' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '130px' }} />
        </colgroup>

        <thead>
          <tr>
            <th>Release note</th>
            <th>Version</th>
            <th>Release date</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && historyDownload?.content.length === 0 ? (
            <tr className="nodata">
              <td colSpan={4}>
                <NoData text="There are no registered version history." />
              </td>
            </tr>
          ) : (
            historyDownload?.content.map((app, index) => {
              return (
                <tr key={index} onClick={() => handleVersionClick(app.softwareReleaseNumber)}>
                  <td>
                    <EllipsisTypo>{app.releaseNote}</EllipsisTypo>
                  </td>
                  <td>{app.version}</td>
                  <td>{changeTimeLocal({ time: app.createDate, type: 'yyyy-MM-dd' })}</td>
                  <td onClick={(event) => event.stopPropagation()} onMouseEnter={() => setFileUrl(app?.softwareFileResponse)}>
                    <ButtonMui
                      color="black"
                      icon="FileDownloadIcon"
                      uiType="etc"
                      className="round8"
                      iconStyle={{ fill: 'var(--navy800)', width: 16, height: 16 }}
                      size="small"
                      type="outlined"
                    >
                      <a style={{ color: 'var(--navy800)' }} href={filePath} download target="_blank">
                        Download
                      </a>
                    </ButtonMui>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </BoardTable>
      <Pagenation currentPage={currentPage} onPageChange={onPageChange} pageSize={params.size} totalCount={historyDownload?.totalElements} />
    </>
  )
}
export default VersionBoard
