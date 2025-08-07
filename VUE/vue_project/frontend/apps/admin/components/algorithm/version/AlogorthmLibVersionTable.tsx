import { usePathname, useRouter } from 'next/navigation'
import { ButtonMui, BoardTable, NoData, Pagenation } from 'ui'
import { AlertType, changeTimeLocal, useAlert, useMenu, usePageNation } from 'library'
import { useAlgoLibVerListQuery, useAlogoMutate } from '@store/server/algorithm/useAlogLibQuery'
import { getAlgorithmLibDownolad } from '@api/algorithm/library'

type AlogorthmLibVersionTableType = {
  editState?: boolean
  libId: string
}

const AlogorthmLibVersionTable = ({ editState, libId }: AlogorthmLibVersionTableType) => {
  const router = useRouter()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const { alertOpen, alertClose } = useAlert()
  const { currentPage, onPageChange } = usePageNation()
  const { algorithmLibVerList, isSuccess } = useAlgoLibVerListQuery({ libId, currentPage })
  const { algohmLibVerDelete } = useAlogoMutate()
  const deletedLibVer = (libVerId) => {
    algohmLibVerDelete(
      { libId, libVerId },
      {
        onSettled: () => {
          alertClose()
        },
      }
    )
  }

  const deletedProcess = (event: React.MouseEvent<HTMLButtonElement>, libVerId: number) => {
    event.stopPropagation()
    const alertState: AlertType = {
      InfoType: 'delete',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => deletedLibVer(libVerId)}>
            Delete
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  const download = async (event: React.MouseEvent<HTMLButtonElement>, libVerId: number, libFilName: string) => {
    event.stopPropagation()

    try {
      const data = await getAlgorithmLibDownolad({ libVerId })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(data)
      a.download = `${libFilName}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <article>
      <div className="cont_title_box">
        <div className="align">
          <div className="lft">
            <p className="title1">Version History</p>
          </div>
          <div className="rgt">
            <ButtonMui
              disabled={editState || getPathInfo(pathname).crtYn !== 'Y'}
              color="black"
              onClick={() => router.push(`/algorithm/library-manage/version/add?libId=${libId}`)}
            >
              Add Library Version
            </ButtonMui>
          </div>
        </div>
      </div>
      <BoardTable>
        <colgroup>
          <col style={{ width: '10%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '205px' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Version</th>
            <th>Release Note</th>
            <th>Released Date</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && algorithmLibVerList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={4}>
                <NoData text="There are no version history" />
              </td>
            </tr>
          ) : (
            algorithmLibVerList?.content?.map((algo) => (
              <tr
                key={algo.id}
                className={editState ? 'disabled' : ''}
                onClick={() => !editState && router.push(`/algorithm/library-manage/version/detail?libId=${libId}&libVerId=${algo.id}`)}
              >
                <td>{algo.version}</td>
                <td>{algo.note}</td>
                <td>{changeTimeLocal({ time: algo.releaseDt, type: 'yyyy-MM-dd' })}</td>
                <td className="pr_30">
                  {/* 스타일 가이드 공통에 없는 버튼 형태이므로 공통 버튼 작성 */}
                  <div className="">
                    <ButtonMui
                      icon="FileDownloadIcon"
                      size="small"
                      type="outlined"
                      color="black"
                      uiType="etc"
                      className="round8"
                      iconStyle={{ fill: 'var(--navy800)', width: 16, height: 16 }}
                      disabled={editState || getPathInfo(pathname).crtYn !== 'Y'}
                      onClick={(event) => download(event, algo.id, algo.libFilName)}
                    >
                      Download
                    </ButtonMui>
                    <ButtonMui
                      className="ml_24"
                      icon="DeleteIcon"
                      size="xsmall"
                      type="text"
                      disabled={editState || getPathInfo(pathname).crtYn !== 'Y'}
                      iconStyle={{ fill: 'var(--navy800)' }}
                      onClick={(event) => deletedProcess(event, algo.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation currentPage={currentPage} onPageChange={onPageChange} pageSize={5} totalCount={algorithmLibVerList?.totalElements} />
    </article>
  )
}

export default AlogorthmLibVersionTable
