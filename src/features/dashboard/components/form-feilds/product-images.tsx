import { ChangeEvent, useState } from 'react'

import { FormikProps } from 'formik'
import { MdInfoOutline } from 'react-icons/md'

import useHorizontalScroll from '@/hooks/use-horizontal-scroll'

import { NewProductFormValue } from '../../schemas/new-product-validate-schema'
import { RemoveButton } from '../forms/new-product-form'

export default function ProductImages({
    form,
}: {
    form: FormikProps<NewProductFormValue>
}) {
    const scrollHorizontalRef = useHorizontalScroll()
    const [files, setFiles] = useState<File[]>([])
    const isError = Boolean(form.errors.featureImages)
    const isTouched = Boolean(form.touched.featureImages)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputFiles = event.target.files
        if (inputFiles) {
            const inputFilesArray = Array.from(inputFiles)
            const rest = [...files]
            inputFilesArray.forEach((file) => {
                const foundExist = rest.findIndex(
                    (item) => item.name === file.name
                )
                if (foundExist === -1) {
                    rest.push(file)
                }
            })
            setFiles(rest)
            form.setFieldValue('featureImages', rest)
        }
    }
    const handleRemove = (item: File) => {
        const newFiles = files.filter(
            (file) =>
                file.name !== item.name &&
                file.lastModified !== item.lastModified
        )
        setFiles(newFiles)
    }

    return (
        <>
            <h3
                className={`text-lg font-semibold ${isTouched ? (isError ? 'text-red-600' : 'text-foreground') : 'text-foreground'}`}
            >
                Product Images
            </h3>
            <div className="border-t mt-3 pt-5">
                <div
                    className="flex items-center justify-start gap-5 overflow-x-scroll"
                    ref={scrollHorizontalRef}
                >
                    <div className="border-[3px] border-dashed border-primary rounded-lg">
                        <div className="size-[150px] p-4 grid place-items-center text-center text-sm leading-normal">
                            <div>
                                <span className="opacity-85 font-medium">
                                    Drop your image here, or select.
                                </span>
                                <label
                                    className="font-medium underline underline-offset-2 text-blue-600 cursor-pointer"
                                    htmlFor="featureImage"
                                >
                                    {' '}
                                    Click to browse
                                </label>
                            </div>
                            <input
                                id="featureImage"
                                name="featureImage"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                multiple
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-start gap-5">
                        {files &&
                            files.map((file) => {
                                const previewImage = URL.createObjectURL(file)
                                return (
                                    <div
                                        key={file.lastModified}
                                        className="group relative size-[150px]"
                                    >
                                        <div className="absolute top-2 right-2 hidden group-hover:block">
                                            <RemoveButton
                                                size={20}
                                                handleRemove={() => {
                                                    handleRemove(file)
                                                }}
                                            />
                                        </div>
                                        <img
                                            src={previewImage}
                                            alt={file.name}
                                            className="size-[150px] object-contain rounded-xl border"
                                        />
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className="mt-5 flex items-center justify-start gap-3 opacity-90">
                    <MdInfoOutline size={40} />
                    <p className="text-sm font-medium">
                        You need add least 4 images. Pay attention to the
                        quality of the pictures you add (important)
                    </p>
                </div>
                {isTouched && isError && (
                    <div className="mt-2">
                        <p className="text-xs font-semibold text-red-500">
                            {form.errors.featureImages?.toString()}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}
