jest.mock('axios');
import Axios from 'axios';

import React from 'react';
import { updateProjectTitle, publishProject } from './projectActions';
import { UPDATE_PROJECT_TITLE, UPDATE_PROJECT_URL, PUBLISH_PROJECT_ERROR } from './actionTypes';

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

    it('publishes the project and dispatches the updateProjectUrl action', () => {
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