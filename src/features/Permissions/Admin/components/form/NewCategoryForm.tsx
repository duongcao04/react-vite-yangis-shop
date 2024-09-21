import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants/imageValidate'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { SingleImageUpload } from '../form-feild/SingleImageUpload'

const FormSchema = z.object({
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

export default function NewCategoryForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            thumbnail: undefined,
            icon: '',
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const newCategory: NewCategory = {
            name: data.name,
            thumbnail: data.thumbnail,
            icon: data.icon,
        }
        console.log(newCategory)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="h-fit bg-white p-6 rounded-xl space-y-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-[300px_1fr] gap-5 items-center">
                                <FormLabel required htmlFor="name">
                                    Danh mục
                                </FormLabel>
                                <div>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            placeholder="Nhập tên danh mục"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-[300px_1fr] gap-5 items-center">
                                <FormLabel required htmlFor="thumbnail">
                                    Hình thu nhỏ
                                </FormLabel>
                                <div>
                                    <FormControl>
                                        <SingleImageUpload
                                            {...field}
                                            id="thumbnail"
                                            onChange={field.onChange}
                                            value={field.value}
                                            className="w-full h-[250px]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem className="grid grid-cols-[300px_1fr] gap-5 items-center">
                                <FormLabel required htmlFor="icon">
                                    Icon
                                </FormLabel>
                                <div>
                                    <FormControl>
                                        <Input
                                            id="icon"
                                            placeholder="Nhập mã icon"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full h-[50px]"
                        title="Thêm danh mục"
                    >
                        Thêm danh mục
                    </Button>
                </div>
            </form>
        </Form>
    )
}
