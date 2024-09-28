'use client'

import React, { createContext } from 'react'
import { ControlProperties } from '../controls/form-controls'

type DesignerContextType = {
  controls: ControlProperties[]

  insertControl: (index: number, control: ControlProperties) => void
  removeControl: (id: string) => void
  updateControl: (id: string, control: ControlProperties) => void

  selectedControl: ControlProperties | null
  setSelectedControl: React.Dispatch<
    React.SetStateAction<ControlProperties | null>
  >
}

export const DesignerContext = createContext<DesignerContextType | null>(null)

export default function DesignerContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedControl, setSelectedControl] =
    React.useState<ControlProperties | null>(null)
  const [controls, setControls] = React.useState<ControlProperties[]>([])

  function insertControl(index: number, control: ControlProperties) {
    setControls((prev) => {
      const copy = [...prev]
      copy.splice(index, 0, control)
      return copy
    })
  }

  function removeControl(id: string) {
    setControls((prev) => prev.filter((control) => control.id !== id))
  }

  function updateControl(id: string, control: ControlProperties) {
    setControls((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...control } : c))
    )
  }

  return (
    <DesignerContext.Provider
      value={{
        controls,
        insertControl,
        removeControl,
        updateControl,
        selectedControl,
        setSelectedControl,
      }}
    >
      {children}
    </DesignerContext.Provider>
  )
}

export function useDesigner() {
  const context = React.useContext(DesignerContext)

  if (!context) {
    throw new Error('useDesigner must be used within a DesignerContextProvider')
  }

  return context
}
