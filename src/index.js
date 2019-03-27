import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MyRouter from "./router";
import store from './store';
import { Provider } from 'react-redux';
ReactDOM.render(<Provider store={store}><MyRouter /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
