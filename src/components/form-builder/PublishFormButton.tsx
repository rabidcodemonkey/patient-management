import React from 'react'

import { BookCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

function PublishFormButton() {
  return (
    <Button className="gap-2">
      <BookCheck className="h-4 w-4" />
      Publish
    </Button>
  )
}

export default PublishFormButton
