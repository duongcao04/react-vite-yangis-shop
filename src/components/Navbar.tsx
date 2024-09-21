import { useState } from 'react'
import { BsListNested } from 'react-icons/bs'
import { FaShoppingCart } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import { GoArrowUpRight } from 'react-icons/go'
import { MdPerson } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import Ymember from '@/assets/png/ymember.png'
import MobileNavigate from '@/components/fragment/MobileNavigate'
import Searchbar from '@/components/fragment/Searchbar'
import UserDropdown from '@/components/fragment/UserDropdown'
import Modal from '@/components/modal/Modal'
import { Button } from '@/components/ui/button'
import HEADER_NAVIGATES from '@/constants/navigates'
import { useAuthContext } from '@/context/AuthContext'
import { RootState } from '@/redux/store'
import { isObjectEmpty } from '@/utils/isObjectEmpty'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { DialogClose } from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'

export default function Navbar() {
    const [isExtendSearchbar, setIsExtendSearchbar] = useState<boolean>(false)
    const { authUser } = useAuthContext()

    const { cart }: { cart: ProductCart[] } = useSelector(
        (state: RootState) => state.cart
    )

    const calcNumberProductInCart: (cart: ProductCart[]) => number = function (
        cart
    ) {
        let total = 0
        cart.forEach((product) => (total += product.quantity))
        return total
    }

    return (
        <div className="py-4 laptop:px-5 bg-gradient-to-tr from-[#cb1c22] to-[#d9503f] text-white">
            <div className="container mx-auto grid grid-cols-navbar gap-1">
                <MobileNavigate
                    trigger={
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="tablet:hidden flex items-center cursor-pointer w-fit"
                        >
                            <MenuOutlinedIcon fontSize="large" />
                        </motion.div>
                    }
                />

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Link
                        to={'/'}
                        className="font-rampart text-4xl leading-none font-bold"
                    >
                        Yangis
                    </Link>
                </motion.div>
                <div className=" hidden tablet:hidden laptop:block desktop:block">
                    <div className="w-full flex items-center justify-between">
                        <nav className="w-fit text-nowrap">
                            {!isExtendSearchbar && (
                                <motion.ul
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center justify-start gap-12"
                                >
                                    {HEADER_NAVIGATES.map((navigate) => (
                                        <li key={navigate.id}>
                                            <NavLink
                                                to={navigate.path}
                                                target={
                                                    navigate.isDirection
                                                        ? '_'
                                                        : ''
                                                }
                                                className={({
                                                    isActive,
                                                }: {
                                                    isActive: boolean
                                                }) =>
                                                    isActive
                                                        ? 'active relative'
                                                        : 'nav-link relative'
                                                }
                                            >
                                                <div>
                                                    {navigate.label}
                                                    {navigate.isDirection && (
                                                        <GoArrowUpRight
                                                            className="absolute top-[2px] right-[-17px]"
                                                            size={12}
                                                        />
                                                    )}
                                                </div>
                                            </NavLink>
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                            {isExtendSearchbar && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="w-fit h-[44px] py-[6px] px-4 bg-[#6a151b] rounded-full flex items-center justify-center gap-3"
                                    onClick={() => {
                                        setIsExtendSearchbar(false)
                                    }}
                                >
                                    <BsListNested size={24} />
                                    <p className="font-medium">
                                        Thanh điều hướng
                                    </p>
                                </motion.button>
                            )}
                        </nav>

                        <div
                            className={`${isExtendSearchbar ? 'w-[680px]' : 'w-[44px]'} flex items-center justify-end`}
                        >
                            <Searchbar
                                isExtendSearchbar={isExtendSearchbar}
                                setIsExtendSearchbar={setIsExtendSearchbar}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <div className="hidden laptop:block desktop:block">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {isObjectEmpty(authUser) && (
                                <Modal
                                    classname="w-[350px]"
                                    trigger={
                                        <button
                                            className="size-[44px] p-[6px] bg-[#6a151b] rounded-full flex items-center justify-center gap-3"
                                            title="Đăng ký / Đăng nhập"
                                        >
                                            <MdPerson size={24} />
                                        </button>
                                    }
                                    header={{
                                        title: (
                                            <p className="text-[25px] leading-[28px] font-bold text-[#d70018]">
                                                Y member
                                            </p>
                                        ),
                                    }}
                                    body={
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <img
                                                src={Ymember}
                                                alt="y member"
                                                className="size-[90px]"
                                            />
                                            <p className="text-center font-bold leading-[20px]">
                                                Vui lòng đăng nhập tài khoản
                                                Ymember để xem ưu đãi và thanh
                                                toán dễ dàng hơn.
                                            </p>
                                        </div>
                                    }
                                    footer={
                                        <div className="mt-2 w-full flex items-center justify-center gap-5">
                                            {/* DialogClose:::Use api Dialog close from shadcn ui library */}
                                            <DialogClose asChild>
                                                <Button
                                                    variant={'outline'}
                                                    size={'lg'}
                                                    asChild
                                                >
                                                    <Link to={'/register'}>
                                                        Đăng ký
                                                    </Link>
                                                </Button>
                                            </DialogClose>
                                            <DialogClose asChild>
                                                <Button size={'lg'} asChild>
                                                    <Link to={'/login'}>
                                                        Đăng nhập
                                                    </Link>
                                                </Button>
                                            </DialogClose>
                                        </div>
                                    }
                                />
                            )}

                            {!isObjectEmpty(authUser) && (
                                <div className="relative group size-[44px] rounded-full border-[2px] p-[1px] flex items-center justify-center gap-3 cursor-pointer">
                                    <img
                                        src={authUser.avatar}
                                        alt="avatar"
                                        className="w-full h-full object-contain rounded-full"
                                    />
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -5,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className="hidden group-hover:block absolute top-full pt-2 left-0 z-10"
                                    >
                                        <UserDropdown />
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    <div className="hidden laptop:block desktop:block">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Link
                                to={'/wish-list'}
                                className="w-fit h-[44px] py-[6px] px-4 bg-black rounded-full flex items-center justify-center gap-3"
                                title="Danh sách yêu thích"
                            >
                                <FaHeart size={18} />
                                <p className="font-medium">Yêu thích</p>
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Link
                            to={'/cart'}
                            className="relative w-fit h-[44px] py-[6px] px-[20px] bg-black rounded-full flex items-center justify-center gap-3"
                            title="Giỏ hàng"
                        >
                            <FaShoppingCart size={18} />
                            <p className="absolute top-[5px] right-[12px] px-1 py-0.5 rounded-full text-white bg-red-500 font-semibold text-xs leading-none">
                                {calcNumberProductInCart(cart)}
                            </p>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
