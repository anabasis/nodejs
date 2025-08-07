'use client'
import { ButtonMui } from 'ui'
import ReplyComment from './comment/ReplyComment'
import CommentView from './comment/CommentView'
import CommentForm from './comment/CommentForm'
import { ChangeEvent, useEffect, useState } from 'react'
import { useCommentData, useQnaMuate } from '@store/server/useQnaQuery'
import { useAtomValue, useSetAtom } from 'jotai'
import { qnaNumAtom, qnaCommentCountAtom } from '@store/client/qna'
import { usePathname } from 'next/navigation'
import { useMenu } from 'library'

const QnaDetailComment = () => {
  const setCommentCount = useSetAtom(qnaCommentCountAtom)
  const qnaNum = useAtomValue(qnaNumAtom)
  const [params, setCommentParams] = useState({ content: '' })
  const { commentData } = useCommentData({ qnaNum })
  const { commetPostMutate, commentLoading, queryClient } = useQnaMuate()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  useEffect(() => {
    if (commentData?.length > 0) {
      setCommentCount(commentData?.filter((comment) => comment?.parentQnaCommentNumber === 0 && comment.deleteYn === 'N').length)
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
              !comment.parentQnaCommentNumber && (
                <li key={comment.qnaCommentNumber} className="mt_10 pt_10 bt">
                  <CommentView comment={comment} />
                  <ReplyComment qnaCmntNum={comment.qnaCommentNumber} commentData={commentData} />
                </li>
              )
          )}
      </ul>

      {/*  Root Comment Form */}
      <div className="mt_20">
        <CommentForm changeCommentData={changeCommentData} commentValue={params.content}>
          <ButtonMui
            isLoading={commentLoading}
            type="contained"
            size="medium"
            color="black"
            disabled={!params.content.trim() || getPathInfo(pathname).uptYn !== 'Y'}
            onClick={postCommentData}
          >
            Add
          </ButtonMui>
        </CommentForm>
      </div>
    </>
  )
}

export default QnaDetailComment
