/**
 * @author 정규화
 * @desc upload 모듈 작업
 * @todo fasta 업로드의 경우 isc내에서 작업. 공통모듈로 변경작업 필요
 */

// import { useState } from 'react'
// // import { CreateMultipartUploadCommand, S3Client, UploadPartCommand, CompleteMultipartUploadCommand } from '@aws-sdk/client-s3'
// import { apiIsc } from '../util/axios'

// // type FileProps = File

// type Files = File[]
// type GetUploadInfoProps = {
//   file: File
// }

// export const useFastaUpload = () => {
//   const [uploadList, setUploadList] = useState([]) // Upload List
//   const [isUploading, setUploading] = useState(false) // isUpload?

//   const initUpload = (files: Files) => {
//     console.log(files.map((v) => console.log(23, v)))
//   }

//   /**
//    * Upload에 필요한 정보 요청
//    * @param file - 업로드 할 파일
//    * @return uploadId - aws uploadId
//    * @return serverFileName - aws 업로드 시 사용할 파일명
//    */
//   const getUploadInfo = ({ file: { name: fileName, size } }: GetUploadInfoProps) =>
//     apiIsc.post('v1/api/start/upload', {
//       fileName,
//       size,
//       fileTpye: 'FASTA',
//       folder: 'fasta',
//     })

//   const fastaUpload = async (files: Files) => {
//     initUpload(files)

//     // const file = files[0]
//     // const { data: uploadInfo } = await getUploadInfo({ file })

//     // console.log(43, uploadInfo)
//   }

//   return { fastaUpload }
// }

// type fileUploadBaseType = {
//   Bucket: string
//   Key: string
// }

// type fileUploadIdType = fileUploadBaseType & {
//   UploadId: string
// }

// type fileUploadReturnType = {
//   PartNumber: number
//   ETag?: string
// }

// type fileUploadBlobType = fileUploadIdType & {
//   Body: Blob
//   PartNumber: number
// }

// type fileUploadPartsType = fileUploadIdType & {
//   MultipartUpload: {
//     Parts: fileUploadReturnType[]
//   }
// }

// // TODO: 서버로 이전
// const Bucket = 'sg-insilico-dev-file-s3'

// // TODO: 서버로 이전
// const clientParams = {
//   region: 'ap-northeast-2',
//   credentials: {
//     accessKeyId: 'AKIAYZHMKCJY6RMBYDP5',
//     secretAccessKey: '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',
//   },
//   useAccelerateEndpoint: true,
// }

// /**
//  * RealGrid 템플릿 컴포넌트 (기본적으로 전부 멀티파트 업로드로 작업되어있음)
//  *
//  * @return initUpload - 기본 업로드 (현재는 멀티파일 + 싱글파일 둘다 사용 가능하도록 작업되어있음. 필요 시 분리)
//  * @return initUploadSingleFile - 단일파일 멀티파트 업로드 init
//  * @return initUploadMultiFile - 멀티파일 멀티파트 업로드 init
//  * @return uploadProgress - 업로드 진행도
//  *
//  * @todo accessKeyId, secretAccessKey 서버쪽에서 담당할 수 있도록 추후 수정
//  */
// export const useUpload = () => {
//   const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

//   const uploadProgressHandler = (k: string, v: number): void => {
//     setUploadProgress((prev: any) => ({ ...prev, [k]: v }))
//   }

//   const initUploadProgress = (files: File | File[]): void => {
//     const fileArr = Array.isArray(files) ? files : [files]
//     fileArr.forEach((v, i) => {
//       uploadProgressHandler(fileArr[i].name, 0)
//     })
//   }

//   const resetUploadProgress = () => {
//     setUploadProgress({})
//   }

//   /**
//    * AWS S3 클라이언트 생성
//    * @return 생성된 client 정보
//    * @todo 서버로 이전?
//    */
//   const buildClient = () => new S3Client(clientParams)

//   /**
//    * AWS S3 UploadId 요청
//    * @param commandParams { Bucket, Key } - 멀티파트 업로드 커맨드 생성에 필요한 정보
//    * @return UploadId - 업로드를 진행할 파일에 발급 된 UploadId
//    * @todo 서버로 이전?
//    */
//   const getUploadId = async (commandParams: fileUploadBaseType) => {
//     const command = new CreateMultipartUploadCommand(commandParams) // 멀티파트 업로드 커맨드를 생성
//     const client = buildClient() // 클라이언트 정보 생성
//     const response = await client.send(command) // 업로드 정보 받아옴
//     return response.UploadId
//   }

//   /**
//    * Chunk 파일 업로드 실행
//    * @param params { PartNumber, Body, Bucket, Key, UploadId } - chunk 업로드 커맨드 생성에 필요한 정보
//    * @return PartNumber - 현재 업로드된 chunk index번호 (몇번째 chunk인지)
//    * @return ETag - 업로드 후 complete에 필요한 정보
//    */
//   const partUpload = async (params: fileUploadBlobType): Promise<fileUploadReturnType> => {
//     const command = new UploadPartCommand(params) // 파트 + 파라미터 담아서 커맨드 생성
//     const client = buildClient() // 클라이언트 생성
//     const { ETag } = await client.send(command) // 파트 업로드
//     const { PartNumber } = params

//     return { PartNumber, ETag }
//   }

//   /**
//    * chunk를 직렬로 업로드 (현재 사용안함)
//    * @param file - 업로드 진행 할 파일
//    * @param uploadParams { Bucket, Key, UploadId } - chunk 업로드 커맨드 생성에 필요한 정보
//    * @return 업로드 결과 배열
//    */
//   const doMultiPartUploadOld = async (file: File, uploadParams: fileUploadIdType) => {
//     const chunkSize = 10 * 1024 * 1024 // 자를 단위 (10MB)
//     const totalChunks = Math.ceil(file?.size / chunkSize) // 총 나올 갯수

//     console.log('진행도: 0% (업로드 시작)')

//     // 업로드 재귀함수 (배열 리턴)
//     const callUpload = async (arr: fileUploadReturnType[] = [], currentChunk: number = 1): Promise<fileUploadReturnType[]> => {
//       const partUploadRes = await partUpload({
//         ...uploadParams,
//         PartNumber: currentChunk,
//         Body: file?.slice((currentChunk - 1) * chunkSize, Math.min(currentChunk * chunkSize, file?.size)),
//       })

//       console.log('진행도: ' + (currentChunk / totalChunks) * 100 + '%', totalChunks, currentChunk)
//       return totalChunks > currentChunk ? callUpload([...arr, partUploadRes], currentChunk + 1) : arr
//     }

//     return await callUpload()
//   }

//   /**
//    * chunk를 병렬로 업로드
//    * @param file - 업로드 진행 할 파일
//    * @param uploadParams { Bucket, Key, UploadId } - chunk 업로드 커맨드 생성에 필요한 정보
//    * @return 멀티파트 업로드 결과 배열
//    */
//   const doMultiPartUpload = async (file: File, uploadParams: fileUploadIdType) => {
//     let p = 0
//     const chunkSize = 10 * 1024 * 1024 // 자를 단위 (10MB)
//     const totalChunks = Math.ceil(file.size / chunkSize) // 총 나올 갯수

//     const uploadResArray = Promise.all(
//       Array(totalChunks)
//         .fill(0)
//         .map(async (_, i) => {
//           // if (i !== 3) {
//           const partStart = i * chunkSize
//           const partEnd = Math.min((i + 1) * chunkSize, file.size)
//           const partBlob = file.slice(partStart, partEnd)

//           const partUploadParams = {
//             ...uploadParams,
//             PartNumber: i + 1,
//             Body: partBlob,
//           }
//           const progress = await partUpload(partUploadParams)
//           const progressNum = (((p + 1) / totalChunks) * 100).toFixed(2)
//           const fileName = file.name

//           setUploadProgress((prev: any) => ({
//             ...prev,
//             [fileName]: progressNum,
//           }))

//           console.log('진행도: ' + ((p + 1) / totalChunks) * 100 + '%', totalChunks, p + 1)
//           p++
//           return progress
//           // }
//         })
//     )

//     return uploadResArray
//   }

//   /**
//    * chunk를 병렬로 업로드
//    * @param file - 업로드 진행 할 파일 배열
//    * @param uploadParams { Bucket, Key, UploadId } - chunk 업로드 커맨드 생성에 필요한 정보
//    * @return 멀티파트 업로드 결과 배열
//    *
//    * @todo 수정중이긴한데 안쓸거같아서 스탑함
//    */
//   const doMultiPartUploadMultiFileOld = async (files: File[], uploadParams: fileUploadIdType[]) => {
//     const chunkSize = 10 * 1024 * 1024 // 자를 단위 (10MB)
//     const totalChunksArray = files.map((file) => Math.ceil(file.size / chunkSize))

//     const uploadPromises = files.map((file, index) => {
//       let p = 0
//       const totalChunks = totalChunksArray[index]

//       const uploadResArray = Promise.all(
//         Array(totalChunks)
//           .fill(0)
//           .map(async (_, i) => {
//             const partStart = i * chunkSize
//             const partEnd = Math.min((i + 1) * chunkSize, file.size)
//             const partBlob = file.slice(partStart, partEnd)

//             const partUploadParams = {
//               ...uploadParams[i],
//               PartNumber: i + 1,
//               Body: partBlob,
//             }

//             const progress = await partUpload(partUploadParams)
//             const progressNum = (((p + 1) / totalChunks) * 100).toFixed(2)
//             const fileName = file.name

//             setUploadProgress((prev: any) => ({
//               ...prev,
//               [fileName]: progressNum,
//             }))

//             console.log('파일: ' + partUploadParams.Key + ' // 진행도: ' + ((p + 1) / totalChunks) * 100 + '%', totalChunks, p + 1)

//             p++
//             return progress
//           })
//       )
//     })

//     const uploadResArray = await Promise.all(uploadPromises)
//     return uploadResArray
//   }

//   /**
//    * 멀티파일 직렬 업로드 (멀티파트)
//    * @param file - 업로드 진행 할 파일 배열
//    * @param idx - 업로드 진행할 파일 배열의 index
//    * @param prevRes - 이전 업로드 response 배열
//    * @param path - 저장될 S3 path 정보
//    * @return 업로드 결과 배열
//    */
//   const doMultiPartUploadMultiFile = async (fileArr: File[], path: string = 'test', _idx: number = 0, _prevRes: any = []): Promise<any> => {
//     const Key = path + '/' + fileArr[_idx].name // TODO: 이미지 저장 path 정의한 부분 필요할 듯.

//     const UploadId = await getUploadId({ Bucket, Key })
//     const uploadParams = {
//       Bucket,
//       Key,
//       UploadId: UploadId ?? '',
//     }
//     const uploadResArray = await doMultiPartUpload(fileArr[_idx], uploadParams)
//     const completeRes = await completeUpload({
//       ...uploadParams,
//       MultipartUpload: { Parts: uploadResArray },
//     })

//     const res = [..._prevRes, completeRes]

//     const progressNum = (((p + 1) / totalChunks) * 100).toFixed(2)
//     const fileName = file.name

//     setUploadProgress((prev: any) => ({
//       ...prev,
//       [fileName]: progressNum,
//     }))

//     return fileArr.length > _idx + 1 ? doMultiPartUploadMultiFile(fileArr, path, _idx + 1, res) : res
//   }

//   /**
//    * 멀티파트 업로드 완료 이후 호출
//    * @param uploadParams { Bucket, Key, UploadId, MultipartUpload } - 멀티파트 업로드 완료에 필요한 정보
//    * @return 멀티파트 업로드 완료
//    */
//   const completeUpload = async (params: fileUploadPartsType) => {
//     const command = new CompleteMultipartUploadCommand(params)
//     const client = buildClient()
//     const response = await client.send(command)
//     return response
//   }

//   /**
//    * 싱글파일 멀티파트 업로드 init
//    * @param file - 업로드 진행 할 파일
//    */
//   const initUploadSingleFile = async (file: File) => {
//     // const s = new Date()
//     const Key = 'test/' + file.name

//     const UploadId = await getUploadId({ Bucket, Key })
//     const uploadParams = {
//       Bucket,
//       Key,
//       UploadId: UploadId ?? '',
//     }
//     const uploadResArray = await doMultiPartUpload(file, uploadParams)

//     await completeUpload({
//       Bucket,
//       Key,
//       UploadId: UploadId ?? '',
//       MultipartUpload: { Parts: uploadResArray },
//     })
//   }

//   /**
//    * 멀티파일 멀티파트(병렬) 업로드 init
//    * @param file - 업로드 진행 할 파일 배열
//    * @todo 컴플릿 마지막에 몰아서 되는 부분 수정해야함
//    */
//   const initUploadMultiFileOld = async (fileArr: File[]) => {
//     const uploadParamsArray: fileUploadIdType[] = []

//     for (const file of fileArr) {
//       const Key = 'test1/' + file.name
//       const UploadId = await getUploadId({ Bucket, Key })

//       const uploadParams = {
//         Bucket,
//         Key,
//         UploadId: UploadId ?? '',
//       }

//       uploadParamsArray.push(uploadParams)
//     }

//     const test = async (file: any, index: number) => {
//       const uploadParams = uploadParamsArray[index]
//       const uploadResArray = await doMultiPartUpload(file, uploadParams)

//       await completeUpload({
//         Bucket,
//         Key: uploadParams.Key,
//         UploadId: uploadParams.UploadId,
//         MultipartUpload: { Parts: uploadResArray },
//       })
//     }

//     fileArr.forEach((file, index) => test(file, index))

//     // await Promise.all(uploadPromises)
//     // const uploadParamsArray: fileUploadIdType[] = fileArr.map(async (file) => {
//     //   const Key = 'test2/' + file.name
//     //   const UploadId = await getUploadId({ Bucket, Key })

//     //   return {
//     //     Bucket,
//     //     Key,
//     //     UploadId: UploadId ?? '',
//     //   }
//     // })

//     // const uploadPromises = fileArr.map(async (file, index) => {
//     // fileArr.map(async (file, index) => {
//     // const uploadParams = uploadParamsArray[index]
//     // await doMultiUpload(fileArr, uploadParamsArray)

//     // await completeUpload({
//     //   Bucket,
//     //   Key: uploadParams.Key,
//     //   UploadId: uploadParams.UploadId,
//     //   MultipartUpload: { Parts: uploadResArray.flat() },
//     // })
//     // })

//     // await Promise.all(uploadPromises)
//   }

//   /**
//    * 멀티파일 멀티파트 업로드 init (싱글파일, 멀티파일 둘다 커버)
//    * @param file - 업로드 진행 할 파일이나 파일 배열
//    * @todo Error 처리 완료 필요
//    */
//   const initMultipartUploadMultiFile = async (files: File | File[], path: string = 'temp') => {
//     const fileArr = Array.isArray(files) ? files : [files]

//     initUploadProgress(fileArr)
//     return await doMultiPartUploadMultiFile(fileArr, path)
//   }

//   /**
//    * 멀티파일 멀티파트 업로드 init (싱글파일, 멀티파일 둘다 커버)
//    * @param file - 업로드 진행 할 파일이나 파일 배열
//    * @todo Error 처리 완료 필요
//    */
//   const initMultipartUpload = async (files: File, path = 'temp') => {
//     const fileArr = Array.isArray(files) ? files : [files]

//     // 프로그레스 초기화
//     // TODO: 함수로 빼서 쓰기좋게 바꿔야함
//     const initUploadProgress = () => {
//       fileArr.forEach((v, i) => {
//         setUploadProgress((prev: any) => ({
//           ...prev,
//           [fileArr[i].name]: 0,
//         }))
//       })
//     }

//     initUploadProgress()

//     // 멀티파트 업로드 재귀함수 (컴플릿이 뒤에 몰아서 되는 관계로 단일파일 컴플릿 완료된 이후 다음 파일 진행하도록 작업함)
//     const upload = async (fileArr: File[], idx: number = 0, prevRes: any = []): Promise<any> => {
//       const Key = path + '/' + fileArr[idx].name // TODO: 이미지 저장 path 정의한 부분 필요할 듯

//       const UploadId = await getUploadId({ Bucket, Key })
//       const uploadParams = {
//         Bucket,
//         Key,
//         UploadId: UploadId ?? '',
//       }
//       const uploadResArray = await doMultiPartUpload(fileArr[idx], uploadParams)
//       const completeRes = await completeUpload({
//         ...uploadParams,
//         MultipartUpload: { Parts: uploadResArray },
//       })

//       const res = [...prevRes, completeRes]

//       return fileArr.length > idx + 1 ? upload(fileArr, idx + 1, res) : res
//     }

//     return await upload(fileArr)
//   }

//   return { initMultipartUploadMultiFile, uploadProgress }
// }
