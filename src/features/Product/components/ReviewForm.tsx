import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCreateReview } from '@/hooks/useReview'

import { useAuthContext } from '@/context/AuthContext'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'

import { Textarea } from '../../../components/ui/textarea'

const formSchema = z.object({
    comment: z.string().min(1, {
        message: 'Vui lòng nhập nội dung bình luận',
    }),
})

export function ReviewForm({ productId }: { productId: string }) {
    const { authUser } = useAuthContext()
    const { createReview } = useCreateReview()
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const newReview: NewReview = {
            user: authUser._id,
            product: productId,
            rating: 4,
            comment: values.comment,
        }
        await createReview(newReview)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full grid grid-cols-[1fr_200px] gap-5"
            >
                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Nhập nội dung bình luận"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" color="primary">
                    Gửi bình luận
                </Button>
            </form>
        </Form>
    )
}
