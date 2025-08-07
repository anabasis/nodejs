import { CSSProperties, forwardRef, MutableRefObject } from 'react'
import RealGridForwardRef from './GridForwardRef'
import { Grid } from '../types'

type GridDimerParameterProps = {
  grid: any
  rows: {}[]
  style?: CSSProperties
}

const GridDimerParameter = forwardRef<Grid, GridDimerParameterProps>(({ grid, rows = [], style }: GridDimerParameterProps, ref) => {
  const { options, gridApi, fields, columns } = grid

  return (
    <RealGridForwardRef
      rows={rows}
      options={options}
      gridApi={gridApi}
      fields={fields}
      columns={columns}
      style={style}
      ref={ref as MutableRefObject<HTMLDivElement>}
    />
  )
})

GridDimerParameter.displayName = 'GridDimerParameter'

export default GridDimerParameter
