/**
 * @author 정규화
 * @desc RealGrid 기본 템플릿 파일
 */

'use client'
import { useEffect, useRef, forwardRef, MutableRefObject, useState } from 'react'
import SetRealGridLic from '../realgrid-lic'
import { GridView, LocalDataProvider, RestoreMode } from 'realgrid'
import { Grid } from '../types'
// import 'realgrid/dist/realgrid-style.css' // RealGrid CSS 추가

/**
 * 그리드 option 설정
 * @param grid 적용할 grid
 * @param options 추가 적용할 옵션 객체
 */
const setOptions = (grid: any, options: any): void => {
  grid.displayOptions.refreshMode = 'visibleOnly' // 그리드를 다시 그릴 때의 모드
  grid.displayOptions.selectionStyle = 'none' // 셀선택 기능 x
  grid.displayOptions.rowHeight = 40 // 행 기본 높이
  grid.header.height = 32 // 헤더 기본 높이
  grid.footer.height = 40 // 푸터 기본 높이
  grid.footer.visible = false // 푸터 기본 노출 x

  // 옵션을 2차원 객체로 받았을 경우 와 아닐 경우
  for (const [t, p] of Object.entries(options || {})) {
    typeof p === 'object' ? Object.assign(grid[t], p) : (grid[t] = p)
  }
}

/**
 * 그리드 api 설정
 * @param grid 적용할 grid
 * @param api 추가 적용할 옵션 객체
 */
const setGridApi = (grid: any, api: any, provider: any, _columns: any): void => {
  const defaultGridApi = {
    setCheckBar: { visible: false }, // 체크박스 기본 표시 x
    setStateBar: { visible: false }, // statusbar 기본 표시 x
    setRowIndicator: { visible: false }, // 기본 넘버링 컬럼 x
    setEditOptions: { editable: false }, // 셀 수정기능 기본 x
    setRowStyleCallback: (_g: any, i: any, _f: any) => (i.checked ? 'checked-background' : ''), //체크 시 행 배경색 적용
    setDataSource: provider,
    setColumns: [_columns],
    setFooters: { visible: false },
    ...api,
  }

  // // 리얼그리드 api를 공용으로 사용할 수 있도록
  for (const [t, p] of Object.entries(defaultGridApi || {})) {
    grid[t.includes('_') ? t.split('_')[0] : t](...(Array.isArray(p) ? p : [p]))
  }
}

/**
 * 그리드 api 설정
 * @param grid 적용할 grid
 * @param gridFilter 추가 적용할 옵션 객체
 * @param provider 추가 적용할 옵션 객체
 * @param _fields 적용할 grid fields
 * @param _rows 적용할 grid rows
 */
const setGridFilter = (grid: any, gridFilter: any, provider: any, _fields: any, _rows: any, layout: any): void => {
  grid.setColumnLayout(layout)

  if (gridFilter) {
    grid.displayOptions.fitStyle = gridFilter.length === 14 ? 'evenFill' : ''

    gridFilter.forEach((k: string) => {
      grid.addLayout(k)
    })
  }
  provider.setFields(_fields)
  provider.setRows(_rows)
}

/**
 * RealGrid 템플릿 컴포넌트
 * @param columns - 컬럼 정보
 * @param fields - 데이터에서 그리드에 끌고들어올 정보
 * @param rows - 그리드에 뿌려줄 정보
 * @param options - 그리드 옵션 (ex. displayOptions: { fitStyle: 'even' } ===> grid.displayOptions.fitStyle = 'even')
 * @param gridApi - 그리드 API의 메소드를 사용하는 옵션들 (ex. setCheckBar: { visible: false } ===> grid.setCheckBar({ visible: false }))
 * @param gridFilter - 그리드 필터 옵션 (ex. gridFilter: [ { column: 'ColumnName', filters: [{ name: '배우', criteria: "value = '배우'" }, ...] }, { ... } ])
 * @param style - 그리드 루트 엘리먼트 인라인 스타일 (ex. { height: '500px' })
 * @return Grid 컴포넌트
 *
 * @todo displayOptions 외 다른 설정들도 받아올 수 있도록 세팅
 */

const RealGridForwardRef = forwardRef<Grid, any>(({ columns = [], fields = [], rows = [], options = {}, gridApi, gridFilter, style, layout }: any, ref) => {
  SetRealGridLic()

  const realgridElement = useRef<HTMLDivElement>(null)
  const [dataProvider, setDataProvider] = useState<LocalDataProvider | null>(null)
  const [gridView, setGridView] = useState(null)

  useEffect(() => {
    const provider = new LocalDataProvider(true)
    const grid: Grid = new GridView(realgridElement.current as HTMLDivElement)
    if (ref) (ref as MutableRefObject<Grid>).current = grid

    provider.restoreMode = RestoreMode.AUTO
    setDataProvider(provider as any)
    setGridView(grid as any) // grid view
    setOptions(grid, options) // grid option
    setGridApi(grid, gridApi, provider, columns) // grid api
    setGridFilter(grid, gridFilter, provider, fields, rows, layout) // grid filter

    return () => {
      if (grid && provider) {
        provider.clearRows()
        provider.destroy()
        grid.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (dataProvider) {
      dataProvider.setRows(rows)
    }
  }, [rows])

  return <div ref={realgridElement} style={{ height: '500px', width: '100%', ...style }}></div>
})

export default RealGridForwardRef
RealGridForwardRef.displayName = 'RealGridForwardRef'
