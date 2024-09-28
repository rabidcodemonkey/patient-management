'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

import { FilePlus, LoaderCircle } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, formSchemaType } from '@/schema/form';
import { CreateForm } from '@/actions/form';
import { useRouter } from 'next/navigation';

export default function CreateFormButton() {
  const router = useRouter();
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: formSchemaType) {
    try {
      const formId = await CreateForm(values);
      toast({
        title: 'Success',
        description: 'Form created successfully.',
      });
      router.push(`/forms/edit/${formId}`);
    } catch {
      toast({
        title: 'Error',
        description: 'An error occurred while creating the form.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Form</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new form</DialogTitle>
          <DialogDescription>
            This will create a new form in your account.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className='space-y-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            className='w-full mt-4'
            onClick={form.handleSubmit(onSubmit)}
          >
            {!form.formState.isSubmitting ? (
              <span>Save</span>
            ) : (
              <LoaderCircle className='animate-spin' />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
