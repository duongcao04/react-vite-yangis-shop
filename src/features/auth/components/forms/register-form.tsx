import { useState } from 'react'

import { Input } from '@nextui-org/input'
import { FormikProps, useFormik } from 'formik'

import { EyeFilledIcon } from '@/components/icons/eye-filled-icon'
import { EyeSlashFilledIcon } from '@/components/icons/eye-slash-filled-icon'
import { FlatColorIconsGoogle } from '@/components/icons/google-icon'
import { ButtonLoading } from '@/components/ui/button-loading'


import { useRegister } from '../../hooks/use-register'
import {
    type RegisterFormValue,
    registerValidateSchema as validationSchema,
} from '../../schemas/register-validate-schema'
import SocialButton from '../buttons/social-button'

export const InputPassword = ({ ...props }) => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible)

    return (
        <Input
            endContent={
                <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    tabIndex={-1}
                    onClick={toggleVisibility}
                >
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            {...props}
            autoComplete="password"
            type={isVisible ? 'text' : 'password'}
        />
    )
}

export default function RegisterForm() {
    const { isLoading, register } = useRegister()

    const inputStyles = {
        inputWrapper:
            'border border-transparent group-data-[focus-visible=true]:ring-transparent group-data-[focus=true]:border-2 group-data-[focus=true]:border-primary',
        errorMessage: 'font-semibold',
    }

    const initialValues: RegisterFormValue = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    }

    const formik: FormikProps<RegisterFormValue> = useFormik<RegisterFormValue>(
        {
            initialValues,
            validationSchema,
            onSubmit: async (values) => {
                const newUser = {
                    first_name: values.firstName,
                    last_name: values.lastName,
                    email: values.email,
                    phone_number: transformPhoneNumber(
                        values.phoneNumber.toString(),
                        '+84'
                    ),
                    password: values.password,
                }

                await register(newUser)
            },
        }
    )

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col gap-6"
        >
            <div className="grid grid-cols-2 gap-6">
                <Input
                    isRequired
                    id="firstName"
                    name="firstName"
                    label="First name"
                    classNames={inputStyles}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    errorMessage={
                        Boolean(formik.touched.firstName) &&
                        formik.errors.firstName
                    }
                    isInvalid={Boolean(
                        formik.errors.firstName && formik.touched.firstName
                    )}
                />
                <Input
                    isRequired
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    classNames={inputStyles}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    errorMessage={
                        Boolean(formik.touched.lastName) &&
                        formik.errors.lastName
                    }
                    isInvalid={Boolean(
                        formik.errors.lastName && formik.touched.lastName
                    )}
                />
            </div>
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
                isInvalid={Boolean(formik.errors.email && formik.touched.email)}
            />
            <Input
                isRequired
                id="phoneNumber"
                type="number"
                name="phoneNumber"
                label="Phone number"
                classNames={inputStyles}
                value={formik.values.phoneNumber}
                onChange={(e) => {
                    formik.setFieldValue(
                        'phoneNumber',
                        e.target.value.toString()
                    )
                }}
                errorMessage={
                    Boolean(formik.touched.phoneNumber) &&
                    formik.errors.phoneNumber
                }
                isInvalid={Boolean(
                    formik.errors.phoneNumber && formik.touched.phoneNumber
                )}
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
                isInvalid={Boolean(
                    formik.errors.password && formik.touched.password
                )}
            />
            <InputPassword
                isRequired
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                classNames={inputStyles}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                errorMessage={
                    Boolean(formik.touched.confirmPassword) &&
                    formik.errors.confirmPassword
                }
                isInvalid={Boolean(
                    formik.errors.confirmPassword &&
                        formik.touched.confirmPassword
                )}
            />
            <ButtonLoading
                className="w-full h-[56px] rounded-xl"
                title="Create account"
                isLoading={isLoading}
            >
                Create account
            </ButtonLoading>

            <div className="relative my-3">
                <div className="h-[1px] w-full bg-primary-200" />
                <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-xs bg-white dark:bg-black px-5 py-0 tracking-wider">
                    <p className="opacity-55 font-semibold">Or register with</p>
                </div>
            </div>

            <SocialButton
                icon={<FlatColorIconsGoogle width={30} height={30} />}
                title="Sign up with Google"
            />
        </form>
    )
}
