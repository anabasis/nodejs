import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getQnaComment,
  addQnaAnswer,
  getQnaList,
  getQnaListDetail,
  getQnaDetailAnswer,
  editQnaReplyComment,
  deleteQnaReplyComment,
  addQnaComment,
  editQnaComment,
  addQnaReplyComment,
  deleteQnaComment,
  addQnaCategoryManager,
  getQnaCateModuleManagerList,
  getQnaCateModuleManagerInfoList,
  deleteQnaCategoryManager,
  resetQnaCategory,
  getQnaCatModuleManagerDetail,
  editQnaAnswer,
} from '@api/qna'
import {
  QnaAdminListReturnType,
  QnaManageDetailType,
  QnaDetailType,
  CommentType,
  QnaAdminManageUserListReturnType,
  QnaAdminManageListReturnType,
} from '@type/qna'
import { QnaDetailAnswerType } from '@type/qna'
import { useModal, useToastPopup } from 'library'
import { isReplyAtom } from '@store/client/qna'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'

export const useQnaListData = ({ searchFilterParams, currentPage }) => {
  const { data: qnaList, isSuccess } = useQuery<QnaAdminListReturnType>(['qnaList', searchFilterParams, currentPage], () =>
    getQnaList({ searchFilterParams, currentPage })
  )

  return {
    qnaList,
    isSuccess,
  }
}

export const useQnaDetailData = ({ qnaNum }) => {
  const { data: qnaDetailData, isSuccess: detailSuccess } = useQuery<QnaDetailType>(['qnaDetail', qnaNum], () => getQnaListDetail({ qnaNum }))

  return {
    qnaDetailData,
    detailSuccess,
  }
}

export const useQnaAnswerData = ({ qnaNum }) => {
  const { data: qnaAnswerData, isSuccess: answerSuccess } = useQuery<QnaDetailAnswerType[]>(['qnaAnswer', qnaNum], () => getQnaDetailAnswer({ qnaNum }))

  return {
    qnaAnswerData,
    answerSuccess,
  }
}

export const useCommentData = ({ qnaNum }) => {
  const { data: commentData, isSuccess } = useQuery<CommentType[]>(['qna_commentData', qnaNum], () => getQnaComment({ qnaNum }), {
    enabled: !!qnaNum,
  })

  return {
    commentData,
    isSuccess,
  }
}

export const useQnaManageListData = ({ searchFilterParams, currentPage }) => {
  const { data: qnaMangeList, isSuccess } = useQuery<QnaAdminManageListReturnType>(['qnaManageList', searchFilterParams, currentPage], () =>
    getQnaCateModuleManagerList({ searchFilterParams, currentPage })
  )

  return {
    qnaMangeList,
    isSuccess,
  }
}
export const useQnaManageUserListData = ({ category, currentPage, module, pageSize }) => {
  const { data: qnaMangeUserList, isSuccess } = useQuery<QnaAdminManageUserListReturnType>(['qnaManageUserList', category, module, currentPage], () =>
    getQnaCateModuleManagerInfoList({ category, currentPage, module, pageSize })
  )

  return {
    qnaMangeUserList,
    isSuccess,
  }
}

export const useQnaManageDetailList = ({ category, module }) => {
  const { data: qnaMangeDetailList, isSuccess } = useQuery<QnaManageDetailType>(['qnaManageDetailList'], () =>
    getQnaCatModuleManagerDetail({ category, module })
  )

  return {
    qnaMangeDetailList,
    isSuccess,
  }
}

export const useQnaMuate = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const setIsReply = useSetAtom(isReplyAtom)
  const { toastOpen, getToastState } = useToastPopup()
  const { modalClose } = useModal()

  const { mutate: qnaPostAnswerMutate } = useMutation(addQnaAnswer, {
    onSuccess: () => {
      setIsReply(false)
      queryClient.invalidateQueries(['qnaAnswer'])
    },
  })
  const { mutate: qnaEditAnswerMutate } = useMutation(editQnaAnswer, {
    onSuccess: () => {
      setIsReply(false)
      queryClient.invalidateQueries(['qnaAnswer'])
    },
  })

  const { mutate: commetPostMutate, isLoading: commentLoading } = useMutation(addQnaComment)

  const { mutate: commentModifyMutate, isLoading: commentEditLoading } = useMutation(editQnaComment)
  const { mutate: commentDeleteMutate } = useMutation(deleteQnaComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['qna_commentData'])
    },
  })
  const { mutate: postQnaAddReplyCommentMutate, isLoading: replyCommentLoading } = useMutation(addQnaReplyComment)
  const { mutate: modifyQnaAddReplyCommentMutate, isLoading: relpyCommentEditLoading } = useMutation(editQnaReplyComment)
  const { mutate: deleteQnaAddReplyCommentMutate } = useMutation(deleteQnaReplyComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['qna_commentData'])
    },
  })
  const { mutate: resetQnaManagerMutate } = useMutation(resetQnaCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['qnaList'])
      toastOpen(getToastState({ content: 'Successfully Saved.', icon: 'success' }))
      modalClose()
      router.replace('/helpdesk/qna')
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })
  const { mutate: addQnaManagerMutate } = useMutation(addQnaCategoryManager, {
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
    onSettled: (data) => {
      if (data === undefined) return
      queryClient.invalidateQueries(['qnaManageDetailList'])
      queryClient.invalidateQueries(['qnaManageUserList'])
    },
  })
  const { mutate: deleteQnayManagerMutate } = useMutation(deleteQnaCategoryManager, {
    onSettled: (data) => {
      if (data === undefined) return
      queryClient.invalidateQueries(['qnaManageUserList'])
      queryClient.invalidateQueries(['qnaManageDetailList'])
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'error' }))
    },
  })

  return {
    queryClient,
    commentLoading,
    commentEditLoading,
    replyCommentLoading,
    relpyCommentEditLoading,
    qnaEditAnswerMutate,
    qnaPostAnswerMutate,
    commetPostMutate,
    commentModifyMutate,
    commentDeleteMutate,
    postQnaAddReplyCommentMutate,
    modifyQnaAddReplyCommentMutate,
    deleteQnaAddReplyCommentMutate,
    resetQnaManagerMutate,
    deleteQnayManagerMutate,
    addQnaManagerMutate,
  }
}
