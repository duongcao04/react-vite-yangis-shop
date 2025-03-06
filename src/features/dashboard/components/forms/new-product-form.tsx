import { FormikProps, useFormik } from 'formik'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { useGetAllCategories } from '@/hooks/use-get-all-categories'

import { Button } from '@/components/ui/button'
import { ButtonLoading } from '@/components/ui/button-loading'

import { config } from '@/config'
import { EDITORJS_INITIAL_DATA } from '@/constants/editorjs-initial-data'

import { useCreateProduct } from '../../hooks/use-create-product'
import { useGetAllBrands } from '../../hooks/use-get-all-brands'
import {
    NewProductFormValue,
    newProductValidateSchema as validationSchema,
} from '../../schemas/new-product-validate-schema'
import ProductAttributes from '../form-feilds/product-attributes'
import ProductCategory from '../form-feilds/product-category'
import ProductComponany from '../form-feilds/product-company'
import ProductDescription from '../form-feilds/product-description'
import ProductDetail from '../form-feilds/product-detail'
import ProductImages from '../form-feilds/product-images'
import ProductThumbnail from '../form-feilds/product-thumbnail'

function FloatButton({
    form,
    isLoading,
}: {
    form: FormikProps<NewProductFormValue>
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

const initialValues: NewProductFormValue = {
    name: '',
    slug: '',
    description: JSON.stringify(EDITORJS_INITIAL_DATA),
    thumbnail: {} as File,
    featureImages: [],
    price: 0,
    categoryIds: [],
    brandId: '',
    attributeIds: [],
    discountPercentage: 0,
}
export default function NewProductForm() {
    const { isLoading, createProduct } = useCreateProduct()
    const { categories } = useGetAllCategories()
    const { brands } = useGetAllBrands()

    const formik: FormikProps<NewProductFormValue> =
        useFormik<NewProductFormValue>({
            initialValues,
            validationSchema,
            onSubmit: (values) => {
                const form = new FormData()

                form.append('name', values.name)
                form.append('slug', values.slug)
                form.append('price', values.price.toString())

                if (values.discountPercentage) {
                    form.append(
                        'discount_percentage',
                        values.discountPercentage.toString()
                    )
                }

                form.append('description', values.description)

                // Kiểm tra thumbnail trước khi append
                if (values.thumbnail instanceof File) {
                    form.append('thumbnail', values.thumbnail)
                }

                // Kiểm tra featureImages trước khi duyệt
                if (Array.isArray(values.featureImages)) {
                    values.featureImages.forEach((image) => {
                        if (image instanceof File) {
                            form.append('feature_images', image)
                        }
                    })
                }

                form.append('is_published', 'true')

                if (values.brandId) {
                    form.append('brand_id', values.brandId.toString())
                }

                if (Array.isArray(values.categoryIds)) {
                    values.categoryIds.forEach((categoryId) => {
                        form.append('category_ids', categoryId.toString())
                    })
                }

                if (Array.isArray(values.attributeIds)) {
                    values.attributeIds.forEach((attributeId) => {
                        form.append('attribute_ids', attributeId.toString())
                    })
                }

                createProduct(form)
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
                        <ProductAttributes form={formik}/>
                    </div>
                </div>
                <div className="col-span-2 space-y-5">
                    <div className="bg-white rounded-xl p-6 border">
                        <ProductDetail form={formik} />
                    </div>
                    <div className="bg-white rounded-xl p-6 border">
                        <ProductCategory data={categories} form={formik} />
                    </div>
                    <div className="bg-white rounded-xl p-6 border">
                        <ProductComponany data={brands} form={formik} />
                    </div>
                    <div className="bg-white rounded-xl p-6 border">
                        <ProductDescription form={formik} />
                    </div>
                </div>
            </div>
        </form>
    )
}
