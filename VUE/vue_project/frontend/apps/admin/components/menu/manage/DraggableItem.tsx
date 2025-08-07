import Image from 'next/image'
import { Draggable } from '@hello-pangea/dnd'
import { Badge, ButtonMui, Icons } from 'ui'
import { MouseEvent, ReactNode, useEffect } from 'react'
import { ManageMenuType } from '@type/menu/menumanagement'
import { MenuItemType, getCdnFileUrl } from 'library'

const getItemStyle = (isDragging, draggableStyle, isSelected, isSelectedMenuInSameDepth) => {
  const baseStyle = {
    backgroundColor: isSelected ? 'var(--blue10)' : 'white',
  }

  const isDraggingStyle = {
    backgroundColor: 'var(--blue10)',
    border: '1px solid var(--blue100)',
    borderRadius: '8px',
  }

  return {
    ...draggableStyle,
    ...(isDragging ? isDraggingStyle : isSelectedMenuInSameDepth ? {} : { transform: null }),
    ...baseStyle,
  }
}

interface IListItem {
  menu: MenuItemType
  index: number
  selectedMenu: MenuItemType
  children?: ReactNode
  isLast?: boolean
  isFirst?: boolean
  onClick: (event: MouseEvent<HTMLDivElement>, menu: MenuItemType) => void
  moveMenuUpward?: (menu: MenuItemType, index: number) => void
  moveMenuDownward?: (menu: MenuItemType, index: number) => void
  moveMenuTop?: (menu: MenuItemType, index: number) => void
  moveMenuLast?: (menu: MenuItemType, index: number) => void
}

export const DraggableItem = ({
  menu,
  index,
  selectedMenu,
  children,
  isLast,
  isFirst,
  onClick,
  moveMenuUpward,
  moveMenuDownward,
  moveMenuTop,
  moveMenuLast,
}: IListItem) => {
  return (
    <Draggable draggableId={`${menu.mnuNum}_${index}`} index={index} key={`${menu.mnuNum}_${index}`}>
      {(provided, snapshot) => (
        <div
          className={`row ${menu.mnuNum == selectedMenu.mnuNum ? 'selected' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, menu.mnuNum == 0, selectedMenu?.mnuDpth === menu.mnuDpth)}
        >
          <div
            className={`row_cell align ${menu.mnuNum == selectedMenu.mnuNum ? 'selected' : 'white'}`}
            style={{ padding: '0px 25px' }}
            onClick={(event) => onClick(event, menu)}
          >
            {/* image 대신 temporary로 아래 적용함 */}
            <div className="lft flex1">
              <div className="">
                {menu.mnuDpth == 1 && <Image src={menu.dftIcon} alt={'icon'} height={30} width={30} />}
                {menu.mnuDpth > 1 && <Icons.ReplyIcon width={24} height={24} fill="#C6CDDA" />}
              </div>
              <p className="mlr_10 body2">{menu.mnuName}</p>
              <Badge color={menu.mnuDpth == 1 ? 'blue' : 'gray'}>
                {menu.mnuDpth == 1 && `1st`}
                {menu.mnuDpth == 2 && `2nd`}
              </Badge>
            </div>
            <div className="rgt" style={{ visibility: menu.mnuNum != selectedMenu.mnuNum ? 'hidden' : 'visible' }}>
              <div className="align start gap_8">
                <button className="drag_btn" disabled={isFirst} onClick={() => moveMenuTop(menu, index)}>
                  <Icons.ArrowRootUp width={20} height={20} fill={isFirst ? 'var(--navy100)' : 'var(--navy800)'} />
                  <span className="hidden">맨위로</span>
                </button>
                <button className="drag_btn" disabled={isFirst} onClick={() => moveMenuUpward(menu, index)}>
                  <Icons.ArrowUp width={20} height={20} fill={isFirst ? 'var(--navy100)' : 'var(--navy800)'} />
                  <span className="hidden">위로</span>
                </button>
                <button className="drag_btn" disabled={isLast} onClick={() => moveMenuDownward(menu, index)}>
                  <Icons.ArrowDown width={20} height={20} fill={isLast ? 'var(--navy100)' : 'var(--navy800)'} />
                  <span className="hidden">밑으로</span>
                </button>
                <button className="drag_btn" disabled={isLast} onClick={() => moveMenuLast(menu, index)}>
                  <Icons.ArrowRootDown width={20} height={20} fill={isLast ? 'var(--navy100)' : 'var(--navy800)'} />
                  <span className="hidden">맨밑으로</span>
                </button>
                <div className={` ${menu.mnuDpth > 0 ? 'pl_20' : 'pl_34'} align center `} {...provided.dragHandleProps}>
                  <button className="drag_btn move">
                    <Icons.MenuIcon width={28} height={28} fill="var(--navy600)" />
                    <span className="hidden">드래그</span>
                  </button>
                </div>
              </div>

              {/* <ButtonMui type="outlined" color="gray" size="xsmall" icon="ArrowRootUp" disabled={isFirst} onClick={() => moveMenuTop(menu, index)} />
              <ButtonMui type="outlined" color="gray" size="xsmall" icon="ArrowUp" disabled={isFirst} onClick={() => moveMenuUpward(menu, index)} />
              <ButtonMui type="outlined" color="gray" size="xsmall" icon="ArrowDown" disabled={isLast} onClick={() => moveMenuDownward(menu, index)} />
              <ButtonMui type="outlined" color="gray" size="xsmall" icon="ArrowRootDown" disabled={isLast} onClick={() => moveMenuLast(menu, index)} />
              <div className={` ${menu.mnuDpth > 0 ? 'grid1' : 'grid1_2'} align center`} {...provided.dragHandleProps}>
                <ButtonMui type="contained" color="white" size="xsmall" icon="MenuIcon" iconStyle={{ fill: 'black' }} />
              </div> */}
            </div>
          </div>
          {children && children}
        </div>
      )}
    </Draggable>
  )
}
