import React from 'react'

import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import ProductsCarousel from '@/features/product/components/carousels/product-carousel'
import { useGetAllProducts } from '@/features/product/hooks/use-get-all-products'

function OurProducts() {
    const { isLoading, products } = useGetAllProducts()

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
                    Product
                </p>
            </div>
            <h2 className="my-5 text-2xl font-semibold">
                Explorer our products
            </h2>
            <ProductsCarousel data={products} isLoading={isLoading} />
            <div className="mt-5 grid place-items-center">
                <Button asChild className="w-[200px] h-[50px] text-base">
                    <Link to={'/products'}>View All Products</Link>
                </Button>
            </div>
        </React.Fragment>
    )
}

export default OurProducts
