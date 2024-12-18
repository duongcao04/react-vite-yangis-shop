import { Image } from '@/components/ui/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

import { cn } from '@/lib/utils'

interface IImageCarouselProps {
    images: string[]
    itemClassName?: string
}

function ImageCarousel({ images, itemClassName }: IImageCarouselProps) {
    return (
        <div className="group w-full select-none">
            <Carousel
                opts={{
                    align: 'start',
                }}
            >
                <CarouselContent>
                    {images &&
                        images.map((image, index) => (
                            <CarouselItem
                                className={cn('', itemClassName)}
                                key={index}
                            >
                                <div className="flex items-center justify-center">
                                    <Image
                                        src={image}
                                        alt="Product Image"
                                        className="max-h-[384px]"
                                    />
                                </div>
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

export default ImageCarousel
