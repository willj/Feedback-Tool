import { combineReducers } from 'redux';
import titleReducer from './titleReducer';
import fileReducer from './fileReducer';
import projectReducer from './projectReducer';
import projectsReducer from './projectsReducer';

const rootReducer = combineReducers({
    title: titleReducer,
    files: fileReducer,
    project: projectReducer,
    projects: projectsReducer
});

export default rootReducer;