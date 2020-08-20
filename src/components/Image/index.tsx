import React from 'react';
import {RootState} from '../../reducers';
import { Image } from '../../types.d';

/*const mapStateToProps = (state: RootState) => ({ image: Image });

type Props = ReturnType<typeof mapStateToProps>;*/

type ImageProps = {
    image: Image;
    className?: string;
};

const ImageComponent: React.FC<ImageProps> = ({ image, className }) => {
    return (
        <div className={className}>
            <img src={image.media.m} alt={image.title} />
        </div>
    );
}

export default ImageComponent;