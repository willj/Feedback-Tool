import React from 'react';
import projectActions, { updateProjectTitle } from './projectActions';
import { UPDATE_PROJECT_TITLE } from './actionTypes';

describe('projectActions.updateProjectTitle', () => {

    it('returns the update project title action', () => {
        const action = updateProjectTitle('test');

        expect(action).toMatchObject({
            type: UPDATE_PROJECT_TITLE,
            title: 'test'
        });
    });

});