import { createStore, applyMiddleware } from 'redux';
// import { createStore } from 'redux';
import { birdReducer } from './birds.reducer';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

const store = createStore( birdReducer, applyMiddleware(thunk));

export default store
