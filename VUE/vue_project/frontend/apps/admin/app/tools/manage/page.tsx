'use client'

import { Breadcrumb, ButtonMui, ContentBox, ContentBoxWrap, Icons } from 'ui'
import { DragDropContext, DropResult, Droppable, Draggable } from '@hello-pangea/dnd'
import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isEqual, findIndex, inRange } from 'lodash-es'
import { useToolListQuery, useToolMutate } from '@store/server/useToolQuery'
import { initialFilterParam, pageTitle } from '@constant/toolManagement'
import { ITool } from '@type/tools/toolType'
import { AlertType, getCdnFileUrl, useAlert } from 'library'
import Image from 'next/image'

const pageTitleList = pageTitle['manage']

const getListStyle = (): CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '10px 0px',
})

const getItemStyle = (isDragging, draggableStyle, isSelected) => {
  const baseStyle = {
    backgroundColor: isSelected ? 'var(--blue10)' : 'white',
    height: '66px',
    padding: '0px 25px 0px 25px',
  }

  const isDraggingStyle = {
    backgroundColor: 'var(--blue10)',
    border: '1px solid var(--blue100)',
    borderRadius: '8px',
  }

  return {
    ...draggableStyle,
    ...(isDragging ? isDraggingStyle : {}),
    ...baseStyle,
  }
}

export default function ToolsArchiSettingPage() {
  const router = useRouter()
  const { manageToolMutate, isManageToolLoading } = useToolMutate()
  const { data: originalToolList, isFetched, refetch } = useToolListQuery(initialFilterParam)
  const { alertOpen, alertClose } = useAlert()

  const [isArchiModified, setIsArchiModified] = useState<boolean>(false)
  const [toolList, setToolList] = useState<ITool[]>(originalToolList)
  const [selectedToolId, setSelectedToolId] = useState('')

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId, type } = result

      // 리스트 밖으로 drop되면 destination이 null
      if (!destination) return
      // 출발지와 도착지가 같으면 할 게 없다
      if (source.index === destination.index) return

      changeToolOrder(toolList, source.index, destination.index)
    },
    [toolList]
  )

  const changeToolOrder = (toolList, startIndex, endIndex) => {
    const newToolOrder = reorder(toolList, startIndex, endIndex)
    setToolList(newToolOrder)
  }

  const handleRowClick = (selectedToolId: string) => {
    setSelectedToolId(selectedToolId)
  }

  const drawListItems = () => {
    return (
      <>
        {toolList?.map((tool, index) => (
          <Draggable draggableId={`${tool.toolNum}`} index={index} key={`${tool.toolNum}`}>
            {(provided, snapshot) => (
              <div
                className={`row ${tool.toolNum.toString() === selectedToolId ? 'selected' : 'bg_white'}`}
                {...provided.draggableProps}
                ref={provided.innerRef}
                onClick={() => handleRowClick(tool.toolNum.toString())}
                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, tool.toolNum.toString() === selectedToolId)}
              >
                <div className="row_cell align" style={{ backgroundColor: tool.toolNum.toString() === selectedToolId ? 'var(--blue10)' : 'white' }}>
                  <div className="lft flex1">
                    <div className="bg_icon_box square small gray">
                      <Image src={getCdnFileUrl(tool.fileInfoResponse)} alt={'icon'} height={30} width={30} />
                    </div>
                    <p className="mlr_10 body2">{tool.toolName}</p>
                  </div>

                  <div className="rgt" style={{ visibility: tool.toolNum.toString() !== selectedToolId ? 'hidden' : 'visible' }}>
                    <div className="align start gap_8">
                      <button className="drag_btn" disabled={index == 0 ? true : false} onClick={() => changeToolOrder(toolList, index, 0)}>
                        <Icons.ArrowRootUp width={20} height={20} fill={index == 0 ? 'var(--navy100)' : 'var(--navy800)'} />
                        <span className="hidden">맨위로</span>
                      </button>
                      <button className="drag_btn" disabled={index == 0 ? true : false} onClick={() => changeToolOrder(toolList, index, index - 1)}>
                        <Icons.ArrowUp width={20} height={20} fill={index == 0 ? 'var(--navy100)' : 'var(--navy800)'} />
                        <span className="hidden">위로</span>
                      </button>
                      <button
                        className="drag_btn"
                        disabled={toolList.length - 1 == index ? true : false}
                        onClick={() => changeToolOrder(toolList, index, index + 1)}
                      >
                        <Icons.ArrowDown width={20} height={20} fill={toolList.length - 1 == index ? 'var(--navy100)' : 'var(--navy800)'} />
                        <span className="hidden">밑으로</span>
                      </button>
                      <button
                        className="drag_btn"
                        disabled={toolList.length - 1 == index ? true : false}
                        onClick={() => changeToolOrder(toolList, index, toolList.length - 1)}
                      >
                        <Icons.ArrowRootDown width={20} height={20} fill={toolList.length - 1 == index ? 'var(--navy100)' : 'var(--navy800)'} />
                        <span className="hidden">맨밑으로</span>
                      </button>
                      <div className={`pl_20 align center `} {...provided.dragHandleProps}>
                        <button className="drag_btn move">
                          <Icons.MenuIcon width={28} height={28} fill="var(--navy600)" />
                          <span className="hidden">드래그</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Draggable>
        ))}
      </>
    )
  }

  const handleCancel = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.replace('/tools')}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  const handleSubmit = () => {
    // 성공 -> 성공 toast popup 후 tools 화면으로 redirect
    const postData = toolList.map((tool, index) => ({ toolNum: tool.toolNum, toolOrder: index }))
    manageToolMutate(postData, { onSuccess: () => router.push('/tools/') })
  }

  useEffect(() => {
    setIsArchiModified(isEqual(originalToolList, toolList))
  }, [toolList])

  useEffect(() => {
    setToolList(originalToolList)
  }, [isFetched])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Tool Management</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBoxWrap>
        <ContentBox>
          <div className="divtable table_content">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction={'vertical'}>
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle()}>
                    {drawListItems()}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="cont_bottom_box">
            <div className="align end">
              <ButtonMui type="outlined" size="xlarge" onClick={handleCancel}>
                Cancel
              </ButtonMui>
              <ButtonMui type="contained" size="xlarge" disabled={isArchiModified} onClick={handleSubmit} isLoading={isManageToolLoading}>
                Save
              </ButtonMui>
            </div>
          </div>
        </ContentBox>
      </ContentBoxWrap>
    </>
  )
}
