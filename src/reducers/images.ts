import {ImagesAction, ImagesState, SET_IMAGES, Image} from '../types.d';

const initialState: ImagesState = {
    images: [],
    loading: false,
}

export function imagesReducer(state: ImagesState = initialState, action: ImagesAction): ImagesState {
    console.log(action);
    switch (action.type) {
        case SET_IMAGES:
            if (action.payload.search && action.payload.search.length > 3) {
                const images = state.images.filter((image: Image) => image.tags.indexOf(action.payload.search) > -1);
                return {
                    ...state,
                    images: [...state.images, ...images]
                }
            } else if(action.payload.search && action.payload.search.length < 4) {
                return state;
            }
            return {
                ...state,
                images: [...state.images, ...action.payload]
            }
        default:
            return state;
    }
}