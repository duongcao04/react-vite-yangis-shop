import { Product } from './product'
import { Variant } from './variant'

export type CartItem = {
    id: string
    product: Product
    variant: Variant
    quantity: number
}
export type Cart = CartItem[]

export type NewCartItem = Pick<CartItem, 'product' | 'variant'> & {
    quantity?: number
}
