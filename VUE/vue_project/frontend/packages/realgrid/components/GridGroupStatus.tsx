/**
 * @author 박준우
 * @desc editor - PTOD - RepIN Info - Group Status
 */

import { ReactElement } from 'react'
import RealGrid, { CustomRenderer } from '../default'
import { ModalType, useModal } from 'library/hook/useModal'
import { ContextButton, Badge } from 'ui'
import { GridCell } from 'realgrid'
import { ToastType, useToastPopup } from 'library/hook/useToastPopup'

type ChangeTo = {
  cancel: () => void
  save: (params: Row) => void
  data?: Row
  dataList?: ReactElement
}

type GroupStatusParams = {
  grid: any
  rows: Row[]
  setData: Function
  Modal: React.ComponentType<ChangeTo>
}

type Row = {
  [key: string]: string
}

export const GridGroupStatus: React.FC<GroupStatusParams> = ({ grid, rows, setData, Modal }) => {
  const { options, gridApi, fields_0, columns_0 } = grid
  const { modalOpen, modalClose } = useModal()
  const dataList = (
    <datalist id="data-list-test">
      {Array.from({ length: 9 }, (_, index) => (
        <option key={index} value={`AA000000.${index + 1}`}></option>
      ))}
    </datalist>
  )

  // change data
  const setDataChange = (index: number = 0, obj: Row) => {
    const updatedRows = [...rows]
    updatedRows[index] = { ...updatedRows[index], ...obj }

    setData((prev: any) => ({
      ...prev,
      groupStatus: updatedRows,
    }))
  }

  // toast popup
  const { toastOpen } = useToastPopup()
  const toastState: ToastType = {
    icon: 'success',
    content: 'The edit so far has just been saved.',
    autoHideDuration: 3000,
  }

  // modal
  const RepINChange = (index: number, rowData: Row, dataList: ReactElement): ModalType => ({
    title: 'RepIN Change',
    maxWidth: 'xl',
    linetitle: true,
    content: (
      <Modal
        cancel={() => modalClose()}
        save={(inputValue: Row) => {
          setDataChange(index, inputValue)
          modalClose()
          toastOpen(toastState)
        }}
        data={rowData}
        dataList={dataList}
      />
    ),
  })

  // grid context menu
  const contextList = (index: number = 0, rowData: Row) => [
    {
      name: 'Delete',
      onClick: () => setDataChange(index, { recentChange: 'Delete' }),
    },
    {
      name: 'RepIN Change',
      onClick: () => modalOpen(RepINChange(index, rowData, dataList)),
    },
  ]
  // grid context menu
  const contextList2 = (index: number = 0) => [
    {
      name: 'Restore',
      onClick: () => setDataChange(index, { recentChange: 'Restore' }),
    },
  ]

  const recentChange = (grid: any, model: GridCell) => {
    const rowData = grid.getDisplayValuesOfRow(model.index?.itemIndex)
    const tempObj: { [key: string]: string } = {
      Delete: 'delete',
      'RepIN Change': 'change',
      Restore: 'cancel',
    }

    return (
      rowData.recentChange && (
        <>
          <Badge style="round" uiType="solid" color={`${tempObj[rowData.recentChange]}`}>
            {rowData.recentChange}
          </Badge>
        </>
      )
    )
  }

  const detail = (grid: any, model: GridCell) => {
    const rowData = grid.getDisplayValuesOfRow(model.index?.itemIndex)
    const listType = rowData.recentChange == 'Delete' ? contextList2 : contextList
    return <ContextButton rotate={true} iconsize={20} options={listType(model.index?.itemIndex, rowData)} />
  }

  const gridMethod = () => ({
    setPaging: [true, 10],
    registerCustomRenderer_0: CustomRenderer('RecentChange', recentChange),
    registerCustomRenderer_1: CustomRenderer('Custom', detail),
  })

  return <RealGrid columns={columns_0} fields={fields_0} rows={rows} options={options} gridApi={{ ...gridMethod(), ...gridApi }} />
}
