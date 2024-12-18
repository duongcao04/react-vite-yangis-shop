import React from 'react'

import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import LoginForm from '@/features/auth/components/forms/login-form'

import { config } from '@/config'

import BackHomeButton from '../components/buttons/back-home-button'

function LoginPage() {
    return (
        <React.Fragment>
            <Helmet>
                <title>Log in | Yangis Shop</title>
            </Helmet>

            <div className="bg-white h-screen w-screen">
                <div className="w-full h-full flex flex-col laptop:grid grid-cols-2">
                    <div className="col-span-1 flex items-center justify-center relative p-4">
                        <div className="absolute top-10 right-10">
                            <BackHomeButton />
                        </div>
                        <div className="w-full h-full bg-red-500 rounded-xl shadow-2xl">
                            <img src={''} alt="" />
                        </div>
                    </div>

                    <div className="w-full h-full col-span-1 relative">
                        <div className="flex flex-col justify-center mx-28 h-full">
                            <h2 className="hidden laptop:block text-5xl font-inter font-semibold">
                                Welcome back!
                            </h2>
                            <div className="mt-7 mb-14 flex items-center justify-start gap-2">
                                <p>Don't have an account?</p>
                                <Button
                                    asChild
                                    variant={'link'}
                                    className="text-base"
                                >
                                    <Link to={config.routes.register}>
                                        Sign up{' '}
                                    </Link>
                                </Button>
                            </div>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LoginPage
