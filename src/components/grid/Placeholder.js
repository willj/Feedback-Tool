import React from 'react';
import PropTypes from 'prop-types';
import './Placeholder.css';

const Placeholder = ({fileCount}) => {
    return (
        <React.Fragment>
            {fileCount === 0 && 
                <div className="info-panel get-started">
                    <h2>Drop images here to get started</h2>
                    <div className="info-panel-inner">
                        <p>Drop or paste your images here to create your project.</p>
                        
                        <div className="gs-file"><span></span></div>
                        <div className="gs-file"><span></span></div>
                        <div className="gs-file"><span></span></div>

                        <p className="info-panel-smallprint">
                            You can upload jpg, png, gif and webp files, paste screenshots or other images from your clipboard, you can even drag a folder in if your browser supports it.
                        </p>
                    </div>
                </div>
            }
            {fileCount > 0 && 
                <div className="item placeholder-item">
                    <div className="gs-file"><span></span></div>
                    <p className="gs-smallprint">You can upload jpg, png, gif and webp files, paste screenshots or other images from your clipboard, you can even drag a folder in if your browser supports it.</p>
                </div>
            }
        </React.Fragment>
    )

};

export default Placeholder;

Placeholder.propTypes = {
    fileCount: PropTypes.number.isRequired
}