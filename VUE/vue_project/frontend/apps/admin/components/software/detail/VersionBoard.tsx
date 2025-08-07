import { getSoftwareHistoryVersion } from '@api/software'
import { newVersionAtom } from '@store/client/software'
import { useSoftwareVersionList } from '@store/server/useSoftwareQuery'
import { useAtomValue } from 'jotai'
import { changeTimeLocal, getCdnFileUrl, getPrvFileUrl, useMenu, usePageNation } from 'library'
import { AlertType, useAlert } from 'library/hook/useAlert'
import { ModalType, useModal } from 'library/hook/useModal'
import { FileResType } from 'library/type/common'
import { useEffect, useState } from 'react'
import { BoardTable, ButtonMui, EllipsisTypo, NoData, Pagenation } from 'ui'
import AddVersion from './AddVersion'
import Delete from './Delete'
import EditVersion from './EditVersion'
import VersionPopup from './VersionPopup'
import { DetailVersionStep, DetailVersionTextTitle, EditVersionStep, EditVersionStepTextTitle } from './VersionPopupHeader'

const size = 5

const VersionBoard = ({ appsId, pathname }) => {
  const { getPathInfo } = useMenu()

  const { modalOpen, modalClose } = useModal()
  const { alertOpen } = useAlert()
  const isHistory = true
  const isDisabled = pathname === '/software/update/'

  const newVersion = useAtomValue(newVersionAtom)

  const [filePath, setFilePath] = useState('')
  const { currentPage, onPageChange } = usePageNation()

  const { history, isSuccess } = useSoftwareVersionList({ currentPage, size, appsId })

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

  //Add app version
  const modalState: ModalType = {
    title: 'Add app version',
    textTitle: 'Please enter information for the new version.',
    linetitle: true,
    content: <AddVersion appsId={appsId} />,
  }

  //1. Version History -> detail API
  const getVersionDetail = async (releaseNumber) => {
    getSoftwareHistoryVersion({ releaseNumber }).then((response) => {
      setDetailVersion(response)
    })
  }

  const deleteClick = async (delId: number) => {
    alertOpen(alertState(delId))
  }

  const alertState = (deleteId: number): AlertType => ({
    title: 'Are you sure to delete?',
    textTitle: <span>If you click the delete button, it cannot be recovered.</span>,
    maxWidth: 'xs', // maxwidth 없을 시 기본값 적용 (xs)
    icon: 'info',
    content: <Delete deleteId={deleteId} isHistory={isHistory} />,
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [update, setUpdate] = useState(false)

  const [detailVersion, setDetailVersion] = useState()

  const contentObj = {
    header: {
      1: <DetailVersionStep />,
      2: <EditVersionStep />,
    },
    textTitle: {
      1: <DetailVersionTextTitle />,
      2: <EditVersionStepTextTitle />,
    },
    content: {
      1: <VersionPopup setCurrentIndex={setCurrentIndex} detailData={detailVersion} />,
      2: <EditVersion setCurrentIndex={setCurrentIndex} setUpdate={setUpdate} detailData={detailVersion} setDetailVersion={setDetailVersion} />,
    },
  }

  const getModalHandler = () => {
    modalClose(currentIndex)
    const modalState = getModalState(currentIndex)
    modalOpen(modalState)
  }

  const getModalState = (currentStep) => {
    const modalState: ModalType = {
      deleteKey: currentStep,
      title: contentObj.header[currentStep],
      textTitle: contentObj.textTitle[currentStep],
      linetitle: true,
      content: contentObj.content[currentStep],
    }
    return modalState
  }

  useEffect(() => {
    if (currentIndex > 0) {
      getModalHandler()
    }
  }, [currentIndex, update, detailVersion])

  useEffect(() => {
    if (detailVersion) {
      modalClose()
      modalOpen(getModalState(1))
    }
  }, [detailVersion, update])

  return (
    <>
      <div className="cont_title_box">
        <div className="align">
          <p className="title1">Version History</p>
          <div className="rgt">
            <ButtonMui
              disabled={isDisabled || getPathInfo(pathname).crtYn !== 'Y'}
              color="black"
              onClick={() => {
                modalOpen(modalState)
              }}
              size="medium"
            >
              Add App Version
            </ButtonMui>
          </div>
        </div>
      </div>
      <BoardTable>
        <colgroup>
          <col style={{ width: 'auto' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '187px' }} />
          <col style={{ width: '140px' }} />
          <col style={{ width: '62px' }} />
        </colgroup>

        <thead>
          <tr className={isDisabled ? `disabled` : ''}>
            <th>Release Note</th>
            <th>Version</th>
            <th>Release Date</th>
            <th>Download</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && history?.content.length === 0 ? (
            <tr className="nodata">
              <td colSpan={5}>
                <NoData text="There are no registered version history." />
              </td>
            </tr>
          ) : (
            history?.content?.map((app, index) => {
              return (
                <tr
                  key={index}
                  className={isDisabled ? 'disabled' : ''}
                  onClick={() => {
                    setCurrentIndex(1)
                    getVersionDetail(app.softwareReleaseNumber)
                  }}
                >
                  <td>
                    <EllipsisTypo>{app.releaseNote}</EllipsisTypo>
                  </td>
                  <td>{app.version}</td>
                  <td>{changeTimeLocal({ time: app.createDate, type: 'yyyy-MM-dd' })}</td>
                  <td onClick={(event) => event.stopPropagation()} onMouseEnter={() => setFileUrl(app?.softwareFileResponse)}>
                    <ButtonMui
                      disabled={isDisabled}
                      color="black"
                      icon="FileDownloadIcon"
                      iconStyle={{ fill: isDisabled ? 'var(--typo500)' : 'var(--navy800)', width: 16, height: 16 }}
                      uiType="etc"
                      className="round8"
                      onClick={() => {}}
                      size="small"
                      type="outlined"
                    >
                      <a className={isDisabled ? 'typo500' : 'navy800'} href={filePath} download target="_blank">
                        Download
                      </a>
                    </ButtonMui>
                  </td>
                  <td onClick={(event) => event.stopPropagation()}>
                    <ButtonMui
                      disabled={isDisabled || getPathInfo(pathname).crtYn !== 'Y'}
                      icon="DeleteIcon"
                      size="xsmall"
                      type="text"
                      iconStyle={{ fill: isDisabled ? 'var(--navy100)' : 'var(--navy800)', width: 20, height: 20 }}
                      onClick={() => deleteClick(app.softwareReleaseNumber)}
                    />
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </BoardTable>
      <Pagenation currentPage={currentPage} onPageChange={onPageChange} pageSize={size} totalCount={history?.totalElements} />
    </>
  )
}

export default VersionBoard
