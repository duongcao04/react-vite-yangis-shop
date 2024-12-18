import { z } from 'zod'

export type RegisterFormValue = z.infer<typeof registerValidateSchema>

export const registerValidateSchema = z
    .object({
        fullName: z
            .string()
            .min(3, { message: 'Tên người dùng phải ít nhất 3 ký tự' })
            .max(30, { message: 'Tên người dùng chỉ được tối đa 30 ký tự' }),
        email: z.string().email({ message: 'Email không hợp lệ' }),
        phone: z
            .string()
            .min(10, 'Số điện thoại không hợp lệ')
            .max(10, 'Số điện thoại không hợp lệ'),
        password: z.string().min(8, {
            message: 'Mật khẩu phải chứa ít nhất 8 ký tự',
        }),
        confirmPassword: z.string().min(8, {
            message: 'Xác nhận mật khẩu phải chứa ít nhất 8 ký tự',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu không trùng khớp',
        path: ['confirmPassword'], // path of error
    })
