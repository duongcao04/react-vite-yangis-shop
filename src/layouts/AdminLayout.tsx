import { useState } from 'react'

import Header from '@/features/admin/components/Header'
import Sidebar from '@/features/admin/components/Sidebar'

function AdminLayout({ children }: { children: React.ReactNode }) {
    const [showSidebar, setShowSidebar] = useState<boolean>(true)

    return (
        <div
            id="page"
            className={`bg-wallground-light h-screen ${showSidebar && 'grid grid-cols-admin'}`}
        >
            {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
            <div className="bg-wallground-light border-l">
                <header className="h-[80px] bg-white border-b px-[30px] py-[15px]">
                    <Header
                        showSidebar={showSidebar}
                        setShowSidebar={setShowSidebar}
                    />
                </header>
                <main className="h-[calc(100vh-80px)] overflow-y-scroll">
                    <div className="p-7">{children}</div>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
