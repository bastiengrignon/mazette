import { ConfigProvider } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import frFR from 'antd/lib/locale/fr_FR'
import 'dayjs/locale/fr'

import { Cloudinary } from '@cloudinary/url-gen'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { theme } from './constants/theme'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import CookieNotice from './components/CookieNotice'
import Routes from './components/Routes'
import { adminSubdomain } from './constants'
import './index.css'

dayjs.locale('fr')

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
    axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : 'http://localhost:3005'
})()

ReactDOM.render(
    <React.StrictMode>
        <ConfigProvider locale={frFR} theme={theme}>
            <App/>
        </ConfigProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorkerRegistration.register()
