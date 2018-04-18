import React from 'react';
import { shallow } from 'enzyme';
import Image from './Image';
import EditableImage from './EditableImage';
import UploadingImage from './UploadingImage';

describe('<Image />', () => {

    const fn = () => {};

    it('displays an <UploadingImage /> when no url is present', () => {
        const image = {
            name: "image",
            file: {}
        };

        const wrapper = shallow(<Image image={image} index={1} onChange={fn} onDelete={fn} />);

        expect(wrapper.find(UploadingImage).length).toBe(1);
    });

    it('displays an <EditableImage /> when an url is present', () => {
        const image = {
            name: "image",
            url: "http://image.com/image.png"
        };

        const wrapper = shallow(<Image image={image} index={1} onChange={fn} onDelete={fn} />);

        expect(wrapper.find(EditableImage).length).toBe(1);
    });

});