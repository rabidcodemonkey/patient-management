import React from 'react'
import { LoaderCircle } from 'lucide-react'

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderCircle className="h-12 w-12 animate-spin" />
    </div>
  )
}

export default Loading
