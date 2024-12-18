import * as yup from 'yup'

export type RegisterFormValue = yup.InferType<typeof registerValidateSchema>

export const registerValidateSchema = yup.object().shape({
    firstName: yup
        .string()
        .required('First name is required!')
        .max(30, 'First name must be at most 30 characters'),
    lastName: yup
        .string()
        .required('Last name is required!')
        .max(30, 'Last name must be at most 30 characters'),
    email: yup
        .string()
        .required('Email is required!')
        .email('Invalid email address'),
    phoneNumber: yup
        .string()
        .required('Phone number is required!')
        .min(10, 'Phone number must be exactly 10 digits')
        .max(10, 'Phone number must be exactly 10 digits'),
    password: yup
        .string()
        .required('Password is required!')
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup
        .string()
        .required('Confirm password is required!')
        .min(8, 'Confirm password must be at least 8 characters')
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        }),
})
