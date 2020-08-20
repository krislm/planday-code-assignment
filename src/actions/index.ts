import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { typedAction } from './helpers';
import { Image, SET_PROPERTIES } from '../types';

export function fetchImages() {
    return async (dispatch: Dispatch<AnyAction>) => {
        const images: Image[] = await axios.get('https://www.flickr.com/services/feeds/photos_public.gne?format=json')
            .then((response: any) => response.items);
        dispatch(setImages(images))
    }
}

function setImages(images: Image[]) {
    return typedAction(SET_PROPERTIES, images);
}