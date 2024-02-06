import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
// import css
import './CSS/index.css';
// import components
import ScrollToTop from './helper/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <ScrollToTop />
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>
);
