import { z } from 'zod'

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/utils/validate-schema'

export type NewCategoryFormValue = z.infer<typeof newCategoryValidateSchema>
export const newCategoryValidateSchema = z.object({
    name: z.string().min(1, 'Tên danh mục là trường bắt buộc').max(20, {
        message: 'Không được nhập tên danh mục quá 20 ký tự.',
    }),
    thumbnail: z
        .any()
        .refine((file) => file?.size < MAX_FILE_SIZE, 'Tệp không hợp lệ')
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            'Chỉ hỗ trợ định dạng .jpg, .jpeg, .png, .webp.'
        ),
    icon: z.string().min(1, 'Icon là trường bắt buộc'),
})
