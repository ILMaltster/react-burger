import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import {Provider} from 'react-redux';
import { getStore } from './services/store';
import { HashRouter } from 'react-router-dom';

const store = getStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <HashRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </HashRouter>
    </React.StrictMode>
);

// reportWebVitals();
