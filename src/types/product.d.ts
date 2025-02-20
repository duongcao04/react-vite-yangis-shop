type Product = Timestampz & {
    id: string
    name: string
    slug: string
    price: number
    discount_percentage?: number
    description: string
    thumbnail: string
    is_publish: boolean
    view_count: number
    brand: Brand
    categories: Category[]
    attributes: Attribute[]
    variants: Variant[]
}

type NewProduct = Omit<
    Product,
    'id' | 'brand' | 'created_at' | 'categories' | 'updated_at' | 'deleted_at'
> & {
    brand_id: string
    category_ids: string[]
}
