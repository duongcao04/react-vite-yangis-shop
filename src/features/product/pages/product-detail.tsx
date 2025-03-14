import React, { useEffect, useState } from 'react'

import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import Breadcrumbs from '@/components/customize-breadcrumb'
import Star from '@/components/icons/star'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { isProductExist } from '@/features/product/utils/is-product-exist'

import { config } from '@/config'
import { addCart, buyNow } from '@/redux/cart.slice'
import { RootState } from '@/redux/store'
import { addProduct, removeProduct } from '@/redux/wishlist-slice'
import type { NewCartItem } from '@/types/cart'
import { VNDCurrencyFormat } from '@/utils/format'
import { isObjectEmpty } from '@/utils/is-object-empty'

import ImageItemPreviewer from '../components/image-previews/image-item-previewer'
import ProductSelection from '../components/product-selection'
import SpecialFeatures from '../components/special-features'
import UserReview from '../components/user-reviews'
import { useGetAllCommentsOfProduct } from '../hooks/use-get-all-comments-of-product'
import { useGetProductBySlug } from '../hooks/use-get-product-by-slug'
import { useGetVariantByAttributes } from '../hooks/use-get-variant-by-attributes'
import { getCarouselImages } from '../utils/get-carousel-images'

export default function ProductDetailPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { wishlist } = useSelector((state: RootState) => state.wishlist)

    // Lấy product id từ params
    const { productSlug } = useParams()
    const { isLoading: isLoadingProduct, product } = useGetProductBySlug(
        productSlug ?? ''
    )

    const { comments } = useGetAllCommentsOfProduct(product.id)

    // Khởi tạo state lưu thông tin lựa chọn hiện tại
    const initVariantFilters = React.useMemo(() => {
        const filters: Record<string, string> = {}
        if (product.attributes) {
            product.attributes.forEach((attribute) => {
                const attributeName = attribute.name.toLowerCase()
                const attributeValue =
                    attribute.values?.[0]?.value.toLowerCase() || ''
                filters[`${attributeName}`] = attributeValue
            })
        }
        return filters
    }, [product.attributes])
    const [variantFilters, setVariantFilters] =
        useState<Record<string, string>>(initVariantFilters)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const searchFilters = Object.fromEntries([...searchParams])
        if (isObjectEmpty(searchFilters)) {
            setVariantFilters(initVariantFilters)
            return
        }
        setVariantFilters(searchFilters)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initVariantFilters])

    useEffect(() => {
        setSearchParams(variantFilters)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variantFilters])

    const { variant } = useGetVariantByAttributes(product.id, variantFilters)

    // Lấy tất cả ảnh theo product-variant
    const carouselImages = getCarouselImages(product)

    // Kiểm tra sản phẩm có nằm trong wishlist ?
    const isWished = isProductExist(product, wishlist)

    const handleBuyNow = () => {
        const newCart: NewCartItem = {
            product,
            variant,
        }
        dispatch(buyNow(newCart))
        navigate(config.routes.check_out)
    }

    const handleAddCart = () => {
        const newCart: NewCartItem = {
            product,
            variant,
        }
        console.log(newCart)

        dispatch(addCart(newCart))
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{product.name ?? 'Hello'} | Yangis Shop</title>
            </Helmet>

            <div className="bg-white border-t border-b">
                <div className="container">
                    <div className="py-5">
                        <Breadcrumbs />
                    </div>
                    <div className="laptop:py-12 pb-12 rounded-lg laptop:grid grid-cols-[750px_1fr] gap-16">
                        <div>
                            {!isLoadingProduct && (
                                <p className="block laptop:hidden text-xl font-inter font-semibold">
                                    {product.name}
                                </p>
                            )}
                            {isLoadingProduct && (
                                <Skeleton className="w-fit h-[20px] rounded-md bg-white" />
                            )}
                            <ImageItemPreviewer
                                isLoading={isLoadingProduct}
                                carouselImages={carouselImages}
                                currentVariant={variant}
                            />
                        </div>
                        <div>
                            {!isLoadingProduct && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hidden laptop:block text-3xl font-inter font-semibold"
                                >
                                    {product.name}
                                </motion.p>
                            )}
                            {isLoadingProduct && (
                                <Skeleton className="w-full h-[30px] rounded-md" />
                            )}
                            <div className="mt-4">
                                {!isLoadingProduct && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center justify-start gap-2"
                                    >
                                        <div className="flex items-center justify-start">
                                            {new Array(2)
                                                .fill('fill')
                                                .map((item, index) => (
                                                    <Star key={item + index} />
                                                ))}
                                            {new Array(3)
                                                .fill('outline')
                                                .map((item, index) => (
                                                    <Star
                                                        key={item + index}
                                                        fill="#bfbfbf"
                                                    />
                                                ))}
                                        </div>
                                        <p className="text-sm leading-[21px] font-semibold opacity-60">
                                            ({comments.length} comments)
                                        </p>
                                        <div className="w-[1px] h-[20px] bg-neutral-300 mx-2" />
                                        <p className="font-medium opacity-60">
                                            Stock: {variant.stock_quantity}
                                        </p>
                                    </motion.div>
                                )}
                                {isLoadingProduct && (
                                    <Skeleton className="w-full h-[21px] rounded-md" />
                                )}
                            </div>
                            <div className="mt-6 mb-2">
                                {!isLoadingProduct && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="font-bold text-[28px] leading-none font-inter tracking-[3%]"
                                    >
                                        {VNDCurrencyFormat(product.price)}
                                    </motion.p>
                                )}
                                {isLoadingProduct && (
                                    <Skeleton className="h-[28px]" />
                                )}
                            </div>
                            {product.variants &&
                                product.variants.length > 0 && (
                                    <ProductSelection
                                        isLoading={isLoadingProduct}
                                        data={product.attributes}
                                        variantFilters={variantFilters}
                                        onChangeVariantFilters={
                                            setVariantFilters
                                        }
                                    />
                                )}
                            <div className="mt-6 flex items-center justify-start gap-3">
                                <Button
                                    size={'lg'}
                                    variant={'outline'}
                                    title="Thêm vào giỏ hàng"
                                    onClick={() => {
                                        handleAddCart()
                                    }}
                                >
                                    <Icon
                                        icon="hugeicons:shopping-cart-check-in-02"
                                        fontSize={22}
                                    />
                                </Button>
                                <Button
                                    className="w-[200px]"
                                    onClick={() => {
                                        handleBuyNow()
                                    }}
                                >
                                    Buy Now
                                </Button>
                                <Button
                                    variant={'outline'}
                                    size={'lg'}
                                    title={
                                        isWished
                                            ? 'Xóa khỏi yêu thích'
                                            : 'Thêm vào yêu thích'
                                    }
                                    onClick={() => {
                                        if (isWished)
                                            dispatch(removeProduct(product))
                                        else dispatch(addProduct(product))
                                    }}
                                >
                                    {!isWished && (
                                        <Icon icon="bi:heart" fontSize={22} />
                                    )}
                                    {isWished && (
                                        <Icon
                                            icon="bi:heart-fill"
                                            fontSize={22}
                                            color="#dc2626"
                                        />
                                    )}
                                </Button>
                            </div>
                            <div className="mt-10">
                                <div className="flex items-center justify-start gap-4 pt-6 pl-4 pb-4 border-[1px] border-b-transparent border-neutral-500 rounded-tr-md rounded-tl-md">
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_261_4843)">
                                            <path
                                                d="M11.6673 31.6667C13.5083 31.6667 15.0007 30.1743 15.0007 28.3333C15.0007 26.4924 13.5083 25 11.6673 25C9.82637 25 8.33398 26.4924 8.33398 28.3333C8.33398 30.1743 9.82637 31.6667 11.6673 31.6667Z"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8.33398 28.3335H7.00065C5.89608 28.3335 5.00065 27.4381 5.00065 26.3335V21.6668M3.33398 8.3335H19.6673C20.7719 8.3335 21.6673 9.22893 21.6673 10.3335V28.3335M15.0007 28.3335H25.0007M31.6673 28.3335H33.0007C34.1052 28.3335 35.0007 27.4381 35.0007 26.3335V18.3335M35.0007 18.3335H21.6673M35.0007 18.3335L30.5833 10.9712C30.2218 10.3688 29.5708 10.0002 28.8683 10.0002H21.6673"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M5 11.8182H11.6667"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M1.81836 15.4545H8.48503"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M5 19.0909H11.6667"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_261_4843">
                                                <rect
                                                    width="40"
                                                    height="40"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div>
                                        <p className="font-medium">
                                            Free Delivery
                                        </p>
                                        <p className="underline font-medium underline-offset-2 mt-2">
                                            Enter your postal code for Delivery
                                            Availability
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-start gap-4 pt-6 pl-4 pb-4 border-[1px] border-neutral-500 rounded-bl-md rounded-br-md">
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_261_4865)">
                                            <path
                                                d="M33.3327 18.3334C32.9251 15.4004 31.5645 12.6828 29.4604 10.5992C27.3564 8.51557 24.6256 7.18155 21.6888 6.80261C18.752 6.42366 15.7721 7.02082 13.208 8.5021C10.644 9.98337 8.6381 12.2666 7.49935 15M6.66602 8.33335V15H13.3327"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M6.66602 21.6667C7.07361 24.5997 8.43423 27.3173 10.5383 29.4009C12.6423 31.4845 15.3731 32.8185 18.3099 33.1974C21.2467 33.5764 24.2266 32.9792 26.7907 31.4979C29.3547 30.0167 31.3606 27.7335 32.4994 25M33.3327 31.6667V25H26.666"
                                                stroke="black"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_261_4865">
                                                <rect
                                                    width="40"
                                                    height="40"
                                                    fill="white"
                                                />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <div>
                                        <p className="font-medium">
                                            Return Delivery
                                        </p>
                                        <p className="font-medium mt-2">
                                            Free 30 Days Delivery Returns.{' '}
                                            <span className="underline underline-offset-2">
                                                Details
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 container px-0">
                <div className="laptop:grid grid-cols-3 gap-5 flex flex-col-reverse">
                    <div className="col-span-2 py-5 px-4 h-fit rounded-xl bg-white mb-5 laptop:mb-0">
                        <p className="text-center font-bold uppercase">
                            Đặc điểm nổi bật
                        </p>
                        <SpecialFeatures data={{}} />
                    </div>
                    {/* {product.properties && (
                        <div className="col-span-1 h-fit border rounded-xl bg-white">
                            <p className="font-semibold px-5 py-4">
                                Thông số kỹ thuật
                            </p>
                            <SpecificationsTable data={product.properties} />
                        </div>
                    )} */}
                </div>
            </div>
            <div className="mt-5 container px-5 py-4 rounded-xl bg-white">
                <p className="mb-7 text-base leading-none font-semibold">
                    Đánh giá & nhận xét về {product?.name}
                </p>
                {/* <UserReview data={comments} productId={product.id} /> */}
            </div>
            <div className="mt-5 mb-20 container">
                <div className="mb-5 flex items-center justify-start gap-4">
                    <svg
                        width="20"
                        height="40"
                        viewBox="0 0 20 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="20" height="40" rx="4" fill="#DB4444" />
                    </svg>
                    <p className="font-semibold text-base leading-[20px] text-[#DB4444]">
                        Sản phẩm tương tự
                    </p>
                </div>
                {/* <ProductsCarousel products={products} /> */}
            </div>
        </React.Fragment>
    )
}
