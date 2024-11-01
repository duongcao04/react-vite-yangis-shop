import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import productApi from '@/apis/product.api'

const useCreateProduct = () => {
    const queryClient = useQueryClient()
    const { isIdle, mutate } = useMutation({
        mutationFn: (newProduct: NewProduct) =>
            productApi.createProduct(newProduct),
        onSuccess: () => {
            toast.success('Thêm mới sản phẩm thành công')
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
    })

    return { isLoading: isIdle, createProduct: mutate }
}

export default useCreateProduct
