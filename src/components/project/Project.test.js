import React from 'react';
import { shallow } from 'enzyme';
import Project from './Project';
import Files from './FilesContainer';
import ShareProject from './ShareProject';

describe('<Project />', () => {

    const fn = () => {};

    it('renders a text box with the provided title', () => {
        const wrapper = shallow(<Project title="A dummy title" onTitleChange={fn} projectUrl="" projectError="" onPublish={fn} fileCount={1} />);

        expect(wrapper.find('input').length).toBe(1);
        expect(wrapper.find('input').prop('value')).toBe('A dummy title');
    });

    it('calls onTitleChange when the title textbox value is changed', () => {
        const titleChange = jest.fn();

        const wrapper = shallow(<Project title="A dummy title" projectUrl="" projectError="" onTitleChange={titleChange} onPublish={fn} fileCount={1} />);

        wrapper.find('input').simulate('change', { target: { value: "Hello World" }});

        expect(titleChange).toHaveBeenCalledWith("Hello World");
    });

    it('displays a publish button only when no project URL is set', () => {
        const wrapper = shallow(<Project projectUrl="" title="test" projectError="" onTitleChange={fn} onPublish={fn} fileCount={1} />);

        expect(wrapper.find('button').first().text()).toBe("Publish");

        wrapper.setProps({ projectUrl: "http://project.com"});
        expect(wrapper.find('button').length).toBe(0);

    });

    it('calls onPublish when the publish button is clicked', () => {
        const onPublish = jest.fn();

        const wrapper = shallow(<Project onPublish={onPublish} projectUrl="" title="test" projectError="" onTitleChange={fn} fileCount={1} />);

        wrapper.find('button').simulate('click', {});

        expect(onPublish).toHaveBeenCalledTimes(1);
    });

    it('displays <ShareProject /> when a project URL is set', () => {
        const wrapper = shallow(<Project projectUrl="" title="test" projectError="" onTitleChange={fn} onPublish={fn} fileCount={1} />);
        let projectUrl = "http://project.com";

        expect(wrapper.contains(<ShareProject projectUrl={projectUrl} />)).toBe(false);

        wrapper.setProps({ projectUrl: projectUrl});
        
        expect(wrapper.contains(<ShareProject projectUrl={projectUrl} />)).toBe(true);
    });

    it('displays the project error if set', () => {
        const wrapper = shallow(<Project projectError="" projectUrl="" title="test" onTitleChange={fn} onPublish={fn} fileCount={1} />);

        expect(wrapper.find('.project-error').length).toBe(0);

        const errorMessage = "It's broken ted!";

        wrapper.setProps({ projectError: errorMessage });
        
        expect(wrapper.find('.project-error').length).toBe(1);
        expect(wrapper.find('.project-error').first().text()).toBe(errorMessage);
    });

    it('displays <Files /> only when no project URL is set', () => {

        const wrapper = shallow(<Project projectError="" projectUrl="" title="test" onTitleChange={fn} onPublish={fn} fileCount={0} />);

        expect(wrapper.contains(<Files />)).toBe(true);

        wrapper.setProps({ projectUrl: 'https://project.com/test' });

        expect(wrapper.contains(<Files />)).toBe(false);
    });

});