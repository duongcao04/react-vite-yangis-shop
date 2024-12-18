import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FloatingLabelInput } from '@/components/ui/floating-label-input'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useRegister } from '../../hooks/use-register'
import { registerValidateSchema, type RegisterFormValue } from '../../schemas/register-validate-schema'

export default function RegisterForm() {
    const { register } = useRegister()
    const form = useForm<RegisterFormValue>({
        resolver: zodResolver(registerValidateSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
    })

    async function onSubmit(data: RegisterFormValue) {
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
