import * as React from 'react'

import { Icon } from '@iconify/react'
import { FaChevronRight } from 'react-icons/fa'
import { FaChevronLeft } from 'react-icons/fa6'

import SelectBox from '@/components/fragments/SelectBox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import NewCategoryForm from '../components/forms/NewCategoryForm'
import CategoriesTable from '../components/tables/CategoriesTable'

export default function CategoryDashboard() {
    const [showing, setShowing] = React.useState<string>('10')
    const [section, setSection] = React.useState<string>('Category List')

    return (
        <React.Fragment>
            <h1 className="text-2xl font-bold mb-7">Danh mục</h1>
            {section === 'Category List' && (
                <div className="bg-white p-6 rounded-xl">
                    <div className="grid grid-cols-[190px_1fr_208px] gap-7">
                        <div className="text-xs flex items-center justify-start gap-2.5 w-[190px]">
                            <SelectBox
                                selectList={['10', '20', '30']}
                                defaultValue={showing}
                                setValue={setShowing}
                            />
                            <p className="text-sm text-nowrap">
                                danh mục / trang
                            </p>
                        </div>
                        <div>
                            <Input placeholder="Tìm kiếm" />
                        </div>
                        <Button
                            onClick={() => {
                                setSection('Create New Category')
                            }}
                        >
                            Thêm mới danh mục
                        </Button>
                    </div>
                    <div className="mt-6">
                        <CategoriesTable />
                    </div>
                    <div className="mt-6 bg-[#edf1f5] h-[1px] w-full" />
                    <div id="pagination" className="mt-6">
                        <div className="flex items-center justify-end gap-2.5 font-bold text-sm">
                            <button className="size-[42px] border rounded-full flex items-center justify-center">
                                <FaChevronLeft size={16} />
                            </button>
                            <button className="size-[42px] border rounded-full flex items-center justify-center">
                                1
                            </button>
                            <button className="size-[42px] border rounded-full flex items-center justify-center bg-[#2275fc] text-white transition-colors">
                                2
                            </button>
                            <button className="size-[42px] border rounded-full flex items-center justify-center">
                                3
                            </button>
                            <button className="size-[42px] border rounded-full flex items-center justify-center">
                                <FaChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {section === 'Create New Category' && (
                <div>
                    <button
                        className="mb-4 flex items-center justify-start gap-2 text-sm px-3 py-1 hover:bg-white transition-colors w-fit rounded-full cursor-pointer"
                        onClick={() => {
                            setSection('Category List')
                        }}
                    >
                        <Icon icon="hugeicons:arrow-left-02" />
                        <p>Quay lại</p>
                    </button>
                    <div>
                        <NewCategoryForm />
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}
