import { Product } from './product'
import { Variant } from './variant'

export type Attribute = Partial<Timestampz> & {
    id: string
    name: string
    product?: Product
    variants?: Variant[]
    values: {
        id: string
        value: string
    }[]
}

export type NewAttribute = Pick<Attribute, 'name'>
