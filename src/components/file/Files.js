import React from 'react';
import PropTypes from 'prop-types';
import FileUploadHandler from './FileUploadHandler';
import DragDropGrid from './DragDropGrid';

const Files = ({files, onNewFile, onChange, onMove, onDelete}) => {
    return (
        <FileUploadHandler onNewFile={onNewFile}>
            <DragDropGrid items={files} onChange={onChange} onMove={onMove} onDelete={onDelete}>
                {files.length === 0 && <h2>Drop files here</h2> }
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