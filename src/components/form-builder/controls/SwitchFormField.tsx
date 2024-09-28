import React from 'react';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

type SwitchFormFieldProps = {
  formControl: any;
  name: string;
  label: string;
  description?: React.ReactNode;
};

function SwitchFormField(props: SwitchFormFieldProps) {
  const { formControl, name, label, description } = props;

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className='flex items-center justify-between rounded-lg border p-3 shadow-sm gap-2'>
          <div className='space-y-0.5'>
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SwitchFormField;
