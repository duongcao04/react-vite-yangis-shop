import { Product } from './product'
import { User } from './user'

export type Comment = Timestampz & {
    id: string
    user?: User
    rating: number
    comment: string
    product?: Product
}

export type NewComment = Omit<
    Comment,
    'id' | 'user' | 'product' | 'created_at' | 'updated_at' | 'deleted_at'
> & {
    product_id: string
    user_id: string
}
