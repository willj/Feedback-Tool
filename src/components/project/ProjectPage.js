import { connect } from 'react-redux';
import Project from './Project';
import { updateProjectTitle } from '../../actions/projectActions';

const mapStateToProps = (state) => {
    return {
        title: state.title
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTitleChange: title => dispatch(updateProjectTitle(title))
    };
}

const ProjectPage = connect(mapStateToProps, mapDispatchToProps)(Project);

export default ProjectPage;