import React from 'react';
import PropTypes from 'prop-types';
import FileUploadHandler from '../fileupload/FileUploadHandler';
import DragDropGrid from '../grid/DragDropGrid';
import Placeholder from '../grid/Placeholder';

const Files = ({files, onNewFile, onChange, onMove, onDelete}) => {
    return (
        <FileUploadHandler onNewFile={onNewFile}>
            <DragDropGrid items={files} onChange={onChange} onMove={onMove} onDelete={onDelete}>
                <Placeholder fileCount={files.length} />
            </DragDropGrid>
        </FileUploadHandler>
    );
};

export default Files;

Files.propTypes = {
    files: PropTypes.arrayOf(Object).isRequired,
    onNewFile: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}