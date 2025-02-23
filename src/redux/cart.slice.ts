import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import ObjectID from 'bson-objectid'
import { toast } from 'sonner'

import { calcProductPrice } from '@/features/product/utils/calc-product-price'

import type { Cart, CartItem, NewCartItem } from '@/types/cart'

const currentCart = localStorage.getItem('_cart') ?? JSON.stringify([] as Cart)
const currentTotal: string = localStorage.getItem('_cart-total') ?? '0'

export type CartState = {
    cart: Cart
    totalAmount: number
}

const initialState: CartState = {
    cart: JSON.parse(currentCart),
    totalAmount: +JSON.parse(currentTotal),
}

const calcTotalAmount: (cart: Cart) => number = function (cart) {
    let total = 0
    cart.forEach((cartItem) => {
        const price = calcProductPrice(
            cartItem.product.price,
            cartItem.product.discount_percentage
        )
        total += price * cartItem.quantity
    })
    return total
}

const foundIndexInCart: (argument: NewCartItem, cart: Cart) => number = (
    argument,
    cart
) => {
    const foundIndex = cart.findIndex(
        (item) =>
            argument.product.id === item.product.id &&
            argument.variant.id === item.variant.id
    )
    return foundIndex
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        buyNow: (state, action: PayloadAction<NewCartItem>) => {
            const { product, variant } = action.payload
            const id = ObjectID().toHexString()

            const foundIndex = foundIndexInCart(
                { product, variant },
                state.cart
            )

            if (foundIndex === -1) {
                state.cart = [{ id, product, variant, quantity: 1 }]
            } else {
                state.cart[foundIndex].quantity++
                state.cart = [state.cart[foundIndex]]
            }

            toast.success('Vui lòng kiểm tra thông tin thanh toán')
        },
        addCart: (state, action: PayloadAction<NewCartItem>) => {
            const { product, quantity, variant } = action.payload
            const foundIndex = foundIndexInCart(
                { product, variant },
                state.cart
            )

            if (foundIndex === -1) {
                const id = ObjectID().toHexString()
                const newCart = {
                    id,
                    product,
                    quantity: quantity ?? 1,
                    variant,
                }
                state.cart.push(newCart)
            } else {
                state.cart[foundIndex].quantity++
            }

            toast.success('Thêm vào giỏ hàng thành công')

            localStorage.setItem('_cart', JSON.stringify(state.cart))
            state.totalAmount = calcTotalAmount(state.cart)
            localStorage.setItem(
                '_cart-total',
                JSON.stringify(state.totalAmount)
            )
        },
        addMany: (state, action: PayloadAction<NewCartItem[]>) => {
            const newCartItems = action.payload

            newCartItems.forEach((newCartItem) => {
                const { product, variant, quantity } = newCartItem
                const id = ObjectID().toHexString()

                const foundProductExist = state.cart.findIndex(
                    (item) =>
                        item.product._id === product._id &&
                        item.variant.label === variant.label
                )
                if (foundProductExist === -1) {
                    state.cart.push({ id, product, variant, quantity })
                } else {
                    state.cart[foundProductExist].quantity++
                }
            })

            state.totalAmount = calcTotal(state.cart)

            localStorage.setItem('_cart', JSON.stringify(state.cart))
            localStorage.setItem(
                '_cart-total',
                JSON.stringify(state.totalAmount)
            )
        },
        removeCart: (state, action: PayloadAction<string>) => {
            const cartId = action.payload

            const foundProductIndex = state.cart.findIndex(
                (item) => item.id === cartId
            )

            if (foundProductIndex !== -1) {
                const price = calcProductPrice(
                    state.cart[foundProductIndex].product.price,
                    state.cart[foundProductIndex].product.sale ?? ''
                )
                state.totalAmount =
                    state.totalAmount -
                    price * state.cart[foundProductIndex].quantity
                state.cart.splice(foundProductIndex, 1)
            }

            toast.success('Đã xóa sản phẩm khỏi giỏ hàng')

            localStorage.setItem('_cart', JSON.stringify(state.cart))
            localStorage.setItem(
                '_cart-total',
                JSON.stringify(state.totalAmount)
            )
        },
        removeAll: (state) => {
            state.cart = []
            localStorage.setItem('_cart', JSON.stringify(state.cart))
            localStorage.setItem(
                '_cart-total',
                JSON.stringify(state.totalAmount)
            )
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {
            const cartId = action.payload
            const foundProductIndex = state.cart.findIndex(
                (item) => item.id === cartId
            )
            if (foundProductIndex !== -1) {
                const price = calcProductPrice(
                    state.cart[foundProductIndex].product.price,
                    state.cart[foundProductIndex].product.sale ?? ''
                )

                if (
                    state.cart[foundProductIndex].quantity <
                    state.cart[foundProductIndex].variant.inStock
                ) {
                    state.cart[foundProductIndex].quantity++
                    state.totalAmount = state.totalAmount + price
                } else {
                    toast.warning(
                        'Vượt quá số lượng sản phẩm còn lại trong kho'
                    )
                }
            }

            localStorage.setItem('_cart', JSON.stringify(state.cart))
            localStorage.setItem(
                '_cart-total',
                JSON.stringify(state.totalAmount)
            )
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const cartId = action.payload
            const foundProductIndex = state.cart.findIndex(
                (item) => item.id === cartId
            )
            if (foundProductIndex !== -1) {
                if (state.cart[foundProductIndex].quantity > 1) {
                    if (state.cart[foundProductIndex].product.sale) {
                        const price = calcProductPrice(
                            state.cart[foundProductIndex].product.price,
                            state.cart[foundProductIndex].product.sale
                        )
                        state.totalAmount = state.totalAmount - price
                    } else {
                        state.totalAmount =
                            state.totalAmount -
                            state.cart[foundProductIndex].product.price
                    }
                    state.cart[foundProductIndex].quantity--
                }
            }

            localStorage.setItem('_cart', JSON.stringify(state.cart))
            localStorage.setItem(
                '_cart-total',
                JSON.stringify(state.totalAmount)
            )
        },
        resetCart: (state) => {
            state.cart = []
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    buyNow,
    addCart,
    addMany,
    removeCart,
    removeAll,
    incrementQuantity,
    decrementQuantity,
    resetCart,
} = cartSlice.actions

export default cartSlice.reducer
