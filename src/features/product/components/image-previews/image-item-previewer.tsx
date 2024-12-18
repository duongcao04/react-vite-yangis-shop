import * as React from 'react'

import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

import { Skeleton } from '@/components/ui/skeleton'

import { IImagePreviewOptions } from '../../utils/get-product-images'

import ImageCarousel from './image-carousel'

interface IImagePreviewerProps {
    loadingProduct: boolean
    productImages: IImagePreviewOptions[]
    currentSelection: string
}

function ImagePreviewer({
    loadingProduct,
    productImages,
    currentSelection,
}: IImagePreviewerProps) {
    const [currentImages, setCurrentImages] =
        React.useState<IImagePreviewOptions>({} as IImagePreviewOptions)

    React.useEffect(() => {
        try {
            const foundIndex = productImages.findIndex(
                (item) => item.label === currentSelection
            )
            if (foundIndex !== -1) setCurrentImages(productImages[foundIndex])
            else setCurrentImages(productImages[0])
        } catch (error) {
            throw new Error()
        }
    }, [productImages, currentSelection])

    const handleSetCurrentImages = (colorLabel: string) => {
        const foundIndex = productImages.findIndex(
            (item) => item.label === colorLabel
        )
        setCurrentImages(productImages[foundIndex])
    }

    return (
        <div className="py-5 laptop:h-[597px]">
            {/* Viewing */}
            <div className="w-full flex items-center justify-center py-10 laptop:pt-5 laptop:h-[444px] rounded-md">
                {!loadingProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <ImageCarousel images={currentImages?.images} />
                    </motion.div>
                )}
                {loadingProduct && <Skeleton className="w-full h-[444px]" />}
            </div>

            {/* Preview list */}
            <div className="laptop:mt-3 h-[100px]">
                <div className="flex items-start justify-center gap-3 overflow-x-scroll no-scrollbar">
                    {!loadingProduct &&
                        productImages.map((item) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={item.id}
                                className="cursor-pointer w-[57px]"
                            >
                                <div
                                    className={`${
                                        currentImages?.label == item.label
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                    } border-[1px]`}
                                    onClick={() => {}}
                                >
                                    {item.icon && (
                                        <div
                                            className="size-[55px] grid place-items-center"
                                            onClick={() => {
                                                setCurrentImages(
                                                    productImages[0]
                                                )
                                            }}
                                        >
                                            <Icon
                                                icon={item.icon}
                                                fontSize={25}
                                            />
                                        </div>
                                    )}
                                    {!item.icon && (
                                        <div
                                            onClick={() => {
                                                handleSetCurrentImages(
                                                    item.label
                                                )
                                            }}
                                        >
                                            <img
                                                src={item.images[0]}
                                                alt="index"
                                                className="size-[55px] object-cover rounded-sm p-1.5"
                                            />
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs leading-none text-center mt-[5px]">
                                    {item.label}
                                </p>
                            </motion.div>
                        ))}
                    {loadingProduct &&
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

export default ImagePreviewer
