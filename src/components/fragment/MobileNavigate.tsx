import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { useGetCategories } from '@/hooks/useCategory'

import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from '@/components/ui/sheet'

import RegisterVector from '@/assets/png/register.png'
import HEADER_NAVIGATES from '@/constants/navigates'
import { pathConstants } from '@/routes/pathConstants'

interface IMobileNavigateProps {
    trigger: React.ReactNode
}

export default function MobileNavigate({ trigger }: IMobileNavigateProps) {
    const { categories } = useGetCategories()
    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent
                className="laptop:hidden w-full p-0 bg-wallground-light"
                side="left"
                isShowClose={false}
            >
                <SheetHeader>
                    <div className="py-4 laptop:px-5 bg-gradient-to-tr from-[#cb1c22] to-[#d9503f] text-white text-left pl-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Link
                                to={'/'}
                                className="font-rampart text-4xl leading-none font-bold"
                            >
                                Yangis
                            </Link>
                        </motion.div>
                    </div>
                    <SheetClose asChild>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute top-2.5 right-8 tablet:hidden flex items-center cursor-pointer"
                        >
                            <CloseOutlinedIcon
                                fontSize="large"
                                className="text-white"
                            />
                        </motion.div>
                    </SheetClose>
                </SheetHeader>
                <nav id="navigate">
                    <div className="bg-white flex items-center justify-between p-4 mb-3">
                        <div>
                            <p className="text-sm font-semibold max-w-[200px]">
                                Đăng nhập hoặc đăng ký để nhận nhiều ưu đãi hấp
                                dẫn
                            </p>
                            <div className="flex items-center justify-start gap-2 mt-3">
                                <SheetClose asChild>
                                    <Button variant={'outline'} asChild>
                                        <Link to={pathConstants.REGISTER}>
                                            Đăng ký
                                        </Link>
                                    </Button>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Button asChild>
                                        <Link to={pathConstants.LOGIN}>
                                            Đăng nhập
                                        </Link>
                                    </Button>
                                </SheetClose>
                            </div>
                        </div>
                        <img
                            src={RegisterVector}
                            alt=""
                            className="size-[120px]"
                        />
                    </div>
                    <div className="mb-2 bg-white flex items-center justify-between">
                        <div className="w-full">
                            <p className="pt-4 pl-4 font-semibold uppercase">
                                Thanh điều hướng
                            </p>
                            <ul>
                                {HEADER_NAVIGATES.map((item) => (
                                    <li key={item.id}>
                                        <SheetClose asChild>
                                            <Link
                                                to={item.path}
                                                className="inline-block py-3 px-5 border-b w-full"
                                            >
                                                {item.label}
                                            </Link>
                                        </SheetClose>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mb-2 bg-white flex items-center justify-between">
                        <div className="w-full">
                            <p className="pt-4 pl-4 font-semibold uppercase">
                                Danh mục
                            </p>
                            <ul>
                                {categories.map((item) => (
                                    <li key={item._id}>
                                        <SheetClose asChild>
                                            <Link
                                                to={item.name}
                                                className="inline-block py-3 px-5 border-b w-full"
                                            >
                                                {item.name}
                                            </Link>
                                        </SheetClose>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
