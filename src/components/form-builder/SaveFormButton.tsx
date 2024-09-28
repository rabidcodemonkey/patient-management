import { Button } from '@/components/ui/button';
import React from 'react';

import { Save } from 'lucide-react';

function SaveFormButton() {
  return (
    <Button variant={'outline'} className='gap-2'>
      <Save className='h-4 w-4' />
      Save
    </Button>
  );
}

export default SaveFormButton;
