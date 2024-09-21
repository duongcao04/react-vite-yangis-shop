import axiosClient from '@/api/axiosClient'

const orderApi = {
    getOrders: async (params: object) => {
        const url = 'order'
        return await axiosClient.get(url, { params })
    },
    getOrder: async (orderId: string) => {
        const url = `order/${orderId}`
        return await axiosClient.get(url)
    },
    createOrder: async (newOrder: NewOrder) => {
        const url = 'order/add'
        return await axiosClient.post(url, newOrder)
    },
}

export default orderApi
