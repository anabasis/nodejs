//작업자 : 김수연
//해당 모큘러스 테스트 파일 입니다.
import styled from '@emotion/styled'

// 에디팅이 가능한 페이지 하단 컨텐츠 버튼 그룹

const ButtonGroupContainer = styled.div`
  padding-top: 30px;
  border-top: 1px solid var(--navy100);
  width: 100%;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

interface ButtonGroupProps {
  children: React.ReactNode
  className?: string
}

export const ButtonGroup = ({ children, ...others }: ButtonGroupProps) => {
  const { className } = others
  return <ButtonGroupContainer className={className}>{children}</ButtonGroupContainer>
}

export default ButtonGroup
