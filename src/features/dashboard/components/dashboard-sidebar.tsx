import { useState } from 'react'

import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { IoChevronBackOutline } from 'react-icons/io5'
import { Link, NavLink } from 'react-router-dom'

import { SIDEBAR_MENUS, type SidebarItem } from '@/constants/sidebar-menus'

const SingleItem = ({
    data,
    isActive,
}: {
    data: SidebarItem
    isActive: boolean
}) => {
    return (
        <NavLink
            to={data.path || '#'}
            end
            className={`w-full inline-flex items-center justify-start gap-2.5 p-[14px] transition duration-200 hover:text-primary text-foreground ${
                isActive &&
                'bg-primary-100 text-primary rounded-lg transition duration-200 hover:text-primary'
            }`}
        >
            <Icon icon={data.icon || ''} fontSize={20} />
            <p className="text-sm font-semibold">{data.label}</p>
        </NavLink>
    )
}
const GroupItem = ({
    data,
    isActive,
}: {
    data: SidebarItem
    isActive: boolean
}) => {
    return (
        <>
            <button
                className={`w-full inline-flex items-center justify-between p-[14px] transition duration-200 hover:text-primary text-foreground ${
                    isActive &&
                    'text-primary rounded-lg transition duration-200 hover:text-primary'
                }`}
            >
                <div className="flex items-center justify-start gap-2.5">
                    <Icon icon={data.icon} fontSize={20} />
                    <p className="text-sm font-semibold">{data.label}</p>
                </div>
                <IoChevronBackOutline
                    className={isActive ? 'rotate-90' : '-rotate-90'}
                />
            </button>
            {isActive && (
                <ul className="mt-1 flex flex-col items-start">
                    {data.menus &&
                        data.menus.map((menuItem) => (
                            <motion.li
                                key={menuItem.id}
                                className="w-full pl-5"
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
                                            ? 'w-full inline-flex items-center justify-start gap-2.5 p-[14px] bg-primary-100 text-primary rounded-lg transition duration-200 hover:text-primary'
                                            : 'w-full inline-flex items-center justify-start gap-2.5 p-[14px] transition duration-200 hover:text-primary'
                                    }
                                >
                                    <Icon icon={menuItem.icon} fontSize={20} />
                                    <p className="text-sm font-semibold">
                                        {menuItem.label}
                                    </p>
                                </NavLink>
                            </motion.li>
                        ))}
                </ul>
            )}
        </>
    )
}

const SidebarMenu = () => {
    const [itemActive, setItemActive] = useState<number>(SIDEBAR_MENUS[0].id)
    return (
        <ul className="flex flex-col gap-2.5">
            {SIDEBAR_MENUS.map((item) => {
                const isActive = item.id === itemActive
                return (
                    <li key={item.id} onClick={() => setItemActive(item.id)}>
                        {item.menus ? (
                            <GroupItem data={item} isActive={isActive} />
                        ) : (
                            <SingleItem data={item} isActive={isActive} />
                        )}
                    </li>
                )
            })}
        </ul>
    )
}

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
                <SidebarMenu />
            </div>
        </div>
    )
}
