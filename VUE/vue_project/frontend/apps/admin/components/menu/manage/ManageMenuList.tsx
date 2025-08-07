import { Dispatch, MouseEvent, useEffect, useState, SetStateAction } from 'react'
import DraggableMenuList from './DraggableMenuList'
import DefaultMenuList from './DefaultMenuList'
import TwoDepthDraggableMenuList from './TwoDepthDraggableMenuList'
import { MenuItemType } from 'library/util/menu'

export default function ManageMenuList({
  changeableGnb,
  changeableLnb,
  setChangeableGnb,
  setChangeableLnb,
  currentTab,
}: {
  changeableGnb: MenuItemType[]
  changeableLnb: MenuItemType[]
  setChangeableGnb: Dispatch<SetStateAction<MenuItemType[]>>
  setChangeableLnb: Dispatch<SetStateAction<MenuItemType[]>>
  currentTab: 'gnb' | 'lnb'
}) {
  const [selectedMenu, setSelectedMenu] = useState<MenuItemType>()

  const resetSelectedMenu = () => {
    setSelectedMenu(null)
  }

  const handleClick = (event: MouseEvent<HTMLDivElement>, menu: MenuItemType) => {
    if (menu.mnuDpth == 2) {
      event.stopPropagation()
    }

    setSelectedMenu(menu)
  }

  useEffect(() => {
    resetSelectedMenu()
  }, [currentTab])

  return (
    <>
      {selectedMenu ? (
        selectedMenu.mnuDpth == 1 ? (
          <DraggableMenuList
            isGnb={currentTab === 'gnb'}
            selectedMenu={selectedMenu}
            changeableMenuList={currentTab === 'gnb' ? changeableGnb : changeableLnb}
            setChangeableMenuList={currentTab === 'gnb' ? setChangeableGnb : setChangeableLnb}
            handleClick={handleClick}
          />
        ) : (
          <TwoDepthDraggableMenuList
            selectedMenu={selectedMenu}
            changeableMenuList={currentTab === 'gnb' ? changeableGnb : changeableLnb}
            setChangeableMenuList={currentTab === 'gnb' ? setChangeableGnb : setChangeableLnb}
            handleClick={handleClick}
          />
        )
      ) : (
        <DefaultMenuList changeableMenuList={currentTab === 'gnb' ? changeableGnb : changeableLnb} handleClick={handleClick} />
      )}
    </>
  )
}
