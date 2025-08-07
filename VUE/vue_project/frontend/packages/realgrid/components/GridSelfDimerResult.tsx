/**
 * @author 홍지현
 * @desc analyte - custom - parameter - selfDimerResult
 */

import RealGrid, { CustomRenderer } from '../default'
import { GridCell } from 'realgrid'
import { GridParams } from '../types'

const tagSize = 12
const commonStyle = {
  fontFamily: 'Cousine',
  lineHeight: '18px',
  display: 'inline-block',
}

const OligoColor = (originOligoSeq: string) => {
  const [seq1, align, seq2] = originOligoSeq.split(';')
  return (
    <>
      {ChangeColorOligo(seq1, align)}
      <p style={{ margin: '5px 0', width: '100%', fontFamily: 'Cousine', whiteSpace: 'pre-wrap', fontSize: '14px' }}>{align}</p>
      {ChangeColorOligo(seq2, align)}
    </>
  )
}
const ChangeColorOligo = (seq: string, align: string) => {
  // ()=> {} 매치 인덱스 구하기
  const matchIndex = (align: string) => {
    const matchArray = []
    for (let i = 0; i < align.length; i++) {
      if (align[i] === '|') {
        matchArray.push(i)
      }
    }
    return matchArray
  }
  const redIndex = matchIndex(align) // matchIndex 배열
  // DPO이면, linker 인덱스 구하고 색칠하고 + match 인덱스 구하고 색칠하기
  // if (DPO구조) {}
  if (seq.match(/(III+)/g) === null) {
    // convention
    return (
      <p key={`${redIndex}`} style={{ width: '100%', fontSize: '14px' }}>
        {seq.split('').map((v: string, i: number) => {
          if (i > seq.length - tagSize) {
            // tagSize만큼 over/underline 긋기
            if (redIndex.includes(i)) {
              return (
                <span key={`redIndex` + i} style={{ ...commonStyle, color: 'var(--isc-error)', borderBottom: '1px solid #FF00E5' }}>
                  {v}
                </span>
              )
            }
            return (
              <span key={`redIndex` + i} style={{ ...commonStyle, borderBottom: '1px solid #FF00E5' }}>
                {v}
              </span>
            )
          } else {
            if (redIndex.includes(i)) {
              return (
                <span key={`redIndex` + i} style={{ ...commonStyle, color: 'var(--isc-error)' }}>
                  {v}
                </span>
              )
            }
            return (
              <span key={`redIndex` + i} style={{ ...commonStyle }}>
                {v}
              </span>
            )
          }
        })}
      </p>
    )
  } else {
    // dpo structure
    const linkerIndex = (seq: string) => {
      const pattern_ = /(III+)/
      let startIndex = seq.search(pattern_)
      const hasMatch = seq.match(pattern_) || ['']
      const endIndex = startIndex + hasMatch[0].length - 1
      // console.log(6666, seq.slice(seq.search(pattern_)).slice(seq.match(pattern_)[0].length,))
      const linkerArray = []
      for (startIndex; startIndex <= endIndex; startIndex++) {
        linkerArray.push(startIndex)
      }
      // console.log('linkerArray: ', linkerArray)
      return linkerArray
    }
    const blueIndex = linkerIndex(seq) // linkerIndex 배열
    return (
      <p key={`${blueIndex}`} style={{ width: '100%', fontSize: '14px' }}>
        {seq.split('').map((v: string, i: number) => {
          if (i < tagSize) {
            // tagSize만큼 over/underline 긋기
            if (blueIndex.includes(i)) {
              return (
                <span
                  key={`blueIndex` + i}
                  style={{
                    ...commonStyle,
                    color: 'var(--isc-done)',
                    borderTop: '1px solid #FF00E5',
                  }}
                >
                  {v}
                </span>
              )
            } else if (redIndex.includes(i)) {
              return (
                <span
                  key={`redIndex` + i}
                  style={{
                    ...commonStyle,
                    color: 'var(--isc-error)',
                    borderTop: '1px solid #FF00E5',
                  }}
                >
                  {v}
                </span>
              )
            }
            return (
              <span key={`overLine` + i} style={{ ...commonStyle, borderTop: '1px solid #FF00E5' }}>
                {v}
              </span>
            )
          } else {
            if (blueIndex.includes(i)) {
              return (
                <span key={`blueIndex` + i} style={{ ...commonStyle, color: 'var(--isc-done)' }}>
                  {v}
                </span>
              )
            } else if (redIndex.includes(i)) {
              return (
                <span key={`redIndex` + i} style={{ ...commonStyle, color: 'var(--isc-error)' }}>
                  {v}
                </span>
              )
            }
            return (
              <span key={`Cousine` + i} style={{ ...commonStyle }}>
                {v}
              </span>
            )
          }
        })}
      </p>
    )
  }
}

export const GridSelfDimerResult = (params: GridParams) => {
  const pattern = (grid: any, model: GridCell) => {
    const rowData = grid.getDisplayValuesOfRow(model.index?.itemIndex)
    return <>{OligoColor(rowData.pattern)}</>
  }

  const result = (grid: any, model: GridCell) => {
    const rowData = grid.getDisplayValuesOfRow(model.index?.itemIndex)
    return <>{rowData.result === 'pass' ? <p className="isc_done">Pass</p> : <p className="isc_error">Fail</p>}</>
  }
  const colorTag = (grid: any, model: GridCell) => {
    const rowData = grid.getDisplayValuesOfRow(model.index?.itemIndex)
    return <>{rowData.result === 'fail' ? <p className="isc_error">{rowData.dimer}</p> : rowData.dimer}</>
  }
  const gridMethod = () => ({
    setPaging: [true, 10],
    registerCustomRenderer_0: CustomRenderer('ColorTag', colorTag),
    registerCustomRenderer_1: CustomRenderer('Pattern', pattern),
    registerCustomRenderer_2: CustomRenderer('Result', result),
  })

  return <RealGrid {...params} gridApi={{ ...gridMethod(), ...params.gridApi }} />
}
