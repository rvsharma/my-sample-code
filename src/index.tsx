import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { combineReducers } from 'redux';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './redux/store/Store';
import { AllReducer } from './redux/mainReducer/MainReducer';

import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

const middleware = [routerMiddleware(history)];

const rootReducer = combineReducers({
  ...AllReducer,
  router: connectRouter(history),
});
const stores = configureStore(rootReducer, middleware);
ReactDOM.render(
  <BrowserRouter>
    <Provider store={stores}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
