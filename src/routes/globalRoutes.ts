import { ElementType } from 'react'

import Account from '@/features/Permissions/Member/pages/Account'
import Cart from '@/features/Permissions/Member/pages/Cart'
import Checkout from '@/features/Permissions/Member/pages/Checkout'
import MyOrder from '@/features/Permissions/Member/pages/MyOrder'
import WishList from '@/features/Permissions/Member/pages/WishList'
import ProductDetail from '@/features/Product/pages/ProductDetail'
import Products from '@/features/Product/pages/Products'
import EmptyLayout from '@/layouts/EmptyLayout'
import AuthGuard from '@/layouts/Guard/AuthGuard'
import UserInformationLayout from '@/layouts/UserInformationLayout'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import Error from '@/pages/Error'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'

export interface IRoute {
    id: number
    path: string
    element: ElementType
    handle?: { crumb: () => string }
    layout?: ElementType
    guard?: ElementType
}

const globalRoutes: IRoute[] = [
    {
        id: 1,
        path: '/',
        element: HomePage,
        handle: {
            crumb: () => 'Trang chủ',
        },
    },
    {
        id: 2,
        path: '/register',
        layout: EmptyLayout,
        element: RegisterPage,
        handle: {
            crumb: () => 'Đăng ký',
        },
    },
    {
        id: 3,
        path: '/login',
        layout: EmptyLayout,
        element: LoginPage,
        handle: {
            crumb: () => 'Đăng nhập',
        },
    },
    {
        id: 4,
        path: '/wish-list',
        element: WishList,
        handle: {
            crumb: () => 'Yêu thích',
        },
    },
    {
        id: 5,
        path: '/cart',
        element: Cart,
        handle: {
            crumb: () => 'Giỏ hàng',
        },
    },
    {
        id: 6,
        path: '/check-out',
        element: Checkout,
        handle: {
            crumb: () => 'Thanh toán',
        },
    },
    {
        id: 7,
        path: '/account',
        element: Account,
        layout: UserInformationLayout,
        guard: AuthGuard,
        handle: {
            crumb: () => 'Thông tin cá nhân',
        },
    },
    {
        id: 8,
        path: '/my-order',
        element: MyOrder,
        layout: UserInformationLayout,
        guard: AuthGuard,
        handle: {
            crumb: () => 'Đơn hàng của tôi',
        },
    },
    {
        id: 9,
        path: '/products',
        element: Products,
        handle: {
            crumb: () => 'Sản phẩm',
        },
    },
    {
        id: 10,
        path: '/products/:productId',
        element: ProductDetail,
        handle: {
            crumb: () => 'Chi tiết sản phẩm',
        },
    },
    {
        id: 11,
        path: '/about',
        element: AboutPage,
        handle: {
            crumb: () => 'Về chúng tôi',
        },
    },
    {
        id: 12,
        path: '/contact',
        element: ContactPage,
        handle: {
            crumb: () => 'Liên hệ',
        },
    },
    { id: 99, path: '/*', element: Error },
]

export default globalRoutes
