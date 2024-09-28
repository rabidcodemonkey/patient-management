import React from 'react'
import DesignerSidebarButton from './SidebarButton'
import { FormComponents } from '../../controls/form-controls'

function ControlSidebar() {
  return (
    <div>
      Controls
      <DesignerSidebarButton formComponent={FormComponents.TextField} />
    </div>
  )
}

export default ControlSidebar
