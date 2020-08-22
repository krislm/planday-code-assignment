import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { fetchImages } from '../../actions';
import ImageComponent from '../Image';
import './list.scss';

const mapStateToProps = (state: RootState) => ({ store: state.images });

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        fetchImages
    }, dispatch);
};

type Props = ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

const ImagesComponent: React.FC<Props> = ({ fetchImages, store }) => {

    useEffect(() => {
       if (!store.loading && store.images.length === 0) {
           fetchImages();
       }
    }, [fetchImages]);

    function renderImageList() {
        if (store.filteredImages.length > 0) {
            return store.filteredImages.map((image) => <ImageComponent key={image.author_id} className="list__item" image={image} />)
        }
        return store.images.map((image) => <ImageComponent key={image.author_id} className="list__item" image={image} />)
    }

    return (
        <div className="list">
            {
                renderImageList()
            }
        </div>
    );
}

const ImagesList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImagesComponent);
export default ImagesList;