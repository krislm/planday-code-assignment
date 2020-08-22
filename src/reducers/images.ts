import {ImagesAction, ImagesState, SET_IMAGES, FILTER_IMAGES, Image, RESET_FILTER} from '../types.d';

const initialState: ImagesState = {
    images: [],
    filteredImages: [],
    loading: false,
}

export function imagesReducer(state: ImagesState = initialState, action: ImagesAction): ImagesState {
    switch (action.type) {
        case SET_IMAGES:
            return {
                ...state,
                images: [...state.images, ...action.payload]
            }
        case FILTER_IMAGES:
            const filteredImages = state.images.filter((image: Image) => image.tags.indexOf(action.payload.search) > -1);
            return {
                ...state,
                filteredImages: [...filteredImages]
            };
        case RESET_FILTER:
            console.log('reset case')
            return {
                ...state,
                filteredImages: []
            }
        default:
            return state;
    }
}