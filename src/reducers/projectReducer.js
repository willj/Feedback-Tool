import initialState from "./initialState";
import { UPDATE_PROJECT_URL, PUBLISH_PROJECT_ERROR } from "../actions/actionTypes";

export default function projectReducer(state = initialState.project, action) {
    switch(action.type){
        case UPDATE_PROJECT_URL:
            return { url: action.projectUrl, error: '' };
        case PUBLISH_PROJECT_ERROR:
            return { url: '', error: action.message }
        default:
            return state;
    }
}