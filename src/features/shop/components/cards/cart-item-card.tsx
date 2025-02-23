import { AiOutlineDelete } from 'react-icons/ai'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { Checkbox } from '@/components/ui/checkbox'

import { config } from '@/config'
import {
    decrementQuantity,
    incrementQuantity,
    removeCart,
} from '@/redux/cart.slice'
import { CartItem } from '@/types/cart'
import { VNDCurrencyFormat } from '@/utils/format'
import { isObjectEmpty } from '@/utils/is-object-empty'

import { calcProductPrice } from '../../../product/utils/calc-product-price'

interface Props {
    cartItem: CartItem
}
export default function CartItemCard({ cartItem }: Props) {
    const dispatch = useDispatch()
    const handleRemoveCart = (cartId: string) => {
        dispatch(removeCart(cartId))
    }

    const getImageThumbnail = () => {
        if (!isObjectEmpty(cartItem.variant)) {
            return cartItem.variant.images[0].image_url
        }
        return cartItem.product.thumbnail
    }

    return (
        <div
            key={cartItem.id}
            className="rounded-xl px-4 pt-[10px] pb-[45px] flex items-center gap-x-3 bg-white mt-[10px]"
        >
            <Checkbox id={cartItem.id} />
            <div className="flex gap-x-3 w-[calc(100%-28px)]">
                <div className="p-2 border rounded-lg">
                    <img
                        src={getImageThumbnail()}
                        alt={cartItem.product.name}
                        className="size-[50px] object-contain"
                    />
                </div>

                <div className="w-[calc(100%-68px)] flex items-center justify-between">
                    <div>
                        <Link
                            to={`${config.routes.products}/${cartItem.product.slug}`}
                            className="text-base font-medium hover:text-[#2275fb] transition-colors duration-300"
                        >
                            {cartItem.product.name}
                        </Link>
                        <div className="mt-1 text-xs py-[6px] px-[10px] bg-wallground-light w-fit rounded-md">
                            SKU: {cartItem.variant.SKU}
                        </div>
                    </div>

                    <div className="h-[60px] flex items-center justify-end gap-6">
                        {cartItem.product.discount_percentage && (
                            <div className="flex flex-col items-end justify-center">
                                <p className="text-base leading-[24px] text-red-500 font-medium">
                                    {VNDCurrencyFormat(
                                        calcProductPrice(
                                            cartItem.product.price,
                                            cartItem.product.discount_percentage
                                        )
                                    )}
                                </p>
                                <p className="mt-1 text-xs leading-none line-through text-gray-400 font-medium">
                                    {VNDCurrencyFormat(cartItem.product.price)}
                                </p>
                            </div>
                        )}
                        {!cartItem.product.discount_percentage && (
                            <div className="flex flex-col items-end">
                                <p className="text-base leading-[24px] text-red-500 font-medium">
                                    {VNDCurrencyFormat(cartItem.product.price)}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center justify-center">
                            <button
                                className="text-[24px] size-[32px] border flex items-center justify-center rounded-tl-md rounded-bl-md hover:bg-wallground-light transition duration-200"
                                onClick={() => {
                                    if (cartItem.quantity > 1) {
                                        dispatch(decrementQuantity(cartItem.id))
                                    } else {
                                        toast.success(
                                            'Số lượng sản phẩm đạt tối thiểu',
                                            {
                                                description:
                                                    'Bạn có muốn xóa sản phẩm khỏi giỏ hàng',
                                                action: {
                                                    label: 'Xác nhận',
                                                    onClick: () =>
                                                        dispatch(
                                                            removeCart(
                                                                cartItem.id
                                                            )
                                                        ),
                                                },
                                            }
                                        )
                                    }
                                }}
                            >
                                <FaMinus size={10} />
                            </button>
                            <p className="border-t border-b size-[32px] flex items-center justify-center">
                                {cartItem.quantity}
                            </p>
                            <button
                                className="text-[24px] size-[32px] border flex items-center justify-center rounded-tr-md rounded-br-md hover:bg-wallground-light transition duration-200"
                                onClick={() => {
                                    dispatch(incrementQuantity(cartItem.id))
                                }}
                            >
                                <FaPlus size={10} />
                            </button>
                        </div>
                        <button
                            title="Xóa"
                            onClick={() => {
                                handleRemoveCart(cartItem.id)
                            }}
                        >
                            <AiOutlineDelete size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
