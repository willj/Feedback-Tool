import { combineReducers } from 'redux';
import titleReducer from './titleReducer';
import fileReducer from './fileReducer';
import projectReducer from './projectReducer';

const rootReducer = combineReducers({
    title: titleReducer,
    files: fileReducer,
    project: projectReducer
});

export default rootReducer;