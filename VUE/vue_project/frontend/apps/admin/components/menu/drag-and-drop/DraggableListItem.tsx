import Image from 'next/image'
import { Draggable } from '@hello-pangea/dnd'
import { Badge, ButtonMui, Icons } from 'ui'
import { ReactNode } from 'react'
import { MenuItemViewType } from '@type/menu/menumanagement'

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
  menu: MenuItemViewType
  index: number
  children?: ReactNode
  depth: number
  selectedItemDepth: number
  isLast?: boolean
  isFirst?: boolean
  moveMenuUpward?: () => void
  moveMenuDownward?: () => void
  moveMenuTop?: () => void
  moveMenuLast?: () => void
}

export const DraggableListItem = ({
  menu,
  index,
  children,
  depth,
  selectedItemDepth,
  isLast,
  isFirst,
  moveMenuUpward,
  moveMenuDownward,
  moveMenuTop,
  moveMenuLast,
}: IListItem) => {
  return (
    <Draggable draggableId={`${menu.menuNum}_${index}`} index={index} key={`${menu.menuNum}_${index}`}>
      {(provided, snapshot) => (
        <div
          className={`row ${menu.menuNum == 0 ? 'selected' : 'bg_white'}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, menu.menuNum == 0, selectedItemDepth == depth)}
        >
          {/*   */}
          <div className={`row_cell align`} style={{ backgroundColor: menu.menuNum == 0 ? 'var(--blue10)' : 'white', padding: '0px 25px' }}>
            {/* image 대신 temporary로 아래 적용함 */}
            <div className="lft flex1">
              <div className="">
                {depth == 1 && <Image src={menu.icon} alt={'icon'} height={30} width={30} />}
                {depth > 1 && <Icons.ReplyIcon width={24} height={24} fill="#C6CDDA" />}
              </div>
              <p className="mlr_10 body2">{menu.menuName.find((menuNm) => menuNm.langCd === 'en').mnuNm}</p>
              <Badge color={depth == 1 ? 'blue' : 'gray'}>
                {depth == 1 && `1st`}
                {depth == 2 && `2nd`}
              </Badge>
            </div>
            <div className="rgt" style={{ visibility: menu.menuNum != 0 ? 'hidden' : 'visible' }}>
              <div className="align start gap_8">
                <button className="drag_btn" disabled={isFirst} onClick={moveMenuTop}>
                  <Icons.ArrowRootUp width={20} height={20} fill={isFirst ? 'var(--navy100)' : 'var(--navy800)'} />
                  <span className="hidden">맨위로</span>
                </button>
                <button className="drag_btn" disabled={isFirst} onClick={moveMenuUpward}>
                  <Icons.ArrowUp width={20} height={20} fill={isFirst ? 'var(--navy100)' : 'var(--navy800)'} />
                  <span className="hidden">위로</span>
                </button>
                <button className="drag_btn" disabled={isLast} onClick={moveMenuDownward}>
                  <Icons.ArrowDown width={20} height={20} fill={isLast ? 'var(--navy100)' : 'var(--navy800)'} />
                  <span className="hidden">밑으로</span>
                </button>
                <button className="drag_btn" disabled={isLast} onClick={moveMenuLast}>
                  <Icons.ArrowRootDown width={20} height={20} fill={isLast ? 'var(--navy100)' : 'var(--navy800)'} />
                  <span className="hidden">맨밑으로</span>
                </button>
                <div className={` ${depth > 0 ? 'pl_20' : 'pl_34'} align center `} {...provided.dragHandleProps}>
                  <button className="drag_btn move">
                    <Icons.MenuIcon width={28} height={28} fill="var(--navy600)" />
                    <span className="hidden">드래그</span>
                  </button>
                </div>
              </div>
              {/* <ButtonMui type="outlined" color="gray" size="xsmall" icon="ArrowRootUp" disabled={isFirst} onClick={moveMenuTop} />
              <ButtonMui type="outlined" color="gray" size="xsmall" icon="ArrowUp" disabled={isFirst} onClick={moveMenuUpward} />
              <ButtonMui type="outlined" color="gray" size="xsmall" icon="ArrowDown" disabled={isLast} onClick={moveMenuDownward} />
              <ButtonMui type="outlined" color="gray" size="xsmall" icon="ArrowRootDown" disabled={isLast} onClick={moveMenuLast} />
              <div className={` ${depth > 0 ? 'grid1' : 'grid1_2'} align center`} {...provided.dragHandleProps}>
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
