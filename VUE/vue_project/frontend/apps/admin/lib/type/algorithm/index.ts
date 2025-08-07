export type LatestLibType = {
  id: number
  libName: string
  version: string
  releaseDt: string
  note: string
  src: string
  libPath: string
  createdBy: string
}

export type LibVerWidthIdListType = {
  id: number
  name?: string
  libName: string
  version: string
  releaseDt: string
  note: string
  src: string
  libPath: string
  createdBy: string
  libFilName: string
  src1?: string
  src2?: string
}

export type LibContentType = {
  libName?: string
  id: number
  type: string
  name: string
  desc: string
  releaseDt: string
  createdDt: string
  createdBy: string
  updatedDt: string
  updatedBy: string
  latestLibVer: LatestLibType
  libVerWithIdList: LibVerWidthIdListType[]
}

export type LibRelaseNoteType = {
  [key in string]: LibVerWidthIdListType
}
