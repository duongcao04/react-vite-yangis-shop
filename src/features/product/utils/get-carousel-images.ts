import { Product } from '@/types/product'
import { Variant } from '@/types/variant'

export type CarouselImage = {
    id: number
    thumbnail: string
    label: string
    images: string[]
}

export const getCarouselImages: (product: Product) => CarouselImage[] = (
    product
) => {
    const result = []

    const thumbnail = {
        id: result.length,
        thumbnail: product.thumbnail,
        label: 'Thumbnail',
        images: [product.thumbnail],
    }
    result.push(thumbnail)

    if (product.variants.length === 0) {
        return result
    }

    product.variants.forEach((variant: Variant) => {
        const images = variant.images.map((img) => img.image_url)
        result.push({
            id: result.length,
            thumbnail: images[0],
            label: variant.SKU,
            images: images,
        })
    })

    return result
}
