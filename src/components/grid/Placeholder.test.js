import React from 'react';
import {shallow} from 'enzyme';
import Placeholder from '../grid/Placeholder';

describe('<Placeholder />', () => {

    it('displays the getting started screen when there are no files', () => {

        const wrapper = shallow(<Placeholder fileCount={0} />);

        expect(wrapper.find('.get-started').length).toBe(1);
    });

    it('displays the file upload placeholder when file count is > 0', () => {

        const wrapper = shallow(<Placeholder fileCount={1} />);

        expect(wrapper.find('.item').length).toBe(1);        
    });

});