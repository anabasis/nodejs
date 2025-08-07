/**
 * @author 정규화
 * @desc RealGrid 기본 템플릿 파일
 */

'use client'
import CreateDOM from 'react-dom/client'
import { RefObject, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { GridView, LocalDataProvider, GridCell } from 'realgrid'
import { Grid, GridParams } from '../types'
import SetRealGridLic from '../realgrid-lic'
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
  grid.header.height = 40 // 헤더 기본 높이
  grid.footer.height = 40 // 푸터 기본 높이
  grid.footer.visible = false // 푸터 기본 노출 x
  grid.displayOptions.fitStyle = 'fill' // [QA] result grid thead 가로스크롤 감안하여 1줄 노출
  //grid.displayOptions.syncGridHeight = 'always'

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
const setGridApi = (grid: any, api: any): void => {
  const defaultGridApi = {
    setCheckBar: { visible: false }, // 체크박스 기본 표시 x
    setStateBar: { visible: false }, // statusbar 기본 표시 x
    setRowIndicator: { visible: false }, // 기본 넘버링 컬럼 x
    setEditOptions: { editable: false }, // 셀 수정기능 기본 x
    setRowStyleCallback: (_g: any, i: any, _f: any) => (i.checked ? 'checked-background' : ''), //체크 시 행 배경색 적용
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
const setGridFilter = (grid: any, gridFilter: any): void => {
  grid.setColumnLayout([])

  if (true) {
    gridFilter.forEach((k: string) => {
      grid.addLayout(k)
    })
  }
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

const GridInCluSeqList = forwardRef<Grid, any>(
  ({ columns = [], fields = [], rows = [], options, gridApi, gridFilter = [], style, onHorizonScroll }: any, ref) => {
    const [dataProvider, setDataProvider] = useState<any>(null)
    const [gridView, setGridView] = useState<any>(null)
    const element = useRef<HTMLDivElement>(null)
    const setRows = useCallback(
      (rows: any[]) => {
        if (dataProvider) {
          dataProvider.setRows(rows)
        }
      },
      [dataProvider, rows]
    )

    const setFields = useCallback(
      (fields: any[]) => {
        if (dataProvider) {
          dataProvider.setFields(fields)
        }
      },
      [dataProvider, fields]
    )

    const setColumns = useCallback(
      (columns: any[]) => {
        if (gridView) {
          gridView.setColumns(columns)
        }
      },
      [gridView, columns]
    )

    useEffect(() => {
      SetRealGridLic()

      const container = element.current
      const provider = new LocalDataProvider(true)
      const grid: Grid = new GridView(container as HTMLDivElement)
      if (ref) (ref as React.MutableRefObject<Grid>).current = grid

      setGridView(grid)
      setDataProvider(provider)
      grid.setDataSource(provider)

      return () => {
        provider.clearRows()
        provider.destroy()
        grid.destroy()
      }
    }, [])

    useEffect(() => {
      if (gridView?._horzScrolled) {
        console.log(gridView._horzScrolled)
      }
    }, [gridView])

    useEffect(() => {
      if (gridView && columns.length) {
        setColumns(columns)
      }
    }, [gridView, columns])

    useEffect(() => {
      if (gridView && fields.length) {
        setFields(fields)
      }
    }, [gridView, fields])

    useEffect(() => {
      if (dataProvider && Array.isArray(rows)) {
        setRows(rows)
      }
    }, [dataProvider, rows])

    useEffect(() => {
      if (gridView && options) {
        if (onHorizonScroll) {
          options.onLeftPosChanged = (grid: any, pos: any) => onHorizonScroll()
        }
        setOptions(gridView, options)
      }
    }, [gridView, options, onHorizonScroll])

    useEffect(() => {
      if (gridView && gridApi) {
        setGridApi(gridView, gridApi)
      }
    }, [gridView, gridApi])

    useEffect(() => {
      if (gridView && gridFilter.length) {
        setGridFilter(gridView, gridFilter)
        setRows(rows)
      }
    }, [gridView, gridFilter])

    return <div id="gridIncluSeqList" ref={element} style={{ height: '640px', width: '100%', ...style }}></div>
  }
)

export default GridInCluSeqList

GridInCluSeqList.displayName = 'GridInCluSeqList'

// 박준우 jsx component CustomRenderer 추가
export const CustomRenderer = (name: string, component: Function) => [
  name,
  {
    _root: '' as any,
    _context: '' as any,
    initContent: function (dom: HTMLElement) {
      const contextButton = document.createElement('div')
      this._root = CreateDOM.createRoot(contextButton)
      this._root.render(this._context)
      dom.appendChild(contextButton)
    },
    clearContent: (dom: HTMLElement) => (dom.innerHTML = ''),
    canClick: (event: MouseEvent) => true,
    render: function (grid: any, model: GridCell, x: number, y: number, info: any) {
      this._context = component(grid, model)
      this._root.render(this._context)
    },
    click: (event: MouseEvent) => {},
  },
]
