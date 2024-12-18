import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FloatingLabelInput } from '@/components/ui/floating-label-input'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'

import { useLogin } from '../../hooks/use-login'
import {
    type LoginFormValue,
    loginValidateSchema,
} from '../../schemas/login-validate-schema'

export default function LoginForm() {
    const { login } = useLogin()

    const form = useForm<LoginFormValue>({
        resolver: zodResolver(loginValidateSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    function onSubmit(data: LoginFormValue) {
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
