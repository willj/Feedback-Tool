import React from 'react';
import PropTypes from 'prop-types';
import './Placeholder.css';

const Placeholder = ({fileCount}) => {
    return (
        <React.Fragment>
            {fileCount === 0 && 
                <div className="get-started">
                    <h2>Drop images here to get started</h2>
                    <div className="get-started-inner">
                        <p>Drag and drop or paste your images here to create your project.</p>
                        
                        <div className="gs-file"><span></span></div>
                        <div className="gs-file"><span></span></div>
                        <div className="gs-file"><span></span></div>

                        <p className="get-started-smallprint">You can upload jpg, png, gif and webp files, paste screenshots or other images from your clipboard, you can even drag a folder full in if your browser supports it.</p>
                    </div>
                </div>
            }
            {fileCount > 0 && 
                <div className="item">upload placeholder</div>
            }
        </React.Fragment>
    )

};

export default Placeholder;

Placeholder.propTypes = {
    fileCount: PropTypes.number.isRequired
}