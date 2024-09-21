import * as React from 'react'

import variantApi from '@/api/variant.api'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useGetVariants: (params?: object) => {
    isLoading: boolean
    variants: ProductVariant[]
} = (params) => {
    const { data, isFetching } = useQuery({
        queryKey: ['variants', params],
        queryFn: () =>
            variantApi
                .getVariants(params ?? {})
                .then((response) => response.data),
        refetchOnWindowFocus: false,
        placeholderData: () => {
            return { data: [] }
        },
    })

    const { data: variants } = data

    return { isLoading: isFetching, variants }
}

export const useCreateVariant = () => {
    const [loading, setLoading] = React.useState<boolean>(false)

    const createVariant: (
        newVariant: NewProductVariant
    ) => Promise<ProductVariant> = async (newVariant) => {
        try {
            setLoading(true)
            const response = await variantApi.createVariant(newVariant)
            const { data, message, status } = response.data
            if (status === 201) {
                toast.success('Tạo mới biến thể sản phẩm thành công')
                return data
            } else {
                throw new Error(message)
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi', { description: `${error}` })
        } finally {
            setLoading(false)
        }
    }

    return { loading, createVariant }
}
