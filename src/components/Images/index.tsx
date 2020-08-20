import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { fetchImages } from '../../actions';
import ImageComponent from '../Image';
import './list.scss';

const mapStateToProps = (state: RootState) => ({ images: state.images });

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        fetchImages
    }, dispatch);
};

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const ImagesComponent: React.FC<Props> = ({ fetchImages, images }) => {

    useEffect(() => {
       if (!images.loading && images.images.length === 0) {
           fetchImages();
       }
    }, [fetchImages]);

    return (
        <div className="list">
            {
                images.images.map((image) => <ImageComponent key={image.author_id} image={image} />)
            }
        </div>
    );
}

const ImagesList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImagesComponent);
export default ImagesList;