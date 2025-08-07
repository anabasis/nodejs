// 작업자 : 김수연

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { TextTooltip } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Mui/Tooltip/TextTooltip',
  component: TextTooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof TextTooltip>

export default meta
// type Story = StoryObj<typeof meta>

export const TextAnchorHover = () => (
  <>
    <TextTooltip>
      커다란 싸인 피는 사막이다. 전인 보내는 이것을 없으면, 위하여서. 주는 청춘의 이것이야말로 인생에 우는 꾸며 있는 칼이다. 반짝이는 물방아 무엇이 그것을
      부패뿐이다. 곳이 할지라도 같은 무엇을 것은 하였으며, 때까지 유소년에게서 공자는 있다. 있는 그림자는 반짝이는 수 같은 산야에 있으랴? 불러 거친 가진 청춘의
      들어 방황하여도, 뿐이다. 무엇을 속잎나고, 크고 튼튼하며, 별과 봄바람이다. 수 위하여 석가는 충분히 구하지 때까지 설산에서 것이다. 생생하며, 꽃이 동력은
      있을 품고 고동을 봄바람이다. 하는 구하지 그들은 그들의 위하여 있는가? 갑 피고, 지혜는 같이, 심장은 목숨이 운다. 청춘이 피고 얼마나 많이 아름다우냐? 우리
      희망의 모래뿐일 스며들어 끝까지 뼈 끝에 노래하며 이것이다. 청춘의 힘차게 반짝이는 인간에 청춘은 우는 뿐이다. 이성은 불어 고동을 그들은 있음으로써 이상의
      것이다. 얼마나 불러 풀이 있으며, 품었기 있는 커다란 인생을 이것이다. 있는 긴지라 인간에 할지라도 용감하고 두손을 목숨을 바로 그리하였는가? 오직 열락의
      청춘을 싸인 얼음에 동력은 생생하며, 가슴이 사람은 보라. 전인 과실이 것이 이상은 고동을 청춘에서만 두손을 끓는다. 천자만홍이 주며, 없는 찬미를 사막이다.
      싸인 실현에 방지하는 그들의 꽃 영락과 같은 대한 그리하였는가? 밝은 것은 갑 위하여서. 오아이스도 얼마나 바로 맺어, 실현에 그리하였는가? 넣는 곳이 청춘은
      이상, 대중을 눈에 놀이 아름다우냐? 얼음이 같은 있는 위하여서, 두기 열매를 힘있다. 청춘의 끝에 그러므로 있는 원대하고, 얼음에 새 풍부하게 있으랴?
    </TextTooltip>
  </>
)
