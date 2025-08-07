import { useCallback, useEffect, useRef, useState } from 'react'
import { apiUploadFiles } from '../util'
import { fileExtension } from '../constant/regex'
import { useToastPopup } from './useToastPopup'

export type FileRequestType = {
  displayFileName: string
  extension: string
  fileNumber: number
  fileSize: number
  key: string
  storageTypeCode: string
}

export type FileResponseType = {
  fileNumber?: number
  fileName: string
  displayFileName: string
  filePath: string
  fileExtension: string
  fileSize: number
  storageTypeCode?: string
  tableName?: string
}

export type FileListDataType = (Partial<FileResponseType> & Partial<FileRequestType> & Partial<File>)[]

type DragFileUploadPropsType = {
  count?: number
  fileValidReg?: RegExp
  tableName?: string
  storageTypeCode?: string
  file?: FileResponseType[]
  isApiUpload?: boolean
  isDRMS?: boolean
  fileSize?: number
  extensionValid?: string
  disabled?: boolean
}

const initData = {
  tableName: '',
  storageTypeCode: '',
}

export const useDragFileUpload = ({
  count = 5,
  isApiUpload = true,
  fileSize = 524288000,
  fileValidReg = fileExtension,
  tableName,
  storageTypeCode,
  isDRMS = true,
  extensionValid = '',
  disabled = false,
}: DragFileUploadPropsType = initData) => {
  const dropRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadFiles, setUploadFiles] = useState<FileListDataType>([])
  const [drmValid, setDrmValid] = useState(false)
  const [validFormat, setValidFormat] = useState(false)
  const [isDragActive, setIsDragActive] = useState(false)

  const { toastOpen, getToastState } = useToastPopup()
  const changeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return
    }

    if (event?.target?.files.length > 5 || uploadFiles.length > 5) return

    getFileData(event?.target?.files, uploadFiles)
  }

  const uploadFileData = async (fileList: File[]) => {
    if (!tableName) return

    const info = await apiUploadFiles(fileList, { tableName, storageTypeCode })

    if (info) {
      setUploadFiles((prev: FileListDataType | unknown) => {
        if (Array.isArray(prev) && prev.length > 0) {
          return [...prev, ...info]
        }
        return info
      })
    }
  }
  const readFile = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        // 파일의 내용이 로드되면 resolve 호출

        resolve(e?.target?.result)
      }

      reader.onerror = (error) => {
        // 오류 발생 시 reject 호출
        reject(error)
      }

      // 파일을 읽음 (파일의 인코딩을 명시할 수 있음)
      reader.readAsArrayBuffer(file)
    })
  }
  const getFileData = useCallback(
    async (file: FileList, uploadFile: FileListDataType) => {
      const fileList = Array.from(file)

      if (await fileValidation(fileList, uploadFile)) {
        removeRef()
        return
      }

      if (!isApiUpload) {
        setUploadFiles((prev: FileListDataType) => {
          if (Array.isArray(prev)) {
            return [...prev, ...fileList]
          }
          return prev
        })
        return
      }

      uploadFileData(fileList)
    },
    [extensionValid]
  )

  const handleDragStart = () => {
    if (!isDragActive) {
      setIsDragActive(true)
    }
  }

  const handleDragEnd = (event: DragEvent) => {
    if (event?.currentTarget instanceof Node && event?.relatedTarget instanceof Node) {
      if (event?.currentTarget?.contains(event.relatedTarget)) return

      setIsDragActive(false)
    }
  }

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault()
      event.stopPropagation()

      if (!disabled) {
        if (!event?.dataTransfer?.files) return

        if (event.dataTransfer.files.length > 5 || uploadFiles.length > 5) return

        getFileData(event.dataTransfer.files, uploadFiles)
      }
      setIsDragActive(false)
    },
    [getFileData, uploadFiles, disabled]
  )

  const initDragEvents = useCallback((): void => {
    if (dropRef?.current) {
      dropRef.current.addEventListener('dragover', handleDragOver)
      dropRef.current.addEventListener('drop', handleDrop)
      dropRef.current.addEventListener('dragenter', handleDragStart)
      dropRef.current.addEventListener('dragleave', handleDragEnd)
    }
  }, [handleDrop, disabled])

  const resetDragEvents = useCallback((): void => {
    if (dropRef?.current) {
      dropRef.current.removeEventListener('dragover', handleDragOver)
      dropRef.current.removeEventListener('drop', handleDrop)
      dropRef.current.removeEventListener('dragenter', handleDragStart)
      dropRef.current.removeEventListener('dragleave', handleDragEnd)
    }
  }, [handleDrop])

  const validFileCount = (currentFilenameList: string[], uploadFile: FileListDataType) => {
    if (count < uploadFile.length + currentFilenameList.length) {
      // alert(`${count}개까지 업로드 가능합니다`)
      return true
    }
    return false
  }

  const validFileSize = (currentFiles: File[]) => {
    const files = [...uploadFiles, ...currentFiles].filter(Boolean)

    if (fileSize < +calculateSize(files)) {
      toastOpen(getToastState({ content: 'The file exceeds size limit.', icon: 'warning' }))
      return true
    }
    return false
  }

  const validFileFormat = (currentFiles: File[]) => {
    if (!isApiUpload) return false
    if (currentFiles.every((file) => fileValidReg?.test(file.name.toLowerCase()))) {
      return false
    }

    if (extensionValid !== '') {
      setValidFormat(true)
      return true
    }

    toastOpen(getToastState({ content: 'The file format cannot be attached. ', icon: 'warning' }))
    return true
  }

  const validFileDuplication = (currentFilenameList: string[], uploadFile?: FileListDataType) => {
    if (uploadFile && uploadFile.some((e) => currentFilenameList.includes(`${e.displayFileName}`))) {
      toastOpen(getToastState({ content: 'This file has already been uploaded.', icon: 'warning' }))
      return true
    }
    return false
  }

  const validDrmFile = async (currentFiles: File[]) => {
    const res = await Promise.all(
      currentFiles.map(async (file) => {
        try {
          // 파일을 ArrayBuffer로 읽기
          const arrayBuffer = (await readFile(file.slice(0, 8))) as AllowSharedBufferSource

          if (!arrayBuffer) {
            return true // If arrayBuffer is falsy, consider it a failure
          }

          // ArrayBuffer를 Uint8Array로 변환
          const uint8Array = new Uint8Array([0x9b, 0x20, 0x44, 0x52, 0x4d, 0x4f, 0x4e, 0x45])

          // TextDecoder 인스턴스 생성 (인코딩은 파일의 실제 인코딩에 맞게 설정)
          const decoder = new TextDecoder('utf-8')

          // 바이너리 데이터를 텍스트로 디코딩
          const drmDecodedText = decoder.decode(uint8Array).split(' ')[1]
          const fileDecodedText = decoder.decode(arrayBuffer).substring(0, 8).split(' ')[1]

          return drmDecodedText === fileDecodedText
        } catch (error) {
          console.error(error)
          return true
        }
      })
    )

    const isEveryFileValid = res.some((result) => result)
    setDrmValid(isEveryFileValid)

    return isEveryFileValid
  }

  const calculateSize = (fileList: FileListDataType) => {
    return fileList?.reduce((acc, cur) => (acc += cur?.size || cur?.fileSize || 0), 0) || 0
  }

  const getfileSize = () => {
    const sizeInBytes = calculateSize(uploadFiles)

    return (sizeInBytes / (1024 * 1024)).toFixed(2)
  }

  const fileValidation = async (currentFiles: File[], uploadFile: FileListDataType) => {
    const currentFilenameList = currentFiles.map((file) => file.name.split('.')[0])

    return (
      (isDRMS && (await validDrmFile(currentFiles))) ||
      validFileSize(currentFiles) ||
      validFileCount(currentFilenameList, uploadFile) ||
      validFileFormat(currentFiles) ||
      validFileDuplication(currentFilenameList, uploadFile)
    )
  }

  const removeUploadCard = (displayFileName: string) => {
    const currentFiles = uploadFiles?.filter((file) => (file.name || file.displayFileName) !== displayFileName)
    removeRef()
    setUploadFiles(currentFiles)
  }

  const removeRef = useCallback(() => {
    if (fileInputRef.current) {
      const emptyFileList = new DataTransfer().files
      fileInputRef.current.files = emptyFileList
    }
  }, [uploadFiles, fileInputRef])

  useEffect(() => {
    initDragEvents()
    return () => resetDragEvents()
  }, [initDragEvents, resetDragEvents])

  return {
    drmValid,
    validFormat,
    count,
    dropRef,
    fileInputRef,
    uploadFiles,
    isDragActive,
    setValidFormat,
    setDrmValid,
    removeRef,
    setUploadFiles,
    getfileSize,
    removeUploadCard,
    changeFileInput,
  }
}
