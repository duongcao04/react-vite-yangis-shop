import AdminHelp from '@/features/admin/pages/admin-help'
import AdminSettings from '@/features/admin/pages/admin-setting'
import ReportDashboard from '@/features/admin/pages/report-dashboard'

import { config } from '@/config'
import { TRoute } from '@/routes/public.route'

import ArticleDashboard from '@/features/dashboard/pages/article-dashboard'
import BrandDashboard from '@/features/dashboard/pages/brand-dashboard'
import CategoryDashboard from '@/features/dashboard/pages/category-dashboard'
import CustomerDashboard from '@/features/dashboard/pages/customer-dashboard'
import GalleryDashboard from '@/features/dashboard/pages/gallery-dashboard'
import HomeDashboard from '@/features/dashboard/pages/home-dashboard'
import OrderDashboard from '@/features/dashboard/pages/order-dashboard'
import OrderDetail from '@/features/dashboard/pages/order-detail'
import ProductCreate from '@/features/dashboard/pages/product-add-new'
import ProductDashboard from '@/features/dashboard/pages/product-dashboard'
import ProductDetail from '@/features/dashboard/pages/product-detail'
import DashboardLayout from '@/layouts/dashboard-layout'

export const ADMIN_ROUTES: TRoute[] = [
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.home,
        layout: DashboardLayout,
        element: HomeDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.product.DEFAULT,
        layout: DashboardLayout,
        element: ProductDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.product.detail,
        layout: DashboardLayout,
        element: ProductDetail,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.product.create,
        layout: DashboardLayout,
        element: ProductCreate,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.category.DEFAULT,
        layout: DashboardLayout,
        element: CategoryDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.brand.DEFAULT,
        layout: DashboardLayout,
        element: BrandDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.order.DEFAULT,
        layout: DashboardLayout,
        element: OrderDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.order.detail,
        layout: DashboardLayout,
        element: OrderDetail,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.customer.DEFAULT,
        layout: DashboardLayout,
        element: CustomerDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.article.DEFAULT,
        layout: DashboardLayout,
        element: ArticleDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.report.DEFAULT,
        layout: DashboardLayout,
        element: ReportDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.gallery.DEFAULT,
        layout: DashboardLayout,
        element: GalleryDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.setting.DEFAULT,
        layout: DashboardLayout,
        element: AdminSettings,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard.help.DEFAULT,
        layout: DashboardLayout,
        element: AdminHelp,
    },
]
