import React from 'react'
import { useDesigner } from '../DesignerContext'
import ControlSidebar from './ControlSidebar'
import ControlPropertiesSidebar from './ControlPropertiesSidebar'

function DesignerSidebar() {
    const { selectedControl } = useDesigner()

    return (
        <aside className="flex h-full w-[400px] max-w-[400px] flex-grow flex-col gap-2 overflow-y-auto border-l-2 border-muted bg-background p-4">
            {!selectedControl ? (
                <ControlSidebar />
            ) : (
                <ControlPropertiesSidebar />
            )}
        </aside>
    )
}

export default DesignerSidebar
