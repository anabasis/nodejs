/**
 * @author 정규화
 * @desc 기본 테이블형
 */

import RealGrid from '../default'
import { GridParams } from '../types'

const GridTable = (params: GridParams) => {
  return <RealGrid {...params} />
}

export default GridTable
