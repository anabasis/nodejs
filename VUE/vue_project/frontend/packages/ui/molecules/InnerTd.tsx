//작업자 : 김수연
//해당 table의 td에 들어갈 내용들을 정의한 컴포넌트
import styled from '@emotion/styled'

const InnerTdBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

interface InnerTdBoxProps {
  children: React.ReactNode
  className?: string
}

export const InnerTd = ({ children, ...others }: InnerTdBoxProps) => {
  const { className } = others
  return <InnerTdBox className={className}>{children}</InnerTdBox>
}

export default InnerTd
