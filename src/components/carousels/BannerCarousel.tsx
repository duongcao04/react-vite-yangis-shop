import Image01 from '@/assets/banner/H2_614x212_7364e9c23b.png'
import Image02 from '@/assets/banner/H2_614x212_d6219fd3dd.png'
import Image03 from '@/assets/banner/H2_614x212_e95f546526.png'
import Image04 from '@/assets/banner/H2_614x212_fe06b7a594.png'
import Image05 from '@/assets/banner/H2_ce89265db0.png'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

function BannerCarousel() {
    const bannerImages = [Image01, Image02, Image03, Image04, Image05]

    return (
        <div className="group w-full h-52 select-none">
            <Carousel
                opts={{
                    align: 'start',
                }}
            >
                <CarouselContent>
                    {bannerImages.map((image, index) => (
                        <CarouselItem className="laptop:basis-1/2" key={index}>
                            <img
                                src={image}
                                alt={image + index}
                                className="rounded-xl"
                            />
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

export default BannerCarousel
