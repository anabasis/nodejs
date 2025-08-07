export type homeUserType = {
  inviteUserCount: number
  requestUserCount: number
}

export type homeUserInfoType = {
  hqInfo?: homeUserType
  newcoInfo?: homeUserType
  qnaInquiryInfo?: number
  qnaCommentInfo: number
  getNewcoCorporateInfo: { activeCorporateCount: number }
}

export type UserCallback = {
  callback: Promise<any>[] // 프로미스를 반환하는 함수들을 위한 배열
  keys: string[]
}
export type ProgressInfoType = {
  title: string
  imageSrc: string
  desc: string
  value: string
}
