import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MyRouter from "./router";

ReactDOM.render(<MyRouter/>, document.getElementById('root'));

serviceWorker.unregister();
