jest.mock('axios');
import Axios from 'axios';

import React from 'react';
import { updateProjectTitle, publishProject, loadProject } from './projectActions';
import { UPDATE_PROJECT_TITLE, UPDATE_PROJECT_URL, PUBLISH_PROJECT_ERROR, PROJECT_LOADED, LOAD_PROJECT_ERROR } from './actionTypes';

describe('updateProjectTitle', () => {

    it('returns the update project title action', () => {
        const action = updateProjectTitle('test');

        expect(action).toMatchObject({
            type: UPDATE_PROJECT_TITLE,
            title: 'test'
        });
    });

});

describe('publishProject', () => {

    it('publishes the project and dispatches the UPDATE_PROJECT_URL action', () => {
        Axios.post = jest.fn((url, data) => {
            return new Promise((resolve, reject) => {
                resolve({ data: { id: "43110" } });
            });
        });

        const dispatch = jest.fn();
        const thunk = publishProject("https://publish.com", "https://view.com", { title: "test project" });

        thunk(dispatch);

        Axios.post().then(() => {
            expect(Axios.post).toHaveBeenCalledWith("https://publish.com", { title: "test project" });

            expect(dispatch).toHaveBeenCalledWith({
                type: UPDATE_PROJECT_URL,
                projectUrl: "https://view.com/43110"
            });
        });

    });

    it('dispatches the project error action when an error occurs publishing a project', () => {
        Axios.post = jest.fn((url, data) => {
            return new Promise((resolve, reject) => {
                reject({ response: { data: "error message"}});
            });
        });

        const dispatch = jest.fn();
        const thunk = publishProject("https://publish.com", "https://view.com", { title: "test project" });

        thunk(dispatch);

        Axios.post().then(() => {}).catch(() => {
            expect(Axios.post).toHaveBeenCalledWith("https://publish.com", { title: "test project" });

            expect(dispatch).toHaveBeenCalledWith({
                type: PUBLISH_PROJECT_ERROR,
                message: "error message"
            });
        });

    });

});

describe('loadProject', () => {

    const dummyProject = {
        id:"43110",
        title: "My Project",
        files: [
            {"file":{},"key":"test.png1511538471014","title":"test","url":"https://test.net/test/2935410a-ae06-4b6a-b0a2-7efa7e460a73.png"}
        ]
    }

    it('loads the project and dispatches the PROJECT_LOADED action', () => {

        Axios.get = jest.fn((url) => {
            return new Promise((resolve, reject) => {
                resolve({ data: dummyProject });
            });
        });

        const dispatch = jest.fn();
        const thunk = loadProject("https://load.com", "43110");

        thunk(dispatch);

        Axios.get().then(() => {
            expect(Axios.get).toHaveBeenCalledWith("https://load.com", {params: { id: "43110"}});

            expect(dispatch).toHaveBeenCalledWith({
                type: PROJECT_LOADED,
                project: dummyProject
            })

        });

    });

    it('dispatches the LOAD_PROJECT_ERROR action when loading fails', () => {

        Axios.get = jest.fn((url) => {
            return new Promise((resolve, reject) => {
                reject({ response: { data: "error message"}});
            });
        });

        const dispatch = jest.fn();
        const thunk = loadProject("https://load.com", "43110");

        thunk(dispatch);

        Axios.get().then().catch(() => {
            expect(Axios.get).toHaveBeenCalledWith("https://load.com", {params: { id: "43110"}});

            expect(dispatch).toHaveBeenCalledWith({
                type: LOAD_PROJECT_ERROR,
                projectId: "43110",
                error: "error message"
            })

        });

    });

});