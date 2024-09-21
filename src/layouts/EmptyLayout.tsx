import { ReactNode } from 'react'

import PropTypes from 'prop-types'

EmptyLayout.propTypes = {
    children: PropTypes.node,
}

function EmptyLayout({ children }: { children: ReactNode }) {
    return (
        <div
            id="page"
            className="bg-wallground-light dark:bg-wallground-dark text-black dark:text-white"
        >
            <main className="h-screen w-screen">{children}</main>
        </div>
    )
}

export default EmptyLayout
