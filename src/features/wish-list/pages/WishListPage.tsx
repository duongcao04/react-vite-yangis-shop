import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { useGetProducts } from '@/hooks/useProduct'

import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from '@/components/ui/button'

import { addMany } from '@/redux/cartSlice'
import { RootState } from '@/redux/store'
import { resetWishlist } from '@/redux/wishlistSlice'

import ProductCard from '../../product/components/cards/ProductCard'

function WishListPage() {
    const { products } = useGetProducts()
    const dispatch = useDispatch()
    const { wishlist } = useSelector((state: RootState) => state.wishlist)

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Sản phẩm yêu thích</title>
            </Helmet>

            <div className="my-4">
                <Breadcrumbs />
            </div>
            <div className="mb-20">
                <div className="flex items-center justify-between">
                    <p className="text-3xl font-semibold">
                        Sản phẩm yêu thích ({wishlist.length ?? 0})
                    </p>
                    {wishlist.length > 0 && (
                        <Button
                            variant={'outline'}
                            className="w-[223px] h-[56px] font-medium"
                            onClick={() => {
                                const newCarts = wishlist.map(
                                    (newCartItem) => ({
                                        product: newCartItem,
                                        quantity: 1,
                                        variant: newCartItem.variants[0],
                                    })
                                )
                                dispatch(addMany(newCarts))
                                dispatch(resetWishlist())
                            }}
                        >
                            Chuyển tất cả vào giỏ hàng
                        </Button>
                    )}
                </div>
                <div className="mt-[60px] grid grid-cols-5 gap-8">
                    {wishlist.length > 0 &&
                        wishlist.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                isShowHeart={false}
                                isShowDelete={true}
                                isShowAddToCart={true}
                                isShowRating={false}
                            />
                        ))}
                    {wishlist.length == 0 && (
                        <div className="col-span-5">
                            <p className="text-center">Không có sản phẩm nào</p>
                        </div>
                    )}
                </div>

                <div className="mt-[80px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start gap-4">
                            <svg
                                width="20"
                                height="40"
                                viewBox="0 0 20 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    width="20"
                                    height="40"
                                    rx="4"
                                    fill="#DB4444"
                                />
                            </svg>
                            <p className="text-[20px] leading-[26px]">
                                Dành cho bạn
                            </p>
                        </div>
                        <Button
                            asChild
                            className="w-[150px] h-[56px]"
                            variant={'outline'}
                        >
                            <Link to={'/products'}>Xem tất cả</Link>
                        </Button>
                    </div>
                    <div className="mt-[60px] grid grid-cols-5 gap-8">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                isShowHeart={false}
                                isShowDelete={false}
                                isShowAddToCart={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WishListPage
