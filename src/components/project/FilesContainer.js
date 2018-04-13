import { connect } from 'react-redux';
import Files from './Files';
import { addFile, updateFile, removeFile, moveFile } from '../../actions/fileActions';

const mapStateToProps = (state) => {
    return {
        files: state.files
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNewFile: (file) => dispatch(addFile(file)),
        onChange: (index, file) => dispatch(updateFile(index, file)),
        onMove: (currentIndex, newIndex) => dispatch(moveFile(currentIndex, newIndex)),
        onDelete: (index) => dispatch(removeFile(index))
    }
}

const container = connect(mapStateToProps, mapDispatchToProps)(Files);

export default container;