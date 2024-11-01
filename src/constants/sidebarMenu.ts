import { config } from '@/configs'

export interface IMenuItem {
    id: number
    icon: string
    label: string
    path: string
}

const SIDEBAR_MENUS: { id: number; title: string; menu: IMenuItem[] }[] = [
    {
        id: 1,
        title: 'Dashboard',
        menu: [
            {
                id: 11,
                icon: 'hugeicons:dashboard-square-01',
                label: 'Dashboard',
                path: config.routes.dashboard,
            },
        ],
    },
    {
        id: 2,
        title: 'Quản lý',
        menu: [
            {
                id: 21,
                icon: 'hugeicons:package',
                label: 'Sản phẩm',
                path: config.routes.dashboard_product,
            },
            {
                id: 22,
                icon: 'hugeicons:layers-01',
                label: 'Danh mục',
                path: config.routes.dashboard_category,
            },
            {
                id: 23,
                icon: 'hugeicons:package',
                label: 'Thương hiệu',
                path: config.routes.dashboard_brand,
            },
            {
                id: 24,
                icon: 'hugeicons:shopping-cart-01',
                label: 'Đơn đặt hàng',
                path: config.routes.dashboard_order,
            },
            {
                id: 25,
                icon: 'hugeicons:user-group',
                label: 'Người dùng',
                path: config.routes.dashboard_customer,
            },
            {
                id: 26,
                icon: 'hugeicons:align-box-middle-left',
                label: 'Bài đăng',
                path: config.routes.dashboard_article,
            },
        ],
    },
    {
        id: 3,
        title: 'Theo dõi',
        menu: [
            {
                id: 37,
                icon: 'hugeicons:school-report-card',
                label: 'Báo cáo',
                path: config.routes.dashboard_report,
            },
            {
                id: 38,
                icon: 'material-symbols-light:gallery-thumbnail-outline-rounded',
                label: 'Thư viện',
                path: config.routes.dashboard_gallery,
            },
        ],
    },
    {
        id: 4,
        title: 'Cài đặt',
        menu: [
            {
                id: 41,
                icon: 'hugeicons:setting-07',
                label: 'Cài đặt',
                path: config.routes.dashboard_setting,
            },
        ],
    },
    {
        id: 5,
        title: 'Hỗ trợ',
        menu: [
            {
                id: 51,
                icon: 'hugeicons:help-circle',
                label: 'Trợ giúp',
                path: config.routes.dashboard_help,
            },
            {
                id: 52,
                icon: 'hugeicons:user-question-01',
                label: 'FAQs',
                path: config.routes.dashboard_faq,
            },
        ],
    },
]

export default SIDEBAR_MENUS
