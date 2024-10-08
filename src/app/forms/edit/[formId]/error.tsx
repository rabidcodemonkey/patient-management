'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect } from 'react'

function ErrorPage({ error }: { error: Error }) {
  useEffect(() => console.error(error), [error])
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="text-4xl">Error Page</h2>
      <Button asChild>
        <Link href={'/'}>Go Home</Link>
      </Button>
    </div>
  )
}

export default ErrorPage
