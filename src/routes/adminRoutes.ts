import AdminHelp from '@/features/admin/pages/AdminHelp'
import AdminSettings from '@/features/admin/pages/AdminSettings'
import Dashboard from '@/features/admin/pages/Dashboard'
import ReportDashboard from '@/features/admin/pages/ReportDashboard'
import ArticleDashboard from '@/features/article/pages/ArticleDashboard'
import BrandDashboard from '@/features/brand/pages/BrandDashboard'
import CategoryDashboard from '@/features/category/pages/CategoryDashboard'
import CustomerDashboard from '@/features/customer/pages/CustomerDashboard'
import GalleryDashboard from '@/features/gallery/pages/GalleryDashboard'
import OrderDashboard from '@/features/order/pages/OrderDashboard'
import OrderDetail from '@/features/order/pages/OrderDetail'
import ProductDashboard from '@/features/product/pages/ProductDashboard'

import AdminLayout from '@/layouts/AdminLayout'
import { TRoute } from '@/routes/globalRoutes'
import { pathConstants } from '@/routes/pathConstants'

const adminRoutes: TRoute[] = [
    { path: pathConstants.DASHBOARD, layout: AdminLayout, element: Dashboard },
    {
        path: pathConstants.DASHBOARD_PRODUCTS,
        layout: AdminLayout,
        element: ProductDashboard,
    },
    {
        path: pathConstants.DASHBOARD_PRODUCTS,
        layout: AdminLayout,
        element: CategoryDashboard,
    },
    {
        path: pathConstants.DASHBOARD_PRODUCTS,
        layout: AdminLayout,
        element: BrandDashboard,
    },
    {
        path: pathConstants.DASHBOARD_PRODUCTS,
        layout: AdminLayout,
        element: OrderDashboard,
    },
    {
        path: pathConstants.DASHBOARD_PRODUCTS,
        layout: AdminLayout,
        element: OrderDetail,
    },
    {
        path: pathConstants.DASHBOARD_PRODUCTS,
        layout: AdminLayout,
        element: CustomerDashboard,
    },
    {
        path: pathConstants.DASHBOARD_PRODUCTS,
        layout: AdminLayout,
        element: ArticleDashboard,
    },
    {
        path: pathConstants.DASHBOARD_PRODUCTS,
        layout: AdminLayout,
        element: ReportDashboard,
    },
    {
        path: pathConstants.DASHBOARD_PRODUCTS,
        layout: AdminLayout,
        element: GalleryDashboard,
    },
    {
        path: pathConstants.DASHBOARD_PRODUCTS,
        layout: AdminLayout,
        element: AdminSettings,
    },
    {
        path: pathConstants.DASHBOARD_PRODUCTS,
        layout: AdminLayout,
        element: AdminHelp,
    },
]

export default adminRoutes
