import { IconType } from 'react-icons'
import {
    BsFillCartCheckFill,
    BsFillHandbagFill,
    BsPeopleFill,
} from 'react-icons/bs'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

import { HexagonalIcon } from '../components/icons/hexagonal-icon'
import { useGetAllUser } from '../hooks/use-get-all-users'

export default function HomeDashboard() {
    const { users } = useGetAllUser()

    const STATISTICAL: {
        icon: IconType
        label: string
        bgColor: string
        value: string
    }[] = [
        {
            icon: BsFillHandbagFill,
            label: 'Total sales',
            bgColor: '#22C55E',
            value: '----',
        },
        {
            icon: RiMoneyDollarCircleFill,
            label: 'Total income',
            bgColor: '#FF5200',
            value: '----',
        },
        {
            icon: BsFillCartCheckFill,
            label: 'Paid orders',
            bgColor: '#8d98a6',
            value: '----',
        },
        {
            icon: BsPeopleFill,
            label: 'Total customers',
            bgColor: '#2377FC',
            value: users?.length.toString(),
        },
    ]

    return (
        <>
            <div className="grid grid-cols-4 gap-4 mb-7">
                {STATISTICAL.map((card, index) => (
                    <div key={index} className="bg-white rounded-lg p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start gap-[14px]">
                                <div className="relative w-fit">
                                    <HexagonalIcon fillColor={card.bgColor} />
                                    <card.icon
                                        fontSize={22}
                                        className="text-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm">{card.label}</p>
                                    <p className="text-[22px] leading-[31px] font-bold">
                                        {card.value}
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
        </>
    )
}
