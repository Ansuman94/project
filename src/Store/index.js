import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../Reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../Sagas';

const sagaMiddleware = createSagaMiddleware();
const Store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
export default Store;
