import React from 'react'

import { Icon } from '@iconify/react'

export default function HomeDashboard() {
    const Analytics = [
        {
            id: 1,
            icon: 'hugeicons:shopping-bag-02',
            label: 'Total Sales',
            bgColor: '#22C55E',
            number: '34,945',
        },
        {
            id: 2,
            icon: 'hugeicons:money-bag-02',
            label: 'Total Income',
            bgColor: '#FF5200',
            number: '37,802',
        },
        {
            id: 3,
            icon: 'hugeicons:money-receive-square',
            label: 'Orders Paid',
            bgColor: '#CBD5E1',
            number: '34,945',
        },
        {
            id: 4,
            icon: 'hugeicons:user-multiple',
            label: 'Total Users',
            bgColor: '#2377FC',
            number: '34,945',
        },
    ]
    return (
        <React.Fragment>
            <div className="grid grid-cols-4 gap-4 mb-7">
                {Analytics.map((card) => (
                    <div key={card.id} className="bg-white rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start gap-[14px]">
                                <div className="relative w-fit">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="48"
                                        height="52"
                                        viewBox="0 0 48 52"
                                        fill="none"
                                    >
                                        <path
                                            d="M19.1094 2.12943C22.2034 0.343099 26.0154 0.343099 29.1094 2.12943L42.4921 9.85592C45.5861 11.6423 47.4921 14.9435 47.4921 18.5162V33.9692C47.4921 37.5418 45.5861 40.8431 42.4921 42.6294L29.1094 50.3559C26.0154 52.1423 22.2034 52.1423 19.1094 50.3559L5.72669 42.6294C2.63268 40.8431 0.726688 37.5418 0.726688 33.9692V18.5162C0.726688 14.9435 2.63268 11.6423 5.72669 9.85592L19.1094 2.12943Z"
                                            fill={card.bgColor}
                                        ></path>
                                    </svg>
                                    <Icon
                                        icon={card.icon}
                                        fontSize={22}
                                        color="#fff"
                                        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm">{card.label}</p>
                                    <p className="text-[22px] leading-[31px] font-bold">
                                        {card.number}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm font-bold opacity-70">
                                1.56%
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-6"></div>
                <div className="bg-white rounded-lg p-6">
                    <p className="text-xl font-bold mb-6">Sản phẩm hàng đầu</p>
                    <div></div>
                </div>
            </div>
        </React.Fragment>
    )
}
