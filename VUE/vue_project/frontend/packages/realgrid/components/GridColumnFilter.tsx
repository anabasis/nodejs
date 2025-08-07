/**
 * @author 정규화
 * @desc 기본 테이블형
 */

import RealGrid from '../default'
import { GridParams } from '../types'

const GridColumnFilter = ({ columns, fields, rows, gridFilter }: GridParams) => {
  // options
  const options = {
    displayOptions: { fitStyle: 'even' },
  }

  return <RealGrid columns={columns} fields={fields} rows={rows} options={options} gridFilter={gridFilter} />
}

export default GridColumnFilter
