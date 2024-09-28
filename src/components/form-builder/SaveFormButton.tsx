import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'

import { LoaderCircle, Save } from 'lucide-react'
import { useDesigner } from './designer/DesignerContext'
import { toast } from '@/hooks/use-toast'
import { UpdateFormContent } from '@/actions/form'

function SaveFormButton({ formId }: { formId: number }) {
  const { controls } = useDesigner()
  const [loading, startTransition] = useTransition()

  async function SaveFormContent() {
    try {
      const jsonControls = JSON.stringify(controls)
      await UpdateFormContent(formId, jsonControls)
      toast({
        title: 'Success',
        description: 'Form saved successfully',
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'There was an error saving the form',
        variant: 'destructive',
      })
    }
  }

  return (
    <Button
      variant={'outline'}
      className="gap-2"
      disabled={loading}
      onClick={() => startTransition(SaveFormContent)}
    >
      {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
      {!loading && <Save className="h-4 w-4" />}
      Save
    </Button>
  )
}

export default SaveFormButton
