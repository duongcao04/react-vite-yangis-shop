import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { IoFilter } from 'react-icons/io5'

import Breadcrumbs from '@/components/Breadcrumbs'
import ProductCard from '@/components/ProductCard'
import MobileFilterDrawer from '@/components/fragment/MobileFilterDrawer'
import { PaginationCustomize } from '@/components/fragment/PaginationCustomize'
import SelectBox from '@/components/fragment/SelectBox'
import { Skeleton } from '@/components/ui/skeleton'
import FilterBar from '@/features/Product/components/FilterBar'
import { useGetProducts } from '@/hooks/useProduct'
import { useQueryString } from '@/hooks/useQueryString'
import { motion } from 'framer-motion'

function Products() {
    // Get query from searchbar
    const queryString: {
        name?: string
        category?: string
        brand?: string
        price?: string
    } = useQueryString()
    // State for pagination
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const LIMIT = 12
    // Get search url params
    const [params, setParams] = React.useState<object>({})
    // Get products
    const {
        isLoading: loadingProducts,
        products,
        totalProduct,
        totalPage,
    } = useGetProducts(params)

    const { name, category, brand, price } = queryString

    const initialFilter = {
        category,
        brand,
        price,
    }
    const [, setSort] = React.useState<string>('name')
    const [filter, setFilter] = React.useState<{
        category?: string
        brand?: string
        price?: string
    }>(initialFilter)

    React.useEffect(() => {
        setParams({
            name: name,
            category: filter.category,
            brand: filter.brand,
            limit: LIMIT,
            page: currentPage,
        })
    }, [filter, name, currentPage])

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Sản phẩm</title>
            </Helmet>

            <div className="my-4">
                <Breadcrumbs />
            </div>
            <div className="laptop:grid grid-cols-4 gap-8 mb-14">
                <div className="hidden laptop:block">
                    <FilterBar filter={filter} setFilter={setFilter} />
                </div>
                <div className="col-span-3 h-fit">
                    <div className="block laptop:hidden">
                        <div className="bg-white px-1 py-1 my-3 flex items-center justify-between">
                            <div className="flex items-center justify-end gap-3 text-sm">
                                <p className="opacity-60">Sắp xếp theo:</p>
                                <SelectBox
                                    className={
                                        'w-[120px] laptop:w-[180px] h-[30px] focus:ring-0'
                                    }
                                    defaultValue="A-Z"
                                    selectList={[
                                        'A-Z',
                                        'Giá thấp nhất',
                                        'Giá cao nhất',
                                    ]}
                                    setValue={setSort}
                                />
                            </div>

                            <MobileFilterDrawer
                                trigger={
                                    <button className="py-1 px-3 hover:bg-wallground-light transition duration-200 rounded-md flex items-center justify-start gap-3 text-sm">
                                        <IoFilter size={15} />
                                        <p>Bộ lọc tìm kiếm</p>
                                    </button>
                                }
                                filter={filter}
                                setFilter={setFilter}
                            />
                        </div>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                        {!loadingProducts && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm"
                            >
                                Tìm thấy{' '}
                                <span className="font-bold">
                                    {totalProduct}
                                </span>{' '}
                                kết quả
                            </motion.p>
                        )}
                        {loadingProducts && (
                            <Skeleton className="w-40 h-5 rounded-sm bg-white" />
                        )}
                        <div className="hidden laptop:block">
                            <div className="flex items-center justify-end gap-3 text-sm">
                                <p className="opacity-60">Sắp xếp theo:</p>
                                <SelectBox
                                    className={
                                        'w-[180px] h-[30px] focus:ring-0'
                                    }
                                    defaultValue="A-Z"
                                    selectList={[
                                        'A-Z',
                                        'Giá thấp nhất',
                                        'Giá cao nhất',
                                    ]}
                                    setValue={setSort}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-[11px]">
                        {!loadingProducts &&
                            products.map((product) => (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    key={product._id}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        {loadingProducts &&
                            new Array(8).fill('products').map((item, index) => (
                                <div
                                    key={item + index}
                                    className="w-full h-[357px] p-2 rounded-lg bg-white"
                                >
                                    <Skeleton className="w-full h-[250px] rounded-lg" />
                                    <Skeleton className="mt-2 w-full h-[10px] rounded-sm" />
                                    <Skeleton className="my-2 w-full h-[20px] rounded-sm" />
                                    <Skeleton className="my-2 w-full h-[38px] rounded-sm" />
                                </div>
                            ))}
                    </div>
                    <div className="mt-10">
                        <PaginationCustomize
                            totalPage={totalPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
