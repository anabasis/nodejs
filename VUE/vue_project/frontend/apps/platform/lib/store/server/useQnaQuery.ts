import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getQnaComment,
  getQnaList,
  modifyQnaComment,
  postQnaAdd,
  postQnaAddComment,
  deleteQnaComment,
  postQnaAddReplyComment,
  modifyQnaReplyComment,
  deleteQnaReplyComment,
  deleteQna,
  modifyQna,
} from '@api/qna'
import { QnaListReturnType, CommentType } from '@type/qna'
import { useToastPopup } from 'library'
import { useRouter } from 'next/navigation'

export const useQnaListData = ({ searchFilterParams, currentPage }) => {
  const { data: qnaList, isSuccess } = useQuery<QnaListReturnType>(['qnaList', searchFilterParams, currentPage], () =>
    getQnaList({ searchFilterParams, currentPage })
  )

  return {
    qnaList,
    isSuccess,
  }
}

export const useCommentData = ({ qnaNum }) => {
  const { data: commentData } = useQuery<CommentType[]>(['qna_commentData', qnaNum], () => getQnaComment({ qnaNum }), {
    enabled: !!qnaNum,
  })
  return {
    commentData,
  }
}

export const useQnaMuate = () => {
  const { toastOpen, getToastState } = useToastPopup()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: qnaAddMutate, isLoading: qnaAddLoading } = useMutation(postQnaAdd, {
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'error' }))
    },
  })
  const { mutate: qnaEditMutate, isLoading: qnaEditLoading } = useMutation(modifyQna, {
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'error' }))
    },
  })

  const { mutate: qnaDeleteMutate } = useMutation(deleteQna, {
    onSuccess: () => {
      toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
      router.replace('/helpdesk/qna')
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'error' }))
    },
  })

  const { mutate: commetPostMutate, isLoading: commentPostLoading } = useMutation(postQnaAddComment)

  const { mutate: commentModifyMutate, isLoading: commentEditLoading } = useMutation(modifyQnaComment)

  const { mutate: commentDeleteMutate } = useMutation(deleteQnaComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['qna_commentData'])
    },
  })

  const { mutate: postQnaAddReplyCommentMutate, isLoading: relpyCommentLoading } = useMutation(postQnaAddReplyComment)
  const { mutate: modifyQnaAddReplyCommentMutate, isLoading: replyCommentEditLoading } = useMutation(modifyQnaReplyComment)
  const { mutate: deleteQnaAddReplyCommentMutate } = useMutation(deleteQnaReplyComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['qna_commentData'])
    },
  })

  return {
    queryClient,
    qnaAddLoading,
    qnaEditLoading,
    commentPostLoading,
    commentEditLoading,
    relpyCommentLoading,
    replyCommentEditLoading,
    qnaAddMutate,
    qnaEditMutate,
    qnaDeleteMutate,
    commetPostMutate,
    commentDeleteMutate,
    commentModifyMutate,
    postQnaAddReplyCommentMutate,
    modifyQnaAddReplyCommentMutate,
    deleteQnaAddReplyCommentMutate,
  }
}
