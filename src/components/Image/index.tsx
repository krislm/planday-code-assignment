import React from 'react';
import moment from 'moment';
import { Image } from '../../types.d';
import './image.scss';

type ImageProps = {
    image: Image;
    className?: string;
};

const ImageComponent: React.FC<ImageProps> = ({ image, className }) => {
    const classNames = ['image'];
    if (className) classNames.push(className);
    return (
        <div className={classNames.join(' ')}>
            <img className="image__element" src={image.media.m} alt={image.title} />
            <span className="image__author">{image.author}</span>
            <span className="image__tags">{image.tags}</span>
        </div>
    );
}

export default ImageComponent;