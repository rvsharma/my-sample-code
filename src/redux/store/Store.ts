/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { loginState } from '../accounts/login/LoginReducer';
import { mainSaga } from '../mainSagas/MainSaga';

export interface RootState {
  Login: loginState;
}

export default function configureStore(reducer: any, middlewares: any): any {
  const sagaMiddleWare: SagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleWare, ...middlewares];
  const rootReducer = reducer;

  const enhancers: any = [];
  const windowIfDefined = typeof window === 'undefined' ? null : (window as any);
  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }
  const store = createStore(rootReducer, compose(applyMiddleware(...middleware), ...enhancers));
  sagaMiddleWare.run(mainSaga);
  return store;
}
