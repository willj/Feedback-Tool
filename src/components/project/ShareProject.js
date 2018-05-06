import React from 'react';
import PropTypes from 'prop-types';
import './ShareProject.css';

const ShareProject = ({projectUrl}) => {
    return (
        <div className="info-panel">
            <h2>Share your project</h2>
            <div className="info-panel-inner">
                <p>Send this link to your clients and coworkers to get feedback</p>
                
                <p className="share-url">{projectUrl}</p>
                
                <p><a href={projectUrl} target="_blank" className="button view-button">View project</a></p>
                
                <p className="info-panel-smallprint">Anyone with this link can view your project, so be careful who you give it to.</p>
            </div>
        </div>
    );
}

export default ShareProject;

ShareProject.propTypes = {
    projectUrl: PropTypes.string.isRequired
};