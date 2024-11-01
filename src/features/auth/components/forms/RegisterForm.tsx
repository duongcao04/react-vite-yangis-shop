import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { FloatingLabelInput } from '@/components/ui/floating-label-input'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'

import { useRegister } from '@/features/auth/hooks/useRegister'

const FormSchema = z
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

export default function RegisterForm() {
    const { register } = useRegister()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const newUser = {
            username: 'hello',
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            password: data.password,
        }
        register(newUser)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
            >
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FloatingLabelInput
                                required
                                {...field}
                                id="fullName"
                                label="Họ và tên"
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FloatingLabelInput
                                {...field}
                                id="email"
                                label="Email"
                                required
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FloatingLabelInput
                                required
                                {...field}
                                id="phone"
                                label="Số điện thoại"
                                type="number"
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FloatingLabelInput
                                {...field}
                                id="password"
                                label="Mật khẩu"
                                required
                                type="password"
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FloatingLabelInput
                                {...field}
                                id="confirmPassword"
                                label="Xác nhận mật khẩu"
                                required
                                type="password"
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full h-[50px]"
                    title="Tạo tài khoản"
                >
                    Tạo tài khoản
                </Button>
            </form>
        </Form>
    )
}
