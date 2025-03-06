import { Attribute } from './attribute'
import { Brand } from './brand'
import { Category } from './category'
import { Comment } from './comment'
import { Variant } from './variant'

export type ProductFeatureImage = Timestampz & {
    id: string
    image_url: string
    product?: Product
}

export type Product = Timestampz & {
    id: string
    name: string
    slug: string
    price: number
    discount_percentage?: number
    description: string
    thumbnail: string
    is_published: boolean
    view_count: number
    brand: Brand
    categories: Category[]
    attributes: Attribute[]
    variants: Variant[]
    comments: Comment[]
    feature_images: ProductFeatureImage[]
}

export type NewProduct = Omit<
    Product,
    | 'id'
    | 'brand'
    | 'created_at'
    | 'categories'
    | 'updated_at'
    | 'attributes'
    | 'variants'
    | 'comments'
    | 'thumbnail'
    | 'feature_images'
    | 'view_count'
    | 'deleted_at'
> & {
    thumbnail: File
    feature_images: File[]
    brand_id: string
    category_ids: string[]
    feature_image_urls?: string[]
    attribute_ids?: string[]
}
