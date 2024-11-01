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
    ProductDashboard,
} from '@/features/dashboard/pages'

import { config } from '@/configs'
import { DashboardLayout } from '@/layouts'
import { TRoute } from '@/routes/globalRoutes'

const adminRoutes: TRoute[] = [
    {
        isPrivateRoute: true,
        path: config.routes.dashboard,
        layout: DashboardLayout,
        element: HomeDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_product,
        layout: DashboardLayout,
        element: ProductDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_category,
        layout: DashboardLayout,
        element: CategoryDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_brand,
        layout: DashboardLayout,
        element: BrandDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_order,
        layout: DashboardLayout,
        element: OrderDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_order_detail,
        layout: DashboardLayout,
        element: OrderDetail,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_customer,
        layout: DashboardLayout,
        element: CustomerDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_article,
        layout: DashboardLayout,
        element: ArticleDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_report,
        layout: DashboardLayout,
        element: ReportDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_gallery,
        layout: DashboardLayout,
        element: GalleryDashboard,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_setting,
        layout: DashboardLayout,
        element: AdminSettings,
    },
    {
        isPrivateRoute: true,
        path: config.routes.dashboard_help,
        layout: DashboardLayout,
        element: AdminHelp,
    },
]

export default adminRoutes
