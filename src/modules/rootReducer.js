import { combineReducers } from 'redux';
import topics from './topics';

const rootReducer = combineReducers({
    topics,
});

export default rootReducer;