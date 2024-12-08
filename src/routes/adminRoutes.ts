import AdminHelp from '@/features/admin/pages/AdminHelp'
import AdminSettings from '@/features/admin/pages/AdminSettings'
import ReportDashboard from '@/features/admin/pages/ReportDashboard'
import {
    ArticleDashboard,
    BrandDashboard,
    CategoryDashboard,
    CustomerDashboard,
    GalleryDashboard,
    HomeDashboard,
    OrderDashboard,
    OrderDetail,
    ProductCreate,
    ProductDashboard,
    ProductDetail,
} from '@/features/dashboard/pages'

import { config } from '@/configs'
import { DashboardLayout } from '@/layouts'
import { TRoute } from '@/routes/globalRoutes'

const adminRoutes: TRoute[] = [
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

export default adminRoutes
