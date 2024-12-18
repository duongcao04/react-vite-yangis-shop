import React from 'react'

import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

function ErrorPage() {
    return (
        <React.Fragment>
            <section className="flex items-center h-full p-16">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="text-center">
                        <h2 className="mb-8 font-extrabold text-[200px] leading-none dark:text-gray-400">
                            <span className="sr-only">Error</span>404
                        </h2>
                        <p className="text-2xl font-semibold md:text-3xl mb-8">
                            Đường dẫn đã hết hạn truy cập hoặc không tồn tại
                        </p>
                        <Button asChild size={'lg'}>
                            <Link
                                to={'/'}
                                rel="noopener noreferrer"
                                className="px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
                            >
                                Trở về trang chủ
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default ErrorPage
