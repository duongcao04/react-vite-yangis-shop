import React from 'react'

import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import { AiOutlineProduct } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa'
import { FaRegAddressCard } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

import useLogout from '@/features/auth/hooks/use-logout'

import { config } from '../../configs'

export interface userNavigate {
    id: number
    icon: IconType
    label: string
    path?: string
    action?: () => void
}

function UserDropdown() {
    const { logout } = useLogout()
    const userNavigates: userNavigate[] = [
        {
            id: 1,
            icon: FaRegUser,
            label: 'Thông tin cá nhân',
            path: config.routes.account_information,
        },
        {
            id: 2,
            icon: AiOutlineProduct,
            label: 'Đơn hàng của tôi',
            path: config.routes.my_order,
        },
        {
            id: 3,
            icon: FaRegAddressCard,
            label: 'Sổ địa chỉ nhận hàng',
            path: '/adress-shipping',
        },
        {
            id: 4,
            icon: BiLogOut,
            label: 'Đăng xuất',
            action: () => {
                logout()
            },
        },
    ]

    return (
        <React.Fragment>
            <ul className="py-2 pl-4 pr-6 bg-[#ffffff] text-black rounded-lg">
                {userNavigates.map((navigate) => (
                    <motion.li
                        initial={{
                            x: 0,
                        }}
                        whileHover={{
                            x: 4,
                        }}
                        key={navigate.id}
                        className="flex flex-col items-start justify-center py-2"
                        title={navigate.label}
                    >
                        {navigate.path && (
                            <Link
                                to={navigate.path}
                                className="flex items-center justify-start gap-3"
                            >
                                <navigate.icon size={20} />
                                <span className="text-nowrap text-sm">
                                    {navigate.label}
                                </span>
                            </Link>
                        )}

                        {navigate.action && (
                            <button
                                className="flex items-center justify-start gap-3"
                                onClick={navigate.action}
                            >
                                <navigate.icon size={20} />
                                {navigate.label}
                            </button>
                        )}
                    </motion.li>
                ))}
            </ul>
        </React.Fragment>
    )
}

export default UserDropdown
