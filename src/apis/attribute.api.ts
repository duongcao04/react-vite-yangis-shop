import { AxiosResponse } from 'axios'

import axiosClient, { TReponse } from '@/apis/axiosClient'
import { type Attribute } from '@/types/attribute'

const attributeApi = {
    getAllAttributes: async (): Promise<
        AxiosResponse<TReponse<Attribute[]>>
    > => {
        const url = 'attributes'
        return await axiosClient.get(url)
    },
}

export default attributeApi
