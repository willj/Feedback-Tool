import { combineReducers } from 'redux';
import titleReducer from './titleReducer';
import fileReducer from './fileReducer';

const rootReducer = combineReducers({
    title: titleReducer,
    files: fileReducer
});

export default rootReducer;