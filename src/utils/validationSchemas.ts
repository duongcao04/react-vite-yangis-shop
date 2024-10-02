import { z } from 'zod'

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants/imageValidate'

export const NewProductFormSchema = z.object({
    name: z.string().min(1, 'Tên sản phẩm là trường bắt buộc').max(255, {
        message: 'Không được nhập tên sản phẩm quá 255 ký tự.',
    }),
    thumbnail: z.any(),
    description: z.string(),
    featureImage: z.array(
        z
            .any()
            .refine((file) => file?.size < MAX_FILE_SIZE, 'Tệp không hợp lệ')
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
                'Chỉ hỗ trợ định dạng .jpg, .jpeg, .png, .webp.'
            )
    ),
    price: z.string().min(1, { message: 'Giá tiền là trường bắt buộc' }),
    sale: z.string().optional(),
    category: z.string().nonempty({ message: 'Danh mục là trường bắt buộc' }),
    brand: z.string().nonempty({ message: 'Nhà cung cấp là trường bắt buộc' }),
    variants: z.string().array().min(1, 'Màu sắc là trường bắt buộc'),
})
