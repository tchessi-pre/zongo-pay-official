import { z } from 'zod'

export const sendTransactionSchema = z
  .object({
    to_phone: z.string().min(1).optional(),
    to_user_id: z.string().min(1).optional(),
    amount: z.number().positive(),
    provider: z.string().min(1).optional(),
    source_wallet_id: z.string().min(1).optional()
  })
  .refine(
    (data) => {
      const hasPhone = !!data.to_phone
      const hasUserId = !!data.to_user_id
      return hasPhone !== hasUserId
    },
    'to_phone ou to_user_id est requis, mais pas les deux'
  )

export const transactionFromQrSchema = z.object({
  code: z.string().min(1)
})

export type SendTransactionDto = z.infer<typeof sendTransactionSchema>
export type TransactionFromQrDto = z.infer<typeof transactionFromQrSchema>
