import { Checkbox, CheckboxGroup } from '@nextui-org/react'
import { FormikProps } from 'formik'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { useGetAllAttributes } from '../../hooks/use-get-all-attribute'
import { NewProductFormValue } from '../../schemas/new-product-validate-schema'

export default function ProductAttributes({
    form,
}: {
    form: FormikProps<NewProductFormValue>
}) {
    const { attributes } = useGetAllAttributes()
    const formAttributeIds = form.values.attributeIds ?? []
    const setFormAttributeIds = (id: string) => {
        const isSelected =
            formAttributeIds.findIndex((item) => item === id) !== -1

        let newAttributeIds = null
        if (isSelected) {
            newAttributeIds = formAttributeIds.filter((item) => item !== id)
        } else {
            newAttributeIds = [...formAttributeIds, id]
        }
        form.setFieldValue('attributeIds', newAttributeIds)
    }

    const isError = Boolean(form.errors.attributeIds)
    const isTouched = Boolean(form.touched.attributeIds)

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-1">
                    <h3
                        className={`h-full text-lg font-semibold ${isTouched ? (isError ? 'text-red-600' : 'text-foreground') : 'text-foreground'}`}
                    >
                        Select Attributes
                    </h3>
                    {/* {variants.length > 0 && (
                        <div className="px-2 py-1 rounded-lg bg-secondary-100 text-secondary-600 w-fit">
                            <p className="text-xs">
                                {form.values.variants.length}
                            </p>
                        </div>
                    )} */}
                </div>
                <Link to="#add_new_attribute" className="block">
                    <Button
                        className="flex items-center justify-center gap-2 text-blue-700"
                        type="button"
                        variant={'outline'}
                    >
                        <FaPlus size={15} />
                        <div>Add new Attribute</div>
                    </Button>
                </Link>
            </div>
            <hr className="border-t my-3" />
            <CheckboxGroup
                defaultValue={formAttributeIds}
                label="Choose attributes for product variant"
            >
                {attributes.map((attribute) => {
                    return (
                        <div>
                            <Checkbox
                                key={attribute.id}
                                value={attribute.id}
                                size="lg"
                                classNames={{
                                    wrapper: 'ml-2 mr-4',
                                }}
                                onClick={() => {
                                    setFormAttributeIds(attribute.id)
                                }}
                            >
                                {attribute.name}
                            </Checkbox>
                        </div>
                    )
                })}
            </CheckboxGroup>
            {isTouched && isError && (
                <div className="mt-4">
                    <p className="text-xs font-semibold text-red-500">
                        {JSON.stringify(form.errors.attributeIds)}
                    </p>
                </div>
            )}
        </>
    )
}
