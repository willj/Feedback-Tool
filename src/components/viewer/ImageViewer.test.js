import React from 'react';
import { shallow } from 'enzyme';
import ImageViewer from './ImageViewer';
import { Link } from 'react-router-dom';

describe('<ImageViewer />', () => {

    const fn = () => {};

    const dummyProject = {
        title: "project title",
        id: "43110",
        files: [
            {title: "title", url: "test.jpg"},
            {title: "title", url: "test1.jpg"},
            {title: "title", url: "test2.jpg"}
        ]
    };

    it('currentItemIndex is set to 0 when NaN is passed in', () => {
        const wrapper = shallow(<ImageViewer index={NaN} project={dummyProject} loadProject={fn} projectId="43110" />);

        expect(wrapper.state('currentItemIndex')).toBe(0);
    });

    it('currentItemIndex is set to 0 when 0 is passed in', () => {
        const wrapper = shallow(<ImageViewer index={0} project={dummyProject} loadProject={fn} projectId="43110" />);

        expect(wrapper.state('currentItemIndex')).toBe(0);
    });

    it('currentItemIndex is kept within bounds of project.files.length', () => {
        const wrapper = shallow(<ImageViewer index={2} project={dummyProject} loadProject={fn} projectId="43110" />);

        expect(wrapper.state('currentItemIndex')).toBe(2);

        wrapper.setProps({index:3});
        expect(wrapper.state('currentItemIndex')).toBe(0);

        wrapper.setProps({index:-1});
        expect(wrapper.state('currentItemIndex')).toBe(2);

        wrapper.setProps({index:23});
        expect(wrapper.state('currentItemIndex')).toBe(0);
    });

    it('toggles between full size and restricted width image states', ()=> {
        const wrapper = shallow(<ImageViewer index={2} project={dummyProject} loadProject={fn} projectId="43110" />);

        expect(wrapper.state().fitToScreen).toBe(false);

        wrapper.find('.view-mode-toggle').last().simulate('click', {});
        expect(wrapper.state().fitToScreen).toBe(true);
        expect(wrapper.find('img').first().props().className).toBe('fit-width');

        wrapper.find('.view-mode-toggle').first().simulate('click', {});
        expect(wrapper.state().fitToScreen).toBe(false);
        expect(wrapper.find('img').first().props().className).toBe('');
    });

});