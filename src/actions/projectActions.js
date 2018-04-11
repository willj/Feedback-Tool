import { UPDATE_PROJECT_TITLE } from './actionTypes';

export function updateProjectTitle(title){
    return {
        type: UPDATE_PROJECT_TITLE,
        title
    };
}