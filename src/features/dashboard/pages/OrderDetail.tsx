import * as React from 'react'

import { useParams } from 'react-router-dom'

import { useGetOrder } from '@/hooks/useOrder'

import { calcSalePrice } from '@/utils/calcSalePrice'
import { shortDateFormat } from '@/utils/dateServices'
import { formatMoney } from '@/utils/numberServices'

export default function OrderDetail() {
    // Lấy order id từ params
    const { id: orderId } = useParams()
    const { isLoading, order } = useGetOrder(orderId ?? '')

    return (
        <React.Fragment>
            <h1 className="text-2xl font-bold mb-7">Chi tiết đơn đặt hàng</h1>
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-2 space-y-5">
                    <div className="h-fit bg-white p-6 rounded-xl">
                        <div className="p-4 rounded-xl bg-wallground-light">
                            <p className="font-bold text-sm">Tất cả sản phẩm</p>
                        </div>
                        <div className="mt-6">
                            <ul className="flex flex-col [&>*:nth-child(odd)]:bg-[#f6f8fbcc]">
                                {!isLoading &&
                                    order.products?.map((product) => (
                                        <li
                                            key={product._id}
                                            className="p-4 rounded-xl grid grid-cols-[50px_1fr] gap-[14px] items-center"
                                        >
                                            <img
                                                src={product.thumbnail}
                                                alt="thumbnail"
                                                className="size-[50px]"
                                            />
                                            <div className="w-full grid grid-cols-3">
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-xs">
                                                        {product.category.name}
                                                    </p>
                                                    <p className="font-semibold text-sm">
                                                        {product.name}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-xs">
                                                        Số lượng
                                                    </p>
                                                    <p className="font-semibold text-sm">
                                                        1
                                                    </p>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <p className="text-xs">
                                                        Giá tiền
                                                    </p>
                                                    <p className="font-semibold text-sm">
                                                        {product.sale &&
                                                            formatMoney(
                                                                calcSalePrice(
                                                                    product.price,
                                                                    product.sale
                                                                )
                                                            )}
                                                        {!product.sale &&
                                                            formatMoney(
                                                                product.price
                                                            )}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                    <div className="h-fit bg-white p-6 rounded-xl">
                        <div className="p-4 rounded-xl bg-wallground-light grid grid-cols-[2fr_1fr] gap-5">
                            <p className="font-bold text-sm">Tổng cộng</p>
                            <p className="font-bold text-sm">Giá tiền</p>
                        </div>
                        <div className="mt-6 flex flex-col gap-4 px-4 text-sm">
                            <div className="grid grid-cols-[2fr_1fr] gap-5 text-[#575864]">
                                <p>Tạm tính</p>
                                <p className="font-bold">
                                    {formatMoney(order.totalAmount)}
                                </p>
                            </div>
                            <hr />
                            <div className="grid grid-cols-[2fr_1fr] gap-5 text-[#575864]">
                                <p>Phí vận chuyển</p>
                                <p className="font-bold">
                                    {order.shippingFee === 0
                                        ? 'Miễn phí'
                                        : formatMoney(order.shippingFee)}
                                </p>
                            </div>
                            <hr />
                            <div className="grid grid-cols-[2fr_1fr] gap-5 font-bold">
                                <p>Tổng cộng</p>
                                <p className="text-[#ff5200]">
                                    {formatMoney(order.totalAmount)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 space-y-5 text-sm">
                    <div className="h-fit bg-white p-6 rounded-xl space-y-2.5">
                        <p className="font-bold">Chi tiết</p>
                        <div className="grid grid-cols-[110px_1fr] gap-4">
                            <p>Mã đơn hàng</p>
                            <p className="font-bold">#{order._id}</p>
                        </div>
                        <div className="grid grid-cols-[110px_1fr] gap-4">
                            <p>Ngày đặt hàng</p>
                            <p className="font-bold">
                                {shortDateFormat(order.createdAt)}
                            </p>
                        </div>
                        <div className="grid grid-cols-[110px_1fr] gap-4">
                            <p>Tổng</p>
                            <p className="font-bold text-[#ff5200]">
                                {formatMoney(order.totalAmount)}
                            </p>
                        </div>
                    </div>
                    <div className="h-fit bg-white p-6 rounded-xl space-y-2.5">
                        <p className="font-bold">Địa chỉ giao hàng</p>
                        <p className="text-[#575864]">
                            {order.deliveryInformation?.address}
                        </p>
                    </div>
                    <div className="h-fit bg-white p-6 rounded-xl space-y-2.5">
                        <p className="font-bold">Phương thức thanh toán</p>
                        <p className="text-[#575864]">
                            {order.paymentMethod === 'cash'
                                ? 'Thanh toán khi nhận hàng'
                                : 'Thanh toán qua ngân hàng'}
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
