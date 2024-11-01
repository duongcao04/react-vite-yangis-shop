import { RouteProps } from 'react-router-dom'

import { LoginPage, RegisterPage } from '@/features/auth/pages'
import { CartPage } from '@/features/cart/pages'
import { CheckoutPage } from '@/features/checkout/pages'
import {
    CustomerAddressBook,
    CustomerOrder,
    CustomerProfile,
} from '@/features/customer-profile/pages'
import { ProductDetailPage, ProductsPage } from '@/features/product/pages'
import { WishListPage } from '@/features/wish-list/pages'

import { config } from '@/configs'
import { BlankLayout, UserInformationLayout } from '@/layouts'
import { AboutPage, ContactPage, ErrorPage, HomePage } from '@/pages'

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
        layout: BlankLayout,
        element: RegisterPage,
        handle: {
            crumb: () => 'Đăng ký',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.login,
        layout: BlankLayout,
        element: LoginPage,
        handle: {
            crumb: () => 'Đăng nhập',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.favourite,
        element: WishListPage,
        handle: {
            crumb: () => 'Yêu thích',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.cart,
        element: CartPage,
        handle: {
            crumb: () => 'Giỏ hàng',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.products,
        element: ProductsPage,
        handle: {
            crumb: () => 'Sản phẩm',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.product_detail,
        element: ProductDetailPage,
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
        element: CheckoutPage,
        handle: {
            crumb: () => 'Thanh toán',
        },
        isPrivateRoute: true,
    },
    {
        path: config.routes.address_book,
        element: CustomerAddressBook,
        handle: {
            crumb: () => 'Sổ tay địa chỉ',
        },
        isPrivateRoute: true,
    },
    {
        path: config.routes.account_information,
        element: CustomerProfile,
        layout: UserInformationLayout,
        handle: {
            crumb: () => 'Thông tin cá nhân',
        },
        isPrivateRoute: true,
    },
    {
        path: config.routes.my_order,
        element: CustomerOrder,
        layout: UserInformationLayout,
        handle: {
            crumb: () => 'Đơn hàng của tôi',
        },
        isPrivateRoute: true,
    },
    {
        path: config.routes.error,
        element: ErrorPage,
        handle: {
            crumb: () => '404 Not Found',
        },
        isPrivateRoute: false,
    },
]

export default globalRoutes
