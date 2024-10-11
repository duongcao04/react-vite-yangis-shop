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

import { config } from '@/configs'
import AdminLayout from '@/layouts/AdminLayout'
import { TRoute } from '@/routes/globalRoutes'

const adminRoutes: TRoute[] = [
    {
        isPrivateRoute: true,
        path: config.routes.dashboard,
        layout: AdminLayout,
        element: Dashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_product,
        layout: AdminLayout,
        element: ProductDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_category,
        layout: AdminLayout,
        element: CategoryDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_brand,
        layout: AdminLayout,
        element: BrandDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_order,
        layout: AdminLayout,
        element: OrderDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_order_detail,
        layout: AdminLayout,
        element: OrderDetail,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_customer,
        layout: AdminLayout,
        element: CustomerDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_article,
        layout: AdminLayout,
        element: ArticleDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_report,
        layout: AdminLayout,
        element: ReportDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_gallery,
        layout: AdminLayout,
        element: GalleryDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_setting,
        layout: AdminLayout,
        element: AdminSettings,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_help,
        layout: AdminLayout,
        element: AdminHelp,
    },
]

export default adminRoutes
