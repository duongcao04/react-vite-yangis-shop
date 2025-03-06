import * as React from 'react'

import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

import { useQueryString } from '@/hooks/use-query-string'

import Breadcrumbs from '@/components/customize-breadcrumb'
import { PaginationCustomize } from '@/components/fragments/pagination-customize'
import SelectBox from '@/components/fragments/select-box'
import { Skeleton } from '@/components/ui/skeleton'

import MobileFilterDrawer from '@/features/product/components/product-filter-mobile'
import FilterBar from '@/features/product/components/products-filter-bar'

import type { Product } from '@/types/product'

import ProductCard from '../components/cards/product-card'
import { useGetAllProducts } from '../hooks/use-get-all-products'

export interface IFilters {
    category?: string
    brand?: string
    price?: string
    sort?: string
    page?: string
    take?: string
    keyword?: string
}
export default function ProductsPage() {
    // State for pagination
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const [, setSearchParams] = useSearchParams()
    const query: IFilters = useQueryString()

    const [filters, _setFilters] = React.useState<IFilters>({
        keyword: query.keyword,
        brand: query.brand,
        category: query.category,
        price: query.price,
        sort: query.sort,
        page: query.page,
        take: query.take,
    })
    const setFilters = (filterRecord: Record<string, string | undefined>) => {
        const updateFilters: IFilters = {
            ...filters,
            [Object.keys(filterRecord)[0]]: Object.values(filterRecord)[0],
        }

        _setFilters(updateFilters)
        Object.keys(updateFilters).forEach((key: string) => {
            if (updateFilters[key as keyof IFilters] === undefined) {
                delete updateFilters[key as keyof IFilters]
            }
        })
        setSearchParams(updateFilters as Record<string, string>)
    }

    // Get products
    const {
        isLoading: loadingProducts,
        products,
        totalPage,
        totalCount,
    } = useGetAllProducts(filters)

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
                    <FilterBar filters={filters} setFilters={setFilters} />
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
                                    selectList={[
                                        'A-Z',
                                        'Giá thấp nhất',
                                        'Giá cao nhất',
                                    ]}
                                    filters={filters}
                                    setFilters={setFilters}
                                />
                            </div>

                            {/* <MobileFilterDrawer
                                trigger={
                                    <button className="py-1 px-3 hover:bg-wallground-light transition duration-200 rounded-md flex items-center justify-start gap-3 text-sm">
                                        <IoFilter size={15} />
                                        <p>Bộ lọc tìm kiếm</p>
                                    </button>
                                }
                                filter={filter}
                                setFilter={setFilter}
                            /> */}
                        </div>
                    </div>
                    <div className="mb-3 flex items-center justify-between">
                        {!loadingProducts && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-sm"
                            >
                                Found{' '}
                                <span className="font-bold">{totalCount}</span>{' '}
                                results
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
                                    selectList={[
                                        'A-Z',
                                        'Giá thấp nhất',
                                        'Giá cao nhất',
                                    ]}
                                    filters={filters}
                                    setFilters={setFilters}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-[11px]">
                        {!loadingProducts &&
                            products?.map((product: Product) => (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    key={product.id}
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
