import * as React from 'react'

import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import orderApi from '@/apis/order.api'
import { resetCart } from '@/redux/cartSlice'

export const useGetOrders: (params?: object) => {
    isLoading: boolean
    orders: Order[]
} = (params) => {
    const { data, isFetching } = useQuery({
        queryKey: ['orders', params],
        queryFn: () =>
            orderApi.getOrders(params ?? {}).then((response) => response.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return {
                data: [],
            }
        },
    })

    const { data: orders } = data

    return { isLoading: isFetching, orders }
}

export const useGetOrder: (orderId: string) => {
    isLoading: boolean
    order: Order
} = (orderId) => {
    const { data, isFetching } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () =>
            orderApi.getOrder(orderId ?? '').then((response) => {
                return response.data
            }),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return {
                data: {} as Order,
            }
        },
    })

    const { data: order } = data

    return { isLoading: isFetching, order }
}

export const useCreateOrder = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState<boolean>(false)

    const createAOrder: (newOrder: NewOrder) => Promise<void> = async (
        newOrder
    ) => {
        setLoading(true)
        try {
            await orderApi.createOrder(newOrder)
            dispatch(resetCart())
            navigate('/')
            toast.success('Đặt hàng thành công')
        } catch (error) {
            toast.error('Đã xảy ra lỗi')
        } finally {
            setLoading(false)
        }
    }

    return { loading, createAOrder }
}
