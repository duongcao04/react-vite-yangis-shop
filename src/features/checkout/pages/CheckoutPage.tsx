import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { z } from 'zod'

import { useGetAddress } from '@/hooks/useGetAddress'
import { useCreateOrder } from '@/hooks/useOrder'

import { useAuthContext } from '@/context/AuthContext'

import Breadcrumbs from '@/components/Breadcrumbs'
import { FloatingLabelInput } from '@/components/ui/floating-label-input'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { RootState } from '@/redux/store'

import CheckoutProducts from '../components/CheckoutProducts'
import OrderInformation from '../components/OrderInformation'

const paymentMethods = [
    {
        id: 1,
        label: 'Thanh toán khi nhận hàng',
        icon: 'fa6-solid:money-check-dollar',
        value: 'cash',
    },
    {
        id: 2,
        label: 'Thanh toán qua ngân hàng',
        icon: 'fa6-solid:piggy-bank',
        value: 'bank',
    },
] as const

const FormSchema = z.object({
    fullName: z.string().min(2, {
        message: 'Tên phải ít nhất 2 ký tự',
    }),
    phone: z
        .string()
        .min(10, {
            message: 'Số điện thoại không hợp lệ',
        })
        .max(10, {
            message: 'Số điện thoại không hợp lệ',
        }),
    email: z.string().email({ message: 'Email không hợp lệ' }).optional(),
    provice: z.string(),
    district: z.string(),
    commune: z.string(),
    paymentMethod: z.enum(['cash', 'bank'], {
        required_error: 'Vui lòng chọn phương thức thanh toán',
    }),
})

export default function CheckoutPage() {
    const { cart, total } = useSelector((state: RootState) => state.cart)

    const { provinces, getDistricts, getCommunes } = useGetAddress()

    const [districts, setDictricts] = React.useState<District[]>([])
    const [communes, setCommunes] = React.useState<Commune[]>([])

    // Save code of commune
    const [address, setAddress] = React.useState<string>('')

    const { authUser } = useAuthContext()
    const { createAOrder } = useCreateOrder()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            provice: '',
            district: '',
            commune: '',
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const foundIndex = communes.findIndex((item) => item.code === address)

        // TODO: Validate for address feild
        const newOrder: NewOrder = {
            user: authUser._id,
            deliveryInformation: {
                fullName: data.fullName,
                phone: data.phone,
                email: data.email,
                address: `${communes[foundIndex].name}, ${communes[foundIndex].district}, ${communes[foundIndex].province}`,
            },
            paymentMethod: data.paymentMethod,
            products: cart,
            totalAmount: total,
            subtotal: total,
            shippingFee: 0,
            bonusPoints: 0.01 * total,
        }
        await createAOrder(newOrder)
    }

    return (
        <div className="container mx-auto">
            <Helmet>
                <title>Thanh toán</title>
            </Helmet>

            <div className="my-4">
                <Breadcrumbs />
            </div>
            <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <div className="grid grid-cols-3 gap-4 mb-10">
                        <div className="col-span-2">
                            <CheckoutProducts cart={cart} />
                            {/* Form chính */}
                            <div className="mt-4 bg-white p-4 rounded-xl h-fit">
                                <p className="font-semibold">Người đặt hàng</p>
                                <div className="mt-6 space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="fullName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FloatingLabelInput
                                                    {...field}
                                                    id="fullName"
                                                    label="Họ và tên"
                                                    required
                                                />
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FloatingLabelInput
                                                    {...field}
                                                    id="phone"
                                                    type="number"
                                                    label="Số điện thoại"
                                                    required
                                                />
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FloatingLabelInput
                                                    required
                                                    {...field}
                                                    id="email"
                                                    label="Email"
                                                />
                                                <FormDescription />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <p className="font-semibold mt-6">
                                    Địa chỉ nhận hàng
                                </p>
                                <div className="mt-3 grid grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="provice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required>
                                                    Tỉnh/Thành phố
                                                </FormLabel>
                                                <Select
                                                    onValueChange={async (
                                                        value
                                                    ) => {
                                                        field.onChange
                                                        const district =
                                                            await getDistricts(
                                                                value
                                                            )
                                                        setDictricts(district)
                                                    }}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {provinces.map(
                                                            (province) => (
                                                                <SelectItem
                                                                    value={
                                                                        province.code
                                                                    }
                                                                    key={
                                                                        province.code
                                                                    }
                                                                >
                                                                    {
                                                                        province.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="district"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required>
                                                    Quận/Huyện
                                                </FormLabel>
                                                <Select
                                                    disabled={
                                                        districts.length === 0
                                                            ? true
                                                            : false
                                                    }
                                                    onValueChange={async (
                                                        value
                                                    ) => {
                                                        field.onChange
                                                        const commune =
                                                            await getCommunes(
                                                                value
                                                            )
                                                        setCommunes(commune)
                                                    }}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn Quận/Huyện" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {districts.map(
                                                            (district) => (
                                                                <SelectItem
                                                                    value={
                                                                        district.code
                                                                    }
                                                                    key={
                                                                        district.code
                                                                    }
                                                                >
                                                                    {
                                                                        district.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="commune"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel required>
                                                    Phường/Xã
                                                </FormLabel>
                                                <Select
                                                    disabled={
                                                        communes.length === 0
                                                            ? true
                                                            : false
                                                    }
                                                    onValueChange={(value) => {
                                                        field.onChange
                                                        setAddress(value)
                                                    }}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn Phường/Xã" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {communes.map(
                                                            (commune) => (
                                                                <SelectItem
                                                                    value={
                                                                        commune.code
                                                                    }
                                                                    key={
                                                                        commune.code
                                                                    }
                                                                >
                                                                    {
                                                                        commune.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 bg-white p-4 rounded-xl h-fit">
                                <FormField
                                    control={form.control}
                                    name="paymentMethod"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel
                                                required
                                                className="text-base font-semibold"
                                            >
                                                Phương thức thanh toán
                                            </FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    {paymentMethods.map(
                                                        (item) => (
                                                            <FormItem
                                                                key={item.id}
                                                                className={`flex items-center space-x-2 space-y-0 px-3 py-2.5 rounded-md ${field.value === item.value && 'bg-wallground-light'}`}
                                                            >
                                                                <FormControl>
                                                                    <RadioGroupItem
                                                                        value={
                                                                            item.value
                                                                        }
                                                                    />
                                                                </FormControl>
                                                                <FormLabel
                                                                    className={`font-normal flex items-center justify-start gap-3 w-full h-full cursor-pointer`}
                                                                >
                                                                    <Icon
                                                                        icon={
                                                                            item.icon
                                                                        }
                                                                        fontSize={
                                                                            30
                                                                        }
                                                                        color="#e4382c"
                                                                    />
                                                                    <p>
                                                                        {
                                                                            item.label
                                                                        }
                                                                    </p>
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    )}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <OrderInformation
                                action={
                                    <button
                                        className="w-full h-[56px] leading-[56px] text-center rounded-md bg-[#df2121] hover:bg-[#b81a1a] text-white font-semibold transition duration-200"
                                        type="submit"
                                    >
                                        Đặt hàng
                                    </button>
                                }
                            />
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
