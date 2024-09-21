import { calcSalePrice } from '@/utils/calcSalePrice'
import { formatMoney } from '@/utils/numberServices'

export interface ICheckoutProductsProps {
    products: ProductCart[]
}

export default function CheckoutProducts({ products }: ICheckoutProductsProps) {
    return (
        <div className="bg-white p-4 rounded-xl h-fit">
            <p className="font-semibold">
                Sản phẩm trong đơn ({products.length})
            </p>
            <ul className="mt-3 flex flex-col gap-3">
                {products.map((product, index) => (
                    <li key={product._id}>
                        <div className="flex items-center justify-start gap-3">
                            <div className="p-2 border rounded-lg">
                                <img
                                    src={product.color.images[0]}
                                    alt={product.name}
                                    className="size-[48px]"
                                />
                            </div>
                            <div className="flex items-center justify-between w-[calc(100%-66px)]">
                                <div className="flex flex-col gap-0.5">
                                    <p className="font-medium">
                                        {product.name}
                                    </p>
                                    <p className="w-fit font-medium text-xxs px-2 py-1 rounded-md bg-[#f3f4f6]">
                                        Màu: {product.color.label}
                                    </p>
                                </div>
                                <div>
                                    {product.sale && (
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-base text-red-500 font-semibold">
                                                {formatMoney(
                                                    calcSalePrice(
                                                        product.price,
                                                        product.sale
                                                    )
                                                )}
                                            </p>
                                            <p className="mt-1 text-xs leading-none line-through text-gray-400 font-medium">
                                                {formatMoney(product.price)}
                                            </p>
                                        </div>
                                    )}
                                    {!product.sale && (
                                        <div className="flex flex-col items-center">
                                            <p className="text-base leading-[24px] text-red-500 font-semibold">
                                                {formatMoney(product.price)}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {index !== products.length - 1 && (
                            <div className="mt-3 h-[1px] w-full bg-border" />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}
