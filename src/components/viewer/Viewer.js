import React from 'react';
import PropTypes from 'prop-types';
import ImageViewer from './ImageViewer';
import GalleryViewer from './GalleryViewer';
import './Viewer.css';

class Viewer extends React.Component{

    componentDidMount(){
        if (!this.props.project) this.props.loadProject(this.props.projectId);
    }

    render(){
        if (!this.props.project) {
            return <h1>Loading...</h1>;
        }

        if (!this.props.project.id) {
            return (
                <div>
                    <h1>An error occurred</h1>
                    {this.props.project.error && <p>{this.props.project.error}</p>}
                </div>
            );
        }

        return (
            <React.Fragment>
                <header className="viewer-header">
                    <h1>{this.props.project.title}</h1>   
                </header>
                <main className="viewer">
                    {this.props.viewType === "image" && <ImageViewer {...this.props} />}
                    
                    {this.props.viewType === "gallery" && <GalleryViewer {...this.props} />}
                </main>
            </React.Fragment>
        );
    }
}

export default Viewer;

Viewer.propTypes = {
    projectId: PropTypes.string.isRequired,
    loadProject: PropTypes.func.isRequired,
    viewType: PropTypes.string.isRequired,
    project: PropTypes.object,
    index: PropTypes.number
}
