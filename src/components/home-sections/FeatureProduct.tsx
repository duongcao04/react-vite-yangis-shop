import React from 'react'

import ShadowStyle from '@/assets/images/shadown.png'
import { Button } from '@/components/ui/button'

function FeatureProduct() {
    const ProductSale: { label: string; value: string }[] = [
        {
            label: 'Ngày',
            value: '05',
        },
        {
            label: 'Giờ',
            value: '23',
        },
        {
            label: 'Phút',
            value: '59',
        },
        {
            label: 'Giây',
            value: '35',
        },
    ]
    return (
        <React.Fragment>
            <div className="relative bg-black w-full h-fit py-[69px] px-[56px]">
                <img
                    src={ShadowStyle}
                    alt="img"
                    className="pt-[50px] pb-[80px] laptop:py-0 laptop:absolute top-[37px] right-[50px] z-10"
                />
                <div className="absolute size-[250px] laptop:size-[400px] bg-[#D9D9D9] top-[60px] right-[50px] laptop:top-[37px] laptop:right-[160px] blur-[200px] opacity-80" />
                <p className="text-[#00FF66] text-base font-semibold">
                    Categories
                </p>
                <p className="max-w-[500px] mt-[32px] text-[48px] leading-[60px] font-semibold tracking-[4%] text-white">
                    Nâng cao trải nghiệm âm nhạc của bạn
                </p>
                <div className="mt-[32px] flex items-center justify-start gap-6">
                    {ProductSale.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center bg-white rounded-full size-[62px]"
                        >
                            <p className="text-base leading-[20px] font-semibold">
                                {item.value}
                            </p>
                            <p className="text-[11px] leading-[18px]">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-[40px]">
                    <Button className="w-[171px] h-[56px] text-base bg-[#00FF66]">
                        Mua ngay
                    </Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default FeatureProduct
