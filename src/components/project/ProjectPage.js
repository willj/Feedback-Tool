import { connect } from 'react-redux';
import Project from './Project';
import { updateProjectTitle, publishProject } from '../../actions/projectActions';

const mapStateToProps = (state) => {
    return {
        title: state.title,
        files: state.files,
        projectUrl: state.project.url,
        projectError: state.project.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTitleChange: title => dispatch(updateProjectTitle(title)),
        onPublish: (publishUrl, viewUrl, projectState) => dispatch(publishProject(publishUrl, viewUrl, projectState))
    };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    
    const publishUrl = process.env.REACT_APP_PUBLISH_PROJECT_URL;
    const viewUrl = process.env.REACT_APP_VIEW_PROJECT_URL;

    return Object.assign({}, stateProps, dispatchProps, ownProps, {
        onPublish: () => dispatchProps.onPublish(publishUrl, viewUrl, {title: stateProps.title, files: stateProps.files})
    });
}

const ProjectPage = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Project);

export default ProjectPage;