import initialState from './initialState';
import { PROJECT_LOADED, LOAD_PROJECT_ERROR } from '../actions/actionTypes';

export default function projectsReducer(state = initialState.projects, action){
    switch(action.type){
        case PROJECT_LOADED:
            return Object.assign({}, state, { [action.project.id]: action.project });
        case LOAD_PROJECT_ERROR:
            return Object.assign({}, state, { [action.projectId]: { error: action.error } });
        default:
            return state;
    }
}