import React, { useEffect, useState } from 'react'

import useGetAllProducts from '@/hooks/use-get-all-products'

import { Button } from '@/components/ui/button'

import ProductsCarousel from '@/features/product/components/carousels/product-carousel'

export interface IFlashSaleTime {
    days: number
    hours: number
    minutes: number
    seconds: number
}
const calcFlashSaleTime: (endDate: Date) => IFlashSaleTime = (endDate) => {
    const now = new Date()
    const days = endDate.getDay() - now.getDay()
    const hours = endDate.getHours() - now.getHours()
    const minutes = endDate.getMinutes() - now.getMinutes()
    const seconds = 59 - (now.getSeconds() - endDate.getSeconds())

    return {
        days,
        hours,
        minutes,
        seconds,
    }
}

export default function FlashSales() {
    const { isLoading, products } = useGetAllProducts()

    const [flashSaleTime, setFlashSaleTime] = useState<IFlashSaleTime>({
        days: 99,
        hours: 99,
        minutes: 99,
        seconds: 99,
    })
    const FLASH_SALE_EXPIRED_TIME = new Date('2024-12-20 11:59 pm')
    useEffect(() => {
        const values = calcFlashSaleTime(FLASH_SALE_EXPIRED_TIME)
        const interval = setInterval(() => {
            setFlashSaleTime(values)
        }, 1000)

        return () => clearInterval(interval)
    }, [flashSaleTime])

    const FLASH_SALE_TIMES = [
        {
            label: 'Ngày',
            value:
                flashSaleTime.days >= 10
                    ? flashSaleTime.days
                    : `0${flashSaleTime.days}`,
        },
        {
            label: 'Giờ',
            value:
                flashSaleTime.hours >= 10
                    ? flashSaleTime.hours
                    : `0${flashSaleTime.hours}`,
        },
        {
            label: 'Phút',
            value:
                flashSaleTime.minutes >= 10
                    ? flashSaleTime.minutes
                    : `0${flashSaleTime.minutes}`,
        },
        {
            label: 'Giây',
            value:
                flashSaleTime.seconds >= 10
                    ? flashSaleTime.seconds
                    : `0${flashSaleTime.seconds}`,
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
                    Special offer
                </p>
            </div>

            <div className="my-7 laptop:flex items-center justify-start gap-[87px]">
                <div className="-ml-[17px] flex items-center justify-start">
                    {FLASH_SALE_TIMES.map((item, index) => (
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
                                {index !== FLASH_SALE_TIMES.length - 1 && (
                                    <p className="font-bold text-[#d64b4b] ml-[17px] font-inter text-[32px] leading-[30px] tracking-[4%]">
                                        :
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ProductsCarousel data={products} isLoading={isLoading} />

            <div className="mt-[60px] grid place-items-center">
                <Button className="w-[234px] h-[56px] text-base">
                    View All Products
                </Button>
            </div>
        </React.Fragment>
    )
}
