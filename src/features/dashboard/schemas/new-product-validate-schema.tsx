import * as yup from 'yup'

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/utils/validate-schema'

export interface NewProductFormValue
    extends yup.InferType<typeof newProductValidateSchema> {}

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
    featureImages: yup
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
    discountPercentage: yup.number().optional(),
    categoryIds: yup
        .array()
        .of(yup.string().required('Category is required!'))
        .required('Category is required!'),
    attributeIds: yup.array().optional(),
    brandId: yup.string().required('Brand is required!')
})
