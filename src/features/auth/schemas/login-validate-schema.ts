import * as yup from 'yup'

export type LoginFormValue = yup.InferType<typeof loginValidateSchema>

export const loginValidateSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required!')
        .email('Invalid email address'),
    password: yup
        .string()
        .required('Password is required!')
        .min(8, 'Password must be at least 8 characters'),
})
