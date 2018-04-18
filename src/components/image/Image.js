import React from 'react';
import UploadingImage from './UploadingImage';
import EditableImage from './EditableImage';
import PropTypes from 'prop-types';

const Image = ({image, index, onChange, onDelete}) => {
    return (image.url) 
    ? <EditableImage image={image} onDelete={onDelete} index={index} onChange={onChange} />
    : <UploadingImage file={image.file} image={image} index={index} onChange={onChange} />
}

Image.propTypes = {
    image: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Image;