'use client'

import { useToolList } from '@store/server/useDashboardQuery'
import { BookmarkToolType } from '@type/dashboard/dashboardType'
import { Icons, TextToggle } from 'ui/index'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { DragChip } from './DragChip'
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DndContext, DragOverlay, PointerSensor, pointerWithin, useSensor, useSensors } from '@dnd-kit/core'

export const FavoriteTool = ({
  setBookmarkToolList,
  bookmarkToolList,
}: {
  setBookmarkToolList: Dispatch<
    SetStateAction<
      {
        toolId: number
        toolName: string
        favTp: string
      }[]
    >
  >
  bookmarkToolList: {
    toolId: number
    toolName: string
    favTp: string
  }[]
}) => {
  const [isDrag, setDrag] = useState(false)
  const { data: toolList } = useToolList()
  const [activeId, setActiveId] = useState(null)

  // 드래그존 chip 삭제 이벤트
  const onDelete = useCallback(
    (toolId) => {
      setBookmarkToolList((prev) => {
        return prev.filter((item) => item.toolId !== toolId)
      })
    },
    [setBookmarkToolList]
  )

  const handleTools = useCallback(
    (toolItem: BookmarkToolType) => {
      if (bookmarkToolList.find((item) => item.toolId === toolItem.toolId) === undefined) {
        setBookmarkToolList((prev) => prev.concat([{ favTp: 'TOL', toolId: toolItem.toolId, toolName: toolItem.toolName }]))
      }
    },
    [bookmarkToolList, setBookmarkToolList]
  )

  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragOver = (event) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setBookmarkToolList((items) => {
        const oldIndex = items.findIndex((tool) => tool.toolId === active.id)
        const newIndex = items.findIndex((tool) => tool.toolId === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = () => {
    setActiveId(null)
  }

  const disableSortingStrategy = () => {
    return null
  }

  return (
    <>
      <div className="bg_box">
        <p className="title2">Favorite tools</p>
        <div className="mt_20 align start wrap gap_10">
          <DndContext
            sensors={sensors}
            collisionDetection={pointerWithin}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragEnd}
          >
            <SortableContext items={bookmarkToolList.map((item) => item.toolId)}>
              {bookmarkToolList.map((item) => (
                <SortableItem id={item.toolId} key={item.toolId} onClick={() => onDelete(item.toolId)}>
                  {item.toolName}
                </SortableItem>
              ))}
            </SortableContext>
            <DragOverlay>{activeId ? <DragChip>{bookmarkToolList.find((item) => item.toolId === activeId).toolName}</DragChip> : null}</DragOverlay>
            {new Array(4 - bookmarkToolList.length).fill(0).map((item, index) => (
              <div key={`tool-${index}`} className="b_dashed w23 bc_navy200 round8 h46 bg_second100" />
            ))}
          </DndContext>
        </div>
      </div>
      <div className="mt_20 pd_20">
        <p className="title2">All Tools</p>
        <div className="align start gap_10 wrap mt_20">
          {toolList?.map((item) => (
            <TextToggle
              key={`${item.toolId}`}
              id={`${item.toolId}`}
              value={false}
              onChange={() => {
                handleTools(item)
              }}
              disabled={bookmarkToolList.find((target) => target.toolId === item.toolId) !== undefined || bookmarkToolList.length >= 4}
            >
              <Icons.PlusIcon
                width={16}
                height={16}
                fill={bookmarkToolList.find((target) => target.toolId === item.toolId) !== undefined ? 'var(--navy200)' : 'var(--navy800)'}
              />
              <span className="ml_4">{item.toolName}</span>
            </TextToggle>
          ))}
        </div>
      </div>
    </>
  )
}

export const SortableItem = ({ id, children, onClick }: { id: number | string; children?: React.ReactNode; onClick?: () => void }) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({ id })

  const style: React.CSSProperties = {
    display: 'inline-block',
    position: 'relative',
    opacity: isDragging ? 0.5 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <DragChip
      ref={setNodeRef}
      listeners={listeners}
      dragging={isDragging}
      handleProps={{
        ref: setActivatorNodeRef,
      }}
      style={style}
      onClick={onClick}
    >
      {children}
    </DragChip>
  )
}
