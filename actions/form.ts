'use server'

import { Form, formSchema, formSchemaType } from '@/schema/form'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data)
  if (!validation.success) {
    throw new Error('CreateFrom validation error')
  }

  const form = await prisma.form
    .create({
      data: {
        name: data.name,
        description: data.description ?? '',
      },
    })
    .catch((e) => {
      console.error(e)
      throw new Error('CreateForm network error')
    })

  return form.id
}

export async function GetFormById(id: number): Promise<Form> {
  const form = await prisma.form
    .findUnique({
      where: {
        id,
      },
    })
    .catch((e) => {
      console.error(e)
      throw new Error('GetFormById network error')
    })

  return form as Form
}

export async function UpdateFormContent(id: number, content: string) {
  const form = await prisma.form
    .update({
      where: {
        id,
      },
      data: {
        content,
      },
    })
    .catch((e) => {
      console.error(e)
      throw new Error('UpdateFormContent network error')
    })

  return form
}
