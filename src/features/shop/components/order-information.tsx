import { FaChevronRight } from 'react-icons/fa'
import { FaTicketSimple } from 'react-icons/fa6'
import { FcApproval } from 'react-icons/fc'
import { GoGift } from 'react-icons/go'
import { useSelector } from 'react-redux'

import { Button } from '@/components/ui/button'
import { RootState } from '@/redux/store'

export interface IOrderInformationProps {
    action: React.ReactNode
}

export default function OrderInformation({ action }: IOrderInformationProps) {
    const { total } = useSelector((state: RootState) => state.cart)

    const SHIPPING_COST = 0

    return (
        <div className="sticky top-[10px]">
            <div className="bg-white w-full flex items-center justify-between px-4 py-[10px] rounded-xl">
                <div className="flex items-center gap-x-3">
                    <GoGift />
                    <p className="text-[14px] leading-[24px] font-medium">
                        Quà tặng
                    </p>
                </div>
                <button
                    type="button"
                    title="Xóa tất cả"
                    className="text-[14px] leading-[24px] font-medium opacity-60"
                >
                    Xem quà (0)
                </button>
            </div>
            <div className="mt-[10px] p-4 bg-white rounded-xl flex flex-col gap-3">
                <button
                    type="button"
                    className="rounded-lg p-3 bg-wallground-light flex items-center justify-between"
                >
                    <div className="flex items-center justify-start gap-3">
                        <FaTicketSimple size={20} className="text-[#dc2626]" />
                        <p className="text-[14px] leading-[20px] font-medium">
                            Chọn hoặc nhập ưu đãi
                        </p>
                    </div>
                    <FaChevronRight size={13} />
                </button>
                <div className="border rounded-lg flex items-center justify-start gap-3 p-3">
                    <FcApproval size={20} />
                    <p className="text-[14px] leading-[20px] font-medium">
                        Đổi 0 điểm (~0đ)
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-base leading-[24px] font-medium">
                        Thông tin đơn hàng
                    </p>
                    <div className="flex items-center justify-between">
                        <p className="text-xs leading-[18px] opacity-95">
                            Tổng tiền
                        </p>
                        <p className="text-base leading-[24px] font-medium">
                            {formatMoney(total)}
                        </p>
                    </div>
                    <div className="h-[1px] w-full bg-gray-300" />
                    <div className="flex items-center justify-between">
                        <p className="text-xs leading-[18px] opacity-95">
                            Tổng khuyến mãi
                        </p>
                        <p className="text-base leading-[24px] font-medium">
                            {formatMoney(total)}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-xs leading-[18px] opacity-95">
                            Phí vận chuyển
                        </p>
                        <p className="text-xs leading-[18px] font-medium">
                            {SHIPPING_COST === 0
                                ? 'Miễn phí'
                                : formatMoney(SHIPPING_COST)}
                        </p>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-300 border-dashed pt-2">
                        <p className="text-xs leading-[18px] opacity-95">
                            Cần thanh toán
                        </p>
                        <p className="text-base leading-[24px] font-medium text-red-500">
                            {formatMoney(total + SHIPPING_COST)}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-xs leading-[18px] opacity-95">
                            Điểm thưởng
                        </p>
                        <p className="text-base leading-[24px] font-medium">
                            +{(total / 100).toLocaleString()}
                        </p>
                    </div>
                </div>
                <Button asChild>{action}</Button>
            </div>
        </div>
    )
}
