import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import ObjectID from 'bson-objectid'
import { toast } from 'sonner'

import { calcSalePrice } from '@/utils/calcSalePrice'

const currentCart = localStorage.getItem('_cart') ?? JSON.stringify([] as Cart)
const currentTotal: string = localStorage.getItem('_cart-total') ?? '0'

export interface ICartSlice {
    cart: Cart
    total: number
}

const initialState: ICartSlice = {
    cart: JSON.parse(currentCart),
    total: +JSON.parse(currentTotal),
}

const calcTotal: (cart: Cart) => number = function (cart) {
    let total = 0
    cart.forEach((cartItem) => {
        if (cartItem.product.sale) {
            const price = calcSalePrice(
                cartItem.product.price,
                cartItem.product.sale
            )
            total += price * cartItem.quantity
        } else {
            total += cartItem.product.price * cartItem.quantity
        }
    })
    return total
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        buyNow: (state, action: PayloadAction<NewCartItem>) => {
            const { product, quantity, variant } = action.payload
            const id = ObjectID().toHexString()

            state.cart = [{ id, product, quantity, variant }]
            toast.success('Vui lòng kiểm tra thông tin thanh toán')
        },
        addCart: (state, action: PayloadAction<NewCartItem>) => {
            const { product, quantity, variant } = action.payload
            const id = ObjectID().toHexString()

            const foundProductExist = state.cart.findIndex(
                (item) =>
                    item.product._id === product._id &&
                    item.variant.label === variant.label
            )

            if (foundProductExist === -1) {
                state.cart.push({ id, product, quantity, variant })
            } else {
                state.cart[foundProductExist].quantity++
            }

            toast.success('Thêm vào giỏ hàng thành công')

            localStorage.setItem('_cart', JSON.stringify(state.cart))
            state.total = calcTotal(state.cart)
            localStorage.setItem('_cart-total', JSON.stringify(state.total))
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

            state.total = calcTotal(state.cart)

            localStorage.setItem('_cart', JSON.stringify(state.cart))
            localStorage.setItem('_cart-total', JSON.stringify(state.total))
        },
        removeCart: (state, action: PayloadAction<string>) => {
            const cartId = action.payload

            const foundProductIndex = state.cart.findIndex(
                (item) => item.id === cartId
            )

            if (foundProductIndex !== -1) {
                state.total =
                    state.total -
                    state.cart[foundProductIndex].product.price *
                        state.cart[foundProductIndex].quantity
                state.cart.splice(foundProductIndex, 1)
            }

            toast.success('Đã xóa sản phẩm khỏi giỏ hàng')

            localStorage.setItem('_cart', JSON.stringify(state.cart))
            localStorage.setItem('_cart-total', JSON.stringify(state.total))
        },
        removeAll: (state) => {
            state.cart = []
            localStorage.setItem('_cart', JSON.stringify(state.cart))
            localStorage.setItem('_cart-total', JSON.stringify(state.total))
        },
        incrementQuantity: (state, action: PayloadAction<string>) => {
            const cartId = action.payload
            const foundProductIndex = state.cart.findIndex(
                (item) => item.id === cartId
            )
            if (foundProductIndex !== -1) {
                const price = calcSalePrice(
                    state.cart[foundProductIndex].product.price,
                    state.cart[foundProductIndex].product.sale ?? ''
                )

                if (
                    state.cart[foundProductIndex].quantity <
                    state.cart[foundProductIndex].variant.inStock
                ) {
                    state.cart[foundProductIndex].quantity++
                    state.total = state.total + price
                } else {
                    toast.warning(
                        'Vượt quá số lượng sản phẩm còn lại trong kho'
                    )
                }
            }

            localStorage.setItem('_cart', JSON.stringify(state.cart))
            localStorage.setItem('_cart-total', JSON.stringify(state.total))
        },
        decrementQuantity: (state, action: PayloadAction<string>) => {
            const cartId = action.payload
            const foundProductIndex = state.cart.findIndex(
                (item) => item.id === cartId
            )
            if (foundProductIndex !== -1) {
                if (state.cart[foundProductIndex].quantity > 1) {
                    if (state.cart[foundProductIndex].product.sale) {
                        const price = calcSalePrice(
                            state.cart[foundProductIndex].product.price,
                            state.cart[foundProductIndex].product.sale
                        )
                        state.total = state.total - price
                    } else {
                        state.total =
                            state.total -
                            state.cart[foundProductIndex].product.price
                    }
                    state.cart[foundProductIndex].quantity--
                }
            }

            localStorage.setItem('_cart', JSON.stringify(state.cart))
            localStorage.setItem('_cart-total', JSON.stringify(state.total))
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
