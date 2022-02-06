// libraries
import React, { Suspense } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// redux
import { Provider } from "react-redux";
import { store } from "store/store";
// components
import Loader from "components/shared/Loader";
import App from './App';
import './i18n';
// styles 
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
