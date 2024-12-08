import { FormikProps } from 'formik'

import AddProductDescription from '../../forms/AddProductDescription'
import { FormValues } from '../../forms/NewProductForm'

export default function ProductDescription({
    form,
}: {
    form: FormikProps<FormValues>
}) {
    const isError = Boolean(form.errors.description)
    const isTouched = Boolean(form.touched.description)

    return (
        <>
            <h3
                className={`text-lg font-semibold ${isTouched ? (isError ? 'text-red-600' : 'text-foreground') : 'text-foreground'}`}
            >
                Product Decription
            </h3>
            <div className="border-t mt-3 pt-7 flex flex-col gap-7">
                <AddProductDescription
                    id="description"
                    initialData={JSON.parse(form.values.description)}
                />
            </div>
            {isTouched && isError && (
                <div className="mt-2">
                    <p className="text-xs font-semibold text-red-500">
                        {form.errors.description}
                    </p>
                </div>
            )}
        </>
    )
}
