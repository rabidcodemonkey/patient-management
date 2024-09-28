import React from 'react'

import { useDesigner } from './DesignerContext'
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import {
  ControlProperties,
  ControlType,
  FormComponents,
} from '../controls/form-controls'
import { nanoid } from 'nanoid'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import DesignerSidebar from './components/Sidebar'

function Designer() {
  const { controls, insertControl, removeControl, setSelectedControl } =
    useDesigner()

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  })

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event
      if (!active || !over) return

      const isDragSidebarButton = active.data?.current?.isDesignerSidebarButton
      const isDragControl = active.data?.current?.isDesignerComponentWrapper

      const isDropOverDesignerArea = over.data?.current?.isDesignerDropArea
      const isDropOverTopHalf = over.data?.current?.isTopHalfDesignerComponent
      const isDropOverBottomHalf =
        over.data?.current?.isBottomHalfDesignerComponent
      const isDropOverControl = isDropOverTopHalf || isDropOverBottomHalf

      //- Dropping sidebar button over designer area
      if (isDragSidebarButton && isDropOverDesignerArea) {
        const type = active.data?.current?.type as ControlType
        const control = FormComponents[type].factory(nanoid())
        insertControl(controls.length, control)
      }

      //- Dropping sidebar button over a control
      if (isDragSidebarButton && isDropOverControl) {
        const overIdx = controls.findIndex(
          (c) => c.id === over.data?.current?.controlId
        )
        if (overIdx === -1) throw new Error('Control not found')

        const insertIdx = isDropOverTopHalf ? overIdx : overIdx + 1

        const type = active.data?.current?.type as ControlType
        const control = FormComponents[type].factory(nanoid())
        insertControl(insertIdx, control)
      }

      //- Dragging a control over another control
      if (isDragControl && isDropOverControl) {
        const activeIdx = controls.findIndex(
          (c) => c.id === active.data?.current?.controlId
        )
        const overIdx = controls.findIndex(
          (c) => c.id === over.data?.current?.controlId
        )

        if (activeIdx === -1 || overIdx === -1)
          throw new Error('Control not found')

        //- Remove the active element, make a copy of it
        //- and insert it at the new position

        const activeCopy = { ...controls[activeIdx] }
        removeControl(activeCopy.id)

        let insertIdx = isDropOverTopHalf ? overIdx : overIdx + 1

        //- Removing the active element will shift the overIdx
        //- if the active element was above the over element
        insertIdx = activeIdx < overIdx ? insertIdx - 1 : insertIdx
        if (insertIdx < 0) insertIdx = 0

        insertControl(insertIdx, activeCopy)
      }
    },
  })

  return (
    <div className="flex h-full w-full">
      <div
        className="w-full p-4"
        // Clicking on the designer background should deselect the control
        onClick={() => setSelectedControl(null)}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'm-auto flex h-full max-w-[920px] flex-1 flex-grow flex-col items-center justify-start overflow-y-auto rounded-xl bg-background',
            droppable.isOver && 'ring-4 ring-inset ring-primary' //- Light up the border of the drop area when dragging over
          )}
        >
          {!droppable.isOver && controls.length === 0 && (
            <p className="flex flex-grow items-center text-3xl font-bold text-muted-foreground">
              Drop Here
            </p>
          )}

          {/* Drop target 'image' */}
          {droppable.isOver && controls.length === 0 && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}

          {controls.length > 0 && (
            <div className="flex w-full flex-col gap-2 p-4">
              {controls.map((control) => (
                <DesignerComponentWrapper key={control.id} control={control} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  )
}

function DesignerComponentWrapper({ control }: { control: ControlProperties }) {
  const { removeControl, selectedControl, setSelectedControl } = useDesigner()
  const [mouseOver, setMouseOver] = React.useState(false)

  const topHalf = useDroppable({
    id: control.id + '-top',
    data: {
      type: control.type,
      controlId: control.id,
      isTopHalfDesignerComponent: true,
    },
  })

  const bottomHalf = useDroppable({
    id: control.id + '-bottom',
    data: {
      type: control.type,
      controlId: control.id,
      isBottomHalfDesignerComponent: true,
    },
  })

  const draggable = useDraggable({
    id: control.id + '-drag-handler',
    data: {
      type: control.type,
      controlId: control.id,
      isDesignerComponentWrapper: true,
    },
  })

  //- Hide the control when dragging
  if (draggable.isDragging) return null

  const Component = FormComponents[control.type].designerComponent
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative flex h-[120px] flex-col rounded-md text-foreground ring-1 ring-inset ring-accent hover:cursor-pointer"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onClick={(event) => {
        event.stopPropagation()
        setSelectedControl(control)
      }}
    >
      {/* Drop hot zones */}
      <div
        ref={topHalf.setNodeRef}
        className={'absolute h-1/2 w-full rounded-t-md'}
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 h-1/2 w-full rounded-b-md"
      />

      {/* Control */}
      <div
        className={cn(
          'pointer-events-none flex h-[120px] w-full items-center rounded-md bg-accent/40 px-4 py-2 opacity-100',
          mouseOver && 'opacity-30'
        )}
      >
        <Component control={control} />
      </div>

      {/* DnD insert markers */}
      {topHalf.isOver && (
        <div className="absolute top-0 h-[7px] w-full rounded-md rounded-b-none bg-primary" />
      )}
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 h-[7px] w-full rounded-md rounded-t-none bg-primary" />
      )}

      {/* Drag and Edit Overlay */}
      {mouseOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="flex h-full justify-center rounded-md rounded-l-none border bg-red-500"
              variant="outline"
              onClick={(event) => {
                event.stopPropagation() //- Dont also select the control when the control is deleted
                removeControl(control.id)
              }}
            >
              <Trash2 className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-sm text-muted-foreground">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default Designer
