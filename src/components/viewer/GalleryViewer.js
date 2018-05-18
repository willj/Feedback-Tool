import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './GalleryViewer.css';

const GalleryViewer = ({project, projectId}) => {
    return (
        <div className="gallery">
            {project.files.map((image, index) => {
                return (
                    <div className="gallery-item" key={index}>
                        <Link to={`/view/${projectId}/${index}`}>
                            <h2>{image.title}</h2>
                            <div className="gallery-image" style={{ backgroundImage: 'url(' + image.url + ')' }}></div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default GalleryViewer;

GalleryViewer.propTypes = {
    project: PropTypes.object.isRequired
}