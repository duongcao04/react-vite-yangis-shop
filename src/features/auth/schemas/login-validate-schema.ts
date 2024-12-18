import { z } from 'zod'

export type LoginFormValue = z.infer<typeof loginValidateSchema>

export const loginValidateSchema = z.object({
    email: z.string().email({ message: 'Email không hợp lệ' }).min(2, {
        message: 'Email phải tối thiểu 2 ký tự',
    }),
    password: z
        .string()
        .min(8, {
            message: 'Mật khẩu phải tối thiểu 8 ký tự',
        })
        .max(255, {
            message: 'Mật khẩu chỉ tối đa 255 ký tự',
        }),
})
