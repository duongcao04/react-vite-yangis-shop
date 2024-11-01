import React from 'react'

import { Helmet } from 'react-helmet-async'

import { useGetAllProducts } from '@/hooks/useProduct'

import {
    BannerTheme,
    BestSelling,
    Categories,
    FeatureProduct,
    FlashSales,
    OurProduct,
    Services,
} from '@/components/home-sections'

function HomePage() {
    const { isLoading, products } = useGetAllProducts()

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
                <OurProduct loadingProducts={isLoading} products={products} />
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
