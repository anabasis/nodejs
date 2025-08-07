/**
 * @author 박준우
 * @desc editor - PTOD - AutoMSA Info - User Seq
 */

import { useEffect } from 'react'
import RealGrid, { CustomRenderer } from '../default'
import { GridCell } from 'realgrid'
import { IscIcons, Icons, ButtonMui, Badge, TaxonTable } from 'ui'
import { TooltipClick } from 'ui/mui/TooltipClick'
import { useModal } from 'library/hook/useModal'
import { ModalContentProps } from 'library/type/popup'
import { apiIsc } from 'library/util'

type GroupStatusParams = {
  grid: any
  rows: Row[]
  setData?: Function
  FastaInfo?: React.ComponentType<
    ModalContentProps & {
      filter: {
        seqTpCd?: '' | 'Error' | 'N included'
        errCd: string
      }
      chocTpCd: 'all' | 'abnormal'
      fileName?: string
      usrSeqNum: number
    }
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
    <div>
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
            <td>EPI_ISL_13953631</td>
            <td>34</td>
            <td>1</td>
          </tr>
          <tr>
            <td>EPI_ISL_13953631</td>
            <td>34</td>
            <td>1</td>
          </tr>
        </tbody>
      </TaxonTable>
    </div>
  ),
  gird2: <p> AC - 12301.1 </p>,
}

const preRepIn = () => <IscIcons.Done fill={`#697F98`} />

const category = (grid: any, model: GridCell) => {
  const rowData = grid.getValue(model.index?.itemIndex, 'CauseOfError/NIncludedSeqCount')
  if (rowData.split(',').length > 1) {
    return (rowData.split(',') || []).map((v: string, i: number) => (
      <Badge style="ods" uiType="solid" color={i === 0 ? 'blue' : `blue${i + 1}00`} key={i}>
        {v}
      </Badge>
    ))
  }
  return rowData
}

const tooltip = (grid: any, model: GridCell) => {
  const rowData = grid.getDisplayValuesOfRow(model.index?.itemIndex)

  return (
    <TooltipClick title="View Detail" placements="bottom-start">
      {detailCase[rowData.Case]}
    </TooltipClick>
  )
}

const GridAbnormalSeq = ({ grid, rows, setData, FastaInfo }: GroupStatusParams) => {
  const { options, gridApi, fields_1, columns_1 } = grid
  const { modalOpen, modalClose } = useModal()

  const detail = (grid: any, model: GridCell) => {
    const rowData = grid.getDisplayValuesOfRow(model.index?.itemIndex)
    const fileName = rowData.source ? rowData.source.split(' ')?.[1] || '' : rowData.name

    return (
      // static 버튼으로 적용
      <button
        className="btn line gray xs"
        onClick={() => {
          FastaInfo &&
            modalOpen({
              title: 'Fasta Info',
              linetitle: true,
              maxWidth: 'xl',
              content: (
                <FastaInfo
                  chocTpCd={rowData.chocTpCd}
                  filter={{
                    seqTpCd: rowData.seqTpCd,
                    errCd: rowData.errCd,
                  }}
                  fileName={fileName}
                  usrSeqNum={rowData?.usrSeqNum || 0}
                  onClose={modalClose}
                />
              ),
            })
        }}
      >
        <Icons.SearchIcon width={20} height={20} fill="var(--navy600)" />
      </button>
    )
  }

  const gridMethod = () => ({
    setCheckBar: { width: 50, showAll: false },
    registerCustomRenderer_0: CustomRenderer('PreRepIN', preRepIn),
    registerCustomRenderer_1: CustomRenderer('Error/Count', category),
    registerCustomRenderer_2: CustomRenderer('Tooltip', tooltip),
    registerCustomRenderer_3: CustomRenderer('Detail', detail),
  })

  useEffect(() => {
    // [ISC046] User seq Fasta Detail 목록 조회
    const getAbnormalSeq = async ({ ...params }) => {
      const baseUrl = '/create'
      const requestId = 'RQ2300001'
      const analyteId = 'A08'

      const { data } = await apiIsc.post(`${baseUrl}/user-seq/abnormal-seq/${requestId}/${analyteId}/list`)

      return {
        userSeqAbnormalSeqList: [
          {
            usrSeqNum: 100237,
            seqTpCd: 'Error',
            chocTpCd: 'Exclusivity',
            preRepinYn: 'N',
            source: 'FASTA gisaid_hcov-19_2021_02_24_01_Spike_W152C.fasta',
            errMsg: 'Seq length exceeded',
            nIncludedSeqCount: [],
            totalSeqCount: 5468,
            abnormalCount: 5468,
          },
        ],
        usrSeqAbnormalCount: {
          errSeqCount: 21991,
          errSeqPreRepinYnCount: 2,
          nincludedSeqCount: 1,
          nincludedPreRepinYnCount: 0,
          finalSeqCount: 35,
          normalSeq: 0,
          nincludedSeq: 35,
        },
      }
    }
  }, [])

  return <RealGrid columns={columns_1} fields={fields_1} rows={rows} options={options} gridApi={{ ...gridApi, ...gridMethod() }} style={{ height: '350px' }} />
}

export default GridAbnormalSeq
