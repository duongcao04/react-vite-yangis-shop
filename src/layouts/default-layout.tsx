import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import TopHeader from '@/components/top-header'

function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            id="page"
            className="bg-wallground-light dark:bg-wallground-dark text-black dark:text-white "
        >
            <header className="sticky top-0 laptop:static">
                <Navbar />
                <div className="hidden laptop:block desktop:block">
                    <TopHeader />
                </div>
            </header>
            <main>{children}</main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default DefaultLayout
