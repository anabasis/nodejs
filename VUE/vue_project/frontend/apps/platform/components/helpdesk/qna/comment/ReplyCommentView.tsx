import { ReplyCommentType, CommentType } from '@type/qna'
import { changeTimeLocal, useUser } from 'library'
import { useState } from 'react'
import { ContextButton } from 'ui'
import ReplyCommentForm from '@components/helpdesk/qna/comment/ReplyCommentForm'
import { useQnaMuate } from '@store/server/useQnaQuery'

type ReplyCommentViewType = {
  comment: CommentType
  filterName: (comment: CommentType) => CommentType[]
}

const ReplyCommentView = ({ comment, filterName }: ReplyCommentViewType) => {
  const { userInfo } = useUser()
  const [editForm, setEditForm] = useState(false)
  const { deleteQnaAddReplyCommentMutate } = useQnaMuate()

  const editHandler = () => {
    setEditForm((prev) => !prev)
  }
  const deleteCommentData = (comment: CommentType) => {
    const { prntQnaCmntNum, qnaCmntNum, qnaNum } = comment
    deleteQnaAddReplyCommentMutate({ prntQnaCmntNum, qnaCmntNum, qnaNum })
  }

  const optionss = [
    {
      name: 'Edit',
      onClick: () => editHandler(),
    },
    {
      name: 'Delete',
      onClick: (comment: CommentType) => deleteCommentData(comment),
    },
  ]

  return (
    <div className={`pt_10 pl_20 bt mt_10 ${!editForm ? 'align' : ''}`}>
      {!editForm ? (
        <>
          <div>
            <p className="body3 typo900 mb_10">{comment.usrNm}</p>
            <div className={`${filterName(comment)[0].usrNm !== comment.usrNm ? 'align top' : ''}`}>
              <p className="body2 typo900">
                {filterName(comment)[0].usrNm !== comment.usrNm && <em className="mr_6 bold600">@{filterName(comment)[0].usrNm}</em>}
              </p>
              <p className="body2 typo900">
                {comment.delYn === 'Y' ? (
                  'This comment has been deleted.'
                ) : (
                  <>
                    {comment.cmnt?.split('\n').map((item, idx) => {
                      return (
                        <span key={idx}>
                          {item}
                          <br />
                        </span>
                      )
                    })}
                  </>
                )}
              </p>
            </div>
            <div className="align start mt_4 gap_10">
              <p className="caption typo500">{changeTimeLocal({ time: comment?.modifyDate || comment?.createDate, type: 'yyyy-MM-dd HH:mm' })}</p>
            </div>
          </div>
          {comment.delYn === 'N' && userInfo?.usrUid === comment?.crtrUid && <ContextButton iconsize={20} rotate options={optionss} rowData={comment} />}
        </>
      ) : (
        <ReplyCommentForm setEditForm={setEditForm} comment={comment} />
      )}
    </div>
  )
}

export default ReplyCommentView
