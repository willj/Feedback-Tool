import React from 'react';
import PropTypes from 'prop-types';
import ProjectNav from './ProjectNav';
import Classnames from 'classnames';
import './Viewer.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/fontawesome-free-solid';



class Viewer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            currentItemIndex: this.getLimitedBoundsIndex(this.props),
            fitToScreen: false
        };

        this.fitToScreen = this.fitToScreen.bind(this);
        this.showFullsize = this.showFullsize.bind(this);
    }

    componentDidMount(){
        if (!this.props.project) this.props.loadProject(this.props.projectId);
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

                    <ProjectNav currentIndex={this.state.currentItemIndex} numberOfFiles={this.props.project.files.length} projectId={this.props.projectId} />
                </header>
                <main className="viewer">
                    <h2 className="image-title">{this.props.project.files[this.state.currentItemIndex].title}</h2>
                    <nav>
                        <button onClick={this.showFullsize} className={Classnames("view-mode-toggle", {"active-view-mode": !this.state.fitToScreen})}><FontAwesomeIcon icon={faExpand} /></button>
                        <button onClick={this.fitToScreen} className={Classnames("view-mode-toggle", {"active-view-mode": this.state.fitToScreen})}><FontAwesomeIcon icon={faCompress} /></button>
                    </nav>

                    <img src={this.props.project.files[this.state.currentItemIndex].url} 
                        alt={this.props.project.files[this.state.currentItemIndex].title} 
                        className={Classnames({"fit-width": this.state.fitToScreen})} />
                </main>
            </React.Fragment>
        );
    }
}

export default Viewer;

Viewer.propTypes = {
    projectId: PropTypes.string.isRequired,
    loadProject: PropTypes.func.isRequired,
    project: PropTypes.object,
    index: PropTypes.number
}
