// 작업자 : 김수연

import { CircularProgress } from '@ui/mui/CircularProgress'
import styled from '@emotion/styled'

// 에디팅이 가능한 페이지 하단 컨텐츠 버튼 그룹

const DimContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ProgressLoading = () => {
  // 클래스 적용 참고 샘플 케이스. 정형화 불가로 children 하드코딩으로 작성해야함
  return (
    <DimContainer>
      <CircularProgress />
    </DimContainer>
  )
}
