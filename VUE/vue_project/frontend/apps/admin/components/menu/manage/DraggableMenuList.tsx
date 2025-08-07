import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import { Dispatch, SetStateAction, MouseEvent } from 'react'
import { DraggableItem } from './DraggableItem'
import Image from 'next/image'
import { MenuItemType } from 'library'
import { Badge, Icons } from 'ui'

export default function DraggableMenuList({
  isGnb = false,
  selectedMenu,
  changeableMenuList,
  setChangeableMenuList,
  handleClick,
}: {
  isGnb: boolean
  selectedMenu: MenuItemType
  changeableMenuList: MenuItemType[]
  setChangeableMenuList: Dispatch<SetStateAction<MenuItemType[]>>
  handleClick: (event: MouseEvent<HTMLDivElement>, menu: MenuItemType) => void
}) {
  const oneDepthReorder = (startIndex: number, destinationIndex: number) => {
    let tempMenuList = [...changeableMenuList]

    const removedMenu = tempMenuList.splice(startIndex, 1)[0]
    tempMenuList.splice(destinationIndex, 0, removedMenu)

    return tempMenuList
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) return
    if (source.index == destination.index) return

    const tempMenuList = oneDepthReorder(source.index, destination.index)
    setChangeableMenuList(tempMenuList)
  }

  const drawChildrenMenus = (childMenu: MenuItemType) => {
    return (
      <div className="row" key={childMenu.mnuNum}>
        <div
          className="row_cell align"
          style={{ backgroundColor: childMenu.mnuNum == 0 ? 'var(--blue10)' : 'white', padding: '0px 25px' }}
          onClick={(event) => handleClick(event, childMenu)}
        >
          <div className="lft flex1">
            <div className="">
              {childMenu.mnuDpth == 1 && <Image src={childMenu.dftIcon} alt={'icon'} height={30} width={30} />}
              {childMenu.mnuDpth > 1 && <Icons.ReplyIcon width={24} height={24} fill="#C6CDDA" />}
            </div>
            <p className="mlr_10 body2">{childMenu.mnuName}</p>
            <Badge color={childMenu.mnuDpth == 1 ? 'blue' : 'gray'}>
              {childMenu.mnuDpth == 1 && `1st`}
              {childMenu.mnuDpth == 2 && `2nd`}
            </Badge>
          </div>
        </div>
      </div>
    )
  }

  const moveMenuUpward = (menu, index) => {
    const tempMenuList = oneDepthReorder(index, index - 1)
    setChangeableMenuList(tempMenuList)
  }

  const moveMenuDownward = (menu, index) => {
    const tempMenuList = oneDepthReorder(index, index + 1)
    setChangeableMenuList(tempMenuList)
  }

  const moveMenuTop = (menu, index) => {
    const tempMenuList = oneDepthReorder(index, 0)
    setChangeableMenuList(tempMenuList)
  }

  const moveMenuLast = (menu, index) => {
    const tempMenuList = oneDepthReorder(index, changeableMenuList.length - 1)
    setChangeableMenuList(tempMenuList)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction={'vertical'}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {changeableMenuList.map((menu: MenuItemType, index) => (
              <DraggableItem
                menu={menu}
                index={index}
                selectedMenu={selectedMenu}
                onClick={(event) => handleClick(event, menu)}
                key={menu.mnuNum}
                moveMenuUpward={moveMenuUpward}
                moveMenuDownward={moveMenuDownward}
                moveMenuTop={moveMenuTop}
                moveMenuLast={moveMenuLast}
                isLast={index == changeableMenuList.length - 1}
                isFirst={index == 0}
              >
                {menu.subNavs?.length > 0 && (
                  <div className="children_container" style={{ display: 'flex' }}>
                    {menu.subNavs.map((childMenu, index) => {
                      return drawChildrenMenus(childMenu)
                    })}
                  </div>
                )}
              </DraggableItem>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
