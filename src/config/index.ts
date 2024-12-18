import { routesSchema } from './routes.config'

const config = {
    products_pagination: {
        limit: 8,
    },
    routes: routesSchema,
} as const

export { config }
