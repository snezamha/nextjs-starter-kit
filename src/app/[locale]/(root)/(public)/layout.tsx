import React from 'react';

export default async function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='flex-1'>{children}</div>
    </div>
  );
}
