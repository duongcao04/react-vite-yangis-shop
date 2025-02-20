import React from 'react'

import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import '@/index.css'
import Providers from '@/providers'
import App from '@/app'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <Providers>
                <App />
            </Providers>
        </Router>
    </React.StrictMode>
)
