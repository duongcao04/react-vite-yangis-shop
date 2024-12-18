import { Input } from '@nextui-org/input'
import { FormikProps, useFormik } from 'formik'

import { FlatColorIconsGoogle } from '@/components/icons/google-icon'
import { ButtonLoading } from '@/components/ui/button-loading'

import { useLogin } from '../../hooks/use-login'
import {
    type LoginFormValue,
    loginValidateSchema as validationSchema,
} from '../../schemas/login-validate-schema'
import SocialButton from '../buttons/social-button'
import { InputPassword } from './register-form'

export default function LoginForm() {
    const { isLoading, login } = useLogin()

    const inputStyles = {
        inputWrapper:
            'border border-transparent group-data-[focus-visible=true]:ring-transparent group-data-[focus=true]:border-2 group-data-[focus=true]:border-primary',
    }

    const initialValues = {
        email: '',
        password: '',
    }

    const formik: FormikProps<LoginFormValue> = useFormik<LoginFormValue>({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const user = {
                email: values.email,
                password: values.password,
            }

            await login(user)
        },
    })

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col gap-6"
        >
            <Input
                isRequired
                id="email"
                name="email"
                label="Email"
                classNames={inputStyles}
                value={formik.values.email}
                onChange={formik.handleChange}
                errorMessage={
                    Boolean(formik.touched.email) && formik.errors.email
                }
                isInvalid={
                    Boolean(formik.errors.email) &&
                    Boolean(formik.touched.email)
                }
            />
            <InputPassword
                isRequired
                id="password"
                name="password"
                label="Password"
                classNames={inputStyles}
                value={formik.values.password}
                onChange={formik.handleChange}
                errorMessage={
                    Boolean(formik.touched.password) && formik.errors.password
                }
                isInvalid={
                    Boolean(formik.errors.password) &&
                    Boolean(formik.touched.password)
                }
            />
            <ButtonLoading
                type="submit"
                className="w-full h-[56px] rounded-xl"
                title="Log in"
                isLoading={isLoading}
            >
                Log in
            </ButtonLoading>

            <div className="relative my-3">
                <div className="h-[1px] w-full bg-primary-200" />
                <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-xs bg-white dark:bg-black px-5 py-0 tracking-wider">
                    <p className="opacity-55 font-semibold">Or login with</p>
                </div>
            </div>

            <SocialButton
                icon={<FlatColorIconsGoogle width={30} height={30} />}
                title="Log in with Google"
            />
        </form>
    )
}
