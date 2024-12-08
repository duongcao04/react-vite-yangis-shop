import * as React from 'react'

import { Link } from 'react-router-dom'

import { useGetProductsAndPaginate } from '@/hooks/useProduct'

import SelectBox from '@/components/fragments/SelectBox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

import { config } from '@/configs'

import DashboardPagination from '../../components/DashboardPagination'
import { ProductsTable } from '../../components/tables'

export default function ProductDashboard() {
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const [params, setParams] = React.useState<object>({})

    const [showing, setShowing] = React.useState<string>('5')
    React.useEffect(() => {
        setParams({
            limit: showing,
            page: currentPage,
            order: 'createdAt',
            sort: 'desc',
        })
    }, [showing, currentPage])

    const { products, isLoading, totalProduct, totalPage } =
        useGetProductsAndPaginate(params)

    return (
        <React.Fragment>
            <div className="mb-7 flex items-center justify-between">
                <div className="flex items-center justify-start gap-2">
                    <h1 className="text-2xl font-bold">Product Dashboard</h1>
                    {isLoading && (
                        <Skeleton className="h-[24px] w-[30px] rounded-lg bg-white" />
                    )}
                    {!isLoading && (
                        <p className="bg-[#fee2e2] px-2 py-0.5 rounded-lg text-sm font-semibold text-[#db4444]">
                            {totalProduct}
                        </p>
                    )}
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl">
                <div className="grid grid-cols-[180px_1fr_100px] gap-7">
                    <div className="text-xs flex items-center justify-start gap-2.5 w-[180px]">
                        <SelectBox
                            selectList={['5', '10', '15']}
                            defaultValue={showing}
                            setValue={setShowing}
                        />
                        <p className="text-sm text-nowrap font-medium">
                            products / page
                        </p>
                    </div>
                    <Input placeholder="Search..." />
                    <Button
                        variant="default"
                        colorSchema={'success'}
                        asChild
                        className="w-full"
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
        </React.Fragment>
    )
}
