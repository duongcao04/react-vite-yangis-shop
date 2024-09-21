import React from 'react'
import { Helmet } from 'react-helmet-async'

import {
    BannerTheme,
    BestSelling,
    Categories,
    FeatureProduct,
    FlashSales,
    OurProduct,
    Services,
} from '@/components/home-section/index'
import { useGetProducts } from '@/hooks/useProduct'

function HomePage() {
    const { loadingProducts, products } = useGetProducts()

    return (
        <React.Fragment>
            <Helmet>
                <title>Yangis | Điện thoại, laptop, phụ kiện giá rẻ, ...</title>
            </Helmet>

            <section className="flex items-start justify-between overflow-hidden">
                <BannerTheme />
            </section>
            <section className="container">
                <FlashSales products={products} />
            </section>
            <section className="container mt-20">
                <Categories />
            </section>
            <section className="container mt-20">
                <BestSelling products={products} />
            </section>
            <section className="container mt-20">
                <FeatureProduct />
            </section>
            <section className="container mt-20">
                <OurProduct
                    loadingProducts={loadingProducts}
                    products={products}
                />
            </section>
            <section className="container mt-20">
                {/* <NewestPost /> */}
            </section>
            <section className="mt-20">
                <Services />
            </section>
        </React.Fragment>
    )
}

export default HomePage
