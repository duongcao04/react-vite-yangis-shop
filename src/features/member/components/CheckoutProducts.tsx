import { calcSalePrice } from '@/utils/calcSalePrice'
import { formatMoney } from '@/utils/numberServices'

export interface ICheckoutProductsProps {
    cart: Cart
}

export default function CheckoutProducts({ cart }: ICheckoutProductsProps) {
    return (
        <div className="bg-white p-4 rounded-xl h-fit">
            <p className="font-semibold">Sản phẩm trong đơn ({cart.length})</p>
            <ul className="mt-3 flex flex-col gap-3">
                {cart.map((item, index) => (
                    <li key={item.product._id}>
                        <div className="flex items-center justify-start gap-3">
                            <div className="p-2 border rounded-lg">
                                <img
                                    src={item.variant.images[0]}
                                    alt={item.product.name}
                                    className="size-[48px]"
                                />
                            </div>
                            <div className="flex items-center justify-between w-[calc(100%-66px)]">
                                <div className="flex flex-col gap-0.5">
                                    <p className="font-medium">
                                        {item.product.name}
                                    </p>
                                    <p className="w-fit font-medium text-xxs px-2 py-1 rounded-md bg-[#f3f4f6]">
                                        Màu: {item.variant.label}
                                    </p>
                                </div>
                                <div>
                                    {item.product.sale && (
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-base text-red-500 font-semibold">
                                                {formatMoney(
                                                    calcSalePrice(
                                                        item.product.price,
                                                        item.product.sale
                                                    )
                                                )}
                                            </p>
                                            <p className="mt-1 text-xs leading-none line-through text-gray-400 font-medium">
                                                {formatMoney(
                                                    item.product.price
                                                )}
                                            </p>
                                        </div>
                                    )}
                                    {!item.product.sale && (
                                        <div className="flex flex-col items-center">
                                            <p className="text-base leading-[24px] text-red-500 font-semibold">
                                                {formatMoney(
                                                    item.product.price
                                                )}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {index !== cart.length - 1 && (
                            <div className="mt-3 h-[1px] w-full bg-border" />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
