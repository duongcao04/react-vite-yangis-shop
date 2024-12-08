import React, { useState } from 'react'

import { FaChevronLeft } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'

import { useGetProduct } from '@/hooks/useProduct'

import { Button } from '@/components/ui/button'

import { config } from '@/configs'

import { EditProductForm } from '../../components/forms'

function Heading({
    productName,
    setEditMode,
}: {
    productName: string
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-5">
                <Button asChild variant={'outline'} className="size-12">
                    <Link to={config.routes.dashboard.product.DEFAULT}>
                        <FaChevronLeft />
                    </Link>
                </Button>
                <div className="flex flex-col">
                    <p className="text-sm font-medium opacity-80">
                        Product Table
                    </p>
                    <h2 className="text-2xl font-bold">{productName}</h2>
                </div>
            </div>
            <Button
                onClick={() => {
                    setEditMode(true)
                }}
                colorSchema={'warn'}
            >
                Chỉnh sửa
            </Button>
        </div>
    )
}

function ProductDetail() {
    const { productSlug } = useParams()
    const { product } = useGetProduct(productSlug ?? '')

    const [isEditMode, setEditMode] = useState<boolean>(false)

    return (
        <React.Fragment>
            <Heading productName={product.name} setEditMode={setEditMode} />
            <div className="w-full h-[1px] bg-border my-5" />
            <div className="w-full h-full">
                <EditProductForm data={product} isEditMode={isEditMode} />
            </div>
        </React.Fragment>
    )
}

export default ProductDetail
