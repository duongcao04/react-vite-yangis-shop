export type Category = Timestampz & {
    id: string
    name: string
    slug: string
    thumbnail: string
    description: string | null
}

export type NewCategory = Pick<Category, 'name' | 'slug' | 'thumbnail' | 'description'>
