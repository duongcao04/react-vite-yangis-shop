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

import EmptyLayout from '@/layouts/EmptyLayout'
import UserInformationLayout from '@/layouts/UserInformationLayout'
import { pathConstants } from '@/routes/pathConstants'

export type TRoute = Omit<RouteProps, 'path' | 'element'> & {
    path: pathConstants
    layout?: ({ children }: { children: React.ReactNode }) => React.ReactElement
    element: () => React.ReactElement
    isPrivateRoute: boolean
}

const globalRoutes: TRoute[] = [
    {
        path: pathConstants.HOME,
        element: HomePage,
        handle: {
            crumb: () => 'Trang chủ',
        },
        isPrivateRoute: false,
    },
    {
        path: pathConstants.REGISTER,
        layout: EmptyLayout,
        element: RegisterPage,
        handle: {
            crumb: () => 'Đăng ký',
        },
        isPrivateRoute: false,
    },
    {
        path: pathConstants.LOGIN,
        layout: EmptyLayout,
        element: LoginPage,
        handle: {
            crumb: () => 'Đăng nhập',
        },
        isPrivateRoute: false,
    },
    {
        path: pathConstants.FAVOURITE,
        element: WishList,
        handle: {
            crumb: () => 'Yêu thích',
        },
        isPrivateRoute: false,
    },
    {
        path: pathConstants.CART,
        element: Cart,
        handle: {
            crumb: () => 'Giỏ hàng',
        },
        isPrivateRoute: false,
    },
    {
        path: pathConstants.PRODUCTS,
        element: Products,
        handle: {
            crumb: () => 'Sản phẩm',
        },
        isPrivateRoute: false,
    },
    {
        path: pathConstants.PRODUCT_DETAIL,
        element: ProductDetail,
        handle: {
            crumb: () => 'Chi tiết sản phẩm',
        },
        isPrivateRoute: false,
    },
    {
        path: pathConstants.ABOUT,
        element: AboutPage,
        handle: {
            crumb: () => 'Về chúng tôi',
        },
        isPrivateRoute: false,
    },
    {
        path: pathConstants.CONTACT,
        element: ContactPage,
        handle: {
            crumb: () => 'Liên hệ',
        },
        isPrivateRoute: false,
    },
    {
        path: pathConstants.CHECK_OUT,
        element: Checkout,
        handle: {
            crumb: () => 'Thanh toán',
        },
        isPrivateRoute: true,
    },
    {
        path: pathConstants.ACCOUNT_INFORMATION,
        element: Account,
        layout: UserInformationLayout,
        handle: {
            crumb: () => 'Thông tin cá nhân',
        },
        isPrivateRoute: true,
    },
    {
        path: pathConstants.MY_ORDER,
        element: MyOrder,
        layout: UserInformationLayout,
        handle: {
            crumb: () => 'Đơn hàng của tôi',
        },
        isPrivateRoute: true,
    },
    {
        path: pathConstants.ERROR,
        element: Error,
        handle: {
            crumb: () => '404 Not Found',
        },
        isPrivateRoute: false,
    },
]

export default globalRoutes
