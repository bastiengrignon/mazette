import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import frFR from 'antd/lib/locale/fr_FR';
import 'dayjs/locale/fr';

import { Cloudinary } from '@cloudinary/url-gen';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './constants/theme';

import CookieNotice from './components/CookieNotice';
import Routes from './components/Routes';
import './index.css';

dayjs.locale('fr');

const App: React.FC = () => (
  <div className="min-h-full flex flex-col justify-between">
    <BrowserRouter>
      <CookieNotice />
      <Routes />
    </BrowserRouter>
    <Analytics />
    <SpeedInsights />
  </div>
);
export const cloudinary = new Cloudinary({ cloud: { cloudName: 'mazette' } });

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ConfigProvider locale={frFR} theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

if (window.navigator && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister();
    }
  });
}
