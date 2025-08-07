'use client'

import { AdminRoleMenuAuthorityType } from '@type/role/adminRole'
import { BoardTable, Checkbox, TooltipHover } from 'ui'

/**
 * 화면: 어드민 역할 GNB 표
 * - 어드민 역할 모든 화면에서 모두 true인 상태에서 disabled이므로 공통으로 둔다.
 */

interface AdminRoleGnbBoardProps {
  roleAuthority: AdminRoleMenuAuthorityType[]
}

const AdminRoleGnbBoard = (props: AdminRoleGnbBoardProps) => {
  const { roleAuthority } = props

  return (
    <article>
      <div className="cont_title_box">
        <div className="align start">
          <p className="title1">Menu Authority : GNB</p>
          <TooltipHover placements="top-start" className="ml_10">
            <p>
              Abbreviation of Global Navigation Bar.
              <br />
              This menu is located at the top of Seegene OneSystem.
            </p>
          </TooltipHover>
        </div>
        <p className="body2 typo500">Please set the permission for the GNB menu.</p>
      </div>
      <BoardTable>
        <colgroup>
          <col style={{ width: '68%' }} />
          <col style={{ width: '7%' }} />
          <col style={{ width: '7%' }} />
          <col style={{ width: '7%' }} />
          <col style={{ width: '7%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Menu</th>
            <th>Read</th>
            <th>Update</th>
            <th>Create</th>
            <th>Delete</th>
          </tr>
        </thead>
        {/* 임시용 GNB */}
        <tbody>
          {roleAuthority.map((item, index) => (
            <tr key={index}>
              <td>{item.menuName}</td>
              <td>
                <Checkbox value={item.readYn === 'Y' ? true : false} disabled />
              </td>
              <td>
                <Checkbox value={item.updateYn === 'Y' ? true : false} disabled />
              </td>
              <td>
                <Checkbox value={item.createYn === 'Y' ? true : false} disabled />
              </td>
              <td>
                <Checkbox value={item.deleteYn === 'Y' ? true : false} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </BoardTable>
    </article>
  )
}

export default AdminRoleGnbBoard
