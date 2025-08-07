import { usePathname, useRouter } from 'next/navigation'
import { ButtonMui, BoardTable, Pagenation, NoData } from 'ui'
import { AlertType, changeTimeLocal, useAlert, useMenu, usePageNation } from 'library'
import { useAlgoCustomCodeVerQuery } from '@store/server/algorithm/useAlogCodeQuery'
import { useAlogoCodeMutate } from '@store/server/algorithm/useAlogCodeQuery'
import { useEffect } from 'react'
type AlogorthmCodeVersionTableType = {
  editState?: boolean
  PartialCodeId: string
}

const AlogorthmCodeVersionTable = ({ editState, PartialCodeId }: AlogorthmCodeVersionTableType) => {
  const router = useRouter()
  const { alertOpen, alertClose } = useAlert()
  const { algoCodeVerDelete } = useAlogoCodeMutate()
  const { currentPage, onPageChange } = usePageNation()
  const { algorithmCustomCodeVerList, isSuccess } = useAlgoCustomCodeVerQuery({ PartialCodeId, currentPage })
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const deleteCodeVer = ({ PartialCodeVerId }) => {
    algoCodeVerDelete(
      { PartialCodeId, PartialCodeVerId },
      {
        onSettled: () => {
          alertClose()
        },
      }
    )
  }

  const deleteProcess = (event: React.MouseEvent<HTMLButtonElement>, PartialCodeVerId: number) => {
    event.stopPropagation()
    const alertState: AlertType = {
      InfoType: 'delete',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => deleteCodeVer({ PartialCodeVerId })}>
            Delete
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
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
              onClick={() => router.push(`/algorithm/custom-code/version/add?partialCodeId=${PartialCodeId}`)}
            >
              Add Custom Code Version
            </ButtonMui>
          </div>
        </div>
      </div>
      <BoardTable>
        <colgroup>
          <col style={{ width: '10%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '55px' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Version</th>
            <th>Release Note</th>
            <th>Released Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && algorithmCustomCodeVerList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={4}>
                <NoData text="There are no version history." />
              </td>
            </tr>
          ) : (
            algorithmCustomCodeVerList?.content?.map((algo) => (
              <tr
                key={algo.id}
                className={editState ? 'disabled' : ''}
                onClick={() => !editState && router.push(`/algorithm/custom-code/version/detail?partialCodeId=${PartialCodeId}&partialCodeVerId=${algo.id}`)}
              >
                <td>{algo.version}</td>
                <td>{algo.note}</td>
                <td>{changeTimeLocal({ time: algo.releaseDt, type: 'yyyy-MM-dd' })}</td>

                <td>
                  <ButtonMui
                    icon="DeleteIcon"
                    size="xsmall"
                    type="text"
                    disabled={editState || getPathInfo(pathname).crtYn !== 'Y'}
                    iconStyle={{ fill: 'var(--navy800)', width: 16, height: 16 }}
                    onClick={(event) => deleteProcess(event, algo.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation currentPage={currentPage} onPageChange={onPageChange} pageSize={5} totalCount={algorithmCustomCodeVerList?.totalElements} />
    </article>
  )
}

export default AlogorthmCodeVersionTable
