import { ADD_FILE, REMOVE_FILE, UPDATE_FILE, MOVE_FILE } from './actionTypes';

export function addFile(newFile, timestamp = Date.now()){
    return {
        type: ADD_FILE,
        file: {
            file: newFile,
            key: newFile.name + timestamp,
            title: formatTitle(newFile.name)
        }
    };
}

export function formatTitle(fileName){
    let ext = (fileName.lastIndexOf('.') > 0) ? fileName.lastIndexOf('.') : fileName.length;
    return fileName.slice(0, ext);
}

export function removeFile(index){
    return {
        type: REMOVE_FILE,
        index
    };
}

export function updateFile(index, file){
    return {
        type: UPDATE_FILE,
        index,
        file
    };
}

export function moveFile(currentIndex, newIndex){
    return {
        type: MOVE_FILE,
        currentIndex,
        newIndex
    };
}