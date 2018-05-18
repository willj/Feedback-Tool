import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faThLarge, faArrowRight, faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import './ProjectNav.css';

const ProjectNav = ({currentIndex, numberOfFiles, projectId}) => {
    function nextPageLink(){
        if (numberOfFiles <= 1) return;
        let next = currentIndex + 1;
        if (next >= numberOfFiles) next = 0;
        
        return <Link to={`/view/${projectId}/${next}`} className="nav-button next-image"><span className="hide-mobile">Next</span><FontAwesomeIcon icon={faArrowRight} className="show-mobile" /></Link>;
    }

    function prevPageLink(){
        if (numberOfFiles <= 1) return;
        let next = currentIndex - 1;
        if (next < 0) next = numberOfFiles - 1;

        return <Link to={`/view/${projectId}/${next}`} className="nav-button previous-image"><span className="hide-mobile">Previous</span><FontAwesomeIcon icon={faArrowLeft} className="show-mobile" /></Link>;
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
