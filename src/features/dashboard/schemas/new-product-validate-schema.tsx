import * as yup from 'yup'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/utils/validate-schema'


export interface NewProductFormValue extends yup.InferType<typeof newProductValidateSchema> {}

export const newProductValidateSchema = yup.object().shape({
    name: yup.string().required('Product name is required!'),
    slug: yup.string().required('Product slug is required!'),
    description: yup
        .string()
        .required('Product Description is required!')
        .min(15, 'Not shorter than 15 characters!')
        .max(3000, 'No longer than 3000 characters!'),
    thumbnail: yup
        .mixed<File>()
        .required('File is required!')
        .test(
            'fileType',
            'Please provide a supported file type',
            (file?: File): boolean => {
                if (!file) return false
                return Boolean(ACCEPTED_IMAGE_TYPES.includes(file.type))
            }
        )
        .test(
            'fileSize',
            `File too big, can't exceed ${MAX_FILE_SIZE / 1024 / 1024}MB`,
            (file?: File): boolean => {
                if (!file) return false
                return file.size <= MAX_FILE_SIZE
            }
        ),
    featureImage: yup
        .array()
        .of(
            yup
                .mixed<File>()
                .required('File is required!')
                .test(
                    'fileType',
                    'Please provide a supported file type',
                    (file?: File): boolean => {
                        if (!file) return false
                        return Boolean(ACCEPTED_IMAGE_TYPES.includes(file.type))
                    }
                )
                .test(
                    'fileSize',
                    `File too big, can't exceed ${MAX_FILE_SIZE / 1024 / 1024}MB`,
                    (file?: File): boolean => {
                        if (!file) return false
                        return file.size <= MAX_FILE_SIZE
                    }
                )
        )
        .required('Feature Image is required!')
        .min(4, 'At least 4 images is required!'),
    price: yup
        .number()
        .moreThan(0, 'Price value is required')
        .required('Price value is required!'),
    sale: yup.string().required('Sale value is required!'),
    category: yup.string().required('Category is required!'),
    brand: yup.string().required('Brand is required!'),
    inStock: yup.number().required('In stock value is required!'),
    variants: yup
        .array()
        .required('Product Variants is required!')
        .min(1, 'Product Variants is required!')
        .of(
            yup.object({
                _id: yup.string().required(),
                label: yup.string().required('Label is required!'),
                inStock: yup
                    .number()
                    .moreThan(0, 'In stock value is required')
                    .required('In stock value is required!'),
                images: yup
                    .array()
                    .required('Variant Image is required!')
                    .of(
                        yup
                            .mixed<File>()
                            .required('File is required!')
                            .test(
                                'fileType',
                                'Please provide a supported file type',
                                (file?: File): boolean => {
                                    if (!file) return false
                                    const isValid =
                                        ACCEPTED_IMAGE_TYPES.includes(file.type)
                                    return isValid
                                }
                            )
                            .test(
                                'fileSize',
                                `File too big, can't exceed ${MAX_FILE_SIZE / 1024 / 1024}MB`,
                                (file?: File): boolean => {
                                    if (!file) return false
                                    const isValid = file.size <= MAX_FILE_SIZE
                                    return isValid
                                }
                            )
                    ),
            })
        ),
})
