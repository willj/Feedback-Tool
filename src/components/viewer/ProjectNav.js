import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faThLarge } from '@fortawesome/fontawesome-free-solid';

const ProjectNav = ({currentIndex, numberOfFiles, projectId}) => {
    function nextPageLink(){
        if (numberOfFiles <= 1) return;
        let next = currentIndex + 1;
        if (next >= numberOfFiles) next = 0;
        
        return <Link to={`/view/${projectId}/${next}`} className="nav-button next-image">Next</Link>;
    }

    function prevPageLink(){
        if (numberOfFiles <= 1) return;
        let next = currentIndex - 1;
        if (next < 0) next = numberOfFiles - 1;

        return <Link to={`/view/${projectId}/${next}`} className="nav-button previous-image">Previous</Link>;
    }

    return (
        <nav>
            {prevPageLink()}             
            <Link to={`/view/gallery/${projectId}`} className="nav-button view-all"><FontAwesomeIcon icon={faThLarge} /></Link>
            {nextPageLink()}
        </nav>
    );
}

export default ProjectNav;

ProjectNav.propTypes = {
    currentIndex: PropTypes.number.isRequired,
    numberOfFiles: PropTypes.number.isRequired
};
