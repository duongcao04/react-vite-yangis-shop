import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { LiaCartArrowDownSolid } from 'react-icons/lia'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Star from '@/components/icons/star'
import { Skeleton } from '@/components/ui/skeleton'

import { config } from '@/configs'
import { addCart } from '@/redux/cart-slice'
import { RootState } from '@/redux/store'
import { addProduct, removeProduct } from '@/redux/wishlist-slice'
import { calcSalePrice } from '@/utils/calc-sale-price'
import { formatMoney } from '@/utils/number-services'

export const isProductInList: (product: Product, list: Product[]) => boolean = (
    product,
    list
) => {
    const foundProductExist = list.findIndex((item) => item._id === product._id)
    return foundProductExist !== -1 ? true : false
}

function ProductSaleTag({ saleValue }: { saleValue: string }) {
    return (
        <div className="absolute w-[55px] h-[26px] rounded-sm top-[15px] left-[15px] bg-[#db4444] z-10">
            <p className="text-center text-white text-xs leading-[26px] tracking-wider font-medium">
                -{saleValue}
            </p>
        </div>
    )
}

function AddWishtlistButton({ onAdd }: { onAdd: () => void }) {
    return (
        <button
            className="p-[9px] rounded-full bg-wallground-light hover:bg-[#fee2e2] hover:text-[#dc2626] transition duration-200"
            onClick={onAdd}
            title="Add to Wishlist"
        >
            <FaRegHeart size={16} />
        </button>
    )
}
function RemoveWishlistButton({ onRemove }: { onRemove: () => void }) {
    return (
        <button
            className="p-[9px] rounded-full bg-[#fee2e2] text-[#dc2626] transition duration-200"
            onClick={onRemove}
            title="Remove Wishlist"
        >
            <FaHeart size={16} />
        </button>
    )
}
function AddCartButton({ onAddCart }: { onAddCart: () => void }) {
    return (
        <button
            className="group flex items-center justify-center size-[32px] bg-wallground-light rounded-full hover:bg-[#fee2e2] hover:text-[#dc2626] transition duration-200"
            onClick={onAddCart}
            title="Add to cart"
        >
            <LiaCartArrowDownSolid
                size={30}
                className="opacity-65 group-hover:opacity-100"
            />
        </button>
    )
}

function ProductRating({ data }: { data: Product }) {
    return (
        <div className="flex items-center justify-start gap-2 my-1">
            <div className="flex items-center justify-start">
                {new Array(2).fill('fill').map((item, index) => (
                    <Star key={index + item} />
                ))}
                {new Array(3).fill('outline').map((item, index) => (
                    <Star key={index + item} />
                ))}
            </div>
            <p className="text-sm leading-[21px] font-semibold">
                ({data.reviews ? data.reviews.length : '0'})
            </p>
        </div>
    )
}

export default function ProductCard({
    isLoading = false,
    product,
    isShowAddToCart = true,
    isShowRating = true,
    isShowHeart = true,
}: {
    isLoading?: boolean
    product: Product
    isShowRating?: boolean
    isShowAddToCart?: boolean
    isShowHeart?: boolean
}) {
    const dispatch = useDispatch()
    const { wishlist } = useSelector((state: RootState) => state.wishlist)

    const isWished = isProductInList(product, wishlist)

    const handleAddCart = (product: Product) => {
        const cartItem = {
            product,
            quantity: 1,
            variant: product.variants[0],
        }
        dispatch(addCart(cartItem))
    }

    const handleAddWishlist = (product: Product) => {
        dispatch(addProduct(product))
    }
    const handleRemoveWishList = (productId: string) => {
        dispatch(removeProduct(productId))
    }

    if (!isLoading) {
        return (
            <div className="group relative bg-white rounded-lg border-[1px] border-transparent hover:border-border hover:shadow-md transition duration-300">
                <div className="w-full h-[250px] rounded-sm flex items-center justify-center select-none">
                    {product.sale && (
                        <ProductSaleTag saleValue={product.sale} />
                    )}
                    <Link
                        to={`${config.routes.products}/${product.slug}`}
                        className="h-[230px] hover:scale-105 duration-200 transition"
                        title={product.name}
                    >
                        <img
                            src={product.thumbnail}
                            alt={product.name}
                            height={230}
                            className="h-full object-contain scale-75"
                        />
                    </Link>
                </div>
                {isShowHeart && (
                    <div className="absolute top-[12px] right-[12px] flex flex-col gap-2">
                        {!isWished && (
                            <AddWishtlistButton
                                onAdd={() => {
                                    handleAddWishlist(product)
                                }}
                            />
                        )}
                        {isWished && (
                            <RemoveWishlistButton
                                onRemove={() => {
                                    handleRemoveWishList(product._id)
                                }}
                            />
                        )}
                    </div>
                )}
                <div className="px-3 pb-5">
                    <Link
                        to={`${config.routes.products}/${product.slug}`}
                        className="text-base font-medium text-black dark:text-white hover:text-blue-600 transition duration-200"
                        title={product.name}
                    >
                        {product.name}
                    </Link>
                    {isShowRating === true && <ProductRating data={product} />}
                    <div className="mt-1 flex items-end justify-between">
                        {!product.sale && (
                            <p className="text-lg font-medium text-[#db4444]">
                                {formatMoney(product.price)}
                            </p>
                        )}
                        {product.sale && (
                            <div className="flex flex-col items-start">
                                <p className="text-xs line-through text-gray-400">
                                    {formatMoney(product.price)}
                                </p>
                                <p className="text-lg font-medium text-[#db4444]">
                                    {formatMoney(
                                        calcSalePrice(
                                            product.price,
                                            product.sale
                                        )
                                    )}
                                </p>
                            </div>
                        )}
                        <div className="w-full flex justify-end">
                            {isShowAddToCart && (
                                <AddCartButton
                                    onAddCart={() => {
                                        handleAddCart(product)
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return <ProductCardSkeleton />
    }
}

export function ProductCardSkeleton() {
    return (
        <div className="w-full h-[360px] p-3 bg-white rounded-lg border-[1px] border-border space-y-2">
            <Skeleton className="w-full h-[250px]" />
            <Skeleton className="w-full h-[20px]" />
            <Skeleton className="w-full h-[20px]" />
            <Skeleton className="w-full h-[20px]" />
        </div>
    )
}