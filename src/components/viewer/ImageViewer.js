import React from 'react';
import PropTypes from 'prop-types';
import ProjectNav from './ProjectNav';
import Classnames from 'classnames';
import './Viewer.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/fontawesome-free-solid';

class ImageViewer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            currentItemIndex: this.getLimitedBoundsIndex(this.props),
            fitToScreen: false
        };

        this.fitToScreen = this.fitToScreen.bind(this);
        this.showFullsize = this.showFullsize.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({ 
            currentItemIndex: this.getLimitedBoundsIndex(nextProps) 
        });
    }

    getLimitedBoundsIndex(props){
        let index = props.index || 0;

        if (isNaN(index)) index = 0;

        if (props.project && props.project.files) {
            if (index < 0) index = props.project.files.length - 1;
            if (index > (props.project.files.length - 1)) index = 0;
        } else {
            index = 0;
        }

        return index;
    }

    fitToScreen(){
        this.setState({ fitToScreen: true });
    }

    showFullsize(){
        this.setState({ fitToScreen: false });
    }

    render(){

        return (
            <React.Fragment>
                <ProjectNav currentIndex={this.state.currentItemIndex} numberOfFiles={this.props.project.files.length} projectId={this.props.projectId} />
                
                <h2 className="image-title">{this.props.project.files[this.state.currentItemIndex].title}</h2>
                <nav>
                    <button onClick={this.showFullsize} className={Classnames("view-mode-toggle", {"active-view-mode": !this.state.fitToScreen})}><FontAwesomeIcon icon={faExpand} /></button>
                    <button onClick={this.fitToScreen} className={Classnames("view-mode-toggle", {"active-view-mode": this.state.fitToScreen})}><FontAwesomeIcon icon={faCompress} /></button>
                </nav>

                <img src={this.props.project.files[this.state.currentItemIndex].url} 
                    alt={this.props.project.files[this.state.currentItemIndex].title} 
                    className={Classnames({"fit-width": this.state.fitToScreen})} />
            </React.Fragment>
        );
    }
}

export default ImageViewer;

ImageViewer.propTypes = {
    projectId: PropTypes.string.isRequired,
    loadProject: PropTypes.func.isRequired,
    project: PropTypes.object,
    index: PropTypes.number
}
