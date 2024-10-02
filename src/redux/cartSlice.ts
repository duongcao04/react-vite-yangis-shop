import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
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
        buyNow: (state, action: PayloadAction<Product>) => {
            const product = action.payload
            state.cart = [
                { product: product, quantity: 1, variant: product.variants[0] },
            ]
            toast.success('Vui lòng kiểm tra thông tin thanh toán')
        },
        addCart: (state, action: PayloadAction<Product>) => {
            const newProduct = action.payload
            const foundProductExist = state.cart.findIndex(
                (item) => item.product._id === newProduct._id
            )
            if (foundProductExist === -1) {
                const newCartItem: CartItem = {
                    product: newProduct,
                    quantity: 1,
                    variant: newProduct.variants[0],
                }
                state.cart.push(newCartItem)
            } else {
                state.cart[foundProductExist].quantity++
            }

            state.total = calcTotal(state.cart)

            toast.success('Thêm vào giỏ hàng thành công')

            localStorage.setItem('_cart', JSON.stringify(state.cart))
            localStorage.setItem('_cart-total', JSON.stringify(state.total))
        },
        addMany: (state, action: PayloadAction<Product[]>) => {
            const newProducts = action.payload

            newProducts.forEach((newProduct) => {
                const foundProductExist = state.cart.findIndex(
                    (item) => item.product._id === newProduct._id
                )
                if (foundProductExist === -1) {
                    const newCartItem: CartItem = {
                        product: newProduct,
                        quantity: 1,
                        variant: newProduct.variants[0],
                    }
                    state.cart.push(newCartItem)
                } else {
                    state.cart[foundProductExist].quantity++
                }
            })

            state.total = calcTotal(state.cart)

            localStorage.setItem('_cart', JSON.stringify(state.cart))
            localStorage.setItem('_cart-total', JSON.stringify(state.total))
        },
        removeCart: (state, action) => {
            const productId = action.payload
            const foundProductIndex = state.cart.findIndex(
                (item) => item.product._id === productId
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
        incrementQuantity: (state, action) => {
            const productId = action.payload
            const foundProductIndex = state.cart.findIndex(
                (item) => item.product._id === productId
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
        decrementQuantity: (state, action) => {
            const productId = action.payload
            const foundProductIndex = state.cart.findIndex(
                (item) => item.product._id === productId
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
                            state.total - state.cart[foundProductIndex].product.price
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
