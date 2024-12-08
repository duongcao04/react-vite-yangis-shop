import { FormikProps, useFormik } from 'formik'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { useGetAllBrands } from '@/hooks/useBrand'
import { useGetAllCategories } from '@/hooks/useCategory'
import { useCreateProduct } from '@/hooks/useProduct'

import { Button } from '@/components/ui/button'
import { ButtonLoading } from '@/components/ui/button-loading'

import { config } from '@/configs'
import { INITIAL_DATA } from '@/constants/editorInitialData'

import { newProductValidationSchema as validationSchema } from '../../schemas/newProductValidationSchema'
import {
    ProductComponany,
    ProductDescription,
    ProductDetail,
    ProductImages,
    ProductThumbnail,
    ProductType,
    ProductVariants,
} from '../form-feilds/product'

function FloatButton({
    form,
    isLoading,
}: {
    form: FormikProps<FormValues>
    isLoading: boolean
}) {
    const navigate = useNavigate()
    return (
        <>
            <div className="fixed bottom-10 right-[calc(2.5rem+278px)] z-10">
                <Button
                    type="button"
                    className="w-[250px] h-[50px] !bg-red-100 text-red-600 hover:!bg-red-200 hover:text-red-700"
                    title="Create Product"
                    variant={'outline'}
                    onClick={() => {
                        form.resetForm()
                        navigate(config.routes.dashboard.product.DEFAULT)
                    }}
                >
                    <p className="text-base">Save as draft</p>
                </Button>
            </div>
            <div className="fixed bottom-10 right-10 z-10">
                <ButtonLoading
                    type="submit"
                    className="w-[250px] h-[50px]"
                    title="Create Product"
                    colorSchema={'success'}
                    isLoading={isLoading}
                >
                    <p className="text-base">Create Product</p>
                </ButtonLoading>
            </div>
        </>
    )
}
export const RemoveButton = ({
    size = 25,
    handleRemove,
}: {
    size?: number
    handleRemove: () => void
}) => {
    return (
        <Button
            variant={'destructive'}
            type="button"
            size={'icon'}
            onClick={() => {
                handleRemove()
            }}
            className="w-fit h-fit p-2"
        >
            <MdDelete size={size} />
        </Button>
    )
}

export interface FormValues extends yup.InferType<typeof validationSchema> {}
const initialValues: FormValues = {
    name: '',
    slug: '',
    description: JSON.stringify(INITIAL_DATA),
    thumbnail: {} as File,
    featureImage: [],
    price: 0,
    sale: '',
    category: '',
    brand: '',
    inStock: 0,
    variants: [],
}
export default function NewProductForm() {
    const navigate = useNavigate()
    const { isLoading, createProduct } = useCreateProduct()
    const { categories } = useGetAllCategories()
    const { brands } = useGetAllBrands()

    const formik: FormikProps<FormValues> = useFormik<FormValues>({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const newProduct: NewProduct = {
                name: values.name,
                description: values.description,
                thumbnail: values.thumbnail,
                featureImage: values.featureImage,
                price: +values.price,
                sale: values.sale,
                slug: values.slug,
                inStock: 0,
                category: values.category,
                brand: values.brand,
                variants: values.variants,
            }
            console.log(newProduct)

            // createProduct(newProduct)
            // navigate(config.routes.dashboard.product.DEFAULT)
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <FloatButton form={formik} isLoading={isLoading} />
            <div className="grid grid-cols-3 gap-5">
                <div className="col-span-1 space-y-5">
                    <div className="bg-white rounded-xl p-6 border">
                        <ProductThumbnail form={formik} />
                    </div>
                    <div className="bg-white rounded-xl p-6 border">
                        <ProductImages form={formik} />
                    </div>
                    <div className="bg-white rounded-xl p-6 border">
                        <ProductVariants form={formik} />
                    </div>
                </div>
                <div className="col-span-2 space-y-5">
                    <div className="bg-white rounded-xl p-6 border">
                        <ProductType data={categories} form={formik} />
                    </div>
                    <div className="bg-white rounded-xl p-6 border">
                        <ProductComponany data={brands} form={formik} />
                    </div>
                    <div className="bg-white rounded-xl p-6 border">
                        <ProductDetail form={formik} />
                    </div>
                    <div className="bg-white rounded-xl p-6 border">
                        <ProductDescription form={formik} />
                    </div>
                </div>
            </div>
        </form>
    )
}
