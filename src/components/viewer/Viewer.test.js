import React from 'react';
import { shallow } from 'enzyme';
import Viewer from './Viewer';
import { Link } from 'react-router-dom';

describe('<Viewer />', () => {

    const fn = () => {};

    it('displays loading when the project has not loaded', () => {

        const wrapper = shallow(<Viewer project={undefined} loadProject={fn} projectId="43110" index={0} viewType="image" />);

        expect(wrapper.find('h1').text()).toBe('Loading...');
    });

    it('calls loadProject on mount when the project has not already loaded', () => {

        const loadProject = jest.fn();

        const wrapper = shallow(<Viewer project={undefined} loadProject={loadProject} projectId="43110" index={0} viewType="image" />);

        expect(loadProject).toHaveBeenCalledTimes(1);
        expect(loadProject).toHaveBeenLastCalledWith('43110');
    });

    it('displays an error when the project could not be loaded', () => {
        const project = {
            error: 'error message'
        };

        const wrapper = shallow(<Viewer project={project} loadProject={fn} projectId="43110" index={0} viewType="image" />);

        expect(wrapper.find('h1').text()).toBe('An error occurred');
        expect(wrapper.find('p').text()).toBe(project.error);
    });

    it('displays an <ImageViewer /> when viewType is set to image', () => {
        const dummyProject = {
            title: "project title",
            id: "43110",
            files: [
                {title: "title", url: "test.jpg"},
                {title: "title", url: "test1.jpg"},
                {title: "title", url: "test2.jpg"}
            ]
        };

        const wrapper = shallow(<Viewer project={dummyProject} loadProject={fn} projectId="43110" index={0} viewType="image" />);

        expect(wrapper.find('ImageViewer').length).toBe(1);
    });

    it('displays a <GalleryViewer /> when viewType is set to gallery', () => {
        const dummyProject = {
            title: "project title",
            id: "43110",
            files: [
                {title: "title", url: "test.jpg"},
                {title: "title", url: "test1.jpg"},
                {title: "title", url: "test2.jpg"}
            ]
        };

        const wrapper = shallow(<Viewer project={dummyProject} loadProject={fn} projectId="43110" index={0} viewType="gallery" />);

        expect(wrapper.find('GalleryViewer').length).toBe(1);
    });

});