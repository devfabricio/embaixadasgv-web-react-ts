import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import promisseMidlleware from 'redux-promise'
import './index.css';
import App from './App';
import reducers from './reducers'
import ReduxThunk from 'redux-thunk';
import { unregister } from './serviceWorker';

const createStoreWithMiddleware = applyMiddleware(promisseMidlleware, ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>,
    document.getElementById('root'));
unregister();
