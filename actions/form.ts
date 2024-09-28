'use server'

import { Form, formSchema, formSchemaType } from '@/schema/form'

type CreateFormResponse = {
  data: {
    createForm: {
      id: string
    }
  }
}

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data)
  if (!validation.success) {
    throw new Error('CreateFrom validation error')
  }

  const response = await fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation {
          createForm(
            name: "${data.name}",
            published: false,
            description: "${data.description ?? ''}",
            shareUrl:"",
            content:"[]"
          ) {
            id
          }
        }
      `,
      variables: {},
    }),
  })

  if (!response.ok) {
    throw new Error('CreateForm network error')
  }

  const createFormResponse: CreateFormResponse = await response.json()
  return createFormResponse.data.createForm.id
}

export async function GetFormById(id: number): Promise<Form> {
  const response = await fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetFormById($id: ID!) {
          Form(id: $id) {
            id
            name
            published
            description
            shareUrl
            content
          }
        }
      `,
      variables: { id },
    }),
  })

  if (!response.ok) {
    throw new Error('GetFormById network error')
  }

  const { data } = await response.json()
  return data.Form as Form
}

export async function UpdateFormContent(id: number, content: string) {
  const response = await fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation UpdateForm($id: ID!, $content: String) {
          updateForm(id: $id, content: $content) {
            id
          }
        }
      `,
      variables: {
        id,
        content,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('UpdateFormContent network error')
  }

  return response.json()
}
