/**
 * @author 정규화
 * @desc RealGrid 관련 타입셋
 * @todo 타입 정리 필요함.. 아마 계속 수정될 예정
 */

import { CSSProperties } from 'react'

export type Grid = {
  [key: string]: any
}

export type GridParams = {
  columns: Columns
  fields: Fields
  rows: Rows
  options?: options
  gridApi?: gridApi
  contextMenu?: ContextMenu
  displayOptions?: DisplayOptions
  gridFilter?: GridFilter
  style?: CSSProperties
  method?: Function
  dsOptions?: dsOptions
}

export type Rows = {
  //[key: string]: string
}[]

export type DisplayOptions = {
  fitStyle?: string
}

export type Fields = {
  //fieldName: string | undefined
  // dataType: string
}[]

export type Columns = {
  // name: string
  // fieldName: string
  // width: string
  // header: {
  //   text: string
  // }
}[]

export type GridFilter = {}[]

export type ContextMenu = {}

export type options = {}

export type gridApi = {}

export type dsOptions = {}
