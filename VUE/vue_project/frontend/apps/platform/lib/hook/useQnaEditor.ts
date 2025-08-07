import { useCode, useParamsData, useToastPopup, useModuleSelectFilter, FileListDataType } from 'library/hook'
import { QnaCommonCodes, QnaAddInitParamsType } from '@type/qna'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useQnaMuate } from '@store/server/useQnaQuery'
import { SelectChangeEventType } from 'ui'
import { checkedCount } from '@store/client/qna'
import { useAtomValue } from 'jotai'
const commonCodes = { type: 'PFM006', category: 'PFM008', module: 'PFM009', openLevel: 'PFM013' }
const selectMenuList = ['Type', 'Category', 'Module']

export const useQnaEditor = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [qnaNum, isEdit] = [searchParams.get('qnaNum'), pathname.includes('edit')]
  const partiallyCheckedCount = useAtomValue(checkedCount)
  const { cCode } = useCode(commonCodes) as { cCode: QnaCommonCodes }
  const { params, setChangeParams } = useParamsData<QnaAddInitParamsType>()
  const { selectData, changeSelectData } = useModuleSelectFilter<QnaAddInitParamsType>({ isInit: false, cCode, params })
  const { qnaEditMutate, qnaEditLoading } = useQnaMuate()
  const { toastOpen, getToastState } = useToastPopup()

  const openLevelGroup = cCode?.openLevel?.filter((open) => open.value !== 'PUB') || []

  const onChangeSelect = (event: SelectChangeEventType, select: string) => {
    changeSelectData(event, select)
    if (select === 'category') {
      setChangeParams({
        [select]: event.target.value,
        module: '',
      })
      return
    }
    setChangeParams(event, select)
  }

  const saveEditQna = (files: FileListDataType) => {
    const { qnaAttachResponse, prtnUser, ...rest } = params

    const param = {
      ...rest,
      prtnUser: [],
      qnaAttachmentRequest: files?.map(({ fileNumber }) => ({ fileId: fileNumber })) || [],
    }
    if (params?.openLevel === 'PTL') {
      Object.assign(param, {
        prtnUser: params?.prtnUser?.map(({ userUid }) => ({ userUid })) || [],
      })
    } else {
      delete params.prtnUser
    }
    qnaEditMutate(
      { qnaNum: +qnaNum, params: param },
      {
        onSuccess: () => {
          toastOpen(getToastState({ content: 'Successfully Saved.', icon: 'success' }))
          router.push(`/helpdesk/qna/detail?qnaNum=${qnaNum}`)
        },
      }
    )
  }

  const getDisabled = () => {
    if (!params) return

    const isPtlMemberCheck = params?.openLevel === 'PTL' && (!params?.prtnUser || params?.prtnUser.length === 0)
    return isPtlMemberCheck
  }

  return {
    isEdit,
    selectData,
    qnaNum,
    qnaEditLoading,
    partiallyCheckedCount,
    selectMenuList,
    openLevelGroup,
    saveEditQna,
    getDisabled,
    onChangeSelect,
  }
}
