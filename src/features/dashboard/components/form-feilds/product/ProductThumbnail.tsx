import { ChangeEvent, useState } from 'react'

import { Icon } from '@iconify/react/dist/iconify.js'
import { FormikProps } from 'formik'
import { MdInfoOutline } from 'react-icons/md'

import { FormValues, RemoveButton } from '../../forms/NewProductForm'

export default function ProductThumbnail({
    form,
}: {
    form: FormikProps<FormValues>
}) {
    const [file, setFile] = useState<File | null>(null)

    const isError = Boolean(form.errors.thumbnail)
    const isTouched = Boolean(form.touched.thumbnail)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputFile = event.target.files
        if (inputFile) {
            setFile(inputFile[0])
            form.setFieldValue('thumbnail', inputFile[0])
        }
    }

    const handleRemove = () => {
        setFile(null)
    }

    const PreviewThumbnail = ({ file }: { file: File }) => {
        const previewImage = URL.createObjectURL(file)
        return (
            <div className="relative size-[400px] border rounded-lg">
                <div className="absolute top-3 right-4">
                    <RemoveButton size={25} handleRemove={handleRemove} />
                </div>
                <img
                    src={previewImage}
                    alt="Thumbnail"
                    className="size-[400px] rounded-lg object-contain"
                />
            </div>
        )
    }

    return (
        <>
            <h3
                className={`text-lg font-semibold ${isTouched ? (isError ? 'text-red-600' : 'text-foreground') : 'text-foreground'}`}
            >
                Product Thumbnail
            </h3>
            <div className="border-t mt-3 pt-5 grid place-items-center">
                {!file && (
                    <div className="size-[400px] p-4 border-[3px] border-dashed border-primary rounded-lg flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center gap-1 leading-normal">
                            <Icon
                                icon="mage:image-plus"
                                fontSize={100}
                                className="text-primary-600"
                            />
                            <p className="opacity-85 font-medium">
                                Drop product thumbnail here, or select.
                            </p>
                            <label
                                className="font-medium underline underline-offset-2 text-blue-600 cursor-pointer"
                                htmlFor="thumbnail"
                            >
                                {' '}
                                Click to browse
                            </label>
                            <input
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                )}
                {file && (
                    <div className="size-[400px]">
                        <PreviewThumbnail file={file} />
                    </div>
                )}
                <div className="mt-5 flex items-center justify-start gap-3 opacity-90">
                    <MdInfoOutline size={30} />
                    <p className="text-sm font-medium">
                        This photo will be the main display photo of the
                        product.
                    </p>
                </div>
                {isTouched && isError && (
                    <div className="mt-2">
                        <p className="text-xs font-semibold text-red-500">
                            {form.errors.thumbnail?.toString()}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}
