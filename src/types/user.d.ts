import { Comment } from './comment'

export enum Role {
    customer = 'CUSTOMER',
    staff = 'STAFF',
    admin = 'ADMIN',
}
export enum AccountType {
    local = 'LOCAL',
    google = 'GOOGLE',
    facebook = 'FACEBOOK',
}

export type User = Timestampz & {
    id: string
    first_name: string
    last_name: string
    username: string
    email: string
    phone_number: string
    birthday_date: string | null
    is_active: boolean
    avatar: string
    bonus_points: number
    account_type: AccountType
    role: Role
    refresh_token: string | null
    comments?: Comment[]
}
