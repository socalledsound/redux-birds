// import { createStore, applyMiddleware } from 'redux';
import { createStore } from 'redux';
import { birdReducer } from './birds.reducer';
// import logger from 'redux-logger';

const store = createStore( birdReducer);

export default store
