'use client'
import { ButtonMui } from 'ui'
import ReplyComment from './comment/ReplyComment'
import CommentView from './comment/CommentView'
import CommentForm from './comment/CommentForm'
import { ChangeEvent, useEffect, useState } from 'react'
import { useCommentData, useQnaMuate } from '@store/server/useQnaQuery'
import { useAtomValue, useSetAtom } from 'jotai'
import { qnaNumAtom, qnaCommentCountAtom } from '@store/client/qna'

const QnaDetailComment = () => {
  const setCommentCount = useSetAtom(qnaCommentCountAtom)
  const qnaNum = useAtomValue(qnaNumAtom)
  const [params, setCommentParams] = useState({ content: '' })
  const { commentData } = useCommentData({ qnaNum })
  const { commetPostMutate, commentPostLoading, queryClient } = useQnaMuate()

  useEffect(() => {
    if (commentData?.length > 0) {
      setCommentCount(commentData?.filter((comment) => comment?.prntQnaCmntNum === 0 && comment.delYn === 'N').length)
    }
  }, [commentData])

  const changeCommentData = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setCommentParams({
      content: event.target.value,
    })
  }
  const postCommentData = () => {
    commetPostMutate(
      {
        params,
        qnaNum,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['qna_commentData'])
          setCommentParams({ content: '' })
        },
      }
    )
  }

  return (
    <>
      <ul className="">
        {/*  comment Lists */}
        {commentData &&
          commentData.map(
            (comment) =>
              !comment.prntQnaCmntNum && (
                <li key={comment.qnaCmntNum} className="mt_10 pt_10 bt">
                  <CommentView comment={comment} />
                  <ReplyComment qnaCmntNum={comment.qnaCmntNum} commentData={commentData} />
                </li>
              )
          )}
      </ul>

      {/*  Root Comment Form */}
      <div className="mt_20">
        <CommentForm changeCommentData={changeCommentData} commentValue={params.content}>
          <ButtonMui isLoading={commentPostLoading} type="contained" size="medium" color="black" disabled={!params.content.trim()} onClick={postCommentData}>
            Add
          </ButtonMui>
        </CommentForm>
      </div>
    </>
  )
}

export default QnaDetailComment
