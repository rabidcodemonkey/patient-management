import { TextFieldFormControl } from './TextField'

export type ControlType = 'TextField'

export type SidebarButton = {
    label: string
    icon: React.ElementType
}

export type ControlProperties = {
    id: string
    type: ControlType
    properties?: Record<string, any>
}

export type Control = {
    type: ControlType

    sidebarButton: SidebarButton

    designerComponent: React.FC<{ control: ControlProperties }>
    formComponent: React.FC
    propertiesComponent: React.FC<{ control: ControlProperties }>

    factory: (id: string) => ControlProperties
}

//----------------------------------------------
//- Create the map that maps a control type to
//- designer/form/properties components.  This
//- is used for contructing a component based
//- on its type.
//----------------------------------------------

export type ControlComponents = {
    [key in ControlType]: Control
}

export const FormComponents: ControlComponents = {
    TextField: TextFieldFormControl,
}
