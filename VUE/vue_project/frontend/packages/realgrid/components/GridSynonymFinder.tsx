/**
 * @author 박준우
 * @desc editor - PTOD - AutoMSA Info - Synonym Finder
 */

import { MutableRefObject, forwardRef } from 'react'
import { Grid } from '../types'
import RealGridForwardRef from './GridForwardRef'

type GroupStatusParams = {
  grid: any
  rows: Row[]
  setData?: Function
}

type Row = {
  [key: string]: string
}

const GridSynonymFinder = forwardRef<Grid, GroupStatusParams>(({ grid, rows, setData }: GroupStatusParams, ref) => {
  const { options, gridApi, fields_0: fields, columns_0: columns } = grid

  return <RealGridForwardRef rows={rows} options={options} gridApi={gridApi} fields={fields} columns={columns} ref={ref as MutableRefObject<HTMLDivElement>} />
})

export default GridSynonymFinder
GridSynonymFinder.displayName = 'GridSynonymFinder'
