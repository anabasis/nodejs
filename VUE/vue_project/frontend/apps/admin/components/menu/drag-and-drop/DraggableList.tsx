import { CSSProperties, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import { DraggableListItem } from './DraggableListItem'
import { IBasicInfoData } from '@type/menu/basicInfoData'
import { MenuDetailViewType, MenuItemViewType } from '@type/menu/menumanagement'
import { getCdnFileUrl, getCdnPreviewUrl } from 'library'
import Image from 'next/image'
import { Badge, Icons } from 'ui'
import { IMenuLocation } from '../menuManagement'
import { initialMenuLocation } from '@constant/menuManagement'
import { findIndex, isEqual } from 'lodash-es'

interface IDraggableListProps {
  isAdd: boolean
  basicInformation?: IBasicInfoData
  initialData: MenuItemViewType[]
  menuLocation: IMenuLocation
  setMenuLocation: Dispatch<SetStateAction<IMenuLocation>>
  menuDetail?: MenuDetailViewType
}

const getListStyle = (isDraggingOver): CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '10px 0px',
})

// 메뉴 가장 첫 아이템은 1 sortNum을 갖는다.
export const DraggableList = ({ isAdd, basicInformation, initialData, menuLocation, setMenuLocation, menuDetail }: IDraggableListProps) => {
  const [menuListData, setMenuListData] = useState<MenuItemViewType[]>([])
  const { menuDepth: selectedMenuDepth } = basicInformation

  const handleLocationChange = useCallback(
    ({ menuParentNum, parentIndex, menuSortNum }: { menuParentNum?: number; parentIndex?: number; menuSortNum: number }) => {
      const newMenuLocation: IMenuLocation = { menuParentNum: menuParentNum, menuSortNum: menuSortNum, parentIndex: parentIndex }
      setMenuLocation(newMenuLocation)
    },
    [setMenuLocation]
  )

  const addNewMenuItemToMenuList = (menuLocationProps: Partial<IMenuLocation>) => {
    // Depth가 1일때는 parentIndex가 존재하지 않는다 && menuParentNum는 1
    // menuSortNum은 1부터 시작한다. 하지만 여기에서는 index값 그대로 운용하고, 데이터를 back에 보내기 전에 +1을 해줄 예정
    const { menuParentNum, parentIndex, menuSortNum } = menuLocationProps
    const { icon, menuName, menuDepth } = basicInformation

    const newMenuItem: MenuItemViewType = {
      menuNum: 0,
      order: menuSortNum,
      depth: null,
      icon: getCdnPreviewUrl(icon.default) ? getCdnPreviewUrl(icon.default) : getCdnFileUrl(icon.default),
      menuName: [{ mnuNm: menuName, langCd: 'en' }],
      menuRoleMap: {
        A: [],
        B: [],
      },
      menuUpdateDate: '',
    }

    if (menuDepth === '1') {
      let menuList = JSON.parse(JSON.stringify(initialData))
      if (!isAdd) {
        const menuIndex = findIndex(menuList, ['menuNum', menuDetail.basicInfoRes.menuNum])
        if (menuList[menuIndex].childrenData?.length > 0) {
          newMenuItem.childrenData = [...menuList[menuIndex].childrenData]
        }
        menuList.splice(menuIndex, 1)
      }
      menuList.splice(menuSortNum, 0, newMenuItem)
      setMenuListData(menuList)
      handleLocationChange({ menuParentNum: 1, menuSortNum: menuSortNum })
    } else {
      let menuList = JSON.parse(JSON.stringify(initialData))
      if (!isAdd) {
        const parentIndex = findIndex(menuList, ['menuNum', menuDetail.basicInfoRes.menuParentNum])
        menuList[parentIndex].childrenData.splice(findIndex(menuList[parentIndex].childrenData, ['menuNum', menuDetail.basicInfoRes.menuNum]), 1)
      }

      if (menuList[parentIndex].childrenData && menuList[parentIndex].childrenData.length > 0) {
        menuList[parentIndex].childrenData.splice(menuSortNum, 0, newMenuItem)
      } else {
        menuList[parentIndex].childrenData = [newMenuItem]
      }
      setMenuListData(menuList)
      handleLocationChange({ menuParentNum: menuList[parentIndex].menuNum, parentIndex: parentIndex, menuSortNum: menuSortNum })
    }
  }

  const initMenuList = () => {
    const menuLocationProps: Partial<IMenuLocation> = selectedMenuDepth === '1' ? { menuParentNum: 1, menuSortNum: 0 } : { parentIndex: 0, menuSortNum: 0 }
    addNewMenuItemToMenuList(menuLocationProps)
  }

  const oneDepthReorder = (list, startIndex: number, endIndex: number) => {
    const result = [...list]
    const [removed] = result?.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const multiDepthReorder = (list, sourceParentMenuIndex, destinationParentMenuIndex, sourceIndex, destinationIndex) => {
    const result: MenuItemViewType[] = [...list]

    //source list에서 빼오고,
    const sourceList = result[sourceParentMenuIndex].childrenData
    const [removed] = sourceList?.splice(sourceIndex, 1)

    // 목적지에 children data list가 있으면 거기에 추가, 없으면 내가 children data list를 만들어준다.
    if (!!result[destinationParentMenuIndex].childrenData) {
      const destinationList = result[destinationParentMenuIndex].childrenData
      destinationList.splice(destinationIndex, 0, removed)
    } else {
      result[destinationParentMenuIndex]['childrenData'] = [removed]
    }

    if (result[sourceParentMenuIndex].childrenData?.length == 0) {
      const { childrenData, ...rest } = result[sourceParentMenuIndex]
      result[sourceParentMenuIndex] = rest
    }

    return result
  }

  const onDragEnd = useCallback(
    (result: DropResult) => {
      //type : draggable의 type (1 depth 일 때는, depth 1)
      const { destination, source, draggableId, type } = result
      const sourceData = source.droppableId.split('_')
      const destinationData = destination.droppableId.split('_')

      // 리스트 밖으로 drop되면 destination이 null
      if (!destination) return

      let items

      if (selectedMenuDepth === '1') {
        // 출발지와 도착지가 같으면 아무 액션도 취하지 않는다.
        if (source.index === destination.index) return

        handleLocationChange({ menuParentNum: 1, menuSortNum: destination?.index })
        items = oneDepthReorder(menuListData, source.index, destination.index)
      } else {
        const parentMenuSourceIndex = sourceData[sourceData.length - 1]
        const parentMenuDestinationIndex = destinationData[destinationData.length - 1]
        const menuSortNum = menuListData[parentMenuDestinationIndex]?.childrenData?.length > 0 ? destination?.index : 0

        // 출발지와 도착지가 같으면 아무 액션도 취하지 않는다.
        if (source.index === destination.index && parentMenuSourceIndex === parentMenuDestinationIndex) return

        handleLocationChange({
          menuParentNum: menuListData[parentMenuDestinationIndex]?.menuNum,
          menuSortNum: menuSortNum,
          parentIndex: parseInt(parentMenuDestinationIndex),
        })

        items = multiDepthReorder(menuListData, parentMenuSourceIndex, parentMenuDestinationIndex, source.index, destination.index)
      }
      setMenuListData(items)
    },
    [handleLocationChange, menuListData, selectedMenuDepth]
  )

  const moveMenuUpward = useCallback(() => {
    if (selectedMenuDepth === '1') {
      const menuCopy = oneDepthReorder(menuListData, menuLocation.menuSortNum, menuLocation.menuSortNum - 1)
      handleLocationChange({
        menuParentNum: 1,
        menuSortNum: menuLocation.menuSortNum - 1,
      })
      setMenuListData(menuCopy)
    } else {
      // Depth가 2일 때:
      // 다음 부모 메뉴로 넘어가야하는 경우
      // 1. 바로 위 부모 메뉴에 children 리스트가 존재한다면, 해당 리스트 최하위 element로 추가
      // 2. 바로 위 부모 메뉴에 children 리스트가 존재하지 않는다면, childrenData list 생성 후 추가
      if (menuLocation.menuSortNum == 0) {
        if (menuListData[menuLocation.parentIndex - 1].childrenData?.length > 0) {
          const menuCopy = multiDepthReorder(
            menuListData,
            menuLocation.parentIndex,
            menuLocation.parentIndex - 1,
            menuLocation.menuSortNum,
            menuListData[menuLocation.parentIndex - 1].childrenData?.length
          )
          handleLocationChange({
            menuParentNum: menuListData[menuLocation.parentIndex - 1].menuNum,
            menuSortNum: menuListData[menuLocation.parentIndex - 1].childrenData?.length - 1,
            parentIndex: menuLocation.parentIndex - 1,
          })
          setMenuListData(menuCopy)
        } else {
          const menuCopy = multiDepthReorder(menuListData, menuLocation.parentIndex, menuLocation.parentIndex - 1, menuLocation.menuSortNum, 0)
          handleLocationChange({
            menuParentNum: menuListData[menuLocation.parentIndex - 1].menuNum,
            menuSortNum: 0,
            parentIndex: menuLocation.parentIndex - 1,
          })
          setMenuListData(menuCopy)
        }
      } else {
        //  다음 부모 메뉴로 점프하지 않는 경우
        const menuCopy = multiDepthReorder(
          menuListData,
          menuLocation.parentIndex,
          menuLocation.parentIndex,
          menuLocation.menuSortNum,
          menuLocation.menuSortNum - 1
        )
        handleLocationChange({
          menuParentNum: menuListData[menuLocation.parentIndex].menuNum,
          menuSortNum: menuLocation.menuSortNum - 1,
          parentIndex: menuLocation.parentIndex,
        })
        setMenuListData(menuCopy)
      }
    }
  }, [handleLocationChange, menuListData, menuLocation.menuSortNum, menuLocation.parentIndex, selectedMenuDepth])

  const moveMenuDownward = useCallback(() => {
    if (selectedMenuDepth === '1') {
      const menuCopy = oneDepthReorder(menuListData, menuLocation.menuSortNum, menuLocation.menuSortNum + 1)
      handleLocationChange({
        menuParentNum: 1,
        menuSortNum: menuLocation.menuSortNum + 1,
      })
      setMenuListData(menuCopy)
    } else {
      // Depth가 2일 때:
      // 내 메뉴가 children 메뉴의 최하단에 있고, 다음 부모 메뉴로 넘어가야하는 경우
      // 1. 바로 아래 부모 메뉴에 children 리스트가 존재한다면, 해당 리스트 최상위 element로 추가
      // 2. 바로 아래 부모 메뉴에 children 리스트가 존재하지 않는다면, childrenData list 생성 후 추가
      if (menuLocation.menuSortNum == menuListData[menuLocation.parentIndex].childrenData.length - 1) {
        if (menuListData[menuLocation.parentIndex + 1].childrenData?.length > 0) {
          const menuCopy = multiDepthReorder(menuListData, menuLocation.parentIndex, menuLocation.parentIndex + 1, menuLocation.menuSortNum, 0)
          handleLocationChange({
            menuParentNum: menuListData[menuLocation.parentIndex + 1].menuNum,
            menuSortNum: 0,
            parentIndex: menuLocation.parentIndex + 1,
          })
          setMenuListData(menuCopy)
        } else {
          const menuCopy = multiDepthReorder(menuListData, menuLocation.parentIndex, menuLocation.parentIndex + 1, menuLocation.menuSortNum, 0)
          handleLocationChange({
            menuParentNum: menuListData[menuLocation.parentIndex + 1].menuNum,
            menuSortNum: 0,
            parentIndex: menuLocation.parentIndex + 1,
          })
          setMenuListData(menuCopy)
        }
      } else {
        //  다음 부모 메뉴로 점프하지 않는 경우
        const menuCopy = multiDepthReorder(
          menuListData,
          menuLocation.parentIndex,
          menuLocation.parentIndex,
          menuLocation.menuSortNum,
          menuLocation.menuSortNum + 1
        )
        handleLocationChange({
          menuParentNum: menuListData[menuLocation.parentIndex].menuNum,
          menuSortNum: menuLocation.menuSortNum + 1,
          parentIndex: menuLocation.parentIndex,
        })
        setMenuListData(menuCopy)
      }
    }
  }, [handleLocationChange, menuListData, menuLocation.menuSortNum, menuLocation.parentIndex, selectedMenuDepth])

  const moveMenuTop = useCallback(() => {
    if (selectedMenuDepth === '1') {
      const menuCopy = oneDepthReorder(menuListData, menuLocation.menuSortNum, 0)
      handleLocationChange({
        menuParentNum: 1,
        menuSortNum: 0,
      })
      setMenuListData(menuCopy)
    } else {
      const menuCopy = multiDepthReorder(menuListData, menuLocation.parentIndex, 0, menuLocation.menuSortNum, 0)
      handleLocationChange({
        menuParentNum: menuListData[0].menuNum,
        menuSortNum: 0,
        parentIndex: 0,
      })
      setMenuListData(menuCopy)
    }
  }, [handleLocationChange, menuListData, menuLocation.menuSortNum, menuLocation.parentIndex, selectedMenuDepth])

  const moveMenuLast = useCallback(() => {
    if (selectedMenuDepth === '1') {
      const menuCopy = oneDepthReorder(menuListData, menuLocation.menuSortNum, menuListData.length - 1)
      handleLocationChange({
        menuParentNum: 1,
        menuSortNum: menuListData.length - 1,
      })
      setMenuListData(menuCopy)
    } else {
      const menuCopy = multiDepthReorder(
        menuListData,
        menuLocation.parentIndex,
        menuListData.length - 1,
        menuLocation.menuSortNum,
        menuListData[menuListData.length - 1].childrenData ? menuListData[menuListData.length - 1].childrenData.length : 0
      )
      handleLocationChange({
        menuParentNum: menuListData[0].menuNum,
        menuSortNum: menuListData[menuListData.length - 1].childrenData ? menuListData[menuListData.length - 1].childrenData.length - 1 : 0,
        parentIndex: menuListData.length - 1,
      })
      setMenuListData(menuCopy)
    }
  }, [handleLocationChange, menuListData, menuLocation.menuSortNum, menuLocation.parentIndex, selectedMenuDepth])

  const drawListItems = useCallback(
    (list: MenuItemViewType[], depth: number, parentIndex?: number) => {
      // basicInformation.menuDepth 가 1이면 드래거블 아이템은 하나여야 한다.
      return (
        <>
          {list?.map((menu: MenuItemViewType, index: number) =>
            menu?.menuNum == 0 ? (
              // 여기서 단독 메뉴가 옮겨질 수 있는 메뉴인지 아닌지를 파악
              <DraggableListItem
                menu={menu}
                index={index}
                key={menu.menuNum}
                depth={depth}
                selectedItemDepth={parseInt(selectedMenuDepth)}
                isLast={parentIndex >= 0 ? menuListData.length - 1 == parentIndex && index == list.length - 1 : index == list.length - 1}
                isFirst={parentIndex >= 0 ? parentIndex == 0 && index == 0 : index == 0}
                moveMenuUpward={moveMenuUpward}
                moveMenuDownward={moveMenuDownward}
                moveMenuTop={moveMenuTop}
                moveMenuLast={moveMenuLast}
              >
                {menu.childrenData?.length > 0 && (
                  <div className="children_container" style={{ display: 'flex' }}>
                    {drawListItems(menu.childrenData, depth + 1, index)}
                  </div>
                )}
              </DraggableListItem>
            ) : (!menu?.childrenData || menu.childrenData?.length == 0) && parseInt(basicInformation.menuDepth) > depth ? (
              <Droppable droppableId={`depth_${depth}_${index}`} direction="vertical" type={`depth_${depth}`} key={menu.menuNum}>
                {(provided, snapshot) => (
                  <div className={'mt_8'} {...provided.droppableProps} ref={provided.innerRef}>
                    <DraggableListItem menu={menu} index={index} key={menu.menuNum} depth={depth} selectedItemDepth={parseInt(selectedMenuDepth)}>
                      <div className="children_container" style={{ display: snapshot.isDraggingOver ? 'flex' : 'none' }}>
                        {provided.placeholder}
                      </div>
                    </DraggableListItem>
                  </div>
                )}
              </Droppable>
            ) : parseInt(basicInformation.menuDepth) == depth ? (
              <DraggableListItem menu={menu} index={index} key={menu.menuNum} depth={depth} selectedItemDepth={parseInt(selectedMenuDepth)}>
                {(!!menu?.childrenData || menu?.childrenData?.length == 0) && (
                  <div className="children_container" style={{ display: 'flex' }}>
                    {drawListItems(menu.childrenData, depth + 1, index)}
                  </div>
                )}
              </DraggableListItem>
            ) : (!menu?.childrenData || menu.childrenData?.length == 0) && parseInt(basicInformation.menuDepth) < depth ? (
              <div className="row" key={menu.menuNum}>
                <div className="row_cell align" style={{ backgroundColor: menu.menuNum == 0 ? 'var(--blue10)' : 'white', padding: '0px 25px' }}>
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
                </div>
              </div>
            ) : (
              <Droppable droppableId={`depth_${depth}_${index}`} direction="vertical" type={`depth_${depth}`} key={menu.menuNum}>
                {(provided, snapshot) => (
                  <div className={'mt_8'} {...provided.droppableProps} ref={provided.innerRef}>
                    <DraggableListItem menu={menu} index={index} key={menu.menuNum} depth={depth} selectedItemDepth={parseInt(selectedMenuDepth)}>
                      <div className="children_container" style={{ display: menu.childrenData?.length != 0 || snapshot.isDraggingOver ? 'flex' : 'none' }}>
                        {drawListItems(menu.childrenData, depth + 1, index)}
                        {provided.placeholder}
                      </div>
                    </DraggableListItem>
                  </div>
                )}
              </Droppable>
            )
          )}
        </>
      )
    },
    [basicInformation.menuDepth, menuListData.length, moveMenuDownward, moveMenuLast, moveMenuTop, moveMenuUpward, selectedMenuDepth]
  )

  useEffect(() => {
    if (!!initialData) {
      initMenuList()
    }
  }, [initialData])

  useEffect(() => {
    if (menuListData.length != 0 && !!initialData) {
      //previous 버튼을 눌렀다가 다시 해당 페이지로 돌아왔을 시, 데이터 리셋
      setMenuListData(JSON.parse(JSON.stringify(initialData)))
    }

    if (!isEqual(menuLocation, initialMenuLocation)) {
      //authority setting page에서 해당 페이지로 돌아올 경우
      addNewMenuItemToMenuList(menuLocation)
    }
  }, [])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {parseInt(selectedMenuDepth) == 1 ? (
        <Droppable droppableId="droppable" direction={'vertical'}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {drawListItems(menuListData, 1)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : (
        <>{drawListItems(menuListData, 1)}</>
      )}
    </DragDropContext>
  )
}
