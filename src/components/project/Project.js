import React from 'react';
import PropTypes from 'prop-types';
import Files from './FilesContainer';
import ShareProject from './ShareProject';
import './Project.css';

const Project = ({title, projectUrl, projectError, fileCount, onTitleChange, onPublish}) => {
    return (
        <main>
            {projectUrl === "" && fileCount > 0 &&
                <section className="publish-project-wrapper">
                    <input type="text" value={title} onChange={(e) => onTitleChange(e.target.value)}  className="project-title" placeholder="Project title" />
                    <button onClick={onPublish} className="publish-button">Publish</button>  
                </section>
            }

            {projectUrl !== "" && <ShareProject projectUrl={projectUrl} />} 

            {projectError !== "" && 
                <p className="project-error">{projectError}</p>    
            }

            {projectUrl === "" && <Files />}
        </main>
    );
}

export default Project;

Project.propTypes = {
    title: PropTypes.string.isRequired,
    projectUrl: PropTypes.string.isRequired,
    projectError: PropTypes.string.isRequired,
    fileCount: PropTypes.number.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onPublish: PropTypes.func.isRequired
}