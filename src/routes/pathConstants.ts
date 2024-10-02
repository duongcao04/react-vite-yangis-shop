export enum pathConstants {
    // Public Routes
    HOME = '/',
    ABOUT = '/ve-chung-toi',
    CONTACT = '/lien-he',
    ARTICLES = '/bai-viet',
    PRODUCTS = '/san-pham',
    CREATE_PRODUCT = '/san-pham/them-moi',
    PRODUCT_DETAIL = '/san-pham/:productSlug',
    ERROR = '/*',
    // Auth Routes
    REGISTER = '/dang-ky',
    LOGIN = '/dang-nhap',
    // Private Routes
    CHECK_OUT = '/thanh-toan',
    CART = '/gio-hang',
    FAVOURITE = '/yeu-thich',
    ACCOUNT_INFORMATION = '/thong-tin-tai-khoan',
    MY_ORDER = '/don-dat-hang',
    // Admin Routes
    DASHBOARD = '/dashboard',
    DASHBOARD_PRODUCTS = '/dashboard/san-pham',
}
