import { getAdminRoleApi, getUserRoleApi } from '@api/menumanagement'
import { IAdminRole, IAuthority, IUserRole } from '@type/menu/menuTypes'
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { BoardTable, Checkbox } from 'ui/components'

export default function AuthoritySetting({
  isAdd,
  isAdmin,
  authoritySetting,
  setAuthoritySetting,
}: {
  isAdd: boolean
  isAdmin: boolean
  authoritySetting: IAuthority[]
  setAuthoritySetting: Dispatch<SetStateAction<IAuthority[]>>
}) {
  /**
   * authorityList: 보여줄 Plain role list data
   * checkboxValues: checkbox들 값 관리를 위한 객체 리스트
   */
  const [authorityList, setAuthorityList] = useState<IUserRole[] | IAdminRole[]>([])

  const getAuthorityData = async () => {
    const authorityData = isAdmin ? await getAdminRoleApi() : await getUserRoleApi()
    setAuthorityList(authorityData)
  }

  const prepareCheckbox = useCallback(() => {
    const tempList = authorityList.map((item) => {
      const roleNum = isAdmin ? item.admRolNum : item.id
      const authority = !isAdd ? authoritySetting.find((auth) => auth.roleNum === roleNum) : null

      const defaultAuthority = {
        roleNum,
        readYn: 'N',
        createYn: 'N',
        updateYn: 'N',
        deleteYn: 'N',
      }

      return {
        ...defaultAuthority,
        ...authority,
      }
    })

    setAuthoritySetting(tempList)
  }, [authorityList])

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>, index, action, rowData) => {
    const tempAuthList: IAuthority[] = [...authoritySetting]
    tempAuthList[index][`${action}Yn`] = e.target.checked ? 'Y' : 'N'

    if (e.target.checked && action !== 'read' && tempAuthList[index].readYn !== 'Y') {
      // read가 아닌 권한이 Y로 체크 되었을 때, read 권한이 주어지지 않았다면 read 권한을 추가해준다.
      tempAuthList[index].readYn = 'Y'
    } else if (!e.target.checked && action === 'read') {
      // read가 취소되면 주어졌던 모든 권한을 취하한다.
      Object.keys(tempAuthList[index]).forEach((key) => {
        if (tempAuthList[index][key] === 'Y') {
          tempAuthList[index][key] = 'N'
        }
      })
    }
    setAuthoritySetting(tempAuthList)
  }

  const createTableRow = (rowData, index) => {
    return (
      <tr key={index}>
        {!isAdmin && <td>{`Level ${rowData.roleLv}`}</td>}
        <td>{isAdmin ? rowData.admRolNm : rowData.name}</td>
        <td className="tc">
          <Checkbox
            value={authoritySetting[index]?.readYn === 'Y'}
            id={`${index}_read`}
            name={`${index}_read`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxClick(e, index, 'read', rowData)
            }}
          />
        </td>
        <td className="tc">
          <Checkbox
            value={authoritySetting[index]?.updateYn === 'Y'}
            id={`${index}_update`}
            name={`${index}_update`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxClick(e, index, 'update', rowData)
            }}
          />
        </td>
        <td className="tc">
          <Checkbox
            value={authoritySetting[index]?.createYn === 'Y'}
            id={`${index}_create`}
            name={`${index}_create`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxClick(e, index, 'create', rowData)
            }}
          />
        </td>
        <td className="tc">
          <Checkbox
            value={authoritySetting[index]?.deleteYn === 'Y'}
            id={`${index}_delete`}
            name={`${index}_delete`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleCheckboxClick(e, index, 'delete', rowData)
            }}
          />
        </td>
      </tr>
    )
  }

  useEffect(() => {
    getAuthorityData()
  }, [])

  useEffect(() => {
    if (authorityList?.length > 0) {
      prepareCheckbox()
    }
  }, [authorityList])

  return (
    <article>
      <div className="cont_title_box">
        <p className="title1">Authority Setting</p>
        <p className="body2">If not selected, the unselected menu will not be visible to the role, and selection can be made starting from Read.</p>
      </div>
      <BoardTable>
        <colgroup>
          {!isAdmin && <col width="15%" />}
          <col width="auto" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr>
            {!isAdmin && <th>Role</th>}
            <th>Role Name</th>
            <th className="tc pl_0">Read</th>
            <th className="tc pl_0">Update</th>
            <th className="tc pl_0">Create</th>
            <th className="tc pl_0">Delete</th>
          </tr>
        </thead>
        <tbody>
          {authorityList.map((item, index) => {
            return createTableRow(item, index)
          })}
        </tbody>
      </BoardTable>
    </article>
  )
}
