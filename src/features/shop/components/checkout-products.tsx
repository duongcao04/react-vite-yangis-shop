import { Cart } from '@/types/cart'

import CheckoutProductItemCard from './cards/checkout-product-item-card'

export interface Props {
    cart: Cart
}
export default function CheckoutProducts({ cart }: Props) {
    return (
        <div className="bg-white p-4 rounded-xl h-fit">
            <p className="font-semibold">Sản phẩm trong đơn ({cart.length})</p>
            <ul className="mt-3 flex flex-col gap-3">
                {cart.map((item) => (
                    <CheckoutProductItemCard key={item.id} data={item} />
                ))}
            </ul>
        </div>
    )
}
