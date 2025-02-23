import { configureStore } from '@reduxjs/toolkit'

import cartReducer from '@/redux/cart.slice'
import wishlistReducer from '@/redux/wishlist-slice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
