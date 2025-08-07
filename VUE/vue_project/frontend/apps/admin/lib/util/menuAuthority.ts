import { AdminRoleMenuAuthorityType } from '@type/role/adminRole'
import { UserRoleMenuAuthorityType } from '@type/role/userRole'
import { groupBy as _groupBy } from 'lodash-es'

const convertMenuNotation = (tempItem) => {
  let item = tempItem

  if (tempItem.childrenData && tempItem.childrenData.length > 0) {
    item = { ...item, childrenData: tempItem.childrenData, cnt: item.cnt }
  }
  return item
}

const convertDept = (tempItem) => {
  let item = tempItem
  item = { ...item, depth: 2 }

  return item
}

const insertIndex = (temp: UserRoleMenuAuthorityType[] | AdminRoleMenuAuthorityType[], sub: UserRoleMenuAuthorityType[] | AdminRoleMenuAuthorityType[]) => {
  let main = temp
  sub.forEach((subItem) => {
    let idx = temp.findIndex((mainItem) => mainItem.menuNumber === subItem.parentsMenuNumber)
    main.splice(idx + 1, 0, subItem)
  })
  return main
}

export const makeRoutes = (nodes: UserRoleMenuAuthorityType[] | AdminRoleMenuAuthorityType[]) => {
  const groupData = _groupBy(nodes, 'parentsMenuNumber')

  const depth1 = groupData[1] || []
  const depth2 = []

  const result = []

  const isSubItems = Object.keys(groupData).length > 1

  const addSubItems = (item: UserRoleMenuAuthorityType | AdminRoleMenuAuthorityType) => {
    const subItems = groupData[item.menuNumber]

    if (!subItems) return

    item.cnt = subItems.length + 1
    item.childrenData = subItems.map(convertMenuNotation)
    if (item.parentsMenuNumber === 1) depth2.push(...subItems)
  }

  if (isSubItems) nodes.forEach(addSubItems)
  let obj = depth2.map(convertDept)
  result.push(...depth1.map(convertMenuNotation))
  return insertIndex(result, obj.reverse())
}
