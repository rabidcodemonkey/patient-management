import * as z from 'zod';

export const formSchema = z.object({
  name: z.string().min(4),
  description: z.string().optional(),
});
export type formSchemaType = z.infer<typeof formSchema>;

export type Form = {
  id: number;
  name: string;
  published: boolean;
  description: string;
  shareUrl: string;
  content: string;
};
