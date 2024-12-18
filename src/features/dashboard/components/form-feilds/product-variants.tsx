import { ChangeEvent, useState } from 'react'

import { Input } from '@nextui-org/input'
import { FormikProps } from 'formik'
import { SaveIcon } from 'lucide-react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'

import useHorizontalScroll from '@/hooks/use-horizontal-scroll'
import { useCreateVariant } from '@/hooks/useProductVariant'

import { Button } from '@/components/ui/button'
import { ButtonLoading } from '@/components/ui/button-loading'

import { FormValues, RemoveButton } from '../forms/new-product-form'

const UploadVariantImagesField = ({
    data: variant,
    onChange,
}: {
    data: NewProductVariant
    onChange: (images: File[]) => void
}) => {
    const scrollHorizontalRef = useHorizontalScroll()
    const [images, setImages] = useState<File[]>([])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputFiles = event.target.files
        if (inputFiles) {
            const inputFilesArray = Array.from(inputFiles)
            const rest = [...images]
            inputFilesArray.forEach((file) => {
                const foundExist = rest.findIndex(
                    (item) => item.name === file.name
                )
                if (foundExist === -1) {
                    rest.push(file)
                }
            })
            setImages(rest)
            onChange(rest)
        }
    }

    const handleRemove = (item: File) => {
        const newFiles = images.filter(
            (image) =>
                image.name !== item.name &&
                image.lastModified !== item.lastModified
        )
        setImages(newFiles)
    }

    return (
        <div
            className="flex items-center justify-start gap-5 overflow-x-scroll"
            ref={scrollHorizontalRef}
        >
            <div className="border-[2px] border-dashed border-primary rounded-lg">
                <div className="size-[80px] px-2 grid place-items-center text-center text-sm leading-normal">
                    <div className="text-xxs">
                        <span className="opacity-85 font-medium">
                            Drop image here.
                        </span>
                        <label
                            className="font-medium underline underline-offset-2 text-blue-600 cursor-pointer"
                            htmlFor={`images-of-${variant._id}`}
                        >
                            {' '}
                            Click to browse
                        </label>
                    </div>
                    <input
                        id={`images-of-${variant._id}`}
                        name={`images-of-${variant._id}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        multiple
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex items-center justify-start gap-5">
                {images &&
                    images.map((image) => {
                        const previewImage = URL.createObjectURL(image)
                        return (
                            <div
                                key={image.lastModified}
                                className="group relative size-[80px]"
                            >
                                <div className="absolute top-2 right-2 hidden group-hover:block">
                                    <RemoveButton
                                        size={20}
                                        handleRemove={() => {
                                            handleRemove(image)
                                        }}
                                    />
                                </div>
                                <img
                                    src={previewImage}
                                    alt={image.name}
                                    className="size-[80px] object-contain rounded-xl border"
                                />
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

const NewProductVariantForm = ({
    initData: variant,
    isLoading,
    isError,
    errorMessage,
    onDelete,
    onSave,
}: {
    initData: NewProductVariant
    isLoading: boolean
    isError: boolean
    errorMessage?: { label?: string; images?: string; inStock?: string }
    onDelete: (variantId: string) => void
    onSave: (newVariant: NewProductVariant) => void
}) => {
    const [newVariant, setNewVariant] = useState<NewProductVariant>(variant)
    const handleChangeImages = (images: File[]) => {
        setNewVariant({
            ...newVariant,
            images: images,
        })
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-5">
                <Input
                    label="Variant name"
                    isRequired
                    value={newVariant.label}
                    onChange={(event) => {
                        setNewVariant({
                            ...newVariant,
                            label: event.target.value,
                        })
                    }}
                    errorMessage={errorMessage?.label}
                />
                <Input
                    label="In stock"
                    type="number"
                    isRequired
                    value={newVariant.inStock.toString()}
                    onChange={(event) => {
                        setNewVariant({
                            ...newVariant,
                            inStock: Number(event.target.value),
                        })
                    }}
                    errorMessage={isError && errorMessage?.inStock}
                />
            </div>
            <div className="mt-5">
                <UploadVariantImagesField
                    data={variant}
                    onChange={handleChangeImages}
                />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-5">
                <ButtonLoading
                    className="w-full flex items-center justify-center gap-2"
                    variant={'outline'}
                    type="button"
                    onClick={() => {
                        onSave(newVariant)
                    }}
                    isLoading={isLoading}
                >
                    <SaveIcon className="text-primary" />
                    <p>Save</p>
                </ButtonLoading>
                <Button
                    className="w-full flex items-center justify-center gap-2"
                    variant={'outline'}
                    type="button"
                    onClick={() => {
                        onDelete(variant._id)
                    }}
                >
                    <AiOutlineDelete size={25} className="text-danger" />
                    <p>Delete</p>
                </Button>
            </div>
        </div>
    )
}

export default function ProductVariants({
    form,
}: {
    form: FormikProps<FormValues>
}) {
    const { loading, createVariant } = useCreateVariant()
    const [variants, setVariants] = useState<NewProductVariant[]>(
        form.values.variants
    )
    const isError = Boolean(form.errors.variants)
    const isTouched = Boolean(form.touched.variants)

    const handleAddEmptyVariant = () => {
        /**
         * Set Temporary ID in client
         * After save in server -> Replace it with ObjectID of Mongodb
         */
        const temporaryId = new Date().toISOString()
        const newVariant = {
            _id: temporaryId,
            label: '',
            inStock: 0,
            images: [{} as File],
        } as NewProductVariant
        setVariants([newVariant, ...variants])
    }

    const handleDeleteVariant = (variantId: string) => {
        setVariants(variants.filter((item) => item._id !== variantId))
    }

    const handleSaveVariant = (newVariant: NewProductVariant) => {
        const foundIndex = variants.findIndex(
            (item) => item._id === newVariant._id
        )
        const rest = [...variants]
        rest[foundIndex] = newVariant
        setVariants(rest)
        // createVariant(newVariant)
        form.setFieldValue('variants', variants)
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-1">
                    <h3
                        className={`h-full text-lg font-semibold ${isTouched ? (isError ? 'text-red-600' : 'text-foreground') : 'text-foreground'}`}
                    >
                        Product Variants
                    </h3>
                    {variants.length > 0 && (
                        <div className="px-2 py-1 rounded-lg bg-secondary-100 text-secondary-600 w-fit">
                            <p className="text-xs">
                                {form.values.variants.length}
                            </p>
                        </div>
                    )}
                </div>
                <Button
                    className="flex items-center justify-center gap-2 text-blue-700"
                    type="button"
                    variant={'outline'}
                    onClick={() => {
                        handleAddEmptyVariant()
                    }}
                >
                    <FaPlus size={15} />
                    <div>Add new Variant</div>
                </Button>
            </div>
            {variants.length > 0 && (
                <div className="border-t mt-3 pt-5 space-y-7">
                    {variants.map((variant, index) => {
                        const fieldMeta = form.getFieldMeta('variants')

                        const isError = Boolean(
                            fieldMeta.error && fieldMeta.error[index]
                        )

                        const getErrorMessage =
                            fieldMeta.error && fieldMeta.error[index]

                        const errorMessage = getErrorMessage && {
                            ...getErrorMessage,
                            images: getErrorMessage?.images[0],
                        }
                        console.log(errorMessage)

                        // const errorMessage =
                        //     fieldMeta.error &&
                        //     JSON.parse(fieldMeta.error[index])

                        return (
                            <NewProductVariantForm
                                key={variant._id}
                                initData={variant}
                                onDelete={() => {
                                    handleDeleteVariant(variant._id)
                                }}
                                onSave={handleSaveVariant}
                                isLoading={loading}
                                isError={isError}
                                // errorMessage={errorMessage}
                            />
                        )
                    })}
                </div>
            )}
            {isTouched && isError && (
                <div className="mt-4">
                    <p className="text-xs font-semibold text-red-500">
                        {JSON.stringify(form.errors.variants)}
                    </p>
                </div>
            )}
        </>
    )
}
