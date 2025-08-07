/**
 * @author 오성광
 * @desc  Unsuitable List
 */

import RealGrid, { CustomRenderer } from '../default'
import { GridCell } from 'realgrid'
import { IconTypo } from 'ui'

type GroupStatusParams = {
  grid: any
  setData?: Function
  rows?: UnsuitParams[]
}

type UnsuitParams = {
  IEC?: string
  ID?: unsuitNameType[]
  Name?: unsuitNameType[]
}

type unsuitNameType = {
  taxonId?: string
  taxonName?: string
  type?: string
  unsuitabilityType?: string
}

const setIconTypo = (data: string, target: boolean) => {
  return (
    <>
      {target ? (
        <div>
          <IconTypo icon="TooltipIcon" width={16} height={16} fill="#E1315A">
            {data}
          </IconTypo>
        </div>
      ) : (
        data
      )}
    </>
  )
}

const idIconTypo = (grid: any, model: GridCell) => {
  const rowData = grid.getDisplayValuesOfRow(model.index?.itemIndex)
  const target = rowData.unsuitabilityType === 'ID' ? true : false
  return setIconTypo(rowData.taxonId, target)
}

const nameIconTypo = (grid: any, model: GridCell) => {
  const rowData = grid.getDisplayValuesOfRow(model.index?.itemIndex)
  const target = rowData.unsuitabilityType === 'Name' ? true : false
  return setIconTypo(rowData.taxonName, target)
}

const GridUnsuitable = ({ grid, rows = [], setData }: GroupStatusParams) => {
  const { options, gridApi, fields, columns } = grid

  const gridMethod = () => ({
    registerCustomRenderer_0: CustomRenderer('taxonId', idIconTypo),
    registerCustomRenderer_1: CustomRenderer('taxonName', nameIconTypo),
  })

  return <RealGrid columns={columns} fields={fields} rows={rows} options={options} gridApi={{ ...gridApi, ...gridMethod() }} />
}

export default GridUnsuitable
