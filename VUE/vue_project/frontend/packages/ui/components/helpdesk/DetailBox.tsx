interface DetailBoxType {
  answerBg?: boolean
  isComment?: boolean
  children: React.ReactNode
}

export const DetailBox = ({ answerBg = false, isComment = false, children }: DetailBoxType) => {
  return (
    <div className={`linecont ${answerBg ? 'bg_second100' : ''}`}>
      <div className={`${isComment ? 'detail_comments' : 'detail'}`}>{children}</div>
      {/* <DetailHeader /> */}
      {/* <DetailCon /> */}
    </div>
  )
}

export default DetailBox
