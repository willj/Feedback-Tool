import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Viewer.css';

class Viewer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            currentItemIndex: this.getLimitedBoundsIndex(this.props)
        };
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

    nextPageLink(){
        let next = this.state.currentItemIndex + 1;
        if (next >= this.props.project.files.length) next = 0;

        return `/view/${this.props.projectId}/${next}`;
    }

    prevPageLink(){
        let next = this.state.currentItemIndex - 1;
        if (next < 0) next = this.props.project.files.length - 1;

        return `/view/${this.props.projectId}/${next}`;
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
            <div className="viewer">
                <h1>{this.props.project.title}</h1>
                <nav>
                    <Link to={this.prevPageLink()} className="previous-image">Prev</Link> 
                    <Link to={this.nextPageLink()} className="next-image">Next</Link>
                </nav>
                <h2>{this.props.project.files[this.state.currentItemIndex].title}</h2>
                <img src={this.props.project.files[this.state.currentItemIndex].url} alt="" />
            </div>
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
