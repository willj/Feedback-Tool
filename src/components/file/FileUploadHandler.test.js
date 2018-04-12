import React from 'react';
import { shallow } from 'enzyme';
import FileUploadHander from './FileUploadHandler';

// build up an object that looks/behaves like a DataTransfer containing DataTransferItems with Files.
// we can't use DT objects as some of the props are read only
const dummyFileList = (filesArray) => {
    let fileList = [];
    fileList.item = function(index) { return this[index].getAsFile(); }.bind(fileList);

    const MockItemOrEntry = {
        kind: 'file',
        type: '',
        name: '',
        getAsFile: function() { 
            return { name: this.name, type: this.type, size: 100 };
        }
    };

    filesArray.forEach((file) => {
        fileList.push(
            Object.assign(Object.create(MockItemOrEntry), {type: file.type, name: file.name})
        );
    });

    return fileList;
};

const MockFileGetAsEntry = function(){
    return {
        isFile: true,
        isDirectory: false,
        file: (success, error) => {
            success(this.getAsFile());
        }
    }
}

const MockDirectoryGetAsEntry = function(directoryFiles){
    return function(){
        return {
            isFile: false,
            isDirectory: true,
            createReader: () => {
                return {
                    readEntries: function(success,error) {
                        success(directoryFiles);
                    }
                };
            }
        }
    };
}

describe('<FileUploadHander />', () => {

    it('calls onNewFile once per file when new files are pasted', () => {
        const newFile = jest.fn();
        const wrapper = shallow(<FileUploadHander onNewFile={newFile} />);

        const files = dummyFileList([
            { type: "image/png", name: "test.png" },
            { type: "image/jpeg", name: "test.jpg" }
        ]);

        wrapper.instance().handlePaste({ clipboardData: { items: files } });

        expect(newFile).toHaveBeenCalledTimes(2);
        expect(newFile).toHaveBeenLastCalledWith(files[1].getAsFile());
    });

    it('calls onNewFile once per file when the browser only supports dataTransfer.files (and not dt.items)', () => {
        const newFile = jest.fn();
        const wrapper = shallow(<FileUploadHander onNewFile={newFile} />);

        const files = dummyFileList([
            { type: "image/png", name: "test.png" },
            { type: "image/jpeg", name: "test.jpg" }
        ]);

        wrapper.simulate('drop', { dataTransfer: { files: files }, preventDefault: jest.fn() });

        expect(newFile).toHaveBeenCalledTimes(2);
        expect(newFile).toHaveBeenLastCalledWith(files[1].getAsFile());
    });

    it('calls onNewFile once per file when the browser supports dataTransfer.items and getAsEntry()', () => {
        const newFile = jest.fn();
        const wrapper = shallow(<FileUploadHander onNewFile={newFile} />);

        let files = dummyFileList([
            { type: "image/png", name: "test.png" },
            { type: "image/jpeg", name: "test.jpg" }
        ]);

        files = files.map((file) => {
            file.getAsEntry = MockFileGetAsEntry.bind(file);
            return file;
        });

        wrapper.simulate('drop', { dataTransfer: { items: files }, preventDefault: jest.fn() });

        expect(newFile).toHaveBeenCalledTimes(2);
        expect(newFile).toHaveBeenCalledWith(files[0].getAsFile());
        expect(newFile).toHaveBeenLastCalledWith(files[1].getAsFile());
    });

    it('calls onNewFile once per file when the browser supports dataTransfer.items and webkitGetAsEntry()', () => {
        const newFile = jest.fn();
        const wrapper = shallow(<FileUploadHander onNewFile={newFile} />);

        let files = dummyFileList([
            { type: "image/png", name: "cheese.png" },
            { type: "image/jpeg", name: "cheese2.jpg" }
        ]);

        files = files.map((file) => {
            file.webkitGetAsEntry = MockFileGetAsEntry.bind(file);
            return file;
        });

        wrapper.simulate('drop', { dataTransfer: { items: files }, preventDefault: jest.fn() });

        expect(newFile).toHaveBeenCalledTimes(2);
        expect(newFile).toHaveBeenCalledWith(files[0].getAsFile());
        expect(newFile).toHaveBeenLastCalledWith(files[1].getAsFile());
    });

    it('reads a directory and calls onNewFile once per file when the browser supports getAsEntry', () => {
        const newFile = jest.fn();
        const wrapper = shallow(<FileUploadHander onNewFile={newFile} />);

        let files = dummyFileList([
            { type: "image/png", name: "cheese.png" },
            { type: "image/jpeg", name: "cheese2.jpg" }
        ]);

        files = files.map((file) => {
            file.getAsEntry = MockFileGetAsEntry.bind(file);
            file.file = file.getAsEntry().file;
            return file;
        });

        const dir = {
            getAsEntry: MockDirectoryGetAsEntry(files)
        };

        wrapper.simulate('drop', { dataTransfer: { items: [dir] }, preventDefault: jest.fn() });

        expect(newFile).toHaveBeenCalledTimes(2);
        expect(newFile).toHaveBeenCalledWith(files[0].getAsFile());
        expect(newFile).toHaveBeenLastCalledWith(files[1].getAsFile());
    });

    it('reads a directory and calls onNewFile once per file when the browser supports webkitGetAsEntry', () => {
        const newFile = jest.fn();
        const wrapper = shallow(<FileUploadHander onNewFile={newFile} />);

        let files = dummyFileList([
            { type: "image/png", name: "jam.png" },
            { type: "image/jpeg", name: "jam.jpg" },
            { type: "image/gif", name: "jam.gif" }
        ]);

        files = files.map((file) => {
            file.webkitGetAsEntry = MockFileGetAsEntry.bind(file);
            file.file = file.webkitGetAsEntry().file;
            return file;
        });

        const dir = {
            webkitGetAsEntry: MockDirectoryGetAsEntry(files)
        };

        wrapper.simulate('drop', { dataTransfer: { items: [dir] }, preventDefault: jest.fn() });

        expect(newFile).toHaveBeenCalledTimes(3);
        expect(newFile).toHaveBeenCalledWith(files[0].getAsFile());
        expect(newFile).toHaveBeenCalledWith(files[1].getAsFile());
        expect(newFile).toHaveBeenLastCalledWith(files[2].getAsFile());
    });

    it('shows an error message for files that are the wrong type', () => {
        const newFile = jest.fn();
        const wrapper = shallow(<FileUploadHander onNewFile={newFile} />);

        const files = dummyFileList([
            { type: "image/png", name: "test.png" },
            { type: "image/bmp", name: "test.bmp" },
            { type: "image/jpeg", name: "test.jpg" },
            { type: "text/plain", name: "test.txt" }            
        ]);

        wrapper.simulate('drop', { dataTransfer: { files: files }, preventDefault: jest.fn() });

        expect(newFile).toHaveBeenCalledTimes(2);
        expect(newFile).toHaveBeenLastCalledWith(files[2].getAsFile());
        expect(wrapper.find('ul').find('li').first().text()).toBe('test.bmp is not a valid file type');
        expect(wrapper.find('ul').find('li').last().text()).toBe('test.txt is not a valid file type');
    });

});