import { UPDATE_PROJECT_TITLE, UPDATE_PROJECT_URL, PUBLISH_PROJECT_ERROR, PROJECT_LOADED, LOAD_PROJECT_ERROR } from './actionTypes';
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

export function loadProject(baseUrl, projectId){
    return (dispatch) => {
        Axios.get(baseUrl, {
            params: {
                id: projectId
            }
        })
        .then(response => {
            let project = (typeof response.data === 'string') ? JSON.parse(response.data) : response.data;
            dispatch(projectLoaded(project));
        })
        .catch(err => {
            let errMessage = (err.response && err.response.data) ? err.response.data : "";
            dispatch(projectLoadingError(projectId, errMessage));
        });
    };
}

export function projectLoaded(project){
    return {
        type: PROJECT_LOADED,
        project: project
    };
}

export function projectLoadingError(projectId, error){
    return {
        type: LOAD_PROJECT_ERROR,
        projectId,
        error
    };
}