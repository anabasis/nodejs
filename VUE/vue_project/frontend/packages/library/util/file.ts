/**
 * const images = await apiUploadFiles(files, { tableName: 'TSW_SW', storageTypeCode: 'PRV' })
 * 위의 방식으로 호출하면 업로드 성공시 UploadRes[] 형태로 반환값을 받음.
 * 이후 각 메뉴의 파일 저장용 API 에 UploadRes 들을 넣어주면 됨.
 *
 * storageTypeCode == PRV 로 업로드한 파일은
 * [GET] /common/s3/prv/get-url API를 사용하여 호출하여 사용
 * 해당 파일의 getPrvFileUrl 참조
 * storageTypeCode == PUB 로 업로드한 파일은 read api 에서 packages/library/type/common.ts 의 FileResType 타입으로 내려준다고 하며
 * fn.ts 파일의 getCdnFileUrl 참조
 */

import { apiAdmin, api, getRootUrl, getCdnFileUrl } from './'
import { find as _find } from 'lodash-es'
import { FileResType } from '../type/common'
// import { PageLoading } from '../../ui/components/loading/Loading'
import '../../ui/components/loading/Loading'

type PresignedReq = {
  index?: number // 자동
  extension?: string // 자동
  tableName: string // 이미지 저장될 위치로 API 파트에서 정리해서 전달 주기로 함
  storageTypeCode?: string // PUB = 정적인 파일 | PRV = 보안 링크(PDF 등에서만 사용될 듯)
  expireSecondTime?: string // Presigned URL 업로드 제한시간 : 차후 조정 필요할 듯
}
type PresignedRes = {
  index: number
  key: string
  url: string
}
type UploadReq = {
  key: string
  displayFileName: string
  storageTypeCode: string
  fileSize: number
}
type UploadRes = {
  fileNumber: number
  displayFileName: string
  key: string
  extension: string
  fileSize: number
  storageTypeCode: string
}

const getFileName = (name: string) => (name.split('.').length <= 1 ? name : name.replace(/\.[^/.]+$/, ''))
const getFileExtension = (name: string) => (name.split('.').length <= 1 ? '' : name.split('.').pop())

const setPresignedReq = (files: File[], options: PresignedReq): PresignedReq[] =>
  files.map((file, index) => ({
    index,
    extension: getFileExtension(file.name),
    tableName: options.tableName,
    storageTypeCode: options.storageTypeCode,
    expireSecondTime: options.expireSecondTime ?? '300',
  }))

const setUploadReq = (file: File, key: string, storageTypeCode: string): UploadReq => ({
  key,
  displayFileName: getFileName(file.name),
  storageTypeCode,
  fileSize: file.size,
})

const createPresignedURLs = async (presignedReqs: PresignedReq[]): Promise<PresignedRes[]> => {
  const { data } = await api.post('/common/s3/all/put-url', presignedReqs)
  return data
}

const uploadFileToS3 = async (files: File[], presignedURLs: PresignedRes[], storageTypeCode: string): Promise<UploadReq[]> => {
  if (files.length !== presignedURLs.length) throw new Error('API 불일치')

  try {
    window.pageLoading({ show: true, mask: true })
    const uploadPromises = files.map(async (file, index) => {
      const targetPresigned = presignedURLs.find((presigned) => presigned.index === index)
      if (targetPresigned?.url && targetPresigned?.key) {
        const res = await fetch(targetPresigned.url, { method: 'PUT', body: file })
        if (res.ok) return setUploadReq(file, targetPresigned.key, storageTypeCode)
      }
      return null
    })

    const results = await Promise.all(uploadPromises)
    const filteredResults = results.filter((result) => result !== null) as UploadReq[]

    return filteredResults
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    window.pageLoading({ show: false })
  }
}

const saveFileDb = async (uploadReqs: UploadReq[]): Promise<UploadRes[]> => {
  const { data } = await api.post('/common/s3/all/upload', uploadReqs)
  return data
}

export const apiUploadFiles = async (fileList: File[], options: PresignedReq) => {
  options.storageTypeCode ??= 'PRV'
  const files = Array.from(fileList)

  const presignedReqs = setPresignedReq(files, options)
  const presignedURLs = await createPresignedURLs(presignedReqs)

  const uploadedFiles = await uploadFileToS3(files, presignedURLs, options.storageTypeCode)
  if (uploadedFiles.length > 0) return await saveFileDb(uploadedFiles)
}

// PRV: 임시 파일 url 반환
export const getPrvFileUrl = async (file: FileResType, exTime?: string): Promise<string> => {
  const { filePath, fileName, fileExtension, storageTypeCode, displayFileName } = file
  const fileKey = `${filePath}${fileName}.${fileExtension}`
  const { data } = await api.get(
    `/common/s3/all/get-url?key=${fileKey}&expireSecondTime=${exTime ?? '9'}&stogTpCd=${storageTypeCode ?? 'PRV'}&displayFileName=${
      displayFileName ?? ''
    }&extension=${fileExtension}`
  )
  return data
}

// PUB: 파일 다운로드 async 는 안걸어도 다운로드는 됨, 결과를 받고 싶을 경우만 사용
export const downloadFiles = async (fileList: FileResType[] | FileResType) => {
  const files: FileResType[] = Array.isArray(fileList) ? fileList : [fileList]
  if (files.length < 1) return 'nothing download files'

  try {
    const { data: blobData } = await api.post('/common/s3/all/downloads', files, { responseType: 'blob' })

    const a = document.createElement('a')
    a.href = URL.createObjectURL(blobData)
    a.download = `${files[0].displayFileName}.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    return 'File download complete'
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const viewPdf = async (file: FileResType, exTime: string = '5') => {
  const isPrivate = file?.storageTypeCode !== 'PUB'
  const pdfUrl = isPrivate ? await getPrvFileUrl(file, exTime) : getCdnFileUrl(file)

  if (!pdfUrl) return
  const url = `${getRootUrl()}/pdfviewer/?${isPrivate ? 'tokenPath' : 'path'}=${encodeURIComponent(pdfUrl)}`
  open(url, 'popup')
}
