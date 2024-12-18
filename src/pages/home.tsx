import React from 'react'

import { Helmet } from 'react-helmet-async'

import BannerTheme from '@/components/home-sections/banner-theme'
import BestSelling from '@/components/home-sections/best-selling'
import Categories from '@/components/home-sections/categories'
import FeatureProducts from '@/components/home-sections/feature-products'
import FlashSales from '@/components/home-sections/flash-sales'
import OurProducts from '@/components/home-sections/our-products'
import Services from '@/components/home-sections/services'

function HomePage() {
    return (
        <React.Fragment>
            <Helmet>
                <title>Yangis | Điện thoại, laptop, phụ kiện giá rẻ, ...</title>
            </Helmet>

            <section className="flex items-start justify-between overflow-hidden">
                <BannerTheme />
            </section>
            <section className="container">
                <FlashSales />
            </section>
            <div className="container space-y-20">
                <section>
                    <Categories />
                </section>

                <section>
                    <BestSelling />
                </section>
                <section>
                    <FeatureProducts />
                </section>
                <section>
                    <OurProducts />
                </section>
                <section>{/* <NewestPost /> */}</section>
                <section>
                    <Services />
                </section>
            </div>
        </React.Fragment>
    )
}

export default HomePage
