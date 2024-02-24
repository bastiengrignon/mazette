import {ConfigProvider} from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import frFR from 'antd/lib/locale/fr_FR'
import 'dayjs/locale/fr'

import {Analytics} from "@vercel/analytics/react";
import {SpeedInsights} from "@vercel/speed-insights/react";
import {Cloudinary} from '@cloudinary/url-gen'
import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {theme} from './constants/theme'

import CookieNotice from './components/CookieNotice'
import Routes from './components/Routes'
import {adminSubdomain} from './constants'
import './index.css'

dayjs.locale('fr')

const App: React.FC = () => (
    <ConfigProvider>
        <div className="min-h-full flex flex-col justify-between">
            <BrowserRouter>
                <CookieNotice/>
                <Routes isAdmin={isAdminRoutes()}/>
            </BrowserRouter>
            <Analytics/>
            <SpeedInsights/>
        </div>
    </ConfigProvider>
)
export const cloudinary = new Cloudinary({cloud: {cloudName: 'mazette'}})

const isAdminRoutes = (): boolean => window.location.host.split('.')[0] === adminSubdomain;

(() => {
    axios.defaults.baseURL = import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : 'http://localhost:3005'
})()

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider locale={frFR} theme={theme}>
            <App/>
        </ConfigProvider>
    </React.StrictMode>
)
