const config = {
    routes: {
        home: '/',
        about: '/ve-chung-toi',
        contact: '/lien-he',
        articles: '/bai-viet',
        products: '/san-pham',
        product_detail: '/san-pham/:productSlug',
        create_product: '/san-pham/them-moi',
        error: '/*',
        // Auth Routes
        register: '/dang-ky',
        login: '/dang-nhap',
        // Private Routes
        check_out: '/thanh-toan',
        cart: '/gio-hang',
        favourite: '/yeu-thich',
        account_information: '/thong-tin-tai-khoan',
        my_order: '/don-dat-hang',
        // Admin Routes
        dashboard: '/dashboard',
        dashboard_product: '/dashboard/san-pham',
        dashboard_category: '/dashboard/danh-muc',
        dashboard_brand: '/dashboard/thuong-hieu',
        dashboard_order: '/dashboard/don-dat-hang',
        dashboard_order_detail: '/dashboard/don-dat-hang/:orderId',
        dashboard_customer: '/dashboard/khach-hang',
        dashboard_article: '/dashboard/bai-viet',
        dashboard_report: '/dashboard/bao-cao',
        dashboard_gallery: '/dashboard/san-pham',
        dashboard_setting: '/dashboard/cai-dat',
        dashboard_help: '/dashboard/tro-giup',
        dashboard_faq: '/dashboard/faq',
    },
} as const

export { config }
