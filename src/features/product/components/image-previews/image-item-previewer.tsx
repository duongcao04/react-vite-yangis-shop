import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { Skeleton } from '@/components/ui/skeleton'

import { Variant } from '@/types/variant'

import { type CarouselImage } from '../../utils/get-carousel-images'
import ImageCarousel from './image-carousel'

interface Props {
    isLoading: boolean
    carouselImages: CarouselImage[]
    currentVariant: Variant
}
export default function ImageItemPreviewer({
    isLoading,
    carouselImages,
    currentVariant,
}: Props) {
    const [currentImages, setCurrentImages] = useState<CarouselImage>(
        {} as CarouselImage
    )

    useEffect(() => {
        const foundIndex = carouselImages.findIndex(
            (item) => item.label === currentVariant.SKU
        )
        if (foundIndex !== -1) setCurrentImages(carouselImages[foundIndex])
        else setCurrentImages(carouselImages[0])
    }, [carouselImages, currentVariant])

    const handleSetCurrentImages = (item: CarouselImage) => {
        setCurrentImages(item)
    }

    return (
        <div className="py-5 laptop:h-[597px]">
            {/* Viewing */}
            <div className="w-full flex items-center justify-center py-10 laptop:pt-5 laptop:h-[444px] rounded-md">
                {!isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <ImageCarousel images={currentImages?.images} />
                    </motion.div>
                )}
                {isLoading && <Skeleton className="w-full h-[444px]" />}
            </div>

            {/* Preview list */}
            <div className="laptop:mt-3 h-[100px]">
                <div className="flex items-start justify-center gap-3 overflow-x-scroll no-scrollbar">
                    {!isLoading &&
                        carouselImages.map((item) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={item.id}
                                className="cursor-pointer w-[57px] "
                            >
                                <div
                                    className={`${
                                        currentImages?.label == item.label
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } border-[1px] rounded-md`}
                                    onClick={() => {}}
                                >
                                    <div
                                        onClick={() => {
                                            handleSetCurrentImages(item)
                                        }}
                                    >
                                        <img
                                            src={item.thumbnail}
                                            alt="index"
                                            className="size-[55px] object-cover rounded-sm p-1.5"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    {isLoading &&
                        new Array(5).fill('product').map((item, index) => (
                            <div key={item + index} className="w-[57px]">
                                <Skeleton className="w-full h-[55px] rounded-md" />
                                <Skeleton className="mt-[9px] w-full h-[20px] rounded-md" />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
