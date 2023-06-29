import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app.jsx';
import {Provider} from 'react-redux';
import { getStore } from './services/store';
import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';

const store = getStore();

const root = ReactDOM.createRoot(
  document.getElementById('root')
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
