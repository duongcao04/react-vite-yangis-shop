import GalleryImageCard from '../cards/gallery-image-card'

interface IViewAll {
    data: ProductVariant[]
    isLoading: boolean
}

export default function ViewAll({ data, isLoading }: IViewAll) {
    const images = data.flatMap((variant) => variant.images)

    return (
        <div className="grid grid-cols-12 gap-1">
            {isLoading && <p>Loading ... </p>}
            {!isLoading &&
                images.map((image, index) => (
                    <GalleryImageCard key={index} image={image} />
                ))}
        </div>
    )
}
