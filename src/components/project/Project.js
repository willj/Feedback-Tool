import React from 'react';
import PropTypes from 'prop-types';
import Files from './FilesContainer';

const Project = ({title, onTitleChange}) => {

    return (
        <div>
            <h1>Project page</h1>
            <input type="text" value={title} onChange={(e) => onTitleChange(e.target.value)} />
            <Files />
        </div>
    );
}

export default Project;

Project.propTypes = {
    title: PropTypes.string.isRequired,
    onTitleChange: PropTypes.func.isRequired
}