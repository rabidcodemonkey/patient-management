import React from 'react';
import DesignerSidebarButton from './SidebarButton';
import { FormComponents } from '../FormControls';

function ControlSidebar() {
  return (
    <div>
      Controls
      <DesignerSidebarButton formComponent={FormComponents.TextField} />
    </div>
  );
}

export default ControlSidebar;
