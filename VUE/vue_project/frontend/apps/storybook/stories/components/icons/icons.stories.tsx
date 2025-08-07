import React from 'react'
import { Icons, BoardTable } from 'ui' // 'ui'의 경로를 실제 경로로 변경해야 합니다.
import { Meta } from '@storybook/react'

const meta = {
  title: 'Components/Icons/Icons',
  tags: ['autodocs'],
} as Meta

export default meta

interface SvgProps {
  [key: string]: React.FC<SvgProps>
}
// 아이콘 컴포넌트를 반복문을 사용하여 나열
export const IconsList = () => (
  <div className="gap_10">
    <p className="title1">
      <code>Icons.tsx</code>에서 관리하는 svg
    </p>
    <BoardTable>
      <colgroup>
        <col width={8} />
        <col width={20} />
        <col width={72} />
      </colgroup>
      <tbody>
        {Object.keys(Icons).map((iconName, index) => {
          const IconComponent = Icons[iconName]
          return (
            <tr key={iconName}>
              <td>{index + 1}</td>
              <td>{iconName}</td>
              <td>
                <IconComponent />
              </td>
            </tr>
          )
        })}
      </tbody>
    </BoardTable>
  </div>
)
