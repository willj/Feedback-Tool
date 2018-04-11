import { ADD_FILE, REMOVE_FILE, UPDATE_FILE, MOVE_FILE } from '../actions/actionTypes';
import initialState from './initialState';

export default function fileReducer(state = initialState.files, action){
    switch(action.type){
        case ADD_FILE:
            return [...state, action.file];

        case REMOVE_FILE:
            return removeFileReducer(state, action);

        case UPDATE_FILE:
            return updateFileReducer(state, action);

        case MOVE_FILE:
            return moveFileReducer(state, action);

        default: 
            return state;
    }
}

function removeFileReducer(state, action){
    let files = [...state];
    files.splice(action.index, 1);
    return files;
}

function updateFileReducer(state, action){
    let files = [...state];
    files.splice(action.index, 1, action.file);
    return files;
}

function moveFileReducer(state, action){
    let files = [...state];
    let fileToMove = files.splice(action.currentIndex, 1);

    files.splice(action.newIndex, 0, fileToMove[0]);

    return files;
}