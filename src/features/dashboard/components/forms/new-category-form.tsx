import { zodResolver } from '@hookform/resolvers/zod'
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

import { newCategoryValidateSchema } from '../../schemas/new-category-validate-schema'
import { SingleImageUpload } from './SingleImageUpload'

export default function NewCategoryForm() {
    const form = useForm<NewCategoryFormValue>({
        resolver: zodResolver(newCategoryValidateSchema),
        defaultValues: {
            name: '',
            thumbnail: undefined,
            icon: '',
        },
    })

    async function onSubmit(data: NewCategoryFormValue) {
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
