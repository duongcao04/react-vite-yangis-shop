import { Helmet } from 'react-helmet-async'
import { AiOutlineDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import CustomizeBreadcrumb from '@/components/customize-breadcrumb'
import { Checkbox } from '@/components/ui/checkbox'

import { config } from '@/config'
import { removeAll } from '@/redux/cart.slice'
import { RootState } from '@/redux/store'

import CartItemCard from '../components/cards/cart-item-card'
import OrderInformation from '../components/order-information'

function CartPage() {
    const dispatch = useDispatch()
    const { cart } = useSelector((state: RootState) => state.cart)

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Cart - Yangis Shop</title>
            </Helmet>

            <div className="my-4">
                <CustomizeBreadcrumb />
            </div>
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            <div className="mb-20">
                {cart.length == 0 && (
                    <div className="w-full my-[80px]">
                        <p className="text-center">
                            No products found in the cart.
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
                                        Select all ({cart.length})
                                    </label>
                                </div>
                                <button
                                    title="Delete all"
                                    onClick={() => {
                                        dispatch(removeAll())
                                    }}
                                >
                                    <AiOutlineDelete size={20} />
                                </button>
                            </div>

                            {cart.map((cartItem) => (
                                <CartItemCard
                                    key={cartItem.id}
                                    cartItem={cartItem}
                                />
                            ))}
                        </div>
                        <div className="col-span-1">
                            <OrderInformation
                                action={
                                    <Link
                                        to={config.routes.check_out}
                                        className="w-full h-[56px] leading-[56px] text-center rounded-md bg-[#df2121] hover:bg-[#b81a1a] text-white font-semibold transition duration-200"
                                    >
                                        Confirm
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
