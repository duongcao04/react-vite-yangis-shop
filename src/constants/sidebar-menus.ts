import { config } from '@/config'

/**
 * Sidebar -> SidebarItems -> Menus -> MenuItem
 */
export type MenuItem = {
    id: number
    icon: string
    label: string
    path: string
}
export type SidebarItem = {
    id: number
    label: string
    icon: string
    path?: string
    menus?: MenuItem[]
}
export const SIDEBAR_MENUS: SidebarItem[] = [
    {
        id: 1,
        icon: 'hugeicons:dashboard-square-01',
        label: 'Dashboard',
        path: config.routes.dashboard.home,
    },
    {
        id: 2,
        label: 'My shop',
        icon: 'iconoir:shop',
        menus: [
            {
                id: 21,
                icon: 'hugeicons:package',
                label: 'Product',
                path: config.routes.dashboard.product.DEFAULT,
            },
            {
                id: 22,
                icon: 'hugeicons:layers-01',
                label: 'Category',
                path: config.routes.dashboard.category.DEFAULT,
            },
            {
                id: 23,
                icon: 'hugeicons:package',
                label: 'Brand',
                path: config.routes.dashboard.brand.DEFAULT,
            },
            {
                id: 24,
                icon: 'hugeicons:shopping-cart-01',
                label: 'Order',
                path: config.routes.dashboard.order.DEFAULT,
            },
            {
                id: 25,
                icon: 'hugeicons:user-group',
                label: 'Customer',
                path: config.routes.dashboard.customer.DEFAULT,
            },
            {
                id: 26,
                icon: 'hugeicons:align-box-middle-left',
                label: 'Article',
                path: config.routes.dashboard.article.DEFAULT,
            },
        ],
    },
    {
        id: 3,
        label: 'Business analytics',
        icon: 'hugeicons:analytics-01',
        menus: [
            {
                id: 37,
                icon: 'hugeicons:school-report-card',
                label: 'Report',
                path: config.routes.dashboard.report.DEFAULT,
            },
            {
                id: 38,
                icon: 'material-symbols-light:gallery-thumbnail-outline-rounded',
                label: 'Gallery',
                path: config.routes.dashboard.gallery.DEFAULT,
            },
        ],
    },
    {
        id: 4,
        icon: 'hugeicons:setting-07',
        label: 'Setting',
        path: config.routes.dashboard.setting.DEFAULT,
    },
    {
        id: 5,
        label: 'Support',
        icon: 'fluent:info-12-regular',
        menus: [
            {
                id: 51,
                icon: 'hugeicons:help-circle',
                label: 'Help',
                path: config.routes.dashboard.help.DEFAULT,
            },
            {
                id: 52,
                icon: 'hugeicons:user-question-01',
                label: 'FAQs',
                path: config.routes.dashboard.faq.DEFAULT,
            },
        ],
    },
]
