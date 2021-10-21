import { ConfigProvider } from 'antd'
import axios from 'axios'
import frFR from 'antd/lib/locale/fr_FR'

import * as Sentry from '@sentry/react'
import { Cloudinary } from '@cloudinary/base'
import { Integrations } from '@sentry/tracing'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import CookieNotice from './components/CookieNotice'
import Routes from './components/Routes'
import { adminSubdomain } from './constants'
import 'antd/dist/antd.css'
import './index.css'

Sentry.init({
    dsn         : process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    // We recommend adjusting this value in production, or using tracesSampler for finer control
    tracesSampleRate: 0.5
})


const App: React.FC = () => (
    <div className="min-h-full flex flex-col justify-between">
        <Router>
            <CookieNotice/>
            <Routes isAdmin={ isAdminRoutes() }/>
        </Router>
    </div>
)
export const cloudinary = new Cloudinary({ cloud: { cloudName: 'mazette' } })

const isAdminRoutes = (): boolean => window.location.host.split('.')[0] === adminSubdomain;

(() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL
})()

ReactDOM.hydrate(
    <React.StrictMode>
        <ConfigProvider locale={frFR}>
            <App/>
        </ConfigProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorkerRegistration.register()
