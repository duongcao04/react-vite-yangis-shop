import React from 'react'

import HomeIcon from '@mui/icons-material/Home'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import LoginForm from '@/features/auth/components/forms/login-form'

import { config } from '@/configs'

import LoginBanner from '../assets/images/login_banner.jpg'

function LoginPage() {
    return (
        <React.Fragment>
            <Helmet>
                <title>
                    Đăng nhập | Mua hàng, tri ân khách hàng, tích điểm đổi quà
                </title>
            </Helmet>

            <div className="bg-white h-screen">
                <div className="flex flex-col laptop:grid grid-cols-12 gap-2 h-full">
                    <div className="relative col-span-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hidden laptop:block"
                        >
                            <Link
                                to={'/'}
                                className="absolute top-12 left-14 font-rampart text-4xl leading-none font-bold text-black z-10"
                                title="Trở về trang chủ"
                            >
                                Yangis
                            </Link>
                        </motion.div>
                        {/* Only show on mobile */}
                        <div className="block laptop:hidden absolute top-5 w-full container">
                            <div className="grid grid-cols-[43px_1fr_43px] place-items-center">
                                <Link to={'/'} className="p-1 w-fit">
                                    <HomeIcon fontSize="large" />
                                </Link>
                                <h2 className="text-3xl font-inter font-bold">
                                    Đăng nhập
                                </h2>
                            </div>
                        </div>
                        <div className="w-full h-full overflow-hidden">
                            <img
                                src={LoginBanner}
                                alt="login banner"
                                className="w-full h-full object-cover mt-10"
                            />
                        </div>
                    </div>

                    <div className="col-span-4 laptop:my-auto">
                        <div className="w-[450px] mx-auto">
                            <h2 className="hidden laptop:block text-[36px] leading-[30px] font-inter font-bold">
                                Đăng nhập
                            </h2>
                            <div className="mt-10">
                                <Button
                                    className="mt-7 w-full h-[50px]"
                                    variant={'outline'}
                                    title="Đăng nhập bằng Google"
                                >
                                    <div className="scale-95">
                                        <svg
                                            width="24"
                                            height="25"
                                            viewBox="0 0 24 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_829_3336)">
                                                <path
                                                    d="M23.766 12.7764C23.766 11.9607 23.6999 11.1406 23.5588 10.3381H12.24V14.9591H18.7217C18.4528 16.4494 17.5885 17.7678 16.323 18.6056V21.6039H20.19C22.4608 19.5139 23.766 16.4274 23.766 12.7764Z"
                                                    fill="#4285F4"
                                                />
                                                <path
                                                    d="M12.2401 24.5008C15.4766 24.5008 18.2059 23.4382 20.1945 21.6039L16.3276 18.6055C15.2517 19.3375 13.8627 19.752 12.2445 19.752C9.11388 19.752 6.45946 17.6399 5.50705 14.8003H1.5166V17.8912C3.55371 21.9434 7.7029 24.5008 12.2401 24.5008Z"
                                                    fill="#34A853"
                                                />
                                                <path
                                                    d="M5.50253 14.8003C4.99987 13.3099 4.99987 11.6961 5.50253 10.2057V7.11481H1.51649C-0.18551 10.5056 -0.18551 14.5004 1.51649 17.8912L5.50253 14.8003Z"
                                                    fill="#FBBC04"
                                                />
                                                <path
                                                    d="M12.2401 5.24966C13.9509 5.2232 15.6044 5.86697 16.8434 7.04867L20.2695 3.62262C18.1001 1.5855 15.2208 0.465534 12.2401 0.500809C7.7029 0.500809 3.55371 3.05822 1.5166 7.11481L5.50264 10.2058C6.45064 7.36173 9.10947 5.24966 12.2401 5.24966Z"
                                                    fill="#EA4335"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_829_3336">
                                                    <rect
                                                        width="24"
                                                        height="24"
                                                        fill="white"
                                                        transform="translate(0 0.5)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <span className="ml-4 font-normal">
                                        Đăng nhập bằng Google
                                    </span>
                                </Button>
                            </div>
                            <div className="my-7 flex items-center justify-between">
                                <div className="h-[1px] w-[calc(100%/2-100px)] bg-border" />
                                <p className="text-sm opacity-70 w-fit">
                                    hoặc đăng nhập bằng email
                                </p>
                                <div className="h-[1px] w-[calc(100%/2-100px)] bg-border" />
                            </div>
                            <div>
                                <LoginForm />
                            </div>
                            <p className="mt-4 text-center">
                                Bạn chưa có tài khoản?{' '}
                                <Link
                                    to={config.routes.register}
                                    className="underline font-medium opacity-80 hover:opacity-100 transition duration-200"
                                    title="Đăng ký"
                                >
                                    Đăng ký
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LoginPage
