//기업관리 등록 수정 폼 yup
import * as yup from 'yup'

//기업관리 추가
//newCo회원(Level2, B)
export const levelState = {
  Level2: 'LV2',
  B: 'LV2',
}

export const statusState = {
  'On contract': 'ONG',
  Active: 'ACT',
  Inactive: 'INC',
  Deleted: 'DEL',
}

//Role Level
export const roleLevel = [{ value: 'B', name: 'B' }]

//기업 유형
export const corporateLevelCode = [
  { value: 'LV2', name: 'Level2' },
  // { value: 'LV1', name: 'Level1' },
]

export const keywordSelect = [{ value: 'corpNm', name: 'Corporate Name' }]

//기업관리 corporate level
export const corporateLevelState = {
  'Seegene HQ': 'Level1',
  Seegene: 'Level1',
  'New.Co': 'Level2',
}

//기업관리 status
export const statusDetailState = {
  'On contract': 'ONG',
  Active: 'ACT',
  Inactive: 'INC',
  '계약 진행 중': 'ONG',
  활성: 'ACT',
  비활성: 'INC',
}

export const schema = yup.object().shape({
  corporationName: yup.string().max(100).required(),
  roleLevel: yup.string().required(),
  corporateStatusCode: yup.string().required(),
  corporateLevelCode: yup.string(),
  domainName: yup
    .string()
    .required()
    .matches(/^@[A-Za-z0-9\-\.]+\.+[A-Za-z0-9\-\.]+$/), //@seegene.com
  nation: yup.string().required(),
  representativeEmailAddress: yup.string().required().email(),
  managerUserId: yup.string(),
  otpAuthYn: yup.string().required(),
  description: yup.string().max(500),
})
