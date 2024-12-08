import React from 'react'

import { toast } from 'sonner'

import variantApi from '@/apis/variant.api'

const useCreateVariant = () => {
    const [loading, setLoading] = React.useState<boolean>(false)

    const createVariant: (
        newVariant: NewProductVariant
    ) => Promise<ProductVariant> = async (newVariant) => {
        try {
            setLoading(true)
            const response = await variantApi.createVariant(newVariant)
            const { data, message, status } = response.data
            if (status === 201) {
                toast.success(message)
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

export default useCreateVariant
