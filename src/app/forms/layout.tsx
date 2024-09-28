import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-h-screen min-h-screen min-w-full flex-col bg-background">
      {children}
    </div>
  )
}

export default Layout
