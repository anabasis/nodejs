/**
 * @author 박준우
 * @desc editor - PTOD - AutoMSA Info - User Seq
 */

import { useEffect } from 'react'
import { GridCell } from 'realgrid'
import RealGrid, { CustomRenderer } from '../default'
import { TooltipClick, IscIcons, Icons, ButtonMui, TaxonTable } from 'ui'
import { useModal } from 'library/hook/useModal'
import { ModalContentProps } from 'library/type/popup'
import { apiIsc } from 'library/util'

type GroupStatusParams = {
  grid: any
  rows: Row[]
  setData?: Function
  FastaInfo?: React.ComponentType<
    {
      filter?: {
        seqTpCd?: '' | 'Error' | 'N included'
        errCd?: string
      }
      chocTpCd: 'Inclusivity' | 'Exclusivity' // 모달 발생 위치
      fileName?: string
      usrSeqNum: number
    } & ModalContentProps
  >
}

type Row = {
  [key: string]: string
}

type DetailCase = {
  [key: string]: JSX.Element
}

// data 확인 후 수정 예정
const detailCase: DetailCase = {
  text1: <p> AC - 12301.1 </p>,
  text2: <p> ACGTGACTAGCTAGTCACGCATGCTCGNACATCGCGACGTAGTCGATCGTAGCTAGACTAGCTAGTCACGCAACTAGCTAGTCACGCAACTGCAGCGTAGTCGTACACAAG </p>,
  grid1: (
    <div className="mt_10">
      <TaxonTable>
        <colgroup>
          <col style={{ width: '33.333333%' }} />
          <col style={{ width: '33.333333%' }} />
          <col style={{ width: '33.333333%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>
              <div className="align">N Range</div>
            </th>
            <th>
              <div className="align">Non-Nucleotide Position</div>
            </th>
            <th>
              <div className="align">Non-Nucleotide count</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>EPI_ISL_13953631</div>
            </td>
            <td>
              <div>34</div>
            </td>
            <td>
              <div>1</div>
            </td>
          </tr>
          <tr>
            <td>
              <div>EPI_ISL_13953631</div>
            </td>
            <td>
              <div>34</div>
            </td>
            <td>
              <div>1</div>
            </td>
          </tr>
        </tbody>
      </TaxonTable>
    </div>
  ),
  gird2: <p> AC - 12301.1 </p>,
}

const preRepIn = () => <IscIcons.Done fill={`#697F98`} />

const tooltip = (grid: any, model: GridCell) => {
  const rowData = grid.getDisplayValuesOfRow(model.index?.itemIndex)

  return (
    <TooltipClick title="View Detail" placements="bottom-start">
      {detailCase[rowData.Case]}
    </TooltipClick>
  )
}

const status = (grid: any, model: GridCell) => {
  const rowData = grid.getDisplayValuesOfRow(model.index?.itemIndex)

  const iconMap: { [key: string]: JSX.Element } = {
    Error: <IscIcons.Error />,
    Done: <IscIcons.Done />,
    Uploading: <IscIcons.Uploading />,
  }

  return (
    <>
      {iconMap[rowData.Status] || null} {rowData.Status}
    </>
  )
}

const GridAllSeq = ({ grid, rows, setData, FastaInfo }: GroupStatusParams) => {
  const { options, gridApi, fields_0, columns_0 } = grid
  const { modalOpen, modalClose } = useModal()

  const detail = (grid: any, cell: GridCell) => {
    const rowData = grid.getValues(cell.index?.itemIndex)
    const fileName = rowData.source ? rowData.source.split(' ')?.[1] || '' : rowData.name
    const openFastaInfo = () => {
      FastaInfo &&
        modalOpen({
          title: 'Fasta Info',
          linetitle: true,
          maxWidth: 'xl',
          content: <FastaInfo onClose={modalClose} onOpen={modalOpen} chocTpCd={rowData.chocTpCd} fileName={fileName} usrSeqNum={rowData?.usrSeqNum || 0} />,
          deleteKey: 'fastaInfo',
        })
    }

    return (
      // static 버튼으로 적용
      <button className="btn line gray xs" onClick={openFastaInfo}>
        <Icons.SearchIcon width={20} height={20} fill="var(--navy600)" />
      </button>
    )
  }

  const gridMethod = () => ({
    setCheckBar: { width: 50, showAll: false },
    registerCustomRenderer_0: CustomRenderer('PreRepIN', preRepIn),
    registerCustomRenderer_1: CustomRenderer('Tooltip', tooltip),
    registerCustomRenderer_2: CustomRenderer('Status', status),
    registerCustomRenderer_3: CustomRenderer('Detail', detail),
  })

  useEffect(() => {
    // [ISC046] User seq Fasta Detail 목록 조회
    const getAllSeq = async ({ ...params }) => {
      const baseUrl = '/create'
      const requestId = 'RQ2300001'
      const analyteId = 'A08'

      const { data } = await apiIsc.post(`${baseUrl}/user-seq/all-seq/${requestId}/${analyteId}/list`)

      return {
        userSeqAllSeqList: [
          {
            usrSeqNum: 100240,
            addedType: 'FASTA or Manual',
            chocTpCd: 'Inclusivity or Exclusivity',
            preRepinYn: 'N or Y',
            name: '1654534.txt',
            sequence: 'ACTGACTGACTGACTGATCGATCGATGCTAGCTAGCTAGCTAGCTAGCTAGCATCGACTCAGCATCGACTAGC',
            totalSeqCount: 15323,
          },
        ],
        usrSeqAllCount: {
          fastaFileCount: 1242,
          fastaPreRepinYnCount: 23534,
          fastaSeqCount: 2345,
          manualTotalCount: 6433,
          manualPreRepinYnCount: 12423,
          finalSeqCount: 50,
          normalSeq: 20,
          nincludedSeq: 30,
        },
      }
    }
  }, [])

  return (
    <>
      <RealGrid columns={columns_0} fields={fields_0} rows={rows} options={options} gridApi={{ ...gridApi, ...gridMethod() }} style={{ height: '350px' }} />
    </>
  )
}

export default GridAllSeq
