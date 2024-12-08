import { useState } from 'react'

import DashboardHeader from '@/features/dashboard/components/DashboardHeader'
import DashboardSidebar from '@/features/dashboard/components/DashboardSidebar'

function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [showSidebar, setShowSidebar] = useState<boolean>(true)

    return (
        <div
            id="page"
            className={`bg-background w-screen h-screen ${showSidebar && 'grid grid-cols-admin'}`}
        >
            {showSidebar && (
                <DashboardSidebar setShowSidebar={setShowSidebar} />
            )}
            <div className="bg-background border-l">
                <header className="h-[80px] bg-white border-b px-[30px] py-[15px]">
                    <DashboardHeader
                        showSidebar={showSidebar}
                        setShowSidebar={setShowSidebar}
                    />
                </header>
                <main className="max-h-[calc(100vh-80px)] h-[calc(100vh-80px)] overflow-y-scroll">
                    <div className="p-7">{children}</div>
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout
