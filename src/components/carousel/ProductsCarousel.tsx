import ProductCard from '@/components/ProductCard'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface IProductsCarouselProps {
    products: Product[]
    itemClassName?: string
}

function ProductsCarousel({ products, itemClassName }: IProductsCarouselProps) {
    return (
        <div className="group w-full select-none">
            <Carousel
                opts={{
                    align: 'start',
                }}
            >
                <CarouselContent>
                    {products.map((product) => (
                        <CarouselItem
                            className={cn(
                                'basis-1/2 laptop:basis-1/5',
                                itemClassName
                            )}
                            key={product._id}
                        >
                            <ProductCard product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden group-hover:block">
                    <CarouselPrevious className="-left-[15px]" />
                    <CarouselNext className="-right-[15px]" />
                </div>
            </Carousel>
        </div>
    )
}

export default ProductsCarousel
