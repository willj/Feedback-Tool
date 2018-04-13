import React from 'react';
import { shallow } from 'enzyme';
import DraggableGridItem from './DraggableGridItem';

describe('<DraggableGridItem />', () => {

    const fn = () => {};

    it('calls props.dragStarted() with the current index', () => {
        const dragStarted = jest.fn();

        const wrapper = shallow(<DraggableGridItem index={7} currentDragIndex={-1} dragStarted={dragStarted} itemDropped={fn} />);

        const mockEvent = {
            dataTransfer: {
                setData: jest.fn()
            }
        };

        wrapper.simulate('dragstart', mockEvent);

        expect(dragStarted).toHaveBeenCalledTimes(1);
        expect(dragStarted).toHaveBeenLastCalledWith(7, mockEvent);
    });

    it('toggles the active-drag-item class when drag is started/ended', () => {
        
        const wrapper = shallow(<DraggableGridItem index={7} currentDragIndex={-1} dragStarted={fn} itemDropped={fn} />);
        
        const mockEvent = {
            dataTransfer: {
                setData: jest.fn()
            }
        };

        expect(wrapper.find('.item').hasClass('active-drag-item')).toBe(false);

        wrapper.simulate('dragstart', mockEvent);

        expect(wrapper.find('.item').hasClass('active-drag-item')).toBe(true);

        wrapper.simulate('dragend', mockEvent);

        expect(wrapper.find('.item').hasClass('active-drag-item')).toBe(false);
    });

    it('sets the dataTransfer data on dragStart', () => {
        const wrapper = shallow(<DraggableGridItem index={7} currentDragIndex={-1} dragStarted={fn} itemDropped={fn} />);
        
        const mockEvent = {
            dataTransfer: {
                setData: jest.fn(),
                effectAllowed: undefined
            }
        };

        wrapper.simulate('dragstart', mockEvent);

        expect(mockEvent.dataTransfer.effectAllowed).toBe("move");
        expect(mockEvent.dataTransfer.setData).toHaveBeenLastCalledWith("text/plain", "7");
    });

    it('toggles the active-drop-zone class when an item is dragged over/out', () => {
        const wrapper = shallow(<DraggableGridItem index={7} currentDragIndex={3} dragStarted={fn} itemDropped={fn} />);

        const mockEvent = {
            preventDefault: () => {}
        };

        expect(wrapper.find('.item').hasClass('active-drop-zone')).toBe(false);

        wrapper.simulate('dragenter', mockEvent);

        expect(wrapper.find('.item').hasClass('active-drop-zone')).toBe(true);

        wrapper.simulate('dragleave', mockEvent);

        expect(wrapper.find('.item').hasClass('active-drop-zone')).toBe(false);
    });

    it('does not change the class to be an active-drop-zone when an item is dragged over itself', () => {
        const wrapper = shallow(<DraggableGridItem index={7} currentDragIndex={7} dragStarted={fn} itemDropped={fn} />);

        const mockEvent = {
            preventDefault: () => {}
        };

        expect(wrapper.find('.item').hasClass('active-drop-zone')).toBe(false);

        wrapper.simulate('dragenter', mockEvent);

        expect(wrapper.find('.item').hasClass('active-drop-zone')).toBe(false);
    });

    it('calls preventDefault on the dragOver event so items can be dropped', () => {
        const wrapper = shallow(<DraggableGridItem index={7} currentDragIndex={7} dragStarted={fn} itemDropped={fn} />);

        const mockEvent = {
            preventDefault: jest.fn()
        };

        wrapper.simulate('dragover', mockEvent);

        expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('dropping an item removes the active-drop-zone class', () => {
        const wrapper = shallow(<DraggableGridItem index={7} currentDragIndex={3} dragStarted={fn} itemDropped={fn} />);

        const mockEvent = {
            preventDefault: () => {}
        };

        expect(wrapper.find('.item').hasClass('active-drop-zone')).toBe(false);

        wrapper.simulate('dragenter', mockEvent);

        expect(wrapper.find('.item').hasClass('active-drop-zone')).toBe(true);

        wrapper.simulate('drop', mockEvent);

        expect(wrapper.find('.item').hasClass('active-drop-zone')).toBe(false);
    });

    it('dropping an item calls itemDropped with the event and dropzone index', () => {

        const mockItemDropped = jest.fn();

        const wrapper = shallow(
            <DraggableGridItem index={7} currentDragIndex={3} dragStarted={fn} itemDropped={mockItemDropped} />
        );

        wrapper.simulate('drop', {});

        expect(mockItemDropped).toHaveBeenCalledTimes(1);
        expect(mockItemDropped).toHaveBeenLastCalledWith({}, 7);

    });

});