import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useGetBrands } from '@/hooks/useBrand'
import { useGetCategories } from '@/hooks/useCategory'
import { useCreateProduct } from '@/hooks/useProduct'

import Modal from '@/components/modals/Modal'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { MultipleImageUpload } from '@/features/dashboard/components/forms/MultipleImageUpload'

import { INITIAL_DATA } from '@/constants/editorInitialData'
import { NewProductFormSchema } from '@/utils/validationSchemas'

import AddColor from './AddColor'
import AddProductDescription from './AddProductDescription'
import { SingleImageUpload } from './SingleImageUpload'

function NewProductForm({
    setSection,
}: {
    setSection: React.Dispatch<React.SetStateAction<string>>
}) {
    const { createProduct } = useCreateProduct()
    const { categories } = useGetCategories()
    const { brands } = useGetBrands()

    const form = useForm<z.infer<typeof NewProductFormSchema>>({
        resolver: zodResolver(NewProductFormSchema),
        defaultValues: {
            name: '',
            thumbnail: undefined,
            description: JSON.stringify(INITIAL_DATA),
            featureImage: [],
            price: '',
            sale: '',
            category: '',
            brand: '',
            variants: [],
        },
    })

    function onSubmit(data: z.infer<typeof NewProductFormSchema>) {
        const newProduct: NewProduct = {
            name: data.name,
            description: data.description,
            thumbnail: data.thumbnail,
            featureImage: data.featureImage,
            price: +data.price,
            sale: data.sale,
            inStock: 0,
            category: data.category,
            brand: data.brand,
            variants: data.variants,
        }
        createProduct(newProduct)
        setSection('Product List')
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="grid grid-cols-3 gap-5">
                    <div className="h-fit col-span-2 bg-white p-6 rounded-xl space-y-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required htmlFor="name">
                                        Tên sản phẩm
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            placeholder="Nhập tên sản phẩm"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required htmlFor="name">
                                            Giá tiền
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="name"
                                                type="number"
                                                placeholder="Nhập giá tiền"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sale"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="name">
                                            Giảm giá
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="name"
                                                type="number"
                                                placeholder="Nhập giảm giá"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required>Danh mục</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn danh mục" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    value={category._id}
                                                    key={category._id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required>Thương hiệu</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn nhà cung cấp" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {brands.map((brand) => (
                                                <SelectItem
                                                    value={brand._id}
                                                    key={brand._id}
                                                >
                                                    {brand.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="variants"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel required htmlFor="color">
                                        Màu sắc
                                    </FormLabel>
                                    <FormControl>
                                        <AddColor
                                            {...field}
                                            id="color"
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full h-[50px]"
                            title="Thêm sản phẩm"
                        >
                            Thêm sản phẩm
                        </Button>
                    </div>
                    <div className="col-span-1 bg-white p-6 rounded-xl space-y-5 h-fit">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="description">
                                        Mô tả sản phẩm
                                    </FormLabel>
                                    <FormControl>
                                        <Modal
                                            trigger={
                                                <Button className="block">
                                                    Thêm mô tả
                                                </Button>
                                            }
                                            header={{
                                                title: (
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-base">
                                                            Mô tả sản phẩm
                                                        </p>
                                                        <div className="space-x-3">
                                                            <Button>Lưu</Button>
                                                            <Button variant="outline">
                                                                Xem trước
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ),
                                            }}
                                            classname="max-w-screen max-h-screen w-[90vw] h-[90vh]"
                                            bodyClassname="h-[calc(100%-48px)]"
                                        >
                                            <AddProductDescription
                                                {...field}
                                                id="description"
                                                initialData={JSON.parse(
                                                    field.value
                                                )}
                                            />
                                        </Modal>
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="thumbnail">
                                        Hình thu nhỏ
                                    </FormLabel>
                                    <FormControl>
                                        <SingleImageUpload
                                            {...field}
                                            id="thumbnail"
                                            label="Hình thu nhỏ"
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="featureImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="featureImage">
                                        Ảnh nổi bật
                                    </FormLabel>
                                    <FormControl>
                                        <MultipleImageUpload
                                            {...field}
                                            id="featureImage"
                                            onChange={field.onChange}
                                            value={field.value}
                                        />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default NewProductForm
