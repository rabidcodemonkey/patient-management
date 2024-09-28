'use client';

import { Form } from '@/schema/form';
import React from 'react';
import PreviewDialogButton from './PreviewDialogButton';
import SaveFormButton from './SaveFormButton';
import PublishFormButton from './PublishFormButton';
import Designer from './Designer/Designer';
import { ModeToggle } from '@/components/theme-mode-selctor';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import DesignerDragOverlay from './Designer/DesignerDragOverlay';

function FormBuilder({ form }: { form: Form }) {
  //- Having an issue when deleting an item.  The drag and
  //- drop logic happens immediately which prevents the button
  //- click from being detected.  Here, we use a sensor to
  //- require the user to drag the control a minimum distance
  //- before the drag and drop logic is triggered.
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  //- Lets also make this work for mobile
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300, // 300ms
      tolerance: 5, // 5px
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <section className='flex flex-col w-full'>
        <nav className='flex justify-between border-b-2 p-4 gap-3 items-center'>
          <h2 className='truncate font-medium'>
            <span className='text-muted-foreground mr-2'>Form:</span>
            {form.name}
          </h2>

          <div className='flex items-center gap-2'>
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton />
                <PublishFormButton />
              </>
            )}
            <ModeToggle />
          </div>
        </nav>
        <div className='flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/graph-paper.svg)] dark:bg-[url(/graph-paper-dark.svg)]'>
          <Designer />
        </div>
      </section>
      <DesignerDragOverlay />
    </DndContext>
  );
}

export default FormBuilder;
