import { CommonSelectOptionType, ListParamsType, ListReturnType } from 'library/type/common'

export type MasterDataCommonCodes = {
  productCategory: CommonSelectOptionType[]
  productFamily: CommonSelectOptionType[]
}

// params Type
export type MasterParamsType = Partial<Pick<ListParamsType, 'startDate' | 'endDate' | 'size' | 'displayEndDate' | 'displayStartDate'>> & {
  keyword?: string
}

//equipment pull List
export type ProductReturnType = ListReturnType & {
  content: ProductContent[]
}
type ProductContent = {
  id: number
  memberName: string
  createDate: string
  lastUpdateDate: string
  prdNm: string
  taskCd?: string
  dissCatCd?: string
  sz?: number
  barcd?: string
  catNo?: string
  endDat?: string
}

//equipment pull List
export type EquipmentReturnType = ListReturnType & {
  content: EquipmentContent[]
}
type EquipmentContent = {
  id: number
  instrmNm: string
  rowCnt: number
  colCnt: number
  memberName: string
  createDate: string
  lastUpdateDate: string
}

//equipmentdriver pull List
export type EquipmentDriverReturnType = ListReturnType & {
  content: EquipmentDriverContent[]
}
type EquipmentDriverContent = {
  id: number
  instrmDrvNm: string
  dspNm: string
  suptWlCnt: string
  dscrp: string
  memberName: string
  createDate: string
  lastUpdateDate: string
}

//capfilm pull List
export type CapFilmReturnType = ListReturnType & {
  content: CapFilmContent[]
}
type CapFilmContent = {
  id: number
  capFilmName: string
  memberName: string
  createDate: string
  lastUpdateDate: string
}
//plate pull List
export type PlateReturnType = ListReturnType & {
  content: PlateContent[]
}
type PlateContent = {
  id: number
  plateName: string
  memberName: string
  createDate: string
  lastUpdateDate: string
}

//master data 목록
//component/Board
export type MasterDataList = {
  id: number
  memberName: string
  createDate: string
  lastUpdateDate: string
}
export type ProductName = {
  prdNm: string
}
export type EquipmentName = {
  instrmNm: string
}
export type EquipmentDriverName = {
  instrmDrvNm: string
}
export type CapFilmName = {
  capFilmName: string
}
export type PlateName = {
  plateName: string
}

export type ProductMasterData = {
  id: number
  name: string
  taskCode: string
  diseaseCatCode: string
  size: number
  barcode: string
  catNo: string
  endDate: string
  memberName: string
  createDate: string
  lastUpdateDate: string
}

export type EquipmentMasterData = {
  id: number
  name: string
  row: number
  column: number
  memberName: string
  createDate: string
  lastUpdateDate: string
}
export type EquipmentDriverMasterData = {
  id: number
  name: string
  displayName: string
  supportedWell: string
  desc: string
  memberName: string
  createDate: string
  lastUpdateDate: string
}

export type CapFilmMasterData = {
  id: number
  capFilmName: string
  memberName: string
  createDate: string
  lastUpdateDate: string
}

export type PlateMasterData = {
  id: number
  plateName: string
  memberName: string
  createDate: string
  lastUpdateDate: string
}

//master data 상세(단건)
export type MasterDataBasicInfo = {
  id: number
  memberName: string
  createDate: string
  lastUpdateDate: string
  prdNm?: string
  instrmNm?: string
  instrmDrvNm?: string
  capFilmName?: string
  plateName?: string
}

export type ProductMasterDataDetail = {
  id: number
  prdNm: string
  abb: string
  abbId: string
  familyCd: string
  taskCd: string
  dissCatCd?: string
  sz: number
  barcd: string
  catNo: string
  endDat: string
  memberName: string
  createDate: string
  lastUpdateDate: string
}
export type EquipmentMasterDataDetail = {
  id: number
  instrmNm: string
  instrmCd: string
  rowCnt: number
  colCnt: number
  memberName: string
  createDate: string
  lastUpdateDate: string
}

export type EquipmentDriverMasterDataDetail = {
  id: number
  instrmDrvNm: string
  dspNm: string
  instrmDrvId: string
  suptWlCnt: string
  dscrp: string
  memberName: string
  createDate: string
  lastUpdateDate: string
}

export type CapFilmMasterDataDetail = {
  id: number
  displayName: string
  memberName: string
  createDate: string
  lastUpdateDate: string
  capFilmName: string
  classificationCode: string
  enbleYn: string
}

export type PlateMasterDataDetail = {
  id: number
  displayName: string
  memberName: string
  createDate: string
  lastUpdateDate: string
  plateName: string
  classificationCode: string
  enbleYn: string
}

//master data 추가
//product
//이전
// export type NewProductMasterData = {
//   name: string
//   taskCode: string
//   diseaseCatCode: string
//   size: number
//   barcode: string
//   catNo: string
//   endDate: string
// }
export type NewProductMasterData = {
  prdNm: string
  abb: string
  abbId: string
  familyCd: string
  taskCd: string
  dissCatCd?: string
  sz: number
  barcd: string
  catNo: string
  endDat: string
}

export type NewEquipmentMasterData = {
  instrmNm: string
  instrmCd: string
  rowCnt: number
  colCnt: number
}

export type NewEquipmentDriverMasterData = {
  instrmDrvNm: string
  dspNm: string
  instrmDrvId: string
  suptWlCnt: string
  dscrp: string
}

export type NewCapFilmMasterData = {
  capFilmName: string
  displayName: string
  classificationCode: string
  enbleYn: string
}

export type NewPlateMasterData = {
  plateName: string
  displayName: string
  classificationCode: string
  enbleYn: string
}

//master data 수정
//product
export type EditProductMasterData = {
  prdNm: string
  abb: string
  abbId: string
  familyCd: string
  taskCd: string
  dissCatCd?: string
  sz: number
  barcd: string
  catNo: string
  endDat: string
}

//equipment
export type EditEquipmentMasterData = {
  instrmNm: string
  instrmCd: string
  rowCnt: number
  colCnt: number
}

export type EditEquipmentNumMasterData = {
  instrmNm: string
  instrmCd: string
  rowCnt: string
  colCnt: string
}

//equipment-driver
export type EditEquipmentDriverMasterData = {
  instrmDrvNm: string
  dspNm: string
  instrmDrvId: string
  suptWlCnt: string
  dscrp: string
}

export type EditCapFilmMasterData = {
  capFilmName: string
  displayName: string
  classificationCode: string
  enbleYn: string
}

export type EditPlateMasterData = {
  plateName: string
  displayName: string
  classificationCode: string
  enbleYn: string
}
