import initialState from './initialState';
import { UPDATE_PROJECT_TITLE } from '../actions/actionTypes';

export default function(state = initialState.title, action){
    switch(action.type){
        case UPDATE_PROJECT_TITLE:
            return action.title;
        default:
            return state;
    }
}