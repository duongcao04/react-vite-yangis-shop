import { Cart } from './cart'
import { Payment } from './payment'

export type Order = Timestampz & {
    id: string
    user: User
    delivery_nformation: {
        full_name: string
        phone: number
        email: string
        address: string
    }
    payment: Payment
    products: Cart
    total_amount: number
    subtotal: number
    shipping_fee: number | 0
    bonus_points: number
}

export type NewOrder = Omit<
    Order,
    'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'user' | 'payment'
> & {
    user_id: string
    payment_id: string
}
