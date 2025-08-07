'use client'

import { DetailBox, DetailCon } from 'ui'
import QnaDetailComment from './QnaDetailComment'
import { useAtomValue } from 'jotai'
import { qnaCommentCountAtom } from '@store/client/qna'
const QnaDetailAnserCommentContent = () => {
  const qnaCommentCount = useAtomValue(qnaCommentCountAtom)
  return (
    <div className="mt_30">
      <DetailBox isComment>
        <h2 className="title1 typo900 mb_20">Comments {qnaCommentCount ? `(${qnaCommentCount})` : '(0)'}</h2>
        <DetailCon isComment>
          <QnaDetailComment />
        </DetailCon>
      </DetailBox>
    </div>
  )
}

export default QnaDetailAnserCommentContent
