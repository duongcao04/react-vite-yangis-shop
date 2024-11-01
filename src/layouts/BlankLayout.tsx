function BlankLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            id="page"
            className="bg-wallground-light dark:bg-wallground-dark text-black dark:text-white"
        >
            <main className="h-screen w-screen">{children}</main>
        </div>
    )
}

export default BlankLayout
