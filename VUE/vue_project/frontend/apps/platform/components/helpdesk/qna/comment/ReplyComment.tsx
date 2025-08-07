'use client'

import { ReplyCommentType } from '@type/qna'
import ReplyCommentView from './ReplyCommentView'

const ReplyComment = ({ commentData, qnaCmntNum }: ReplyCommentType) => {
  const filterName = (comment) =>
    commentData.filter((originComment) => originComment.qnaCmntNum === comment.prntQnaCmntNum && originComment.prntQnaCmntNum === 0)

  return (
    <>
      {commentData.map((comment) => (
        <div key={comment.qnaCmntNum}>{comment.prntQnaCmntNum === qnaCmntNum && <ReplyCommentView comment={comment} filterName={filterName} />}</div>
      ))}
    </>
  )
}

export default ReplyComment
