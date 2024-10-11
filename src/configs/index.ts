import { colorsSchema } from './colors.config'
import { routesSchema } from './routes.config'

const config = {
    colors: colorsSchema,
    products_pagination: {
        limit: 8,
    },
    routes: routesSchema,
} as const

export { config }
