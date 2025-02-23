import { Product } from './product'

export type Brand = Timestampz & {
    id: string
    name: string
    slug: string
    logo: string
    products?: Product[]
}

export type NewBrand = Pick<Brand, 'name' | 'slug' | 'logo'>
