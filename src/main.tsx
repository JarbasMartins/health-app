import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import AppShell from './shell';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppShell>
            <RouterProvider router={router} />
        </AppShell>
    </React.StrictMode>
);
