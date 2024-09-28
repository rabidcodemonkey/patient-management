import React from 'react';
import { useDesigner } from './DesignerContext';
import ControlSidebar from './ControlSidebar';
import ControlPropertiesSidebar from './ControlPropertiesSidebar';

function DesignerSidebar() {
  const { selectedControl } = useDesigner();

  return (
    <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      {!selectedControl ? <ControlSidebar /> : <ControlPropertiesSidebar />}
    </aside>
  );
}

export default DesignerSidebar;
