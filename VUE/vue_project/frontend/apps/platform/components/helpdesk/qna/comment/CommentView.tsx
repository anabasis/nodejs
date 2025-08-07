'use client'
import React, { ChangeEvent, useState } from 'react'
import { ButtonMui, ContextButton } from 'ui'
import CommentForm from './CommentForm'
import { CommentViewType } from '@type/qna'
import { useQnaMuate } from '@store/server/useQnaQuery'
import { changeTimeLocal, useUser } from 'library'

const CommentView = ({ comment }: CommentViewType) => {
  const { qnaCmntNum, qnaNum, cmnt } = comment
  const { commentDeleteMutate, commentModifyMutate, postQnaAddReplyCommentMutate, queryClient, relpyCommentLoading, commentEditLoading } = useQnaMuate()
  const [openReply, setOpenReply] = useState(false)
  const [replyCommentParams, setReplyCommentParams] = useState({ content: '' })
  const [editForm, setEditForm] = useState(false)
  const [params, setCommentParams] = useState({ content: cmnt })
  const { userInfo } = useUser()
  const isDeleteComment = comment.delYn === 'Y'

  const editHandler = () => {
    setEditForm((prev) => !prev)
  }
  const deleteCommentData = () => {
    commentDeleteMutate({
      qnaCmntNum,
      qnaNum,
    })
  }
  const optionss = [
    {
      name: 'Edit',
      onClick: () => editHandler(),
    },
    {
      name: 'Delete',
      onClick: () => deleteCommentData(),
    },
  ]

  const openReplyHandler = () => {
    setOpenReply((prev) => !prev)
  }

  const changeCommentData = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setCommentParams({
      content: event.target.value,
    })
  }
  const changeReplyCommentData = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setReplyCommentParams({
      content: event.target.value,
    })
  }

  const editCommentData = () => {
    commentModifyMutate(
      {
        qnaCmntNum,
        qnaNum,
        params,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['qna_commentData'])
          setEditForm(false)
        },
      }
    )
  }

  const postReplyCommentData = () => {
    postQnaAddReplyCommentMutate(
      {
        qnaCmntNum,
        qnaNum,
        params: replyCommentParams,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['qna_commentData'])
          setReplyCommentParams({ content: '' })
          setOpenReply(false)
        },
      }
    )
  }

  return (
    <>
      {editForm ? (
        <CommentForm changeCommentData={changeCommentData} commentValue={params.content}>
          <ButtonMui uiType="etc" color="black" onClick={() => setEditForm(false)} size="medium" type="outlined">
            Cancel
          </ButtonMui>
          <ButtonMui
            isLoading={commentEditLoading}
            disabled={params?.content.trim() === cmnt.trim()}
            type="contained"
            size="medium"
            color="black"
            onClick={editCommentData}
          >
            Add
          </ButtonMui>
        </CommentForm>
      ) : (
        <div className="align">
          <div>
            <p className="body3 typo900 mb_10">{comment.usrNm}</p>
            <p className="body2 typo900">
              {isDeleteComment ? (
                'This comment has been deleted.'
              ) : (
                <>
                  {comment?.cmnt?.split('\n').map((item, idx) => {
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

            <div className="align start mt_4 gap_10">
              {comment?.modifyDate && <p className="caption typo500">{changeTimeLocal({ time: comment?.modifyDate, type: 'yyyy-MM-dd HH:mm' })}</p>}
              {!isDeleteComment && (
                <button className="caption typo500" onClick={openReplyHandler}>
                  Comment
                </button>
              )}
            </div>
          </div>
          {!isDeleteComment && userInfo?.usrUid === comment?.crtrUid && <ContextButton iconsize={20} rotate options={optionss} rowData={comment} />}
        </div>
      )}

      {openReply && (
        <div className="mt_10 plr_20">
          <CommentForm key={comment.crtrUid} changeCommentData={changeReplyCommentData} commentValue={replyCommentParams.content}>
            {/*   */}
            <ButtonMui uiType="etc" color="black" onClick={openReplyHandler} size="medium" type="outlined">
              Cancel
            </ButtonMui>
            <ButtonMui
              isLoading={relpyCommentLoading}
              type="contained"
              size="medium"
              disabled={!replyCommentParams.content.trim()}
              color="black"
              onClick={postReplyCommentData}
            >
              Add
            </ButtonMui>
          </CommentForm>
        </div>
      )}
    </>
  )
}

export default CommentView
