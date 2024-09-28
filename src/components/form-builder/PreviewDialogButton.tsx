import { Button } from '@/components/ui/button'
import React from 'react'

import { Eye } from 'lucide-react'
import { useDesigner } from './designer/DesignerContext'

function PreviewDialogButton() {
  const { controls } = useDesigner()

  return (
    <Button variant={'outline'} className="gap-2">
      <Eye className="h-4 w-4" />
      Preview
    </Button>
  )
}

export default PreviewDialogButton
