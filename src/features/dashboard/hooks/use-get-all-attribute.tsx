import { useQuery } from '@tanstack/react-query'

import attributeApi from '@/apis/attribute.api'
import { type Attribute } from '@/types/attribute'

const useGetAllAttributes: () => {
    isLoading: boolean
    attributes: Attribute[]
} = () => {
    const initialData = [{} as Attribute]
    const placeholderData = [{} as Attribute]

    const { data, isFetching } = useQuery({
        queryKey: ['allAttributes'],
        queryFn: () =>
            attributeApi.getAllAttributes().then((response) => {
                return response.data.data
            }),
        refetchOnWindowFocus: false,
        placeholderData,
        initialData,
    })
    return { isLoading: isFetching, attributes: data ?? [] }
}
export { useGetAllAttributes }
