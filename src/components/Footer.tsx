import { Link } from 'react-router-dom'

import QR from '@/assets/images/QR.png'
import SubcribeForm from '@/components/form/SubcribeForm'
import FOOTER_NAVIGATES from '@/constants/footerLinks'

function Footer() {
    return (
        <div className="bg-black text-white text-sm">
            <div className="container laptop:grid laptop:grid-cols-12 laptop:gap-10 laptop:pt-[80px] border-b-[1px] border-neutral-700">
                <div className="laptop:col-span-3">
                    <div className="py-8 laptop:py-0 border-b border-[#3a3d43] laptop:border-none text-center laptop:text-left">
                        <Link
                            to={'/'}
                            className="text-base leading-none tracking-[3%] font-inter font-bold"
                        >
                            Yangis eCommerce
                        </Link>
                    </div>
                    <div className="py-4 border-b border-[#3a3d43] laptop:border-none">
                        <p className="uppercase font-medium">
                            Đăng ký để nhận thông tin mới nhất
                        </p>
                        <p className="my-4 text-xs">
                            Giảm giá 10% cho đơn hàng đầu tiên
                        </p>
                        <SubcribeForm />
                    </div>
                </div>
                {FOOTER_NAVIGATES.map((group, index) => (
                    <div
                        key={index}
                        className="laptop:py-0 border-b border-[#3a3d43] laptop:border-none col-span-2"
                    >
                        <p className="uppercase py-4 font-medium">
                            {group.title}
                        </p>
                        <ul>
                            {group.links.map((link, index) => (
                                <li key={index} className="mb-4">
                                    <Link
                                        to={link.path}
                                        className="text-base hover:underline underline-offset-4 opacity-60 hover:opacity-100 transition duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div className="py-4 col-span-3">
                    <p className="uppercase font-medium">Download App</p>
                    <p className="my-2 text-xs opacity-70">
                        Save $3 with App New User Only
                    </p>
                    <img src={QR} alt="QR" />
                </div>
            </div>
            <div className="pt-4 pb-6 text-center">
                <p className="text-base">
                    <span className="opacity-60">&copy; Copyright </span>
                    <Link
                        to={'https://www.facebook.com/hyang.309'}
                        className="opacity-80 hover:underline font-semibold underline-offset-4"
                        target="_"
                    >
                        Hai Yang
                    </Link>{' '}
                    <span className="opacity-60">2024. All right reserved</span>
                </p>
            </div>
        </div>
    )
}

export default Footer
