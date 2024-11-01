import React from 'react'

import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { useGetOrders } from '@/hooks/useOrder'

import { useAuthContext } from '@/context/AuthContext'

import { calcSalePrice } from '@/utils/calcSalePrice'
import { shortDateFormat } from '@/utils/dateServices'
import { formatMoney } from '@/utils/numberServices'

function CustomerOrder() {
    const { authUser } = useAuthContext()
    const params = { userId: authUser._id }
    const { orders } = useGetOrders(params)

    return (
        <React.Fragment>
            <Helmet>
                <title>Đơn hàng của tôi</title>
            </Helmet>
            <h1 className="text-2xl font-semibold">Đơn hàng của tôi</h1>
            <div className="mt-4 bg-[#fff] rounded-xl w-full">
                <div className="py-6 px-4 first:pt-0 last:pb-0 flex flex-col items-center justify-center divide-y-[1px]">
                    {orders.map((order) => (
                        <div key={order._id} className="w-full py-5">
                            <div className="bg-wallground-light px-5 py-2 grid grid-cols-6 gap-3 border rounded-tl-xl rounded-tr-xl">
                                <div className="col-span-3 space-y-3">
                                    <div>
                                        <p className="text-sm">Ngày đặt hàng</p>
                                        <p className="font-bold">
                                            {shortDateFormat(order.createdAt)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm">
                                            Địa chỉ giao hàng
                                        </p>
                                        <p className="font-bold">
                                            {order.deliveryInformation.address}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-1 space-y-3">
                                    <div>
                                        <p className="text-sm">Tổng cộng</p>
                                        <p className="font-bold">
                                            {formatMoney(order.totalAmount)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm">Thanh toán</p>
                                        <p className="font-bold">
                                            {order.paymentMethod === 'cash'
                                                ? 'Tiền mặt'
                                                : 'Ngân hàng'}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-2 text-right">
                                    <p className="font-bold">#{order._id}</p>
                                    <Link
                                        to="/"
                                        className="transition-colors text-sm hover:text-[#1854dd]"
                                    >
                                        Xem thông tin đơn hàng
                                    </Link>
                                </div>
                            </div>
                            <div className="border rounded-bl-xl rounded-br-xl px-5 divide-y-[1px]">
                                {order.products.map((product) => (
                                    <div
                                        key={product._id}
                                        className="py-4 grid grid-cols-6 gap-3 items-center"
                                    >
                                        <div className="col-span-3 flex items-center justify-start gap-3">
                                            <div className="size-[74px] p-2 border rounded-xl">
                                                <img
                                                    src={product.thumbnail}
                                                    alt="product images"
                                                    className="object-contain rounded-xl"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="font-bold">
                                                    {product.name}
                                                </p>
                                                <p className="text-xs">
                                                    {product.category.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-1 space-y-1 text-sm">
                                            <p className="font-bold">
                                                Số lượng
                                            </p>
                                            <p>{product.quantity}</p>
                                        </div>
                                        <div className="col-span-2 space-y-1 text-right">
                                            <p className="text-sm font-semibold">
                                                {formatMoney(
                                                    product.quantity *
                                                        calcSalePrice(
                                                            product.price,
                                                            product.sale ?? ''
                                                        )
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

export default CustomerOrder
