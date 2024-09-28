'use client'

import { Label } from '@/components/ui/label'
import { ControlType, Control, ControlProperties } from './form-controls'
import { ALargeSmall } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useDesigner } from '../designer/DesignerContext'

import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import InputFormField from '../designer/form-fields/InputFormField'
import SwitchFormField from '../designer/form-fields/SwitchFormField'

const type: ControlType = 'TextField'

const properties = {
    label: 'Text Field',
    helperText: 'Helper Text',
    required: false,
    placeHolderText: 'Placeholder Text',
}

export const TextFieldFormControl: Control = {
    type,

    sidebarButton: {
        label: 'Text Field',
        icon: ALargeSmall,
    },

    designerComponent: DesignerComponent,
    formComponent: () => <div>TextField Properties</div>,
    propertiesComponent: PropertiesComponent,

    factory: (id: string) => ({
        id,
        type,
        properties,
    }),
}

type TextFieldControlProperties = ControlProperties & {
    properties: typeof properties
}

function DesignerComponent({ control }: { control: ControlProperties }) {
    const textFieldProps = control as TextFieldControlProperties
    const { label, required, placeHolderText, helperText } =
        textFieldProps.properties

    return (
        <div className="flex w-full flex-col gap-2">
            <Label>
                {label}
                {required && '*'}
            </Label>
            <Input readOnly disabled placeholder={placeHolderText} />
            {helperText && (
                <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
        </div>
    )
}

const propertiesFormSchema = z.object({
    label: z.string().min(2).max(64),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolderText: z.string().max(64),
})
type PropertiesSchema = z.infer<typeof propertiesFormSchema>

function PropertiesComponent({ control }: { control: ControlProperties }) {
    const { updateControl } = useDesigner()
    const textFieldProps = control as TextFieldControlProperties
    const form = useForm<PropertiesSchema>({
        resolver: zodResolver(propertiesFormSchema),
        mode: 'onBlur', //- Save w/o click button
        defaultValues: {
            label: textFieldProps.properties.label,
            helperText: textFieldProps.properties.helperText,
            required: textFieldProps.properties.required,
            placeHolderText: textFieldProps.properties.placeHolderText,
        },
    })

    useEffect(() => {
        form.reset(control.properties)
    }, [control, form])

    function updateProperties(values: PropertiesSchema) {
        updateControl(control.id, {
            ...control,
            properties: { ...values },
        })
    }

    return (
        <Form {...form}>
            <form
                onBlur={form.handleSubmit(updateProperties)}
                className="space-y-3"
            >
                <InputFormField
                    formControl={form.control}
                    name="label"
                    label="Label"
                    description={
                        <>
                            Label for the text field. <br /> It will be
                            displayed above the field.
                        </>
                    }
                    onEnterKey={(e) => e.currentTarget.blur()}
                />

                <InputFormField
                    formControl={form.control}
                    name="placeHolderText"
                    label="Placeholder"
                    description={<>The placeholder of the field</>}
                    onEnterKey={(e) => e.currentTarget.blur()}
                />

                <InputFormField
                    formControl={form.control}
                    name="helperText"
                    label="Helper Text"
                    description={
                        <>
                            The helper text of the field. <br />
                            It will be displayed below the field.
                        </>
                    }
                    onEnterKey={(e) => e.currentTarget.blur()}
                />

                <SwitchFormField
                    formControl={form.control}
                    name="required"
                    label="Required"
                    description={<>Whether the field is required or not</>}
                />
            </form>
        </Form>
    )
}
