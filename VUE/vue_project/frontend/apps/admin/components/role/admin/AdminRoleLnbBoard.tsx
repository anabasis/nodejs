'use client'

import { BoardTable, Checkbox, NoData, TooltipHover } from 'ui'
import { makeRoutes } from '@util/menuAuthority'
import { Dispatch, SetStateAction } from 'react'
import { AdminRoleMenuAuthorityType } from '@type/role/adminRole'

/**
 * 화면: 어드민 역할 LNB 표
 * - 상세화면일 때는 Checkbox 비활성화
 * - 나머지는 Checkbox 활성화
 */

interface AdminRoleLnbBoardProps {
  purpose: string
  roleAuthority: AdminRoleMenuAuthorityType[]
  setRoleAuthority?: Dispatch<SetStateAction<AdminRoleMenuAuthorityType[]>>
}

const AdminRoleLnbBoard = (props: AdminRoleLnbBoardProps) => {
  const { purpose, roleAuthority, setRoleAuthority } = props

  /**
   * makeLnbMenuDepth: LNB 메뉴 Depth 만들기
   * - 알고리즘 이용하여 부모-자식 관계 파악 후 메뉴 만들기
   */
  const makeLnbMenuDepth = () => {
    const menu = makeRoutes(roleAuthority)
    return menu
  }

  /**
   * handleCheckbox: 체크박스 클릭 시 처리하는 함수
   * - 해당 체크박스의 체크 여부에 따른 권한 y/n 변경 처리
   * @param e : 이벤트
   * @param index : 해당 아이템의 인덱스
   * @param type : crud 중 하나
   */
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, index: number, type: string) => {
    let list = [...roleAuthority]
    list[index][type] = e.target.checked ? 'Y' : 'N'
    setRoleAuthority(list)
  }

  /**
   * makeLnbMenuBody: LNB 표 body
   * @returns LNB 표 body 구간
   */
  const makeLnbMenuBody = () => {
    const menuList = makeLnbMenuDepth()

    if (menuList.length === 0) {
      return (
        <tbody>
          <tr className="nodata">
            <td colSpan={7}>
              <NoData text="There's no menu." />
            </td>
          </tr>
        </tbody>
      )
    }

    return (
      <tbody>
        {menuList?.map((item, index: number) => (
          <tr key={index}>
            {item.parentsMenuNumber === 1 && <td rowSpan={item.childrenData ? item.childrenData.length + 1 : 1}>{item.menuName}</td>}
            <td className={item.depth === 2 ? 'pl_12' : ''} rowSpan={item.depth === 2 && item.childrenData ? item.childrenData.length + 1 : 1}>
              {!item.depth ? '-' : item.menuName}
            </td>
            {/* 3rd depth는 현재 개발 X */}
            <td className={item.depth === 3 ? 'pl_12' : ''}>{item.depth !== 3 ? '-' : item.menuName}</td>
            <td>
              {purpose === 'd' ? (
                <Checkbox value={item.readYn === 'Y' ? true : false} id={`${index}_read`} disabled />
              ) : (
                <Checkbox
                  id={`${index}_read`}
                  value={item.readYn === 'Y' ? true : false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckbox(e, index, 'readYn')}
                />
              )}
            </td>
            <td style={{ borderCollapse: 'collapse' }}>
              {purpose === 'd' ? (
                <Checkbox value={item.updateYn === 'Y' ? true : false} id={`${index}_update`} disabled />
              ) : (
                <Checkbox
                  id={`${index}_update`}
                  value={item.updateYn === 'Y' ? true : false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckbox(e, index, 'updateYn')}
                />
              )}
            </td>
            <td>
              {purpose === 'd' ? (
                <Checkbox value={item.createYn === 'Y' ? true : false} id={`${index}_create`} disabled />
              ) : (
                <Checkbox
                  value={item.createYn === 'Y' ? true : false}
                  id={`${index}_create`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckbox(e, index, 'createYn')}
                />
              )}
            </td>
            <td>
              {purpose === 'd' ? (
                <Checkbox value={item.deleteYn === 'Y' ? true : false} id={`${index}_delete`} disabled />
              ) : (
                <Checkbox
                  id={`${index}_delete`}
                  value={item.deleteYn === 'Y' ? true : false}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckbox(e, index, 'deleteYn')}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    )
  }

  return (
    <article>
      <div className="cont_title_box">
        <div className="align start">
          <p className="title1">Menu Authority : LNB</p>
          <TooltipHover placements="top-start" className="ml_10">
            <p>
              Abbreviation of Local Navigation Bar. <br />
              This menu is located at the left side of Seegene OneSystem.
            </p>
          </TooltipHover>
        </div>
        <p className="body2 typo500">Please set the permission for the LNB menu.</p>
      </div>
      <BoardTable>
        <colgroup>
          <col style={{ width: '19%' }} />
          <col style={{ width: '19%' }} />
          <col style={{ width: '28%' }} />
          <col style={{ width: '7%' }} />
          <col style={{ width: '7%' }} />
          <col style={{ width: '7%' }} />
          <col style={{ width: '7%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>1st Depth Menu</th>
            <th>2nd Depth Menu</th>
            <th>3rd Depth Menu</th>
            <th>Read</th>
            <th>Update</th>
            <th>Create</th>
            <th>Delete</th>
          </tr>
        </thead>
        {makeLnbMenuBody()}
      </BoardTable>
    </article>
  )
}

export default AdminRoleLnbBoard
