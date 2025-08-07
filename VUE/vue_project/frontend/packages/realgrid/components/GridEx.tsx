/**
 * @author 정규화
 * @desc 예제용 RealGrid
 */

import RealGrid from '../default'
import { GridParams } from '../types'

export const GridEx = ({ columns, fields, rows, contextMenu, gridFilter }: GridParams) => {
  // dislayoptions
  const options = {
    displayOptions: { fitStyle: 'even' },
  }

  return <RealGrid columns={columns} fields={fields} rows={rows} options={options} contextMenu={contextMenu} gridFilter={gridFilter} />
}

export default GridEx
