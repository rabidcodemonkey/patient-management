import { GetFormById } from '@/actions/form'
import FormBuilder from '@/components/form-builder/FormBuilder'

export default async function Page({ params }: { params: { formId: string } }) {
  const { formId } = params
  const form = await GetFormById(Number(formId))

  return <FormBuilder form={form} />
}
