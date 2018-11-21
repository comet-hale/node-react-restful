import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import rootReducer from './reducers';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
    // other store enhancers if any
  );
  const store = createStore(rootReducer, preloadedState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}
