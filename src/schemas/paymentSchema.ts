import { type IconName, iconNames } from 'lucide-react/dynamic'
import { z } from 'zod'

const validIcons = new Set(iconNames)

export const createPaymentSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  icon: z.custom<IconName>(
    val => typeof val === 'string' && validIcons.has(val as IconName),
    {
      message: 'Ícone inválido',
    }
  ),
})

export const updatePaymentSchema = z.object({
  id: z.number().min(1, { message: 'ID é obrigatório' }),
  name: z.string().optional(),
  description: z.string().optional(),
  icon: z.custom<IconName>(
    val => typeof val === 'string' && validIcons.has(val as IconName),
    {
      message: 'Ícone inválido',
    }
  ),
})

export type createPaymentData = z.infer<typeof createPaymentSchema>
export type updatePaymentData = z.infer<typeof updatePaymentSchema>
