export interface IMenuItem {
    id: number
    icon: string
    label: string
    path: string
}

const SIDEBAR_MENUS: { id: number; title: string; menu: IMenuItem[] }[] = [
    {
        id: 1,
        title: 'Nhà chính',
        menu: [
            {
                id: 11,
                icon: 'hugeicons:dashboard-square-01',
                label: 'Dashboard',
                path: '/dashboard',
            },
        ],
    },
    {
        id: 2,
        title: 'Tất cả các trang',
        menu: [
            {
                id: 21,
                icon: 'hugeicons:package',
                label: 'Sản phẩm',
                path: '/dashboard/products',
            },
            {
                id: 22,
                icon: 'hugeicons:layers-01',
                label: 'Danh mục',
                path: '/dashboard/categories',
            },
            {
                id: 23,
                icon: 'hugeicons:package',
                label: 'Thương hiệu',
                path: '/dashboard/brands',
            },
            {
                id: 24,
                icon: 'hugeicons:shopping-cart-01',
                label: 'Đơn đặt hàng',
                path: '/dashboard/orders',
            },
            {
                id: 25,
                icon: 'hugeicons:user-group',
                label: 'Người dùng',
                path: '/dashboard/users',
            },
            {
                id: 26,
                icon: 'hugeicons:align-box-middle-left',
                label: 'Bài đăng',
                path: '/dashboard/posts',
            },
            {
                id: 27,
                icon: 'hugeicons:school-report-card',
                label: 'Báo cáo',
                path: '/dashboard/report',
            },
            {
                id: 28,
                icon: 'material-symbols-light:gallery-thumbnail-outline-rounded',
                label: 'Thư viện',
                path: '/dashboard/gallery',
            },
        ],
    },
    {
        id: 3,
        title: 'Cài đặt',
        menu: [
            {
                id: 31,
                icon: 'hugeicons:setting-07',
                label: 'Cài đặt',
                path: '/dashboard/setting',
            },
        ],
    },
    {
        id: 4,
        title: 'Hỗ trợ',
        menu: [
            {
                id: 41,
                icon: 'hugeicons:help-circle',
                label: 'Trợ giúp',
                path: '/dashboard/help',
            },
            {
                id: 42,
                icon: 'hugeicons:user-question-01',
                label: 'FAQs',
                path: '/dashboard/faq',
            },
        ],
    },
]

export default SIDEBAR_MENUS
