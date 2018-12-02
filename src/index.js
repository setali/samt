import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './redux/store/configureStore';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/antd/dist/antd.min.css'
import { LocaleProvider } from 'antd';
import fa_IR from 'antd/lib/locale-provider/fa_IR';
import 'moment/locale/fa';

export const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <LocaleProvider locale={fa_IR}>
                <Route name="App" path="/" component={App} />
            </LocaleProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
