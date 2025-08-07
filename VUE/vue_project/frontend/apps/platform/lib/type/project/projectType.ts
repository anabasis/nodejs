import { FileResType } from 'library/type/common'

export interface ProjectFilterType {
  projectTab?: string
  startDate?: string
  endDate?: string
  diseaseCategoryCode?: string
  purposeCode?: string
  processCode?: string
  keyword?: string
  displayStartDate?: string
  displayEndDate?: string
  size?: number
}

export interface ProjectPaginationType {
  pageSize: number
  currentPage: number
}

export interface ResponseType<ObjectType> {
  content: ObjectType[]
  pageable: {
    sort: { unsorted: boolean; sorted: boolean; empty: boolean }
    pageNumber: number
    pageSize: number
    offset: number
    unpaged: number
    paged: boolean
  }
  totalElements: number
  totalPages: number
  last: boolean
  numberOfElements: number
  first: boolean
  size: number
  number: number
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  }
  empty: boolean
}

export interface ProjectListType {
  id: number
  targetMarket: string
  dissCatCd: string
  purpose: string
  prjNm: string
  process: string
  corporate: string
  dueDate: string
  projectRoleCode: string
  prjStsCd: string
  prjStsNm: string
}

export interface ProjectInfoAddType {
  dissCatCd: string
  prjNm: string
  prjDscrp: string
  devPupsCd: string
  prdNm: string
  taskCd: string
  regulatoryAffairCodeList: string[]
  targetCountryCodeList: string[]
  processCodes: string[]
  members: MemberType[]
  startDat: string
  endDat: string
}

export interface ProjectInfoEditType {
  id?: number
  prjNm: string
  dissCatCd: string
  prjDscrp: string
  devPupsCd: string
  prdNm: string
  taskCd: string
  regulatoryAffairCodeList: string[]
  targetCountryCodeList: string[]
  projectRoleCode: 'PJM' | 'PJB' | ''
  projectProcessRole: { processRoleCode: string; processCodes: string[] }[]
  processCodes?: {
    processOperation: 'ADD' | 'DELETE'
    processCode: string
  }[]
  members?: MemberType[]
  startDat: string
  endDat: string
}

export interface ProjectBasicInfoType {
  id?: number
  corporate: {
    corpId: number
    corpLvlCd: string
    corpNm: string
    mngrUsrUid: string
    rolLvlCd: string
  }
  dissCatCd: string
  dissCat: string
  devPupsCd: string
  devPups: string
  prjNm: string
  prjDscrp: string
  prjStsCd: string
  prjStsNm: string
  projectRoleCode: 'PJM' | 'PJB' | ''
  projectProcessRole: { processRoleCode: string; processCodes: string[] }[]
  memberInfoList?: {
    fileInfo: FileResType
    memberName: string
  }[]
  startDat: string
  endDat: string
}

export interface ProjectAdditionalInfoType {
  prdNm: string
  taskCd: string
  targetCountryCodeList: string[]
  targetCountryNameList: string[]
  regulatoryAffairCodeList: string[]
  regulatoryAffairNameList: string[]
}

export interface ProcessHistoryType {
  processCode: string
  process: string
  statusCode: string
  status: string
  startDate: string
  endDate: string
  member: string
  lastUpdateDate: string
}

export interface RequestHistoryType {
  processCd: string
  processName: string
  requestId: string
  requestName: string
  startDate: string
  lastUpdtDate: string
  statusCd: string
}

export interface DiseaseCategoryType {
  diseaseCategoryCode: string
  diseaseCategoryName: string
}

export interface MemberType {
  projectMemberOperation?: 'ADD' | 'UPDATE' | 'DELETE'
  fileInfoResponse?: FileResType
  memberId: string
  usrNm?: string
  orgnNm?: string
  jobTitle?: string
  projectManagerYn: 'Y' | 'N'
  guestYn: 'Y' | 'N'
  memberProcess: {
    processRoleCode: string
    processRoleCodeName?: string
    processCodes: string[]
    processName?: string[]
  }[]
}

export interface PlanningFileType {
  fileType: string
  fileFinalStatus: string
}

export interface PlanningDocumentType {
  fileType: string
  fnlYn: 'Y' | 'N'
  fileInfoResponse: FileResType
  usrNm: string
  usrUid: string
  mdfDt: string
}

export interface OligoDesignRequestType {
  reqStsCd: string
  reqStsCdNm: string
  appTpCd: string
  appTpCdNm: string
  reqNm: string
  reqId: string
  prcsCd: string
  prjNum: number
  startDt: string
  prjNm: string
  reqDsignTpCd: string
  reqDsignTpCdNm: string
  prjRolCd: string
  projectProcRolCode: string
  favYn: boolean
}

export interface MyCorporateMemberType {
  usrUid: string
  emlId: string
  usrNm: string
  orgnNm: string
  jobTitle: string
  fileInfoResponse: FileResType
}

export interface ProcessType {
  prjNumber: number
  prjPrcsNumber: number
  prcsCode: string
  prcsName: string
  prcsStsCode: string
  prcsStsName: string
}

export interface RequestsToProjectType {
  id: number
  aprvRslCd: string | null
  reqTpCd: string
  userNm: string
  orgnNm: string
  crtDt: string
  fileInfoResponse: FileResType
  memberProcess: { processRoleCode: string; processRoleCodeName: string; processCodes: string[]; processName: string[] }[]
}

export interface RequestJoinConfirmType {
  id: number
  aprvRslCd?: string
  prjRolCd: string
  reqResnCont: string
  userNm: string
  orgnNm: string
  currentPrcsAuth?: {
    processRoleCode: string
    processRoleCodeName?: string
    processCodes: string[]
    processName?: string[]
  }[]
  prcsAuth: {
    processRoleCode: string
    processRoleCodeName?: string
    processCodes: string[]
    processName?: string[]
  }[]
  fileInfoResponse: FileResType
  projectReqPurposeList: string[]
  approvalCode: null | string
}

export interface OtherCorporateMemberType {
  usrUid?: string
  fileInfoResponse?: FileResType
  emlId?: string
  usrNm?: string
  orgnNm?: string
  jobTitle?: string
  email?: string
  msg?: string
  error?: boolean
}

export interface ProjectMemberDetailType {
  memberId: string
  usrNm: string
  orgnNm: string
  usrStsCd: string
  startDat: string
  endDat?: string
  participation: string
  projectManager: string
  fileInfoResponse: FileResType
  memberProcess: {
    processRoleCode: string
    processRoleCodeName: string
    processCodes: string[]
    processName: string[]
  }[]
}

export interface OligoDesignDocumentType {
  id: number
  fileInfoResponse: FileResType
  usrNm: string
  mdfDt: string
  usrUid: string
}

export interface AddDocumentType {
  projectProcessNum: number
  fileType: string
  fileNum: number
  description?: string
}

export interface DocumentDetailType {
  fileInfoResponse: FileResType
  usrNm: string
  description: string
  mdfDt: string
  usrUid: string
}

export interface NoteType {
  id: string
  usrUid: string
  usrNm: string
  cmtCnt: string
  checked: boolean
  crtrUid: string
  crtDt: string
  fileInfoPrvResponse: FileResType
  dsplayFlNm: string
  flExtn: string
  flPath: string
}

export interface NoteListType {
  todayList: NoteType[]
  thisWeekList: NoteType[]
  lastWeekList: NoteType[]
  oldNoteList: NoteType[]
}

export interface ProcessItemType {
  value: string
  name: string
  sortNum: number
  prcsStsCode?: string
}

export interface AuthorityResponseType {
  description: string
  message: string
  statusCode: number
  timestamp: string
}
