import { Input } from '@nextui-org/input'
import { FormikProps } from 'formik'

import { NewProductFormValue } from '../../schemas/new-product-validate-schema'

export default function ProductDetail({
    form,
}: {
    form: FormikProps<NewProductFormValue>
}) {
    return (
        <>
            <h3 className="text-lg font-semibold">Product Detail</h3>
            <div className="border-t mt-3 pt-7 flex flex-col gap-7">
                <div className="grid grid-cols-2 gap-5">
                    <Input
                        id="name"
                        name="name"
                        label="Product name"
                        placeholder="Enter the name of product"
                        labelPlacement="outside"
                        classNames={{
                            label: 'top-4 font-semibold',
                            input: 'text-base',
                            inputWrapper: 'py-6 px-5',
                            errorMessage: 'font-semibold',
                        }}
                        isRequired
                        value={form.values.name}
                        onChange={form.handleChange}
                        errorMessage={form.errors.name}
                        isInvalid={
                            Boolean(form.errors.name) &&
                            Boolean(form.touched.name)
                        }
                    />
                    <Input
                        id="slug"
                        name="slug"
                        label="Product Slug"
                        placeholder="Enter slug of product"
                        labelPlacement="outside"
                        classNames={{
                            label: 'top-4 font-semibold',
                            input: 'text-base',
                            inputWrapper: 'py-6 px-5',
                            errorMessage: 'font-semibold',
                        }}
                        isRequired
                        value={form.values.slug}
                        onChange={form.handleChange}
                        errorMessage={form.errors.slug}
                        isInvalid={
                            Boolean(form.errors.slug) &&
                            Boolean(form.touched.slug)
                        }
                    />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <Input
                        id="price"
                        name="price"
                        label="Price"
                        placeholder="--"
                        labelPlacement="outside"
                        type="number"
                        classNames={{
                            label: 'top-4 font-semibold',
                            input: 'text-base',
                            inputWrapper: 'py-6 px-5',
                            errorMessage: 'font-semibold',
                        }}
                        isRequired
                        value={
                            form.values.price === 0
                                ? ''
                                : form.values.price.toString()
                        }
                        onChange={form.handleChange}
                        errorMessage={form.errors.price}
                        isInvalid={
                            Boolean(form.errors.price) &&
                            Boolean(form.touched.price)
                        }
                    />
                    <Input
                        id="sale"
                        name="sale"
                        label="Discount"
                        placeholder="--"
                        type="number"
                        labelPlacement="outside"
                        classNames={{
                            label: 'top-4 font-semibold',
                            input: 'text-base',
                            inputWrapper: 'py-6 px-5',
                            errorMessage: 'font-semibold',
                        }}
                        isRequired
                        value={form.values.sale}
                        onChange={form.handleChange}
                        errorMessage={form.errors.sale}
                        isInvalid={
                            Boolean(form.errors.sale) &&
                            Boolean(form.touched.sale)
                        }
                    />
                </div>
            </div>
        </>
    )
}
