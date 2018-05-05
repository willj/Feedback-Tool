import React from 'react';
import PropTypes from 'prop-types';
import './EditableImage.css';

class EditableImage extends React.Component{

    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        let img = Object.assign({}, this.props.image);
        img.title = e.target.value;
        this.props.onChange(this.props.index, img);
    }

    preventDrag(e){
        e.preventDefault();
        e.stopPropagation();
    }

    render(){
        let {image, index, onDelete} = this.props;
        return (
            <React.Fragment>
                <input type="text" placeholder="Add a title here" value={image.title} className="edit-image-title" onChange={this.onChange} draggable onDragStart={this.preventDrag} />
                <div className="edit-image-image" style={{ backgroundImage: 'url(' + image.url + ')' }}></div>
                <button className="edit-image-delete" onClick={() => { onDelete(index); }}>Delete</button>
            </React.Fragment>
        );
    }

}

export default EditableImage;

EditableImage.propTypes = {
    index: PropTypes.number.isRequired,
    image: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};