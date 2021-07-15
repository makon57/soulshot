import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import configStore from './store';

const store = configStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
