import { UPDATE_PROJECT_TITLE, UPDATE_PROJECT_URL, PUBLISH_PROJECT_ERROR } from './actionTypes';
import Axios from 'axios';

export function updateProjectTitle(title){
    return {
        type: UPDATE_PROJECT_TITLE,
        title
    };
}

export function publishProject(publishUrl, viewProjectUrl, projectState){
    return (dispatch) => {
        Axios.post(publishUrl, projectState)
        .then(response => {
            if (response.data.id){
                dispatch(updateProjectUrl(`${viewProjectUrl}/${response.data.id}`));
            }
        })
        .catch(err => {
            dispatch(projectError(err.response.data));
        });
    };
}

export function updateProjectUrl(projectUrl){
    return {
        type: UPDATE_PROJECT_URL,
        projectUrl
    };
}

export function projectError(message){
    return {
        type: PUBLISH_PROJECT_ERROR,
        message
    };
}