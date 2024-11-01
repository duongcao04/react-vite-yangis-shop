import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'

import SIDEBAR_MENUS from '@/constants/sidebarMenu'

interface DashboardSidebarProps {
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DashboardSidebar({
    setShowSidebar,
}: DashboardSidebarProps) {
    return (
        <div className="bg-white">
            {/* Header */}
            <div className="pt-5 pb-[19px] px-5 border-b flex items-center justify-between">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Link
                        to={'/'}
                        className="font-rampart text-4xl leading-none font-bold"
                        title="Trở về trang chủ"
                    >
                        Yangis
                    </Link>
                </motion.div>
                <motion.div
                    whileHover={{ color: '#dc2626' }}
                    onClick={() => {
                        setShowSidebar(false)
                    }}
                >
                    <Icon
                        icon="hugeicons:more-or-less"
                        className="size-6 cursor-pointer"
                    />
                </motion.div>
            </div>

            {/* Menus */}
            <div className="p-5 h-[calc(100%-80px)] overflow-y-scroll no-scrollbar">
                <ul>
                    {SIDEBAR_MENUS.map((item) => (
                        <li key={item.id} className="mb-5">
                            <p className="text-xs font-extrabold uppercase opacity-20 pl-[14px] mb-2.5">
                                {item.title}
                            </p>
                            <ul className="flex flex-col items-start">
                                {item.menu.map((menuItem) => (
                                    <motion.li
                                        key={menuItem.id}
                                        className="w-full"
                                    >
                                        <NavLink
                                            to={menuItem.path}
                                            end
                                            className={({
                                                isActive,
                                            }: {
                                                isActive: boolean
                                            }) =>
                                                isActive
                                                    ? 'w-full inline-flex items-center justify-start gap-2.5 p-[14px] bg-[#fecab5] text-[#d70018] rounded-lg transition duration-200 hover:text-[#d70018]'
                                                    : 'w-full inline-flex items-center justify-start gap-2.5 p-[14px] transition duration-200 hover:text-[#d70018]'
                                            }
                                        >
                                            <Icon
                                                icon={menuItem.icon}
                                                fontSize={20}
                                            />
                                            <p className="text-sm font-semibold">
                                                {menuItem.label}
                                            </p>
                                        </NavLink>
                                    </motion.li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
