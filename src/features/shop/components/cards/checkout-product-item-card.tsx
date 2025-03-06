import { type CartItem } from '@/types/cart'
import { VNDCurrencyFormat } from '@/utils/format'

import { calcProductPrice } from '../../../product/utils/calc-product-price'
import { getCartImageThumbnail } from './cart-item-card'

function CheckoutProductItemCard({ data }: { data: CartItem }) {
    return (
        <li key={data.product.id}>
            <div className="flex items-center justify-start gap-3">
                <div className="p-2 border rounded-lg">
                    <img
                        src={getCartImageThumbnail(data)}
                        alt={data.product.name}
                        className="size-[48px]"
                    />
                </div>
                <div className="flex items-center justify-between w-[calc(100%-66px)]">
                    <div className="flex flex-col gap-0.5">
                        <p className="font-medium">{data.product.name}</p>
                        <p className="w-fit font-medium text-xxs px-2 py-1 rounded-md bg-[#f3f4f6]">
                            SKU: {data.variant.SKU}
                        </p>
                    </div>
                    <div>
                        {data.product.discount_percentage && (
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-base text-red-500 font-semibold">
                                    {VNDCurrencyFormat(
                                        calcProductPrice(
                                            data.product.price,
                                            data.product.discount_percentage
                                        )
                                    )}
                                </p>
                                <p className="mt-1 text-xs leading-none line-through text-gray-400 font-medium">
                                    {VNDCurrencyFormat(data.product.price)}
                                </p>
                            </div>
                        )}
                        {!data.product.discount_percentage && (
                            <div className="flex flex-col items-center">
                                <p className="text-base leading-[24px] text-red-500 font-semibold">
                                    {VNDCurrencyFormat(data.product.price)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* 
            {index !== cart.length - 1 && (
                <div className="mt-3 h-[1px] w-full bg-border" />
            )} */}
        </li>
    )
}

export default CheckoutProductItemCard
