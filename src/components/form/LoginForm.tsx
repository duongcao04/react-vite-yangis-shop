import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useLogin } from '@/hooks/useLogin'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { FloatingLabelInput } from '../ui/floating-label-input'

const FormSchema = z.object({
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

export default function LoginForm() {
    const { login } = useLogin()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const user = {
            email: data.email,
            password: data.password,
        }
        login(user)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FloatingLabelInput
                                {...field}
                                id="name"
                                label="Email"
                                required
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
                <Button
                    type="submit"
                    className="w-full h-[50px]"
                    title="Đăng nhập"
                >
                    Đăng nhập
                </Button>
            </form>
        </Form>
    )
}
