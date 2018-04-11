import { ADD_FILE, REMOVE_FILE, UPDATE_FILE, MOVE_FILE } from './actionTypes';
import * as fileActions from './fileActions';

describe('fileActions', () => {

    describe('addFile', () => {
    
        it('returns an ADD_FILE action', () => {

            const timestamp = 1523453164237;
            const action = fileActions.addFile({name: "test.jpg"}, timestamp);

            expect(action).toMatchObject({
                type: ADD_FILE,
                file: {
                    file: {name: "test.jpg"},
                    key: "test.jpg1523453164237",
                    title: "test"
                }
            });
        });
    });

    describe('formatTitle', () => {
        it('returns the filename without extension', () => {
            let filename = "test.jpg";

            expect(fileActions.formatTitle(filename)).toEqual('test');
        });

        it('returns the full string if no extension present', () => {
            let filename = "testfile";

            expect(fileActions.formatTitle(filename)).toEqual('testfile');
        });

        it('returns the full string if it starts with .', () => {
            let filename = ".testfile";

            expect(fileActions.formatTitle(filename)).toEqual('.testfile');
        });

        it('removes the final . if the string ends with .', () => {
            let filename = "testfile.";

            expect(fileActions.formatTitle(filename)).toEqual('testfile');
        });
    });

    describe('removeFile', () => {
        const action = fileActions.removeFile(1);

        expect(action).toMatchObject({
            type: REMOVE_FILE,
            index: 1
        });
    });

    describe('updateFile', () => {
        const action = fileActions.updateFile(0, {name: "updated file"});

        expect(action).toMatchObject({
            type: UPDATE_FILE,
            index: 0,
            file: {name: "updated file"}
        });
    });

    describe('moveFile', () => {
        const action = fileActions.moveFile(2, 0);

        expect(action).toMatchObject({
            type: MOVE_FILE,
            currentIndex: 2,
            newIndex: 0
        });
    });

});

