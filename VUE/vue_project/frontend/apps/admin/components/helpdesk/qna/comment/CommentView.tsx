'use client'
import React, { ChangeEvent, useState } from 'react'
import { ButtonMui, ContextButton } from 'ui'
import CommentForm from './CommentForm'
import { CommentViewType } from '@type/qna'
import { useQnaMuate } from '@store/server/useQnaQuery'
import { changeTimeLocal, useMenu, useUser } from 'library'
import { useAtomValue } from 'jotai'
import { qnaNumAtom } from '@store/client/qna'
import { usePathname } from 'next/navigation'

const CommentView = ({ comment }: CommentViewType) => {
  const qnaNum = useAtomValue(qnaNumAtom)
  const { qnaCommentNumber, comment: cmnt } = comment
  const { commentDeleteMutate, commentModifyMutate, postQnaAddReplyCommentMutate, commentEditLoading, queryClient, replyCommentLoading } = useQnaMuate()
  const [openReply, setOpenReply] = useState(false)
  const [replyCommentParams, setReplyCommentParams] = useState({ content: '' })
  const [editForm, setEditForm] = useState(false)
  const [params, setCommentParams] = useState({ content: cmnt })
  const { userInfo } = useUser()
  const isDeleteComment = comment.deleteYn === 'Y'
  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const editHandler = () => {
    setEditForm((prev) => !prev)
  }
  const deleteCommentData = () => {
    commentDeleteMutate({
      qnaCmntNum: qnaCommentNumber,
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
        qnaCmntNum: qnaCommentNumber,
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
        qnaCmntNum: qnaCommentNumber,
        qnaNum,
        params: replyCommentParams,
      },
      {
        onSuccess: () => {
          {
            queryClient.invalidateQueries(['qna_commentData'])
            setReplyCommentParams({ content: '' })
            setOpenReply(false)
          }
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
            type="contained"
            disabled={params.content.trim() === cmnt.trim()}
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
            <p className="body3 typo900 mb_10">{comment.writeUserName}</p>
            <p className="body2 typo900">
              {isDeleteComment ? (
                'This comment has been deleted.'
              ) : (
                <>
                  {cmnt?.split('\n').map((item, idx) => {
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
              {!isDeleteComment && getPathInfo(pathname).uptYn === 'Y' && (
                <button className="caption typo500" onClick={openReplyHandler}>
                  Comment
                </button>
              )}
            </div>
          </div>
          {!isDeleteComment && userInfo?.usrUid === comment?.createUid && <ContextButton iconsize={20} rotate options={optionss} rowData={comment} />}
        </div>
      )}

      {openReply && (
        <div className="mt_10 plr_20">
          <CommentForm key={comment.createUid} changeCommentData={changeReplyCommentData} commentValue={replyCommentParams.content}>
            <ButtonMui uiType="etc" color="black" onClick={openReplyHandler} size="medium" type="outlined">
              Cancel
            </ButtonMui>
            <ButtonMui
              isLoading={replyCommentLoading}
              type="contained"
              disabled={!replyCommentParams.content.trim()}
              size="medium"
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
