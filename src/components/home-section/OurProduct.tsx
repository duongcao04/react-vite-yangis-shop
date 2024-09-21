import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import ProductsCarousel from '../carousel/ProductsCarousel'

interface IOurProductProps {
    loadingProducts: boolean
    products: Product[]
}
function OurProduct({ loadingProducts, products }: IOurProductProps) {
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
                    Sản phẩm
                </p>
            </div>
            <h2 className="my-5 text-2xl font-semibold">
                Khám phá sản phẩm của chúng tôi
            </h2>
            <div className="grid grid-cols-5 gap-x-8 gap-y-[60px]">
                {loadingProducts &&
                    new Array(5).fill('skeleton').map((skeleton, index) => (
                        <div key={skeleton + index}>
                            <div className="w-full h-[250px] animate-pulse bg- bg-red-300 rounded-sm" />
                            <div className="mt-4 w-full h-[24px] bg-red-300 animate-pulse rounded-sm" />
                        </div>
                    ))}
            </div>
            {!loadingProducts && <ProductsCarousel products={products} />}
            <div className="mt-5 grid place-items-center">
                <Button asChild className="w-[200px] h-[50px] text-base">
                    <Link to={'/products'}>View All Products</Link>
                </Button>
            </div>
        </React.Fragment>
    )
}

export default OurProduct
