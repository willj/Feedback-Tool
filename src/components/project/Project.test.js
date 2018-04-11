import React from 'react';
import { shallow } from 'enzyme';
import Project from './Project';

describe('<Project />', () => {

    it('renders a text box with the provided title', () => {
        const wrapper = shallow(<Project title="A dummy title" onTitleChange={() => {}} />);

        expect(wrapper.find('input').length).toBe(1);
        expect(wrapper.find('input').prop('value')).toBe('A dummy title');
    });

    it('calls onTitleChange when the title textbox value is changed', () => {
        const titleChange = jest.fn();

        const wrapper = shallow(<Project title="A dummy title" onTitleChange={titleChange} />);

        wrapper.find('input').simulate('change', { target: { value: "Hello World" }});

        expect(titleChange).toHaveBeenCalledWith("Hello World");
    });

});