'use client'

import { ChangeEvent } from 'react'
import styles from 'ui/styles/components/form/_textarea.module.scss'
import { useUser } from 'library'
type CommentFormType = {
  children: React.ReactNode
  changeCommentData: (event: ChangeEvent<HTMLTextAreaElement>) => void

  commentValue: string
}

const CommentForm = ({ children, changeCommentData, commentValue }: CommentFormType) => {
  const { userInfo } = useUser()
  return (
    <div className="b_solid round4 bc_navy100 pd_20">
      <p className="body3 typo900 mb_10">{userInfo?.usrNm}</p>
      {/* 공통 컴포넌트 스타일 적용 */}
      <div className={`${styles.textarea} ${styles.no_border} h50`}>
        <textarea value={commentValue} placeholder="Please leave comments." onChange={changeCommentData} />
      </div>
      <div className="align end">{children}</div>
    </div>
  )
}

export default CommentForm
