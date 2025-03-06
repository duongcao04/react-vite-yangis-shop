export const routesSchema = {
    home: '/',
    about: '/about',
    contact: '/contact',
    articles: '/articles',
    products: '/products',
    product_detail: '/products/:productSlug',
    error: '/*',
    // Auth Routes
    register: '/register',
    login: '/login',
    // Private Routes
    check_out: '/check-out',
    cart: '/cart',
    favourite: '/wishlist',
    account_information: '/information',
    my_order: '/my-orders',
    address_book: '/address-book',
    // Admin Routes
    dashboard: {
        home: '/dashboard',
        product: {
            DEFAULT: '/dashboard/shop/products',
            create: '/dashboard/shop/products/create',
            detail: '/dashboard/shop/products/:productSlug',
        },
        category: {
            DEFAULT: '/dashboard/shop/categories',
        },
        brand: {
            DEFAULT: '/dashboard/shop/brand',
        },
        order: {
            DEFAULT: '/dashboard/shop/orders',
            detail: '/dashboard/shop/orders/:orderId',
        },
        customer: {
            DEFAULT: '/dashboard/shop/customers',
        },
        article: {
            DEFAULT: '/dashboard/shop/articles',
        },
        report: {
            DEFAULT: '/dashboard/business-analytics/reports',
        },
        gallery: {
            DEFAULT: '/dashboard/business-analytics/galleries',
        },
        setting: {
            DEFAULT: '/dashboard/setting',
        },
        help: {
            DEFAULT: '/dashboard/help',
        },
        faq: {
            DEFAULT: '/dashboard/faq',
        },
    },
}
