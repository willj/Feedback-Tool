import React from 'react';
import { shallow } from 'enzyme';
import Viewer from './Viewer';
import { Link } from 'react-router-dom';

describe('<Viewer />', () => {

    const fn = () => {};

    it('displays loading when the project has not loaded', () => {

        const wrapper = shallow(<Viewer project={undefined} loadProject={fn} projectId="43110" index={0} />);

        expect(wrapper.find('h1').text()).toBe('Loading...');
    });

    it('calls loadProject on mount when the project has not already loaded', () => {

        const loadProject = jest.fn();

        const wrapper = shallow(<Viewer project={undefined} loadProject={loadProject} projectId="43110" index={0} />);

        expect(loadProject).toHaveBeenCalledTimes(1);
        expect(loadProject).toHaveBeenLastCalledWith('43110');
    });

    it('displays an error when the project could not be loaded', () => {
        const project = {
            error: 'error message'
        };

        const wrapper = shallow(<Viewer project={project} loadProject={fn} projectId="43110" index={0} />);

        expect(wrapper.find('h1').text()).toBe('An error occurred');
        expect(wrapper.find('p').text()).toBe(project.error);
    });

    it('currentItemIndex is set to 0 when NaN is passed in', () => {
        const wrapper = shallow(<Viewer index={NaN} project={undefined} loadProject={fn} projectId="43110" />);

        expect(wrapper.state('currentItemIndex')).toBe(0);
    });

    it('currentItemIndex is set to 0 when 0 is passed in', () => {
        const wrapper = shallow(<Viewer index={0} project={undefined} loadProject={fn} projectId="43110" />);

        expect(wrapper.state('currentItemIndex')).toBe(0);
    });

    it('currentItemIndex is kept within bounds of project.files.length', () => {
        const project = {
            title: "project title",
            id: "43110",
            files: [
                {title: "title", url: "test.jpg"},
                {title: "title", url: "test.jpg"},
                {title: "title", url: "test.jpg"}
            ]
        };

        const wrapper = shallow(<Viewer index={2} project={project} loadProject={fn} projectId="43110" />);

        expect(wrapper.state('currentItemIndex')).toBe(2);

        wrapper.setProps({index:3});
        expect(wrapper.state('currentItemIndex')).toBe(0);

        wrapper.setProps({index:-1});
        expect(wrapper.state('currentItemIndex')).toBe(2);

        wrapper.setProps({index:23});
        expect(wrapper.state('currentItemIndex')).toBe(0);
    });

});