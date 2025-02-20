type CartItem = {
    id: string
    product: Product
    variant: Variant
    quantity: number
}
type Cart = CartItem[]

type NewCartItem = Pick<CartItem, 'product' | 'quantity' | 'variant'>
