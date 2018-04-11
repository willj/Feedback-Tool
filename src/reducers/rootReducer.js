import { combineReducers } from 'redux';
import titleReducer from './titleReducer';

const rootReducer = combineReducers({
    title: titleReducer
});

export default rootReducer;