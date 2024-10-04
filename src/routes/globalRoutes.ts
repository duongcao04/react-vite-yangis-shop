import { RouteProps } from 'react-router-dom'

import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import Error from '@/pages/Error'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'

import Account from '@/features/member/pages/Account'
import Cart from '@/features/member/pages/Cart'
import Checkout from '@/features/member/pages/Checkout'
import MyOrder from '@/features/member/pages/MyOrder'
import WishList from '@/features/member/pages/WishList'
import ProductDetail from '@/features/product/pages/ProductDetail'
import Products from '@/features/product/pages/Products'

import { config } from '@/config'
import EmptyLayout from '@/layouts/EmptyLayout'
import UserInformationLayout from '@/layouts/UserInformationLayout'

export type TRoute = Omit<RouteProps, 'path' | 'element'> & {
    path: string
    layout?: ({ children }: { children: React.ReactNode }) => React.ReactElement
    element: () => React.ReactElement
    isPrivateRoute: boolean
}

const globalRoutes: TRoute[] = [
    {
        path: config.routes.home,
        element: HomePage,
        handle: {
            crumb: () => 'Trang chủ',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.register,
        layout: EmptyLayout,
        element: RegisterPage,
        handle: {
            crumb: () => 'Đăng ký',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.login,
        layout: EmptyLayout,
        element: LoginPage,
        handle: {
            crumb: () => 'Đăng nhập',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.favourite,
        element: WishList,
        handle: {
            crumb: () => 'Yêu thích',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.cart,
        element: Cart,
        handle: {
            crumb: () => 'Giỏ hàng',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.products,
        element: Products,
        handle: {
            crumb: () => 'Sản phẩm',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.product_detail,
        element: ProductDetail,
        handle: {
            crumb: () => 'Chi tiết sản phẩm',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.about,
        element: AboutPage,
        handle: {
            crumb: () => 'Về chúng tôi',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.contact,
        element: ContactPage,
        handle: {
            crumb: () => 'Liên hệ',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.check_out,
        element: Checkout,
        handle: {
            crumb: () => 'Thanh toán',
        },
        isPrivateRoute: true,
    },
    {
        path: config.routes.account_information,
        element: Account,
        layout: UserInformationLayout,
        handle: {
            crumb: () => 'Thông tin cá nhân',
        },
        isPrivateRoute: true,
    },
    {
        path: config.routes.my_order,
        element: MyOrder,
        layout: UserInformationLayout,
        handle: {
            crumb: () => 'Đơn hàng của tôi',
        },
        isPrivateRoute: true,
    },
    {
        path: config.routes.error,
        element: Error,
        handle: {
            crumb: () => '404 Not Found',
        },
        isPrivateRoute: false,
    },
]

export default globalRoutes
