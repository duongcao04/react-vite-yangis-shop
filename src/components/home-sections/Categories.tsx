import React from 'react'

import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

import { useGetCategories } from '@/hooks/useCategory'

import { config } from '@/configs'

function Categories() {
    const { categories } = useGetCategories()

    return (
        <React.Fragment>
            <div className="flex items-center justify-start gap-4">
                <svg
                    width="20"
                    height="40"
                    viewBox="0 0 20 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="20" height="40" rx="4" fill="#DB4444" />
                </svg>
                <p className="font-semibold text-base text-[#DB4444]">
                    Danh mục
                </p>
            </div>
            <h2 className="my-5 text-2xl font-semibold">Danh mục sản phẩm</h2>
            <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-6 gap-8">
                {categories.map((category) => (
                    <Link
                        to={`${config.routes.products}?danh_muc=${category.slug}`}
                        key={category._id}
                    >
                        <div
                            key={category._id}
                            className="h-[170px] rounded-md flex flex-col items-center justify-center gap-4 duration-200 hover:bg-[#DB4444] hover:text-white cursor-pointer bg-white shadow-sm border hover:shadow-lg transition"
                        >
                            <div className="p-[6px]">
                                <Icon icon={category.icon} fontSize={44} />
                            </div>
                            <p className="text-base">{category.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </React.Fragment>
    )
}

export default Categories
