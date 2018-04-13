import React from 'react';
import { shallow } from 'enzyme';
import DragDropGrid from './DragDropGrid';

describe('<DragDropGrid />', () => {

    const fn = () => {};

    it('stores the current drag index in state when a drag is started', () => {
        const wrapper = shallow(
            <DragDropGrid items={[]} onChange={fn} onMove={fn} onDelete={fn} />
        );
        
        wrapper.instance().dragStarted(3);

        expect(wrapper.state().currentDragIndex).toBe(3);
    });

    it('calls preventDefault() on dragover so items can be dropped', () => {
        const mockEvent = {
            preventDefault: jest.fn()
        };

        const wrapper = shallow(<DragDropGrid items={[]} onChange={fn} onMove={fn} onDelete={fn} />);

        wrapper.simulate('dragover', mockEvent);

        expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('calls preventDefault() on drop', () => {
        const mockEvent = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            dataTransfer: {
                files: [],
                getData: jest.fn()
            }
        };

        const wrapper = shallow(<DragDropGrid items={[]} onChange={fn} onMove={fn} onDelete={fn} />);

        wrapper.instance().itemDropped(mockEvent, 3);

        expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('does nothing when a file is dropped (so the event bubbles to the uploader)', () => {
        const mockEvent = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            dataTransfer: {
                files: [{}],
                getData: jest.fn()
            }
        };

        const wrapper = shallow(<DragDropGrid items={[]} onChange={fn} onMove={fn} onDelete={fn} />);

        wrapper.instance().itemDropped(mockEvent, 0);

        expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
        expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(0);
    });

    it('calls onMove with item and dropzone indexes when reordering', () => {
        const onMove = jest.fn();

        const mockEvent = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            dataTransfer: {
                files: [],
                getData: () => "9"
            }
        };

        const wrapper = shallow(<DragDropGrid items={[]} onChange={fn} onMove={onMove} onDelete={fn} />);

        wrapper.instance().itemDropped(mockEvent, 7);

        expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
        expect(mockEvent.stopPropagation).toHaveBeenCalledTimes(1);
        expect(onMove).toHaveBeenCalledTimes(1);
        expect(onMove).toHaveBeenLastCalledWith("9",7);
    });

});