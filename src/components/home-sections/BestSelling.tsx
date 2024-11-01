import React from 'react'

import ProductsCarousel from '@/features/product/components/carousels/ProductsCarousel'
import { Button } from '@/components/ui/button'

interface IBestSellingProps {
    products: Product[]
}

function BestSelling({ products }: IBestSellingProps) {
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
                    Tháng này
                </p>
            </div>
            <div className="my-7 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Sản phẩm bán chạy</h2>
                <Button className="text-base">Xem tất cả</Button>
            </div>

            <ProductsCarousel products={products} />
        </React.Fragment>
    )
}

export default BestSelling
