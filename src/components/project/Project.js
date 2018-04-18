import React from 'react';
import PropTypes from 'prop-types';
import Files from './FilesContainer';
import './Project.css';

const Project = ({title, projectUrl, projectError, onTitleChange, onPublish}) => {

    return (
        <div>
            <h1>Project page</h1>
            <input type="text" value={title} onChange={(e) => onTitleChange(e.target.value)}  className="project-title" placeholder="Project title" />
            
            {projectUrl === "" && 
                <button onClick={onPublish}>Publish</button>  
            }

            {projectUrl !== "" && 
                <p>Share your project: {projectUrl}</p>    
            } 

            {projectError !== "" && 
                <p className="project-error">{projectError}</p>    
            }

            <Files />
        </div>
    );
}

export default Project;

Project.propTypes = {
    title: PropTypes.string.isRequired,
    projectUrl: PropTypes.string.isRequired,
    projectError: PropTypes.string.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onPublish: PropTypes.func.isRequired
}