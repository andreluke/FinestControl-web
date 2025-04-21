import { z } from 'zod'

export const createTransactionSchema = z.object({
  amount: z.number().min(1, { message: 'Quantidade é obrigatória' }),
  isSpend: z.boolean(),
  paymentTypeId: z
    .string()
    .min(1, { message: 'Tipo de pagamento é obrigatório' }),
  tagId: z.string().min(1, { message: 'Tag é obrigatória' }),
  createdAt: z.string().optional(),
})

export type createTransactionData = z.infer<typeof createTransactionSchema>
