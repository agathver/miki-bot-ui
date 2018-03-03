import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();

if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./Root', () => {
            const NextRoot = require('./Root').default; // eslint-disable-line global-require
            ReactDOM.render(<NextRoot store={store} />, document.getElementById('root'));
        });
    }
}
