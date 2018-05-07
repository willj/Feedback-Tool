import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GalleryViewer = ({project, projectId}) => {
    return (
        <div>
            {project.files.map((image, index) => {
                return (
                    <Link to={`/view/${projectId}/${index}`}>
                        <h2>{image.title}</h2>
                        <img src={image.url} alt={image.title} />
                    </Link>
                );
            })}
        </div>
    );
}

export default GalleryViewer;

GalleryViewer.propTypes = {
    project: PropTypes.object.isRequired
}