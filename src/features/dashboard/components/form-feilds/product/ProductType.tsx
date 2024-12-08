import { Icon } from '@iconify/react/dist/iconify.js'
import { FormikProps } from 'formik'
import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa'

import useHorizontalScroll from '@/hooks/useHorizontalScroll'

import { Button } from '@/components/ui/button'

import { FormValues } from '../../forms/NewProductForm'

export default function ProductType({
    data: categories,
    form,
}: {
    data: Category[]
    form: FormikProps<FormValues>
}) {
    const scrollHorizontalRef = useHorizontalScroll()
    // Form validate value
    const isError = Boolean(form.errors.category)
    const isTouched = Boolean(form.touched.category)

    return (
        <>
            <div className="flex items-center justify-between">
                <h3
                    className={`text-lg font-semibold ${isTouched ? (isError ? 'text-red-600' : 'text-foreground') : 'text-foreground'}`}
                >
                    Product Type
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
                        const isSelected = form.values.category === category._id
                        return (
                            <motion.div
                                key={category._id}
                                whileTap={{
                                    scale: 0.95,
                                }}
                            >
                                <motion.button
                                    type="button"
                                    className={`border rounded-md px-6 py-4 w-[230px] h-[150px] flex flex-col justify-between transition duration-200 ${isSelected ? 'bg-primary-50 border-primary-500' : 'bg-border border'}`}
                                    onClick={() => {
                                        form.setFieldValue(
                                            'category',
                                            category._id
                                        )
                                    }}
                                >
                                    <Icon
                                        icon={category.icon}
                                        fontSize={30}
                                        className={`transition duration-200 ${
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
                                        <p className="text-sm opacity-80">
                                            {category.products.length} items
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
                            {form.errors.category}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}
