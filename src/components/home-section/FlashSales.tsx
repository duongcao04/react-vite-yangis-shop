import React from 'react'

import ProductsCarousel from '@/components/carousel/ProductsCarousel'
import { Button } from '@/components/ui/button'

interface IFlashSalesProps {
    products: Product[]
}

export default function FlashSales({ products }: IFlashSalesProps) {
    const FlashSaleCountdown = [
        {
            label: 'Ngày',
            value: '03',
        },
        {
            label: 'Giờ',
            value: '23',
        },
        {
            label: 'Phút',
            value: '19',
        },
        {
            label: 'Giây',
            value: '56',
        },
    ]
    return (
        <React.Fragment>
            <div className="flex items-center justify-start gap-4 mb-[13px]">
                <svg
                    width="20"
                    height="40"
                    viewBox="0 0 20 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="20" height="40" rx="4" fill="#DB4444" />
                </svg>
                <p className="font-semibold text-base leading-[20px] text-[#DB4444]">
                    Khuyến mãi
                </p>
            </div>

            <div className="my-7 laptop:flex items-center justify-start gap-[87px]">
                {/* <h2 className="my-7 text-2xl font-semibold mr-[17px]">
                    Khuyến mãi
                </h2> */}
                <div className="-ml-[17px] flex items-center justify-start">
                    {FlashSaleCountdown.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-start items-start gap-1"
                        >
                            <p
                                className={`${
                                    index === 0 && 'ml-0'
                                } ml-[17px] text-xs leading-[18px] font-medium`}
                            >
                                {item.label}
                            </p>
                            <div
                                className={`${
                                    index === 0 && 'ml-0'
                                } mt-1 ml-[17px] flex items-center justify-start`}
                            >
                                <p className="font-inter font-bold text-[32px] leading-[30px] tracking-[4%]">
                                    {item.value}
                                </p>
                                {index !== FlashSaleCountdown.length - 1 && (
                                    <p className="font-bold text-[#d64b4b] ml-[17px] font-inter text-[32px] leading-[30px] tracking-[4%]">
                                        :
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ProductsCarousel products={products} />

            <div className="mt-[60px] grid place-items-center">
                <Button className="w-[234px] h-[56px] text-base">
                    View All Products
                </Button>
            </div>
        </React.Fragment>
    )
}
