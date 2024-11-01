import * as React from 'react'

import { Icon } from '@iconify/react'

import { useGetAllProducts } from '@/hooks/useProduct'

import SelectBox from '@/components/fragment/SelectBox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import DashboardPagination from '../components/DashboardPagination'
import { NewProductForm } from '../components/forms'
import { ProductsTable } from '../components/tables'

export default function ProductDashboard() {
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const [params, setParams] = React.useState<object>({})

    const [showing, setShowing] = React.useState<string>('5')
    const [section, setSection] = React.useState<string>('Product List')
    React.useEffect(() => {
        setParams({
            limit: showing,
            page: currentPage,
            order: 'createdAt',
            sort: 'desc',
        })
    }, [showing, currentPage])

    const { products, isLoading, totalPage } = useGetAllProducts(params)

    return (
        <React.Fragment>
            <h1 className="text-2xl font-bold mb-7">Sản phẩm</h1>
            {section === 'Product List' && (
                <div className="bg-white p-6 rounded-xl">
                    <div className="grid grid-cols-[180px_1fr_208px] gap-7">
                        <div className="text-xs flex items-center justify-start gap-2.5 w-[180px]">
                            <SelectBox
                                selectList={['5', '10', '15']}
                                defaultValue={showing}
                                setValue={setShowing}
                            />
                            <p className="text-sm text-nowrap">
                                sản phẩm / trang
                            </p>
                        </div>
                        <div>
                            <Input placeholder="Tìm kiếm" />
                        </div>
                        <Button
                            onClick={() => {
                                setSection('Create New Product')
                            }}
                        >
                            Thêm mới sản phẩm
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
            )}
            {section === 'Create New Product' && (
                <div>
                    <button
                        className="mb-4 flex items-center justify-start gap-2 text-sm px-3 py-1 hover:bg-white transition-colors w-fit rounded-full cursor-pointer"
                        onClick={() => {
                            setSection('Product List')
                        }}
                    >
                        <Icon icon="hugeicons:arrow-left-02" />
                        <p>Quay lại</p>
                    </button>
                    <div>
                        <NewProductForm setSection={setSection} />
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}
