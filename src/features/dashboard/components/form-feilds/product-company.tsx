import { FormikProps } from 'formik'
import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa'

import useHorizontalScroll from '@/hooks/use-horizontal-scroll'

import { Button } from '@/components/ui/button'

import { Brand } from '@/types/brand'

import { NewProductFormValue } from '../../schemas/new-product-validate-schema'

export default function ProductComponany({
    data: brands,
    form,
}: {
    data: Brand[]
    form: FormikProps<NewProductFormValue>
}) {
    const scrollHorizontalRef = useHorizontalScroll()
    // Form validate value
    const isError = Boolean(form.errors.brandId)
    const isTouched = Boolean(form.touched.brandId)

    return (
        <>
            <div className="flex items-center justify-between">
                <h3
                    className={`text-lg font-semibold ${isTouched ? (isError ? 'text-red-600' : 'text-foreground') : 'text-foreground'}`}
                >
                    Product Company
                </h3>
                <Button
                    type="button"
                    className="flex items-center justify-center gap-2 text-blue-700"
                    variant={'outline'}
                >
                    <FaPlus size={15} />
                    <div>Add new Company</div>
                </Button>
            </div>
            <div className="border-t mt-3 pt-5">
                <div
                    className="flex items-center justify-start gap-3 overflow-x-scroll"
                    ref={scrollHorizontalRef}
                >
                    {brands.map((brand) => {
                        const isSelected = form.values.brandId === brand.id

                        return (
                            <motion.div
                                key={brand.id}
                                whileTap={{
                                    scale: 0.95,
                                }}
                            >
                                <motion.button
                                    type="button"
                                    className={`border rounded-md px-6 py-4 w-[230px] h-[150px] flex flex-col justify-between transition duration-200 ${isSelected ? 'bg-primary-50 border-primary-500' : 'bg-border border'}`}
                                    onClick={() => {
                                        form.setFieldValue('brandId', brand.id)
                                    }}
                                >
                                    <img
                                        src={brand.logo}
                                        className="size-[90px] object-contain"
                                    />
                                    <div className="text-left">
                                        <p
                                            className={`font-semibold transition duration-200 ${
                                                isSelected
                                                    ? 'text-primary-700'
                                                    : 'text-foreground'
                                            }`}
                                        >
                                            {brand.name}
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
                            {form.errors.brandId}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}
