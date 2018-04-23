import { connect } from 'react-redux';
import Viewer from './Viewer';
import { loadProject } from '../../actions/projectActions';

const mapStateToProps = (state, ownProps) => {
    return {
        project: state.projects[ownProps.projectId]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadProject: projectId => dispatch(loadProject(process.env.REACT_APP_GET_PROJECT_URL, projectId))
    }
}

const ProjectViewer = connect(mapStateToProps, mapDispatchToProps)(Viewer);

export default ProjectViewer;