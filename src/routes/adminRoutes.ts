import AdminHelp from '@/features/Permissions/Admin/pages/AdminHelp'
import AdminSettings from '@/features/Permissions/Admin/pages/AdminSettings'
import BrandsDashboard from '@/features/Permissions/Admin/pages/BrandsDashboard'
import CategoriesDashboard from '@/features/Permissions/Admin/pages/CategoriesDashboard'
import Dashboard from '@/features/Permissions/Admin/pages/Dashboard'
import GalleryDashboard from '@/features/Permissions/Admin/pages/GalleryDashboard'
import OrderDetail from '@/features/Permissions/Admin/pages/OrderDetail'
import OrdersDashboard from '@/features/Permissions/Admin/pages/OrdersDashboard'
import PostsDashboard from '@/features/Permissions/Admin/pages/PostsDashboard'
import ProductsDashboard from '@/features/Permissions/Admin/pages/ProductsDashboard'
import ReportDashboard from '@/features/Permissions/Admin/pages/ReportDashboard'
import UsersDashboard from '@/features/Permissions/Admin/pages/UsersDashboard'
import AdminLayout from '@/layouts/AdminLayout'
import { IRoute } from '@/routes/globalRoutes'

const adminRoutes: IRoute[] = [
    { id: 100, path: '/dashboard', layout: AdminLayout, element: Dashboard },
    {
        id: 101,
        path: '/dashboard/products',
        layout: AdminLayout,
        element: ProductsDashboard,
    },
    {
        id: 102,
        path: '/dashboard/categories',
        layout: AdminLayout,
        element: CategoriesDashboard,
    },
    {
        id: 103,
        path: '/dashboard/brands',
        layout: AdminLayout,
        element: BrandsDashboard,
    },
    {
        id: 104,
        path: '/dashboard/orders',
        layout: AdminLayout,
        element: OrdersDashboard,
    },
    {
        id: 105,
        path: '/dashboard/orders/:id',
        layout: AdminLayout,
        element: OrderDetail,
    },
    {
        id: 106,
        path: '/dashboard/users',
        layout: AdminLayout,
        element: UsersDashboard,
    },
    {
        id: 107,
        path: '/dashboard/posts',
        layout: AdminLayout,
        element: PostsDashboard,
    },
    {
        id: 108,
        path: '/dashboard/report',
        layout: AdminLayout,
        element: ReportDashboard,
    },
    {
        id: 109,
        path: '/dashboard/gallery',
        layout: AdminLayout,
        element: GalleryDashboard,
    },
    {
        id: 110,
        path: '/dashboard/setting',
        layout: AdminLayout,
        element: AdminSettings,
    },
    {
        id: 111,
        path: '/dashboard/help',
        layout: AdminLayout,
        element: AdminHelp,
    },
]

export default adminRoutes
