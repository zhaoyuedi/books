import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter as Router,Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '@store';
import App from './App';

ReactDom.render(
    <Provider store={store}>
        <Router>
            <Route path='/' component={App}></Route>
        </Router>
    </Provider>,
    document.getElementById("root")
)