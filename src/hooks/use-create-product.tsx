import { useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import productApi from '@/apis/product.api'

export const useCreateProduct = () => {
    const [isLoading, setLoading] = useState<boolean>(false)

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: (newProduct: NewProduct) =>
            productApi.createProduct(newProduct),
        onMutate: () => {
            setLoading(true)
        },
        onSuccess: () => {
            setLoading(false)
            toast.success('Thêm mới sản phẩm thành công')
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: () => {
            setLoading(false)
            throw new Error()
        },
    })
    return { isLoading, createProduct: mutate }
}