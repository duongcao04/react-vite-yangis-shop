import { useQuery } from '@tanstack/react-query'

import productApi from '@/apis/product.api'
import { type Variant } from '@/types/variant'

const useGetVariantByAttributes = (
    productId: string,
    attributes: Record<string, string>
): {
    isLoading: boolean
    variant: Variant
} => {
    const placeholderData = {} as Variant
    const initialData = {} as Variant

    const { data, isFetching } = useQuery({
        queryKey: ['variantSelection', attributes],
        queryFn: () =>
            productApi
                .getVariantByAttributes(productId, attributes)
                .then((response) => response.data.data),
        refetchOnWindowFocus: false,
        initialData,
        placeholderData,
    })

    return { isLoading: isFetching, variant: data ?? ({} as Variant) }
}

export { useGetVariantByAttributes }
