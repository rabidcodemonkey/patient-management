import { Button } from '@/components/ui/button'
import React from 'react'

import { Eye } from 'lucide-react'
import { useDesigner } from './designer/DesignerContext'
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import { FormComponents } from './controls/form-controls'

function PreviewDialogButton() {
  const { controls } = useDesigner()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>

      <DialogContent className="flex h-screen max-h-screen w-screen max-w-full flex-grow flex-col gap-0 p-0">
        <div className="px=4 border-b py-2">
          <p className="text-lg font-bold text-muted-foreground">
            Form Preview
          </p>
          <p className="text-sm text-muted-foreground">
            This is how your form will look to your users.
          </p>
        </div>

        <div className="flex-grwo flex flex-col items-center justify-center overflow-y-auto bg-accent p-4">
          <div className="flex h-full w-full max-w-[620px] flex-grow flex-col gap-4 overflow-y-auto rounded-2xl bg-background p-8">
            {controls.map((control) => {
              const ControlComponent =
                FormComponents[control.type].formComponent
              return <ControlComponent key={control.id} control={control} />
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PreviewDialogButton
