import * as React from 'react'

import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import useLogout from '@/features/auth/hooks/use-logout'
import { useOutsideClick } from '@/hooks/use-outside-click'

import { useAuthContext } from '@/context/auth-context'

import { Input } from '@/components/ui/input'

export interface DashboardHeaderProps {
    showSidebar: boolean
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DashboardHeader({
    showSidebar,
    setShowSidebar,
}: DashboardHeaderProps) {
    const { logout } = useLogout()
    const { authUser } = useAuthContext()
    const [isOpenDropdown, setIsOpenDropdown] = React.useState<boolean>(false)

    const userActions = [
        {
            id: 1,
            label: 'Tài khoản',
            icon: 'hugeicons:user',
            path: '/dashboard/account',
        },
        {
            id: 2,
            label: 'Cài đặt',
            icon: 'hugeicons:setting-07',
            path: '/dashboard/setting',
        },
        {
            id: 3,
            label: 'Đăng xuất',
            icon: 'hugeicons:logout-03',
            action: logout,
        },
    ]

    const ref = useOutsideClick(() => {
        setIsOpenDropdown(false)
    })

    return (
        <div className="h-full grid grid-cols-[780px_1fr]">
            {/* Search bar */}
            <div className="flex items-center justify-start gap-4">
                <motion.div
                    whileHover={{ color: '#dc2626' }}
                    onClick={() => {
                        setShowSidebar(true)
                    }}
                    className={showSidebar ? 'hidden' : 'block'}
                >
                    <Icon
                        icon="hugeicons:more-or-less"
                        className="size-6 cursor-pointer"
                    />
                </motion.div>
                <div className="grid grid-cols-[minmax(740px,780px)_1fr]">
                    <form>
                        <Input placeholder="Tìm kiếm" />
                    </form>
                </div>
            </div>

            {/* Action */}
            <div className="flex items-center justify-end gap-5">
                <button className="p-2 rounded-full bg-wallground-light">
                    <Icon icon="hugeicons:moon-02" fontSize={20} />
                    {/* <Icon icon="hugeicons:sun-02" fontSize={20} /> */}
                </button>
                <button className="p-2 rounded-full bg-wallground-light">
                    <Icon icon="hugeicons:notification-02" fontSize={20} />
                </button>
                <div className="relative w-[170px]" ref={ref}>
                    <button
                        className="flex items-center justify-start gap-[14px] text-left"
                        onClick={() => {
                            setIsOpenDropdown(!isOpenDropdown)
                        }}
                    >
                        <img
                            src={authUser.avatar}
                            alt="avatar"
                            className="size-[36px] rounded-full"
                        />
                        <div>
                            <p className="font-bold text-sm">
                                {authUser.fullName}
                            </p>
                            <p className="text-xs capitalize">
                                {authUser.role}
                            </p>
                        </div>
                    </button>
                    {isOpenDropdown && (
                        <ul className="absolute w-full top-full my-5 p-4 left-0 bg-white shadow-2xl rounded-lg space-y-6 z-10">
                            {userActions.map((item) => (
                                <li key={item.id}>
                                    {item.path && (
                                        <Link
                                            to={item.path}
                                            className="flex items-center justify-start gap-2.5 hover:text-[#2f7dfc] transition-colors"
                                        >
                                            <Icon
                                                icon={item.icon}
                                                fontSize={20}
                                            />
                                            <p className="text-sm font-semibold">
                                                {item.label}
                                            </p>
                                        </Link>
                                    )}
                                    {item.action && (
                                        <button
                                            className="flex items-center justify-start gap-2.5 hover:text-[#2f7dfc] transition-colors"
                                            onClick={() => {
                                                item.action()
                                            }}
                                        >
                                            <Icon
                                                icon={item.icon}
                                                fontSize={20}
                                            />
                                            <p className="text-sm font-semibold">
                                                {item.label}
                                            </p>
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="w-[1px] h-full bg-border" />
                <button>
                    <Icon icon="line-md:cog-loop" fontSize={24} />
                </button>
            </div>
        </div>
    )
}
