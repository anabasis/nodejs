interface DetailConType {
  isComment?: boolean
  children: React.ReactNode
}

export const DetailCon = ({ children, isComment }: DetailConType) => {
  return <div className={`${isComment ? 'mt_20' : 'pt_20 mt_20 bt'}`}>{children}</div>
}

export default DetailCon
