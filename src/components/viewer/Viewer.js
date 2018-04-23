import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Viewer extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            currentItemIndex: (!this.props.index || isNaN(this.props.index)) ? 0 : this.props.index
        };
    }

    componentDidMount(){
        if (!this.props.project) this.props.loadProject(this.props.projectId);
    }

    componentWillReceiveProps(nextProps){
        var next = nextProps.index;

        if (isNaN(next)) next = 0;

        if (next < 0) next = nextProps.project.files.length - 1;
        if (next > (nextProps.project.files.length - 1)) next = 0;

        this.setState({ currentItemIndex: next });
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
                    <h1>An error occured</h1>
                    {this.props.project.error && <p>this.props.project.error</p>}
                </div>
            );
        }

        return (
            <div className="viewer">
                <h1>{this.props.project.title}</h1>
                <nav>
                    <Link to={this.prevPageLink()}>Prev</Link> <Link to={this.nextPageLink()}>Next</Link>
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
