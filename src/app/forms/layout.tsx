import React from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
      {children}
    </div>
  );
}

export default Layout;
