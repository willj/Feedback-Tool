import React from 'react';
import { shallow } from 'enzyme';
import EditableImage from './EditableImage';

describe('<EditableImage />', () => {

    const fn = () => {};

    const dummyImage = {
        title: 'an image',
        url: 'image.png'
    };

    it('when the title is edited the image object is updated', () => {
        const onChange = jest.fn();

        const wrapper = shallow(<EditableImage image={dummyImage} onChange={onChange} onDelete={fn} index={1} />);

        wrapper.find('input').simulate('change', { target: { value: 'new title'} });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(1, Object.assign(dummyImage, {title: 'new title'}));

    });

    it('delete calls onDelete', () => {
        const onDelete = jest.fn();
        const wrapper = shallow(<EditableImage image={dummyImage} onDelete={onDelete} onChange={fn} index={1} />);

        wrapper.find('.edit-image-delete').simulate('click', {});

        expect(onDelete).toHaveBeenCalledTimes(1);
    });

});