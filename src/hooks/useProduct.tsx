import * as React from 'react'

import productApi, { IGetProductsParams } from '@/api/product.api'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useGetProducts: (params?: IGetProductsParams) => {
    isLoading: boolean
    products: Product[]
    totalPage: number
    totalProduct: number
} = (params) => {
    const { data, isFetching } = useQuery({
        queryKey: ['products', params],
        queryFn: () =>
            productApi
                .getProducts(params ?? {})
                .then((response) => response.data.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return {
                totalProduct: 0,
                totalPage: 0,
                products: [],
            }
        },
    })

    const { products, totalPage, totalProduct } = data
    return { isLoading: isFetching, products, totalPage, totalProduct }
}

export const useGetProduct: (productId: string) => {
    isLoading: boolean
    product: Product
} = (productId) => {
    const { data, isFetching } = useQuery({
        queryKey: ['product', productId],
        queryFn: () =>
            productApi.getProduct(productId ?? '').then((response) => {
                return response.data
            }),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return {
                data: {} as Product,
            }
        },
    })

    const { data: product } = data

    return { isLoading: isFetching, product }
}

export const useCreateProduct = () => {
    const [loading, setLoading] = React.useState<boolean>(false)

    const createAProduct: (newProduct: NewProduct) => Promise<void> = async (
        newProduct
    ) => {
        setLoading(true)
        try {
            await productApi.createProduct(newProduct)
            toast.success('Thêm mới sản phẩm thành công')
        } catch (error) {
            toast.error('Đã xảy ra lỗi')
        } finally {
            setLoading(false)
        }
    }

    return { loading, createAProduct }
}

export const useDeleteProduct = () => {
    const [loading, setLoading] = React.useState<boolean>(false)

    const deleteAProduct: (productId: string) => Promise<void> = async (
        productId
    ) => {
        setLoading(true)
        try {
            await productApi.deleteProduct(productId)
            toast.success('Xóa sản phẩm thành công')
        } catch (error) {
            toast.error('Đã xảy ra lỗi')
        } finally {
            setLoading(false)
        }
    }

    return { loading, deleteAProduct }
}
