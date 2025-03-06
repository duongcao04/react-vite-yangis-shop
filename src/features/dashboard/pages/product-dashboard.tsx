import * as React from 'react'

import { Input, Select, SelectItem } from '@nextui-org/react'
import { SharedSelection } from '@nextui-org/system'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { config } from '@/config'

import { useGetAllProducts } from '../../product/hooks/use-get-all-products'
import DashboardPagination from '../components/dashboard-pagination'
import ProductsTable from '../components/tables/products-table'

export default function ProductDashboard() {
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const [params, setParams] = React.useState<object>({})

    const PAGE_SIZE_OPTIONS = [{ value: '5' }, { value: '10' }, { value: '15' }]

    const [showing, setShowing] = React.useState<string>(
        PAGE_SIZE_OPTIONS[0].value
    )
    React.useEffect(() => {
        setParams({
            take: showing,
            page: currentPage,
            sort: 'desc',
        })
    }, [showing, currentPage])

    const { isLoading, products, totalPage, totalCount } =
        useGetAllProducts(params)

    return (
        <>
            <div className="mb-7 flex items-center justify-between">
                <div className="flex items-center justify-start gap-2">
                    <h1 className="text-2xl font-bold">Product Dashboard</h1>
                    {isLoading && (
                        <Skeleton className="h-[24px] w-[30px] rounded-lg bg-white" />
                    )}
                    {!isLoading && (
                        <p className="bg-[#fee2e2] px-2 py-0.5 rounded-lg text-sm font-semibold text-[#db4444]">
                            {totalCount}
                        </p>
                    )}
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl">
                <div className="grid grid-cols-[180px_1fr_130px] gap-7">
                    <div className="text-xs flex items-center justify-start gap-2.5 w-[180px]">
                        <Select
                            className="max-w-xs"
                            items={PAGE_SIZE_OPTIONS}
                            defaultSelectedKeys={showing}
                            label="Showing"
                            onSelectionChange={
                                setShowing as (keys: SharedSelection) => void
                            }
                        >
                            {PAGE_SIZE_OPTIONS.map((item) => (
                                <SelectItem key={item.value}>
                                    {item.value}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <Input
                        placeholder="Search..."
                        classNames={{ inputWrapper: 'h-full' }}
                    />
                    <Button
                        variant="default"
                        colorSchema={'success'}
                        asChild
                        className="w-full h-full"
                    >
                        <Link to={config.routes.dashboard.product.create}>
                            Add new
                        </Link>
                    </Button>
                </div>
                <div className="mt-6">
                    <ProductsTable
                        loadingProducts={isLoading}
                        products={products}
                    />
                </div>
                <div className="mt-6 bg-[#edf1f5] h-[1px] w-full" />
                <div id="pagination" className="mt-6">
                    <DashboardPagination
                        currentPage={currentPage}
                        totalPage={totalPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </>
    )
}
