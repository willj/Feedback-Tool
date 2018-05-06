import React from 'react';
import { shallow } from 'enzyme';
import ProjectNav from './ProjectNav';

describe('<ProjectNav />', () => {

    it('next and previous links are present with the correct index values', () => {
        const project = {
            title: "project title",
            id: "43110",
            files: [
                {title: "title", url: "test.jpg"},
                {title: "title", url: "test.jpg"},
                {title: "title", url: "test.jpg"}
            ]
        };
    
        const wrapper = shallow(<ProjectNav currentIndex={0} numberOfFiles={project.files.length} projectId="43110" />);
    
        expect(wrapper.find('.previous-image').first().prop('to')).toBe('/view/43110/2');
        expect(wrapper.find('.next-image').first().prop('to')).toBe('/view/43110/1');
    
        wrapper.setProps({currentIndex: 1});
        expect(wrapper.find('.previous-image').first().prop('to')).toBe('/view/43110/0');
        expect(wrapper.find('.next-image').first().prop('to')).toBe('/view/43110/2');
    
        wrapper.setProps({currentIndex: 2});
        expect(wrapper.find('.previous-image').first().prop('to')).toBe('/view/43110/1');
        expect(wrapper.find('.next-image').first().prop('to')).toBe('/view/43110/0');
    });
    
    it('next/prev are not shown when only 1 file is in the project', () => {
        const project = {
            title: "project title",
            id: "43110",
            files: [
                {title: "title", url: "test.jpg"}
            ]
        };
    
        const wrapper = shallow(<ProjectNav currentIndex={0} numberOfFiles={project.files.length} projectId="43110" />);
    
        expect(wrapper.find('.previous-image').length).toBe(0);
        expect(wrapper.find('.next-image').length).toBe(0);
    });

});

