import React from 'react';
import { LoaderCircle } from 'lucide-react';

function Loading() {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <LoaderCircle className='h-12 w-12 animate-spin' />
    </div>
  );
}

export default Loading;
