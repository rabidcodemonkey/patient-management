import React from 'react'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type InputFormFieldProps = {
  formControl: any
  name: string
  label: string
  placeholder?: string
  description?: React.ReactNode

  onEnterKey?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

function InputFormField(props: InputFormFieldProps) {
  const { formControl, name, label, placeholder, description } = props

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              {...(placeholder ? { placeholder } : {})}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  props.onEnterKey?.(e)
                }
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputFormField
