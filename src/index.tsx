import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import {Provider} from 'react-redux';
import { getStore } from './services/store';
import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';

const store = getStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// reportWebVitals();
