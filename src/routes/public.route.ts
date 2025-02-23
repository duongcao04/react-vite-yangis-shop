import { RouteProps } from 'react-router-dom'

import AboutPage from '@/pages/about'
import ContactPage from '@/pages/contact'
import ErrorPage from '@/pages/error'
import HomePage from '@/pages/home'

import { config } from '@/config'
import BlankLayout from '@/layouts/blank-layout'
import UserInformationLayout from '@/layouts/user-information-layout'

import LoginPage from '@/features/auth/pages/login'
import RegisterPage from '@/features/auth/pages/register'
import CartPage from '@/features/shop/pages/cart'
import CheckoutPage from '@/features/shop/pages/checkout'
import CustomerAddressBookPage from '@/features/customer-profile/pages/customer-address-book'
import CustomerOrderPage from '@/features/customer-profile/pages/customer-orders'
import CustomerProfilePage from '@/features/customer-profile/pages/customer-profile'
import ProductDetailPage from '@/features/product/pages/product-detail'
import ProductsPage from '@/features/product/pages/products'
import WishListPage from '@/features/shop/pages/wishlist'

export type TRoute = Omit<RouteProps, 'path' | 'element'> & {
    path: string
    layout?: ({ children }: { children: React.ReactNode }) => React.ReactElement
    element: () => React.ReactElement
    isPrivateRoute: boolean
}

export const GLOBAL_ROUTES: TRoute[] = [
    {
        path: config.routes.home,
        element: HomePage,
        handle: {
            crumb: () => 'Home',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.register,
        layout: BlankLayout,
        element: RegisterPage,
        handle: {
            crumb: () => 'Register',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.login,
        layout: BlankLayout,
        element: LoginPage,
        handle: {
            crumb: () => 'Login',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.favourite,
        element: WishListPage,
        handle: {
            crumb: () => 'Wishlist',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.cart,
        element: CartPage,
        handle: {
            crumb: () => 'Cart',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.products,
        element: ProductsPage,
        handle: {
            crumb: () => 'Product',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.product_detail,
        element: ProductDetailPage,
        handle: {
            crumb: () => 'Product Detail',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.about,
        element: AboutPage,
        handle: {
            crumb: () => 'About us',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.contact,
        element: ContactPage,
        handle: {
            crumb: () => 'Contact',
        },
        isPrivateRoute: false,
    },
    {
        path: config.routes.check_out,
        element: CheckoutPage,
        handle: {
            crumb: () => 'Checkout',
        },
        isPrivateRoute: true,
    },
    {
        path: config.routes.address_book,
        element: CustomerAddressBookPage,
        handle: {
            crumb: () => 'Address Book',
        },
        isPrivateRoute: true,
    },
    {
        path: config.routes.account_information,
        element: CustomerProfilePage,
        layout: UserInformationLayout,
        handle: {
            crumb: () => 'Account Information',
        },
        isPrivateRoute: true,
    },
    {
        path: config.routes.my_order,
        element: CustomerOrderPage,
        layout: UserInformationLayout,
        handle: {
            crumb: () => 'My Order',
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
