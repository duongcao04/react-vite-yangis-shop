export enum Role {
    customer = 'CUSTOMER',
    staff = 'STAFF',
    admin = 'ADMIN',
}

type User = Timestampz & {
    id: string
    first_name: string
    last_name: string
    username: string
    email: string
    birthday_date: string | null
    phone_number: string
    account_type: string
    is_active: boolean
    avatar: string
    bonus_points: number
    role: Role
    refresh_token: string | null
}
