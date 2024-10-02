import GalleryImageCard from '../GalleryImageCard'

export default function ViewByProduct({ data }: { data: Product[] }) {
    return (
        <div className="space-y-5">
            {data.map((product) => {
                if (product.variants.length > 0) {
                    return (
                        <div
                            className="flex flex-col items-start"
                            key={product._id}
                        >
                            <p className="font-semibold text-lg">
                                {product.name}
                            </p>
                            <div className="mt-3 grid grid-cols-12 gap-1">
                                {product.variants.map((variant) => (
                                    <div key={variant._id}>
                                        {variant.images.map((image, index) => (
                                            <GalleryImageCard
                                                key={image + index}
                                                image={image}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}
