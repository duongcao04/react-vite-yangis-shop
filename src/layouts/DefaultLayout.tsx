import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import TopHeader from '@/components/TopHeader'

function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            id="page"
            className="bg-wallground-light dark:bg-wallground-dark text-black dark:text-white "
        >
            <header className="sticky top-0 z-50 laptop:static">
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
