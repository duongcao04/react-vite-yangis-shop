import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import { LiaCartArrowDownSolid } from 'react-icons/lia'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { config } from '@/configs'
import { addCart } from '@/redux/cartSlice'
import { RootState } from '@/redux/store'
import { addProduct, removeProduct } from '@/redux/wishlistSlice'
import { calcSalePrice } from '@/utils/calcSalePrice'
import { isProductInList } from '@/utils/isInWishlist'
import { formatMoney } from '@/utils/numberServices'

interface IProductCard {
    product: Product
    isShowRating?: boolean
    isShowAddToCart?: boolean
    isShowDelete?: boolean
    isShowHeart?: boolean
}

function ProductCard({
    product,
    isShowAddToCart = true,
    isShowRating = true,
    isShowDelete = false,
    isShowHeart = true,
}: IProductCard) {
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

    return (
        <div className="group relative bg-white rounded-lg border-[1px] border-transparent hover:border-border hover:shadow-md transition duration-300">
            <div className="w-full h-[250px] rounded-sm flex items-center justify-center select-none">
                {product.sale && (
                    <div className="absolute w-[55px] h-[26px] rounded-sm top-[15px] left-[15px] bg-[#db4444] z-10">
                        <p className="text-center text-white text-xs leading-[26px] tracking-wider font-medium">
                            -{product.sale}
                        </p>
                    </div>
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
                {/* TODO: Hiển thị khi hover */}
                {isShowDelete === false && (
                    <div className="absolute top-[12px] right-[12px] flex flex-col gap-2">
                        {isShowHeart === true && (
                            <div>
                                {!isWished && (
                                    <button
                                        className="p-[9px] rounded-full bg-wallground-light hover:bg-[#fee2e2] hover:text-[#dc2626] transition duration-200"
                                        onClick={() => {
                                            handleAddWishlist(product)
                                        }}
                                        title="Thêm vào danh sách yêu thích"
                                    >
                                        <FaRegHeart size={16} />
                                    </button>
                                )}

                                {isWished && (
                                    <button
                                        className="p-[9px] rounded-full bg-[#fee2e2] text-[#dc2626] transition duration-200"
                                        onClick={() => {
                                            handleRemoveWishList(product._id)
                                        }}
                                        title="Xóa khỏi danh sách yêu thích"
                                    >
                                        <FaHeart size={16} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {isShowDelete === true && (
                    <button
                        className="absolute top-[12px] right-[12px] p-[9px] rounded-full bg-white hover:bg-neutral-100 transition duration-200"
                        onClick={() => {
                            handleRemoveWishList(product._id)
                        }}
                    >
                        <RiDeleteBin6Line size={16} />
                    </button>
                )}
            </div>
            <div className="px-3 pb-5">
                <Link
                    to={`${config.routes.products}/${product.slug}`}
                    className="text-base font-medium text-black dark:text-white hover:text-link transition duration-200"
                    title={product.name}
                >
                    {product.name}
                </Link>
                {isShowRating === true && (
                    <div className="flex items-center justify-start gap-2 my-1">
                        <div className="flex items-center justify-start">
                            {new Array(2).fill('fill').map((item, index) => (
                                <svg
                                    width="16"
                                    height="15"
                                    viewBox="0 0 16 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    key={index + item}
                                >
                                    <path
                                        d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z"
                                        fill="#FFAD33"
                                    />
                                </svg>
                            ))}
                            {new Array(3).fill('outline').map((item, index) => (
                                <svg
                                    width="16"
                                    height="15"
                                    viewBox="0 0 16 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    key={index + item}
                                >
                                    <path
                                        opacity="0.25"
                                        d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z"
                                        fill="black"
                                    />
                                </svg>
                            ))}
                        </div>
                        <p className="text-sm leading-[21px] font-semibold">
                            ({product.reviews ? product.reviews.length : '0'})
                        </p>
                    </div>
                )}
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
                                    calcSalePrice(product.price, product.sale)
                                )}
                            </p>
                        </div>
                    )}
                    <div className="w-full flex justify-end">
                        {isShowAddToCart && (
                            <button
                                className="group flex items-center justify-center size-[32px] bg-wallground-light rounded-full hover:bg-[#fee2e2] hover:text-[#dc2626] transition duration-200"
                                onClick={() => {
                                    handleAddCart(product)
                                }}
                                title="Thêm vào giỏ hàng"
                            >
                                <LiaCartArrowDownSolid
                                    size={30}
                                    className="opacity-65 group-hover:opacity-100"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
