import React from 'react';
import { shallow } from 'enzyme';
import UploadingImage from './UploadingImage';

jest.mock('axios');
import Axios from 'axios';

describe('<UploadingImage />', () => {

    const fn = () => {};
    const dummyUploadUrl = 'https://image.com/forupload.png?withsig=1';

    const image = {
        name: "test.png",
        file: {}
    };

    beforeEach(() => {
        Axios.post = jest.fn((url, config) => {
            return new Promise((resolve, reject) => {
                resolve({ 
                    data: { url: dummyUploadUrl }
                });
            });
        });

        Axios.put = jest.fn((url, data, config) => {
            if (config && config.onUploadProgress) config.onUploadProgress({
                loaded: 88,
                total: 100
            });

            return new Promise((resolve, reject) => {
                resolve({somedata: "test"});
            });
        });
    });

    it('componentDidMount uploads the file', (done) => {
        const onChange = jest.fn();

        process.env.REACT_APP_GET_UPLOAD_TOKEN_URL = 'http://localhost/gettoken';

        const wrapper = shallow(<UploadingImage onChange={onChange} image={image} file={image.file} index={3} onDelete={fn} />);        
    
        Axios.post().then(() => {
            expect(Axios.post).toHaveBeenCalledTimes(2);
            expect(Axios.post).toHaveBeenCalledWith('http://localhost/gettoken', { mimeType: undefined, fileSize: undefined });
        }); 
        
        Axios.put().then(() => {
            expect(Axios.put).toHaveBeenCalledTimes(2);
            done();
        }); 

    });

    it('Upload progress events update the progress bar', (done) => {
        const onChange = jest.fn();

        const wrapper = shallow(<UploadingImage onChange={onChange} image={image} file={image.file} index={3} onDelete={fn} />);

        Axios.put().then(() => {
            expect(wrapper.state().percentUploaded).toBe(88);
            wrapper.update();
            expect(wrapper.find('.uploading-image-progress-bar').first().props().style).toEqual({"height": "88%"});
            done();
        });

    });

});