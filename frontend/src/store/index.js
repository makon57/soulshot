import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import imageReducer from './home';
import albumReducer from './albums';
import commentReducer from './comments';

const rootReducer = combineReducers({
  session: sessionReducer,
  image: imageReducer,
  album: albumReducer,
  comment: commentReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configStore;
