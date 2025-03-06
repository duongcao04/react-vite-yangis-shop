import { useState } from 'react'

import { motion } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa6'
import { IoFilter } from 'react-icons/io5'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Skeleton } from '@/components/ui/skeleton'

import { FILTER_PRICE_VALUES } from '@/constants/products-initial-filter'

import { useGetAllBrands } from '../hooks/use-get-all-brands'
import { useGetAllCategories } from '../hooks/use-get-all-categories'

export interface Props {
    filters: {
        category?: string
        brand?: string
        price?: string
    }
    setFilters: (filterRecord: Record<string, string | undefined>) => void
}
function FilterBar({ filters, setFilters }: Props) {
    const { isLoading: isLoadingCategories, categories } = useGetAllCategories()
    const { isLoading: isLoadingBrands, brands } = useGetAllBrands()

    const [collapse, setCollapse] = useState<{
        category: boolean
        brand: boolean
        price: boolean
    }>({
        category: true,
        brand: true,
        price: true,
    })

    return (
        <div className="sticky top-1 bg-white col-span-1 rounded-xl divide-y h-fit select-none">
            <h2 className="text-lg px-5 py-4 font-semibold leading-none">
                <IoFilter
                    className="inline-block mr-3 leading-none align-middle"
                    size={23}
                />
                Filters
            </h2>

            <div className="px-5 py-4">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => {
                        setCollapse((pre) => ({
                            ...pre,
                            category: !collapse.category,
                        }))
                    }}
                >
                    <h3 className="text-base leading-none font-semibold">
                        Category
                    </h3>
                    <FaChevronDown
                        className={`${
                            collapse.category == true ? '' : 'rotate-90'
                        } transition duration-200`}
                    />
                </div>
                <div
                    className={`${
                        collapse.category == true ? '' : 'hidden'
                    } mt-5 grid grid-cols-2 gap-3`}
                >
                    {!isLoadingCategories &&
                        categories.map((category) => (
                            <Button
                                asChild
                                key={category.id}
                                variant={
                                    filters.category === category.slug
                                        ? 'default'
                                        : 'outline'
                                }
                                className="w-full"
                                onClick={() => {
                                    if (filters.category !== category.slug) {
                                        setFilters({
                                            category: category.slug,
                                        })
                                    } else {
                                        setFilters({ category: undefined })
                                    }
                                }}
                            >
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {category.name}
                                </motion.button>
                            </Button>
                        ))}
                    {isLoadingCategories &&
                        new Array(8)
                            .fill('category')
                            .map((item, index) => (
                                <Skeleton
                                    className="w-[133px] h-[40px] rounded-md"
                                    key={item + index}
                                />
                            ))}
                </div>
            </div>

            <div className="px-5 py-4">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => {
                        setCollapse((pre) => ({
                            ...pre,
                            brand: !collapse.brand,
                        }))
                    }}
                >
                    <h3 className="text-base leading-none font-semibold">
                        Company
                    </h3>
                    <FaChevronDown
                        className={`${
                            collapse.brand == true ? '' : 'rotate-90'
                        } transition duration-200`}
                    />
                </div>
                <div
                    className={`${
                        collapse.brand == true ? '' : 'hidden'
                    } mt-5 grid grid-cols-2 gap-3`}
                >
                    {!isLoadingBrands &&
                        brands.map((brand) => (
                            <Button
                                asChild
                                key={brand.id}
                                variant={
                                    filters.brand === brand.slug
                                        ? 'default'
                                        : 'outline'
                                }
                                className="w-full"
                                onClick={() => {
                                    if (filters.brand !== brand.slug) {
                                        setFilters({ brand: brand.slug })
                                    } else {
                                        setFilters({ brand: undefined })
                                    }
                                }}
                            >
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {brand.name}
                                </motion.button>
                            </Button>
                        ))}
                    {isLoadingBrands &&
                        new Array(8)
                            .fill('brands')
                            .map((item, index) => (
                                <Skeleton
                                    className="w-[133px] h-[40px] rounded-md"
                                    key={item + index}
                                />
                            ))}
                </div>
            </div>

            <div className="px-5 py-4">
                <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => {
                        setCollapse((pre) => ({
                            ...pre,
                            price: !collapse.price,
                        }))
                    }}
                >
                    <h3 className="text-base leading-none font-semibold">
                        Mức giá
                    </h3>
                    <FaChevronDown
                        className={`${
                            collapse.price == true ? '' : 'rotate-90'
                        } transition duration-200`}
                    />
                </div>
                <div
                    className={`${collapse.price == true ? '' : 'hidden'} mt-5`}
                >
                    <RadioGroup
                        defaultValue={FILTER_PRICE_VALUES[0].value}
                        className="space-y-2"
                    >
                        {FILTER_PRICE_VALUES.map((item) => (
                            <div
                                className="flex items-center space-x-2"
                                onClick={() => {
                                    setFilters({ price: item.value })
                                }}
                                key={item.id}
                            >
                                <RadioGroupItem
                                    value={item.value}
                                    id={item.id}
                                />
                                <Label
                                    htmlFor={item.id}
                                    className="cursor-pointer"
                                >
                                    {item.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>
            </div>
        </div>
    )
}

export default FilterBar
