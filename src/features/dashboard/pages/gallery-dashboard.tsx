import * as React from 'react'

import { useGetVariant } from '@/hooks/useProductVariant'

import SelectBox from '@/components/fragments/select-box'
import { FloatingLabelInput } from '@/components/ui/floating-label-input'

import { GALLERY_VIEW_STYLE } from '@/constants/gallery-view-styles'

import { useGetAllProducts } from '../../product/hooks/use-get-all-products'
import ViewAll from '../components/sections/view-all'
import ViewByProduct from '../components/sections/view-by-product'

export default function GalleryDashboard() {
    const { isLoading, variants } = useGetVariant()
    const { products } = useGetAllProducts()
    const [viewingStyle, setViewingStyle] = React.useState<string>(
        GALLERY_VIEW_STYLE[0]
    )

    return (
        <React.Fragment>
            <h1 className="text-2xl font-bold mb-7">Thư viện ảnh</h1>
            <div className="bg-white p-6 rounded-xl">
                <div className="grid grid-cols-[150px_1fr] gap-3">
                    <SelectBox
                        selectList={GALLERY_VIEW_STYLE}
                        defaultValue={viewingStyle}
                        setValue={setViewingStyle}
                    />
                    <FloatingLabelInput id="fullName" label="Tìm kiếm" />
                </div>
                <div className="mt-6">
                    {viewingStyle === GALLERY_VIEW_STYLE[0] && (
                        <ViewAll data={variants} isLoading={isLoading} />
                    )}
                    {viewingStyle === GALLERY_VIEW_STYLE[1] && (
                        <ViewByProduct data={products} />
                    )}
                    {viewingStyle === GALLERY_VIEW_STYLE[2] && (
                        <ViewByProduct data={products} />
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}
