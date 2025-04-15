import { z } from 'zod'

export const createTagSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  color: z.string().min(1, { message: 'Cor é obrigatória' }),
})

export const updateTagSchema = z.object({
  id: z.number().min(1, { message: 'ID é obrigatório' }),
  name: z.string().optional(),
  color: z.string().optional(),
  description: z.string().optional(),
})

export type createTagData = z.infer<typeof createTagSchema>
export type updateTagData = z.infer<typeof updateTagSchema>
