import { qnaNumAtom } from '@store/client/qna'
import { useQnaMuate } from '@store/server/useQnaQuery'
import { CommentType } from '@type/qna'
import { useAtomValue } from 'jotai'
import { ChangeEvent, useState } from 'react'
import { ButtonMui } from 'ui'
import CommentForm from './CommentForm'

type RelpyCommentFormType = {
  comment: CommentType
  setEditForm: (prev: boolean) => void
}

const ReplyCommentForm = ({ comment, setEditForm }: RelpyCommentFormType) => {
  const qnaNum = useAtomValue(qnaNumAtom)
  const [params, setCommentParams] = useState({ content: comment.comment })
  const { modifyQnaAddReplyCommentMutate, relpyCommentEditLoading, queryClient } = useQnaMuate()
  const { parentQnaCommentNumber, qnaCommentNumber } = comment
  const editCommentData = () => {
    modifyQnaAddReplyCommentMutate(
      {
        params,
        qnaNum,
        prntQnaCmntNum: parentQnaCommentNumber,
        qnaCmntNum: qnaCommentNumber,
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
      <ButtonMui uiType="etc" color="black" onClick={() => setEditForm(false)} size="medium" type="outlined">
        Cancel
      </ButtonMui>
      <ButtonMui
        isLoading={relpyCommentEditLoading}
        type="contained"
        size="medium"
        disabled={params?.content?.trim() === comment?.comment?.trim()}
        color="black"
        onClick={editCommentData}
      >
        Add
      </ButtonMui>
    </CommentForm>
  )
}

export default ReplyCommentForm
