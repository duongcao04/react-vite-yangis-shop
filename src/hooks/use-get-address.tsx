import { useEffect, useState } from 'react'

import axios from 'axios'
import { toast } from 'sonner'

// https://docs.developers.supership.vn/guide/areas.html
export const useGetAddress = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [provinces, setProvinces] = useState<Province[]>([])

    useEffect(() => {
        const getGeography = async () => {
            setLoading(true)
            try {
                const url =
                    'https://api.mysupership.vn/v1/partner/areas/province'
                // TODO: Sửa lỗi cors cho axios client
                const res = await axios.get(url)
                const { results, message, status } = res.data

                if (status === 'Success') {
                    setProvinces(results)
                } else {
                    throw new Error(message)
                }
            } catch (error) {
                toast.error('Lỗi API tỉnh thất bại', {
                    description: `${error}`,
                })
            } finally {
                setLoading(false)
            }
        }
        getGeography()
    }, [])

    const getDistricts: (provinceId: string) => Promise<District[]> = async (
        provinceId
    ) => {
        try {
            const url = `https://api.mysupership.vn/v1/partner/areas/district?province=${provinceId}`
            // TODO: Sửa lỗi cors cho axios client
            const res = await axios.get(url)
            const { results, message, status } = res.data

            if (status === 'Success') {
                return results
            } else {
                throw new Error(message)
            }
        } catch (error) {
            toast.error('Lỗi API huyện thất bại', {
                description: `${error}`,
            })
        }
    }

    const getCommunes: (districtId: string) => Promise<Commune[]> = async (
        districtId
    ) => {
        try {
            const url = `https://api.mysupership.vn/v1/partner/areas/commune?district=${districtId}`
            // TODO: Sửa lỗi cors cho axios client
            const res = await axios.get(url)
            const { results, message, status } = res.data

            if (status === 'Success') {
                return results
            } else {
                throw new Error(message)
            }
        } catch (error) {
            toast.error('Lỗi API phường/xã thất bại', {
                description: `${error}`,
            })
        }
    }

    return { loading, provinces, getDistricts, getCommunes }
}
