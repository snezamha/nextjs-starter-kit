'use client';

import React, { useState, useEffect, forwardRef } from 'react';
import { Icon as IconIfyIcon } from '@iconify/react';
import { cn } from '@/lib/utils';

function Spinner() {
  return (
    <div className='flex h-6 w-6 items-center justify-center'>
      <svg
        className='h-full w-full animate-spin text-gray-500'
        viewBox='0 0 24 24'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
          fill='none'
        />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8v8H4z'
        />
      </svg>
    </div>
  );
}

export const Icon = forwardRef<
  React.ElementRef<typeof IconIfyIcon>,
  React.ComponentPropsWithoutRef<typeof IconIfyIcon>
>(({ className, ...props }, ref) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return <IconIfyIcon ref={ref} className={cn('', className)} {...props} />;
});

Icon.displayName = 'Icon';
