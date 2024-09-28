import React from 'react';
import { Control } from '../FormControls';
import { Button } from '../../ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

function DesignerSidebarButton({ formComponent }: { formComponent: Control }) {
  const { label, icon: Icon } = formComponent.sidebarButton;
  const draggable = useDraggable({
    id: `designer-button-${formComponent.type}`,
    data: {
      type: formComponent.type,
      isDesignerSidebarButton: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={'outline'}
      className={cn(
        'gap-2 flex flex-col h-[120px] w-[120px] cursor-grab',
        draggable.isDragging && 'ring-2 ring-primary' //- Light it up when dragging
      )}
      {...draggable.attributes}
      {...draggable.listeners}
    >
      <Icon className='h-8 w-8 text-primary' />
      <p className='text-xs'>{label}</p>
    </Button>
  );
}

export function DesignerSidebarButtonDragOverlay({
  formComponent,
}: {
  formComponent: Control;
}) {
  const { label, icon: Icon } = formComponent.sidebarButton;

  return (
    <Button
      variant={'outline'}
      className='gap-2 flex flex-col h-[120px] w-[120px] cursor-grab'
    >
      <Icon className='h-8 w-8 text-primary' />
      <p className='text-xs'>{label}</p>
    </Button>
  );
}

export default DesignerSidebarButton;
