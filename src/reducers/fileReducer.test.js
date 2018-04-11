import fileReducer from './fileReducer';
import { ADD_FILE, REMOVE_FILE, UPDATE_FILE, MOVE_FILE } from '../actions/actionTypes';

describe('fileReducer', () => {
    
    it('returns the default state when no state or action passed in', () => {
        const state = fileReducer(undefined, {});

        expect(state).toEqual([]);
    });

    it('adds a file to the files array and returns the new state', () => {
        const action1 = {
            type: ADD_FILE,
            file: {
                name: "test"
            }
        };

        const action2 = {
            type: ADD_FILE,
            file: {
                name: "test2"
            }
        };

        let state = [];
        state = fileReducer(state, action1);
        state = fileReducer(state, action2);

        expect(state.length).toBe(2);
        expect(state[0]).toMatchObject({
            name: "test"
        });
    });

    it('removes a file from the files array, and returns the new state', () => {
        let state = [
            { name: "test" },
            { name: "test2" },
            { name: "test3" }
        ];

        const action = { type: REMOVE_FILE, index: 1 };

        state = fileReducer(state, action);

        expect(state.length).toBe(2);
        expect(state[1]).toMatchObject({ name: "test3" });
    });

    it('replaces an update file in the files array, and returns the new state', () => {
        let state = [
            { name: "test" },
            { name: "test2" },
            { name: "test3" }
        ];

        const action = { type: UPDATE_FILE, index: 0, file: { name: "test1" } };

        state = fileReducer(state, action);

        expect(state.length).toBe(3);
        expect(state[0]).toMatchObject({ name: "test1" });
    });

    it('moves a file in the array and returns the new state', () => {
        let state = [
            { name: "test" },
            { name: "test2" },
            { name: "test3" }
        ];

        const action = { type: MOVE_FILE, currentIndex: 0, newIndex: 2 };

        state = fileReducer(state, action);

        expect(state.length).toBe(3);
        expect(state[0]).toMatchObject({ name: "test2" });
        expect(state[1]).toMatchObject({ name: "test3" });
        expect(state[2]).toMatchObject({ name: "test" });
    });

});