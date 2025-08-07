import * as yup from 'yup'

export const notificationSchema = yup.object().shape({
  notificationTypeCode: yup.string().required(),
  notificationCode: yup.string().required(),
  title: yup.string().required(),
  text: yup.string().required(),
  landingUrl: yup.string().required(),
  notificationMultiLanguage: yup.array().of(
    yup.object().shape({
      langCd: yup.string().required(),
      text: yup.string().required(),
    })
  ),
})

//다국어로 변경
export const changeCodeToNameNoti = (code: string) => {
  switch (code) {
    case 'NT01':
      return 'My Page'
    case 'NT02':
      return 'Notice'
    case 'NT03':
      return 'Helpdesk'
    case 'NT04':
      return 'Project'
    case 'NT05':
      return 'SeegeneHQ'
    case 'NT06':
      return 'NewCo'
    case 'NT08':
      return 'Request'
  }
}

export const placeholderString = 'English Only\nPlease enter the string you want to provide to the user.'
