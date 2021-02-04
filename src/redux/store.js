import { createStore } from 'redux';
import { birdReducer } from './birds.reducer';

const store = createStore( birdReducer );

export default store
