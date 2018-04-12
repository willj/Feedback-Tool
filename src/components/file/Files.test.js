import React from 'react';
import {shallow} from 'enzyme';
import Files from './Files';
import { isNullOrUndefined } from 'util';

describe('<Files />', () => {

    it('displays a message when there are no files', () => {
        const fn = jest.fn();
        const wrapper = shallow(<Files files={[]} onNewFile={fn} onMove={fn} onChange={fn} onDelete={fn} />);

        expect(wrapper.find('h2').text()).toBe("Drop files here");
        
    });

    it('does not display a message when there are files', () => {
        const fn = jest.fn();

        const files = [
            { name: "1.jpg" },
            { name: "2.jpg" }
        ];

        const wrapper = shallow(<Files files={files} onNewFile={fn} onMove={fn} onChange={fn} onDelete={fn} />);

        expect(wrapper.find('h2').length).toBe(0);        
    });

});