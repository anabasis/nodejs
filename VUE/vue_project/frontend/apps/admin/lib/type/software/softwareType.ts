import { CommonSelectOptionType, ListParamsType, ListReturnType, FileResType } from 'library/type/common'

// params Type
export type SoftwareParamsType = Partial<Pick<ListParamsType, 'startDate' | 'endDate' | 'size' | 'displayEndDate' | 'displayStartDate'>> & {
  ivdRuoCode?: string
  keywordName?: string
  keyword?: string
}

//commoncode list
export type SoftwareReturnType = ListReturnType & {
  content: SoftwareContent[]
}
type SoftwareContent = {
  softwareName: string
  softwareNumber: number
  softwareRelease: SoftwareRelease
  ivdRuoCode: string
  description: string
  iconFile: FileType
  // iconFile: SoftwareIcon[]
  createDateTime: string
  creatorUid: string
  modifyDateTime: string
  modifierUid: string
}
type SoftwareRelease = {
  softwareReleaseNumber: number
  version?: string
  softwareFile?: FileType
}
type FileType = {
  fileNumber: number
  fileName: string
  displayFileName: string
  filePath: string
  fileExtension: string
  fileSize: number
  storageTypeCode: string
  tableName: string
}

type SoftwareIcon = {
  fileNumber: number
}

//commoncode (ALL, IVD, RUO)-IVD RUO Division Code
export type SoftwareCommonCodes = {
  type: CommonSelectOptionType[]
}
//detail_basic information
export type SoftwareBasicInfo = {
  iconFile: FileType
  softwareNumber: number
  softwareName: string
  description: string
  ivdRuoCode: string
  createDateTime: string
  creatorUid: string
  modifyDateTime: string
  modifierUid: string
}

//detail_history params Type
export type SoftwareHistoryParamsType = Partial<Pick<ListParamsType, 'size'>>

//detail_history list
export type SoftwareHistoryReturnType = ListReturnType & {
  content: SoftwareHistoryContent[]
}
export type SoftwareHistoryContent = {
  softwareFileResponse?: FileResType
  softwareReleaseNumber: number
  version: string
  softwareNumber: number
  releaseNote: string
  createUid?: string
  createDate?: string
  modifierUid?: string
  modifyDate?: string
  fileNumber?: number
}

//add Software
export type NewSoftwareType = {
  fileNumber?: number
  softwareName: string
  ivdRuoCode: string
  description: string
}

//add Software Version
export type NewSoftwareVersion = {
  softwareNumber: number
  version: string
  releaseNote: string
  fileNumber: number
}

//add Software
export type EditSoftwareVersion = {
  fileNumber?: number
  softwareReleaseNumber: number
  version: string
  releaseNote: string
}
