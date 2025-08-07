import { Dispatch, MouseEvent, SetStateAction } from 'react'
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import Image from 'next/image'
import { Badge } from 'ui'
import { MenuItemType } from 'library'
import { DraggableItem } from './DraggableItem'
import { findIndex } from 'lodash-es'

export default function TwoDepthDraggableMenuList({
  selectedMenu,
  changeableMenuList,
  setChangeableMenuList,
  handleClick,
}: {
  selectedMenu: MenuItemType
  changeableMenuList: MenuItemType[]
  setChangeableMenuList: Dispatch<SetStateAction<MenuItemType[]>>
  handleClick: (event: MouseEvent<HTMLDivElement>, menu: MenuItemType) => void
}) {
  const multiDepthReorder = (sourceParentMenuIndex, destinationParentMenuIndex, sourceIndex, destinationIndex) => {
    const result: MenuItemType[] = [...changeableMenuList]

    //source list에서 빼오고,
    const sourceList = result[sourceParentMenuIndex].subNavs
    const [removed] = sourceList?.splice(sourceIndex, 1)

    // 목적지에 children data list가 있으면 거기에 추가, 없으면 내가 children data list를 만들어준다.
    if (!!result[destinationParentMenuIndex]?.subNavs) {
      const destinationList = result[destinationParentMenuIndex].subNavs
      destinationList.splice(destinationIndex, 0, removed)
    } else {
      result[destinationParentMenuIndex].subNavs = [removed]
    }
    if (result[sourceParentMenuIndex].subNavs?.length == 0) {
      const { subNavs, ...rest } = result[sourceParentMenuIndex]
      result[sourceParentMenuIndex] = rest
    }

    return result
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result
    const sourceData = source.droppableId.split('_')
    const destinationData = destination?.droppableId.split('_')

    if (!destination) return

    let items

    const parentMenuSourceIndex = sourceData[sourceData.length - 1]
    const parentMenuDestinationIndex = destinationData[destinationData.length - 1]

    if (source.index === destination.index && parentMenuSourceIndex === parentMenuDestinationIndex) return

    items = multiDepthReorder(parentMenuSourceIndex, parentMenuDestinationIndex, source.index, destination.index)
    setChangeableMenuList(items)
  }

  const getParentMenuIndex = (menuNum: number, menuIndex: number): number => {
    return findIndex(changeableMenuList, (temp) => {
      if (!!temp.subNavs) {
        return temp.subNavs[menuIndex]?.mnuNum == menuNum
      }
      return
    })
  }

  const moveMenuUpward = (menu: MenuItemType, menuSourceIndex) => {
    const parentMenuIndex = getParentMenuIndex(menu.mnuNum, menuSourceIndex)
    const destinationParentMenuIndex = menuSourceIndex != 0 ? parentMenuIndex : parentMenuIndex - 1
    const menuDestinationIndex =
      menuSourceIndex > 0 ? menuSourceIndex - 1 : changeableMenuList[parentMenuIndex - 1]?.subNavs ? changeableMenuList[parentMenuIndex - 1].subNavs.length : 0
    const tempMenuList = multiDepthReorder(parentMenuIndex, destinationParentMenuIndex, menuSourceIndex, menuDestinationIndex)

    setChangeableMenuList(tempMenuList)
  }

  const moveMenuDownward = (menu: MenuItemType, menuSourceIndex: number) => {
    const parentMenuIndex = getParentMenuIndex(menu.mnuNum, menuSourceIndex)
    const destinationParentMenuIndex = menuSourceIndex != changeableMenuList[parentMenuIndex].subNavs.length - 1 ? parentMenuIndex : parentMenuIndex + 1
    const menuDestinationIndex = menuSourceIndex != changeableMenuList[parentMenuIndex].subNavs.length - 1 ? menuSourceIndex + 1 : 0
    const tempMenuList = multiDepthReorder(parentMenuIndex, destinationParentMenuIndex, menuSourceIndex, menuDestinationIndex)

    setChangeableMenuList(tempMenuList)
  }

  const moveMenuTop = (menu: MenuItemType, menuSourceIndex: number) => {
    const parentMenuIndex = getParentMenuIndex(menu.mnuNum, menuSourceIndex)
    const tempMenuList = multiDepthReorder(parentMenuIndex, 0, menuSourceIndex, 0)

    setChangeableMenuList(tempMenuList)
  }

  const moveMenuLast = (menu: MenuItemType, menuSourceIndex: number) => {
    const parentMenuIndex = getParentMenuIndex(menu.mnuNum, menuSourceIndex)
    const tempMenuList = multiDepthReorder(
      parentMenuIndex,
      changeableMenuList?.length - 1,
      menuSourceIndex,
      changeableMenuList[changeableMenuList?.length - 1].subNavs ? changeableMenuList[changeableMenuList.length - 1].subNavs.length : 0
    )

    setChangeableMenuList(tempMenuList)
  }

  const drawMenus = (menu: MenuItemType, index: number) => {
    return (
      <Droppable droppableId={`depth_${menu.mnuDpth}_${index}`} direction="vertical" type={`depth_${menu.mnuDpth}`} key={menu.mnuNum}>
        {(provided, snapshot) => {
          return (
            <div className={'mt_8'} {...provided.droppableProps} ref={provided.innerRef}>
              <div className="row" key={menu.mnuNum}>
                <div
                  className="row_cell align"
                  style={{ backgroundColor: menu.mnuNum == 0 ? 'var(--blue10)' : 'white', padding: '0px 25px' }}
                  onClick={(event) => handleClick(event, menu)}
                >
                  <div className="lft flex1">
                    <div className="">
                      <Image src={menu.dftIcon} alt={'icon'} height={30} width={30} />
                    </div>
                    <p className="mlr_10 body2">{menu.mnuName}</p>
                    <Badge>{`1st`}</Badge>
                  </div>
                </div>
                <div
                  className="children_container"
                  style={{ display: (menu.subNavs && menu.subNavs.length != 0) || snapshot.isDraggingOver ? 'flex' : 'none' }}
                >
                  {menu.subNavs?.map((childMenu, childIndex) => (
                    <DraggableItem
                      menu={childMenu}
                      index={childIndex}
                      selectedMenu={selectedMenu}
                      onClick={(event) => handleClick(event, childMenu)}
                      key={childMenu.mnuNum}
                      moveMenuUpward={moveMenuUpward}
                      moveMenuDownward={moveMenuDownward}
                      moveMenuTop={moveMenuTop}
                      moveMenuLast={moveMenuLast}
                      isLast={
                        index >= 0 ? changeableMenuList.length - 1 == index && childIndex == menu.subNavs?.length - 1 : childIndex == menu.subNavs?.length - 1
                      }
                      isFirst={index >= 0 ? index == 0 && childIndex == 0 : childIndex == 0}
                    ></DraggableItem>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            </div>
          )
        }}
      </Droppable>
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <>{changeableMenuList.map((menu: MenuItemType, index) => drawMenus(menu, index))}</>
    </DragDropContext>
  )
}
