import React from 'react'

import { useGetAllCategories } from '@/hooks/use-get-all-categories'
import CategoryCard from '../cards/category-card'

function Categories() {
    const { isLoading, categories } = useGetAllCategories()

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
                {categories?.map((category: Category) => (
                    <CategoryCard
                        key={category._id}
                        data={category}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </React.Fragment>
    )
}

export default Categories
