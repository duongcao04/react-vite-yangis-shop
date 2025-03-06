import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

import { cn } from '@/lib/utils'

import ProductCard from '../cards/product-card'

function ProductsCarousel({
    isLoading = false,
    data: products,
    classNames,
}: {
    isLoading?: boolean
    data: Product[]
    classNames?: {
        wrapper?: string
        carousel?: string
        carouselItem?: string
    }
}) {
    return (
        <div className={cn('group w-full select-none', classNames?.wrapper)}>
            <Carousel
                opts={{
                    align: 'start',
                }}
                className={classNames?.carousel}
            >
                <CarouselContent>
                    {products?.map((product) => (
                        <CarouselItem
                            className={cn(
                                'basis-1/2 laptop:basis-1/5',
                                classNames?.carouselItem
                            )}
                            key={product.id}
                        >
                            <ProductCard
                                isLoading={isLoading}
                                product={product}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default ProductsCarousel
