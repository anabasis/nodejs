import { ReplyCommentType } from '@type/qna'
import ReplyCommentView from './ReplyCommentView'

const ReplyComment = ({ commentData, qnaCmntNum }: ReplyCommentType) => {
  const filterName = (comment) =>
    commentData.filter((originComment) => originComment.qnaCommentNumber === comment.parentQnaCommentNumber && originComment.parentQnaCommentNumber === 0)

  return (
    <>
      {commentData.map((comment) => (
        <div key={comment.qnaCommentNumber}>
          {comment.parentQnaCommentNumber === qnaCmntNum && <ReplyCommentView comment={comment} filterName={filterName} />}
        </div>
      ))}
    </>
  )
}

export default ReplyComment
