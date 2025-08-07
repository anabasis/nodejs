'use client'
import { useState, startTransition, useEffect } from 'react'
import { Breadcrumb, ContentBox, PlusCard } from 'ui'
import { BasicGuideCard } from '@components/library/BasicGuideCard'
import Pagenation from 'ui/components/common/Pagenation'
import { useLibraryManualQuery, useLibraryMuate } from '@store/server/useLibraryQuery'
import { useLibCard } from '@hook/useLibCard'
import { LibraryManualContentType } from '@type/library'
import { useMenu } from 'library'
import { isNil } from 'lodash-es'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { usePathname } from 'next/navigation'

const initData = {
  size: 300,
}

function LibraryPage() {
  const pageTitleList = ['Library']
  const [libCardData, setLibCardData] = useState([])
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const { libraryOrderMutate } = useLibraryMuate()
  const { resetSearcFilterParams, isParamsLoading, currentPage, onPageChange } = useSearchFilter(initData)
  const { libraryManualList } = useLibraryManualQuery({ currentPage })
  const { editPlus, setEditPlus, setCardParams, setSelectedIcon } = useLibCard()
  const [activeId, setActiveId] = useState(0)

  const saveCardListOrder = (result: LibraryManualContentType[]) => {
    let _length = result.length
    const params = result.map(({ librCatNum }, index) => ({ librCatNum, sortNum: _length-- }))
    libraryOrderMutate({ params })
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    setActiveId(null)
    const { active, over } = event

    if (isNil(active) || isNil(over)) return

    if (active.id !== over.id) {
      const result: LibraryManualContentType[] = Array.from(libCardData)
      const startIndex = result.findIndex((item) => item.librCatNum === active.id)
      const endIndex = result.findIndex((item) => item.librCatNum === over.id)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)

      setLibCardData(result)
      saveCardListOrder(result)
    }
  }
  const plusCardHandler = () => {
    if (getPathInfo(pathname).crtYn !== 'Y') {
      return
    }
    setEditPlus(true)
  }

  const init = () => {
    setLibCardData(libraryManualList?.content)
  }

  useEffect(() => {
    init()
    return () => {
      setEditPlus(false)
      setCardParams(null)
      setSelectedIcon([])
      resetSearcFilterParams()
    }
  }, [libraryManualList?.content])

  return (
    <>
      {libCardData && !isParamsLoading ? (
        <>
          <div className="sticky_wrap">
            <ContentBox type="top_content">
              <div className="lft">
                <Breadcrumb pageTitleList={pageTitleList} />
                <h1 className="headline1">Library</h1>
              </div>
            </ContentBox>
          </div>
          <ContentBox>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
              <div className="align top start wrap gap_20 w_auto">
                <SortableContext items={libCardData} strategy={rectSortingStrategy}>
                  <div className="align start inline gap_20 w_auto wrap">
                    {editPlus ? (
                      <BasicGuideCard Drag={false} />
                    ) : (
                      <div className="item">
                        <PlusCard onClick={plusCardHandler} size="l" />
                      </div>
                    )}

                    {libCardData?.map((manual, index) => (
                      <BasicGuideCard Drag index={index} key={manual?.librCatNum} manual={manual} />
                    ))}

                    <DragOverlay style={{ opacity: 0.8, boxShadow: '0px 3px 10px 0px rgba(0, 0, 0, 0.2)', borderRadius: '16px' }}>
                      {activeId ? <BasicGuideCard manual={libCardData.filter((item) => item.librCatNum === activeId)[0]} Drag={false} /> : null}
                    </DragOverlay>
                  </div>
                </SortableContext>
              </div>
            </DndContext>

            {/* <div className="cont_bottom_box">
              <Pagenation
                totalPage={libraryManualList?.totalPages}
                currentPage={currentPage}
                totalCount={libraryManualList?.totalElements || 1}
                pageSize={20}
                onPageChange={onPageChange}
              />
            </div> */}
          </ContentBox>
        </>
      ) : null}
    </>
  )
}

export default LibraryPage
