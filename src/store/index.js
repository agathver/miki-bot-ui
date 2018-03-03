import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


const initialState = {};
const enhancers = [];
const middleware = [
    thunk,
];

let composeEnhancers = compose;
if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
}
const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }
}

export default store;