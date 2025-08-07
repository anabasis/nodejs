export const masterDataTabName = {
  Product: 'product',
  Instrument: 'equipment',
  'Instrument Driver': 'equipment-driver',
  'Cap/Film': 'cap-film',
  Plate: 'plate',
}

export const productFamilyName = {
  APX: 'Allplex',
  ANX: 'Anyplex',
  MGX: 'Magicplex',
  UNM: 'Unnamed',
}

import * as yup from 'yup'
export const productSchema = yup.object().shape({
  prdNm: yup.string().required(),
  abb: yup.string().required(),
  abbId: yup
    .string()
    .required()
    .matches(/^[0-9]+$/), //숫자만
  familyCd: yup.string().required(),
  taskCd: yup.string().required(),
  dissCatCd: yup.string(), //product category
  // sz: yup.number().required(),
  sz: yup
    .string()
    .required()
    .matches(/^[0-9]+$/), //숫자만
  barcd: yup.string().required(),
  catNo: yup.string().required(),
  endDat: yup.string().required(),
})

export const equipmentSchema = yup.object().shape({
  instrmNm: yup.string().required(),
  instrmCd: yup.string().required(),
  rowCnt: yup
    .string()
    .required()
    .matches(/^[0-9]+$/), //숫자만
  colCnt: yup
    .string()
    .required()
    .matches(/^[0-9]+$/), //숫자만
})

export const equipmentDriverSchema = yup.object().shape({
  instrmDrvNm: yup.string().required(),
  dspNm: yup.string().required(),
  instrmDrvId: yup.string().required(),
  suptWlCnt: yup
    .string()
    .required()
    .matches(/^[0-9]+$/), //숫자만,
  dscrp: yup.string().required(),
})

export const capFilmSchema = yup.object().shape({
  capFilmName: yup.string().required(),
  displayName: yup.string().required(),
  classificationCode: yup.string().required(),
  enbleYn: yup.string().required(),
})

export const plateSchema = yup.object().shape({
  plateName: yup.string().required(),
  displayName: yup.string().required(),
  classificationCode: yup.string().required(),
  enbleYn: yup.string().required(),
})

export const tabData = [
  { tabName: 'Product', href: '/master/product', addName: 'Product' },
  { tabName: 'Instrument', href: '/master/equipment', addName: 'Equipment' },
  { tabName: 'Instrument Driver', href: '/master/equipment-driver', addName: 'Equipment Driver' },
  { tabName: 'Cap/Film', href: '/master/cap-film', addName: 'Cap Film' },
  { tabName: 'Plate', href: '/master/plate', addName: 'Plate' },
]

export const masterDataDetails = 'Master Data Details'

export const firstUpperCase = (text) => {
  let result = text[0].toUpperCase()

  for (let i = 1; i < text.length; i++) {
    if (text[i - 1] === ' ') {
      result += text[i].toUpperCase()
    } else {
      result += text[i]
    }
  }
  return result
}
