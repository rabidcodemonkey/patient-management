import React from 'react'
import { useDesigner } from '../DesignerContext'
import { ControlType, FormComponents } from '../../controls/form-controls'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

function ControlPropertiesSidebar() {
  const { selectedControl, setSelectedControl } = useDesigner()
  if (!selectedControl) return null

  const PropertiesComponent =
    FormComponents[selectedControl?.type as ControlType].propertiesComponent

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground">Properties</p>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => setSelectedControl(null)}
        >
          <X />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesComponent control={selectedControl} />
    </div>
  )
}

export default ControlPropertiesSidebar
