import { FormikProps } from 'formik'
import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa'

import useHorizontalScroll from '@/hooks/use-horizontal-scroll'

import { Button } from '@/components/ui/button'

import { Category } from '@/types/category'

import { NewProductFormValue } from '../../schemas/new-product-validate-schema'

export default function ProductCategory({
    data: categories,
    form,
}: {
    data: Category[]
    form: FormikProps<NewProductFormValue>
}) {
    const scrollHorizontalRef = useHorizontalScroll()
    // Form validate value
    const isError = Boolean(form.errors.categoryIds)
    const isTouched = Boolean(form.touched.categoryIds)

    const formCategoryIds = form.values.categoryIds

    const onChangeHandler = (categoryId: string) => {
        const foundCategory = formCategoryIds.findIndex(
            (id) => id === categoryId
        )
        const isSelected = foundCategory !== -1 ? true : false

        if (isSelected) {
            form.setFieldValue(
                'categoryIds',
                formCategoryIds.filter((id) => id !== categoryId)
            )
        } else {
            form.setFieldValue('categoryIds', [...formCategoryIds, categoryId])
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h3
                    className={`text-lg font-semibold ${isTouched ? (isError ? 'text-red-600' : 'text-foreground') : 'text-foreground'}`}
                >
                    Product Category
                </h3>
                <Button
                    type="button"
                    className="flex items-center justify-center gap-2 text-blue-700"
                    variant={'outline'}
                >
                    <FaPlus size={15} />
                    <div>Add new Category</div>
                </Button>
            </div>
            <div className="border-t mt-3 pt-5">
                <div
                    className="flex items-center justify-start gap-3 overflow-x-scroll"
                    ref={scrollHorizontalRef}
                >
                    {categories.map((category) => {
                        const foundCategory = formCategoryIds.findIndex(
                            (id) => id === category.id
                        )
                        const isSelected = foundCategory !== -1 ? true : false

                        return (
                            <motion.div
                                key={category.id}
                                whileTap={{
                                    scale: 0.95,
                                }}
                            >
                                <motion.button
                                    type="button"
                                    className={`border rounded-md px-6 py-4 w-[230px] h-[150px] flex flex-col justify-between transition duration-200 ${isSelected ? 'bg-primary-50 border-primary-500' : 'bg-border border'}`}
                                    onClick={() => {
                                        onChangeHandler(category.id)
                                    }}
                                >
                                    <img
                                        src={category.thumbnail}
                                        className={`size-[70px] object-contain transition duration-200 ${
                                            isSelected
                                                ? 'text-primary-700'
                                                : 'text-foreground'
                                        }`}
                                    />

                                    <div className="text-left">
                                        <p
                                            className={`font-semibold transition duration-200 ${
                                                isSelected
                                                    ? 'text-primary-700'
                                                    : 'text-foreground'
                                            }`}
                                        >
                                            {category.name}
                                        </p>
                                    </div>
                                </motion.button>
                            </motion.div>
                        )
                    })}
                </div>
                {isTouched && isError && (
                    <div className="mt-2">
                        <p className="text-xs font-semibold text-red-500">
                            {form.errors.categoryIds}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}
