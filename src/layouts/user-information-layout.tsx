import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import { AiOutlineProduct } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import { FaRegAddressCard } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

import useLogout from '@/features/auth/hooks/use-logout'

import { useAuthContext } from '@/context/auth-context'

import Breadcrumbs from '@/components/customize-breadcrumb'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import TopHeader from '@/components/top-header'

export interface userNavigate {
    id: number
    icon: IconType
    label: string
    path?: string
    action?: () => void
}

export default function UserInformationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { authUser } = useAuthContext()
    const { logout } = useLogout()

    const USER_NAVIGATES: userNavigate[] = [
        {
            id: 1,
            icon: AiOutlineProduct,
            label: 'Đơn hàng của tôi',
            path: '/my-order',
        },
        {
            id: 2,
            icon: FaRegAddressCard,
            label: 'Sổ địa chỉ nhận hàng',
            path: '/adress-shipping',
        },
        {
            id: 3,
            icon: BiLogOut,
            label: 'Đăng xuất',
            action: () => {
                logout()
            },
        },
    ]

    return (
        <div
            id="page"
            className="bg-wallground-light dark:bg-wallground-dark text-black dark:text-white "
        >
            <header className="sticky top-0 z-50 laptop:static">
                <Navbar />
                <div className="hidden laptop:block desktop:block">
                    <TopHeader />
                </div>
            </header>
            <main>
                <div className="container mx-auto mb-8">
                    <div className="my-4">
                        <Breadcrumbs />
                    </div>

                    <div className="grid grid-cols-4 gap-8">
                        <div className="col-span-1">
                            <div className="hover:shadow-lg transition-shadow rounded-xl">
                                <Link
                                    to={'/account'}
                                    className="flex bg-white w-full p-4 rounded-xl items-center justify-between"
                                    title="Xem thông tin tài khoản"
                                >
                                    <div className="flex items-center justify-start gap-2">
                                        <img
                                            src={authUser.avatar}
                                            alt="avatar"
                                            className="size-[44px] rounded-full"
                                        />
                                        <div>
                                            <p className="text-sm font-semibold">
                                                {authUser.fullName}
                                            </p>
                                            <p className="text-sm">
                                                {authUser.email}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="bg-white w-full rounded-xl mt-3">
                                <ul className="py-2">
                                    {USER_NAVIGATES.map((navigate) => (
                                        <li key={navigate.id}>
                                            {navigate.path && (
                                                <motion.div
                                                    initial={{ x: 0 }}
                                                    whileHover={{
                                                        x: 4,
                                                        color: '#dc262d',
                                                    }}
                                                >
                                                    <Link
                                                        to={navigate.path}
                                                        className="flex items-center justify-start pl-4 py-2.5 pr-2"
                                                    >
                                                        <navigate.icon
                                                            size={24}
                                                            className="mr-3"
                                                        />
                                                        <span className="text-sm font-medium">
                                                            {navigate.label}
                                                        </span>
                                                    </Link>
                                                </motion.div>
                                            )}
                                            {navigate.action && (
                                                <motion.button
                                                    className="flex items-center justify-start pl-4 py-2.5 pr-2"
                                                    initial={{ x: 0 }}
                                                    whileHover={{
                                                        x: 4,
                                                        color: '#dc262d',
                                                    }}
                                                >
                                                    <navigate.icon
                                                        size={24}
                                                        className="mr-3"
                                                    />
                                                    <span className="text-sm font-medium">
                                                        {navigate.label}
                                                    </span>
                                                </motion.button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-span-3">{children}</div>
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}
