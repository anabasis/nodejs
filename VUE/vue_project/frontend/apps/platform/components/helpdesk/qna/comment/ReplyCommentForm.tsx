import { useQnaMuate } from '@store/server/useQnaQuery'
import { CommentType } from '@type/qna'
import { ChangeEvent, useState } from 'react'
import { ButtonMui } from 'ui'
import CommentForm from './CommentForm'

type RelpyCommentFormType = {
  comment: CommentType
  setEditForm: (prev: boolean) => void
}

const ReplyCommentForm = ({ comment, setEditForm }: RelpyCommentFormType) => {
  const [params, setCommentParams] = useState({ content: comment.cmnt })
  const { modifyQnaAddReplyCommentMutate, queryClient, replyCommentEditLoading } = useQnaMuate()
  const { prntQnaCmntNum, qnaCmntNum, qnaNum } = comment
  const editCommentData = () => {
    modifyQnaAddReplyCommentMutate(
      {
        params,
        prntQnaCmntNum,
        qnaCmntNum,
        qnaNum,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['qna_commentData'])
          setEditForm(false)
        },
      }
    )
  }

  const changeCommentData = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setCommentParams({
      content: event.target.value,
    })
  }
  return (
    <CommentForm changeCommentData={changeCommentData} commentValue={params.content}>
      <ButtonMui size="medium" type="outlined" uiType="etc" color="black" onClick={() => setEditForm(false)}>
        Cancel
      </ButtonMui>
      <ButtonMui
        isLoading={replyCommentEditLoading}
        type="contained"
        size="medium"
        disabled={params.content.trim() === comment.cmnt.trim()}
        color="black"
        onClick={editCommentData}
      >
        Add
      </ButtonMui>
    </CommentForm>
  )
}

export default ReplyCommentForm
