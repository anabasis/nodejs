/**
 * @author 정규화
 * @desc RealGrid 트리 타입
 * @desc Result 전체 > Group Info > RepIN Information
 * @desc treeFilter 트리 데이터 필터링
 */

'use client'

import CreateDOM from 'react-dom/client'
import { useEffect, useRef } from 'react'
import SetRealGridLic from '../realgrid-lic'
import { TreeView, LocalTreeDataProvider, GridCell, GridItem } from 'realgrid'
import { Icons } from '../../ui/components/Icons'

export type ClickHandlers = {
  click?: (e: MouseEvent) => void
  canClick?: (e: MouseEvent) => void
  preventClick?: (e: MouseEvent) => void
}

export type GridItemWithChildren = GridItem & { children?: [] }

// 박준우 jsx component CustomRenderer 추가
export const CustomRenderer = (name: string, component: Function, handlers?: ClickHandlers) => [
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
    render: function (grid: any, model: GridCell) {
      this._context = component(grid, model)
      this._root.render(this._context)
    },
    click: (event: MouseEvent) => {
      if (handlers?.click) handlers.click(event)
      else if (handlers?.preventClick) {
        return false
      }
    },
    preventClick: (event: MouseEvent) => {
      event.preventDefault()
      if (handlers?.preventClick) handlers.preventClick(event)
    },
  },
]

const ExtendButton = (grid: any, cell: GridCell) => {
  const item: GridItemWithChildren | undefined = cell.item
  const isExpanded = item?.expanded || false
  const treeFunc = () => {
    grid[isExpanded ? 'collapse' : 'expand'](cell.index?.itemIndex)
  }

  return item?.children?.length ? (
    <button type="button" onClick={treeFunc} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none' }}>
      <Icons.TreeAngleIcon width={10} height={10} />
    </button>
  ) : null
}

const GridResultRepINInfo = ({ grid, rows = [] }: any) => {
  const { fields, columns, options, gridApi } = grid
  const realgridElement = useRef<HTMLDivElement>(null)
  const treeView = useRef<any>(null)
  const treeProvider = useRef<any>(null)

  /**
   * 그리드 option 설정
   * @param grid 적용할 grid
   * @param options 추가 적용할 옵션 객체
   */
  const setOptions = (grid: any, options: any): void => {
    if (grid) {
      grid.displayOptions.selectionStyle = 'none' // 셀선택 기능 x
      grid.displayOptions.refreshMode = 'visibleOnly' // 그리드를 다시 그릴 때의 모드
      grid.displayOptions.showEmptyMessage = true
      grid.displayOptions.emptyMessage = 'There are no results to display.'
      grid.displayOptions.rowHeight = 36
      grid.header.height = 40
      grid.treeOptions.defaultIcon = 4
      grid.sortingOptions.enabled = false
      grid.treeOptions.lineVisible = false //트리뷰 선 없애는 방법

      // 옵션을 2차원 객체로 받았을 경우 와 아닐 경우
      for (const [t, p] of Object.entries(options || {})) {
        typeof p === 'object' ? Object.assign(grid[t], p) : (grid[t] = p)
      }
    }
  }

  /**
   * 그리드 api 설정
   * @param grid 적용할 grid
   * @param api 추가 적용할 옵션 객체
   */
  const setGridApi = (grid: any, api: any, provider: any): void => {
    if (grid) {
      const defaultGridApi = {
        setCheckBar: { visible: false }, // 체크박스 기본 표시 x
        setStateBar: { visible: false }, // statusbar 기본 표시 x
        setRowIndicator: { visible: false }, // 기본 넘버링 컬럼 x
        setEditOptions: { editable: false }, // 셀 수정기능 기본 x
        setRowStyleCallback: (_g: any, i: any, _f: any) => (i.checked ? 'checked-background' : ''), //체크 시 행 배경색 적용
        setFooters: { visible: false },
        setDataSource: provider,
        // setColumns: [_columns],
        ...api,
      }

      // // 리얼그리드 api를 공용으로 사용할 수 있도록
      for (const [t, p] of Object.entries(defaultGridApi || {})) {
        grid[t.includes('_') ? t.split('_')[0] : t](...(Array.isArray(p) ? p : [p]))
      }
    }
  }

  useEffect(() => {
    SetRealGridLic()

    if (realgridElement.current) {
      treeView.current = new TreeView(realgridElement.current as HTMLDivElement) as any
      treeProvider.current = new LocalTreeDataProvider(true) as any

      const gridMethod = {
        registerCustomRenderer: CustomRenderer('ExtendButton', (g: HTMLDivElement, c: GridCell) => ExtendButton(g, c)),
        ...(gridApi || {}),
      }

      setOptions(treeView.current, options)
      setGridApi(treeView.current, gridMethod, treeProvider.current)

      treeProvider.current.setFields(fields)
      treeView.current.setColumns(columns)
    }

    return () => {
      if (treeProvider.current && treeView.current) {
        treeProvider.current.clearRows()
        treeProvider.current.destroy()
        treeView.current.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (realgridElement.current && treeProvider.current && treeView.current) {
      treeProvider.current.setObjectRows(rows, 'rows', '', '')
    }
  }, [rows, options]) // gridApi 추가 X realgrid error

  return <div ref={realgridElement} style={{ height: '500px', width: '100%' }}></div>
}

export default GridResultRepINInfo
