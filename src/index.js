import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter,Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import Store from './Store';
import history from './history';

ReactDOM.render(<Provider store={Store}><BrowserRouter history={history}><App /></BrowserRouter></Provider>, document.getElementById('root'));

serviceWorker.unregister();
