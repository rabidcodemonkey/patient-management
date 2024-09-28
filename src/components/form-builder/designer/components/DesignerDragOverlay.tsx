import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React from 'react'
import { DesignerSidebarButtonDragOverlay } from './SidebarButton'
import { ControlType, FormComponents } from '../../controls/form-controls'
import { useDesigner } from '../DesignerContext'

function DesignerDragOverlay() {
  const { controls } = useDesigner()
  const [draggedControl, setDraggedControl] = React.useState<Active | null>(
    null
  )

  useDndMonitor({
    onDragStart: (event) => setDraggedControl(event.active),
    onDragCancel: () => setDraggedControl(null),
    onDragEnd: () => setDraggedControl(null),
  })

  if (!draggedControl) return null

  let node = <div>Test</div>

  const isSidebarButton = draggedControl.data?.current?.isDesignerSidebarButton
  if (isSidebarButton) {
    const type = draggedControl.data?.current?.type as ControlType
    node = (
      <DesignerSidebarButtonDragOverlay formComponent={FormComponents[type]} />
    )
  }

  const isDesignerComponentWrapper =
    draggedControl.data?.current?.isDesignerComponentWrapper
  if (isDesignerComponentWrapper) {
    const dragedControlId = draggedControl.data?.current?.controlId
    const control = controls.find((c) => c.id === dragedControlId)
    if (!control) {
      node = <div>Control not found!</div>
    } else {
      const DesignerComponent = FormComponents[control.type].designerComponent
      node = (
        //- Issue where releasing the mouse caused the DesignerComponent to
        //- stay in space and not be removed.
        //- Need to add a pointer-events-none to the parent div so that dragging
        //- the overlay won't trigger a mouse release in the DesignerComponent.
        <div className="pointer pointer-events-none flex h-[120px] w-full rounded-md border bg-accent px-4 py-2 opacity-80">
          <DesignerComponent control={control} />
        </div>
      )
    }
  }

  return <DragOverlay>{node}</DragOverlay>
}

export default DesignerDragOverlay
