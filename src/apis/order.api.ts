import { AxiosResponse } from 'axios'

import axiosClient, { TReponse } from '@/apis/axiosClient'
import type { NewOrder, Order } from '@/types/order'

const orderApi = {
    getAllOrders: async (
        params: object
    ): Promise<AxiosResponse<TReponse<Order[]>>> => {
        const url = 'order'
        return await axiosClient.get(url, { params })
    },
    getOrder: async (
        orderId: string
    ): Promise<AxiosResponse<TReponse<Order>>> => {
        const url = `order/${orderId}`
        return await axiosClient.get(url)
    },
    createOrder: async (
        newOrder: NewOrder
    ): Promise<AxiosResponse<TReponse<Order>>> => {
        const url = 'order'
        return await axiosClient.post(url, newOrder)
    },
}

export default orderApi
