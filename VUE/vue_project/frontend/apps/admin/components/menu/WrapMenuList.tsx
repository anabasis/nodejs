import { useState, useEffect, ChangeEvent } from 'react'
import { BaseTab, ContentBox, InputLabel, TooltipHover, RadioBox, SelectMui } from 'ui'
import { MenuItemViewType, MenuListViewType } from '@type/menu/menumanagement'
import { DivTable } from '@components/menu/divTable'
import { IAdminRole, IUserRole, IUserRoleDropDownList } from '@type/menu/menuTypes'
import { isEqual, map } from 'lodash-es'
import { useMenuMutate } from '@store/server/useMenuQuery'
import { ColumnData } from '@constant/menuManagement'
import { getFilteredLnbMenuList } from '@util/menumanagement'
// import { currentTabIndexAtom } from '@store/client/menu'
// import { useAtom } from 'jotai'

// const TabData = [{ tabName: 'GNB' }, { tabName: 'LNB' }]

export default function WrapMenuList({
  isAdmin,
  dataList,
  dropdownOptions,
  refetch,
  currentTabIndex,
}: {
  isAdmin: boolean
  dataList: MenuListViewType
  currentTabIndex: number
  dropdownOptions: IUserRoleDropDownList | IAdminRole[]
  refetch
}) {
  const toolTipJSX = (
    <TooltipHover placements="top-start">
      <p>In the case of View All, you can view all without distinction of role. In the case of view by role, you can only check the menu for that role.</p>
    </TooltipHover>
  )

  const [menuList, setMenuList] = useState<MenuListViewType>(dataList)
  // const [currentTabIndex, setCurrentTabIndex] = useAtom(currentTabIndexAtom)
  const [radioBtnSelectedValue, setRadioBtnSelectedValue] = useState<string>('')
  const [selectBoxState, setSelectBoxState] = useState<boolean>(true)
  const [selectBoxValue, setSelectBoxValue] = useState<string>('')
  const { deleteMenuMutate } = useMenuMutate()

  const RadioButtons = () => {
    let modifiedList = []
    const groupKeyList = [
      { name: 'Level A', value: 'A', key: 'group_title' },
      { name: 'Level B', value: 'B', key: 'group_title' },
    ]

    if (isAdmin) {
      modifiedList = map(dropdownOptions as IAdminRole[], (item: IAdminRole) => ({ name: item.admRolNm, value: item.admRolNum }))
    } else {
      // 셀렉트박스 형태 하드코딩 -> 추후 수정
      if (dropdownOptions) {
        const { levelA, levelB } = dropdownOptions as IUserRoleDropDownList
        modifiedList = map([...levelA, ...levelB], (item: IUserRole) => ({ name: item.name, value: item.id.toString() }))
        modifiedList.splice(0, 0, groupKeyList[0])
        modifiedList.splice(levelA.length + 1, 0, groupKeyList[1])
        modifiedList.splice(levelA.length + 1, 0, { name: 'hr', value: 'hr', key: 'hr' })
      }
    }

    const handleRadioButtonCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
      setRadioBtnSelectedValue(event.target.value)
      setSelectBoxState(radioBtnSelectedValue === 'role')
      if (event.target.value === 'all') {
        refetch
        setMenuList(dataList)
        setSelectBoxValue('')
      }
    }

    const controlProps = (item: string, itemLabel: string) => ({
      checked: radioBtnSelectedValue === item,
      onChange: handleRadioButtonCheckChange,
      value: item,
      id: item,
      text: itemLabel,
      name: 'view-types',
    })

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const selectedRoleNum = e.target.value
      const newFilteredLnb: MenuItemViewType[] = await getFilteredLnbMenuList(isAdmin, selectedRoleNum)
      setMenuList((prev) => ({ ...prev, lnbList: newFilteredLnb }))
      setSelectBoxValue(selectedRoleNum)
    }

    return (
      <>
        <div className="item">
          <RadioBox {...controlProps('all', 'View all')} />
        </div>
        <div className="item">
          <RadioBox {...controlProps('role', 'View by role')} />
        </div>
        <div className="item">
          {isAdmin ? (
            <SelectMui
              optionType={'default'}
              value={selectBoxValue}
              onChange={handleChange}
              options={modifiedList}
              placeholder={'Select'}
              disabled={selectBoxState}
            />
          ) : (
            <SelectMui
              optionType={'group'}
              value={selectBoxValue}
              onChange={handleChange}
              options={modifiedList}
              placeholder={'Select'}
              disabled={selectBoxState}
            />
          )}
        </div>
      </>
    )
  }

  const deleteMenu = (menuNum: number) => {
    deleteMenuMutate(menuNum)
  }

  useEffect(() => {
    setRadioBtnSelectedValue('all')
  }, [])

  useEffect(() => {
    setRadioBtnSelectedValue('all')
    setSelectBoxState(true)
    setSelectBoxValue('')
  }, [currentTabIndex])

  useEffect(() => {
    if (!isEqual(menuList, dataList)) {
      setMenuList(dataList)
    }
  }, [dataList])

  return (
    <>
      {/* <BaseTab tabData={TabData} onChange={handleTabChange} value={currentTabIndex} /> */}
      <ContentBox>
        {currentTabIndex === 1 && (
          <div className="align start mb_20">
            <div className="grid2 mr_10">
              <InputLabel labelText={'View Type'} required>
                {toolTipJSX}
              </InputLabel>
            </div>
            <RadioButtons />
          </div>
        )}
        <DivTable
          deleteMenu={deleteMenu}
          isAdmin={isAdmin}
          dataList={currentTabIndex === 0 ? menuList?.gnbList : menuList?.lnbList}
          columnPropertyList={Object.values(currentTabIndex === 0 ? ColumnData.gnb : ColumnData.lnb)}
          columnKeyList={Object.keys(currentTabIndex === 0 ? ColumnData.gnb : ColumnData.lnb)}
        />
      </ContentBox>
    </>
  )
}
