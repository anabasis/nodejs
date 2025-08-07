'use client'

/**
 * 화면: 사용자 역할 LNB 표
 * - 상세화면일 때는 Checkbox 비활성화
 * - 나머지는 Checkbox 활성화
 * - TODO. data가 복잡하므로 API 바인딩 시 화면 로직 구성 제대로 할 것.
 */

import { BoardTable, Checkbox, NoData, TooltipHover } from 'ui'
import { Dispatch, SetStateAction } from 'react'
import { makeRoutes } from '@util/menuAuthority'
import { UserRoleMenuAuthorityType } from '@type/role/userRole'

interface UserRoleLnbBoardProps {
  purpose: string // a: 역할 추가, e: 역할 수정, d: 역할 상세 조회
  roleAuthority: UserRoleMenuAuthorityType[]
  setRoleAuthority?: Dispatch<SetStateAction<UserRoleMenuAuthorityType[]>>
}

const UserRoleLnbBoard = (props: UserRoleLnbBoardProps) => {
  const { purpose, roleAuthority, setRoleAuthority } = props // 상위 state. 추가 시에는 모든 권한이 N,

  /**
   * makeLnbMenuDepth: LNB 메뉴 Depth 만들기
   * - 알고리즘 이용하여 부모-자식 관계 파악 후 메뉴 만들기
   */
  const makeLnbMenuDepth = () => {
    const menu = makeRoutes(roleAuthority)
    return menu
  }

  /**
   * handleCheckbox: checkbox 클릭 시 동작하는 함수
   * - 체크 여부에 따라 해당 crud의 권한 부여 및 해제
   * @param e : 이벤트
   * @param index : 클릭된 권한의 인덱스
   * @param type : crud 중 하나
   */
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, index: number, type: string) => {
    let list = [...roleAuthority]
    list[index][type] = e.target.checked ? 'Y' : 'N'
    setRoleAuthority(list)
  }

  /**
   * makeLnbMenuBody: LNB 표 body
   * - 동적 rowspan이 존재하기에 복잡하다.
   * @returns LNB 표 body 구간
   */
  const makeLnbMenuBody = () => {
    const menuList = makeLnbMenuDepth()

    // 권한 리스트가 없는 경우
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
              Abbreviation of Local Navigation Bar.
              <br />
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

export default UserRoleLnbBoard
