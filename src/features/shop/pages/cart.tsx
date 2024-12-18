import { Helmet } from 'react-helmet-async'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import CustomizeBreadcrumb from '@/components/customize-breadcrumb'
import { Checkbox } from '@/components/ui/checkbox'

import { config } from '@/configs'
import {
    decrementQuantity,
    incrementQuantity,
    removeAll,
    removeCart,
} from '@/redux/cart-slice'
import { RootState } from '@/redux/store'
import { calcSalePrice } from '@/utils/calc-sale-price'
import { formatMoney } from '@/utils/number-services'

import OrderInformation from '../components/order-information'

function CartPage() {
    const dispatch = useDispatch()
    const { cart } = useSelector((state: RootState) => state.cart)

    const handleRemoveCart = (cartId: string) => {
        dispatch(removeCart(cartId))
    }

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Giỏ hàng</title>
            </Helmet>

            <div className="my-4">
                <CustomizeBreadcrumb />
            </div>
            <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
            <div className="mb-20">
                {cart.length == 0 && (
                    <div className="w-full my-[80px]">
                        <p className="text-center">
                            Không tìm thấy sản phẩm nào trong giỏ hàng.
                        </p>
                    </div>
                )}
                {cart.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                            <div className="bg-white w-full flex items-center justify-between px-4 py-[10px] rounded-xl">
                                <div className="flex items-center gap-x-3">
                                    <Checkbox id="all" />
                                    <label
                                        htmlFor="all"
                                        className="text-[14px] leading-[24px] font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Chọn tất cả ({cart.length})
                                    </label>
                                </div>
                                <button
                                    title="Xóa tất cả"
                                    onClick={() => {
                                        dispatch(removeAll())
                                    }}
                                >
                                    <AiOutlineDelete size={20} />
                                </button>
                            </div>

                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-xl px-4 pt-[10px] pb-[45px] flex items-center gap-x-3 bg-white mt-[10px]"
                                >
                                    <Checkbox id={item.id} />
                                    <div className="flex gap-x-3 w-[calc(100%-28px)]">
                                        <div className="p-2 border rounded-lg">
                                            <img
                                                src={item.variant.images[0]}
                                                alt={item.product.name}
                                                className="size-[50px] object-contain"
                                            />
                                        </div>

                                        <div className="w-[calc(100%-68px)] flex items-center justify-between">
                                            <div>
                                                <Link
                                                    to={`${config.routes.products}/${item.product.slug}`}
                                                    className="text-base font-medium hover:text-[#2275fb] transition-colors duration-300"
                                                >
                                                    {item.product.name}
                                                </Link>
                                                <div className="mt-1 text-xs py-[6px] px-[10px] bg-wallground-light w-fit rounded-md">
                                                    Màu: {item.variant.label}
                                                </div>
                                            </div>

                                            <div className="h-[60px] flex items-center justify-end gap-6">
                                                {item.product.sale && (
                                                    <div className="flex flex-col items-end justify-center">
                                                        <p className="text-base leading-[24px] text-red-500 font-medium">
                                                            {formatMoney(
                                                                calcSalePrice(
                                                                    item.product
                                                                        .price,
                                                                    item.product
                                                                        .sale
                                                                )
                                                            )}
                                                        </p>
                                                        <p className="mt-1 text-xs leading-none line-through text-gray-400 font-medium">
                                                            {formatMoney(
                                                                item.product
                                                                    .price
                                                            )}
                                                        </p>
                                                    </div>
                                                )}
                                                {!item.product.sale && (
                                                    <div className="flex flex-col items-end">
                                                        <p className="text-base leading-[24px] text-red-500 font-medium">
                                                            {formatMoney(
                                                                item.product
                                                                    .price
                                                            )}
                                                        </p>
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-center">
                                                    <button
                                                        className="text-[24px] size-[32px] border flex items-center justify-center rounded-tl-md rounded-bl-md hover:bg-wallground-light transition duration-200"
                                                        onClick={() => {
                                                            if (
                                                                item.quantity >
                                                                1
                                                            ) {
                                                                dispatch(
                                                                    decrementQuantity(
                                                                        item.id
                                                                    )
                                                                )
                                                            } else {
                                                                toast.success(
                                                                    'Số lượng sản phẩm đạt tối thiểu',
                                                                    {
                                                                        description:
                                                                            'Bạn có muốn xóa sản phẩm khỏi giỏ hàng',
                                                                        action: {
                                                                            label: 'Xác nhận',
                                                                            onClick:
                                                                                () =>
                                                                                    dispatch(
                                                                                        removeCart(
                                                                                            item.id
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
                                                        {item.quantity}
                                                    </p>
                                                    <button
                                                        className="text-[24px] size-[32px] border flex items-center justify-center rounded-tr-md rounded-br-md hover:bg-wallground-light transition duration-200"
                                                        onClick={() => {
                                                            dispatch(
                                                                incrementQuantity(
                                                                    item.id
                                                                )
                                                            )
                                                        }}
                                                    >
                                                        <FaPlus size={10} />
                                                    </button>
                                                </div>
                                                <button
                                                    title="Xóa"
                                                    onClick={() => {
                                                        handleRemoveCart(
                                                            item.id
                                                        )
                                                    }}
                                                >
                                                    <AiOutlineDelete
                                                        size={20}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-span-1">
                            <OrderInformation
                                action={
                                    <Link
                                        to={config.routes.check_out}
                                        className="w-full h-[56px] leading-[56px] text-center rounded-md bg-[#df2121] hover:bg-[#b81a1a] text-white font-semibold transition duration-200"
                                    >
                                        Xác nhận đơn
                                    </Link>
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage
