import { ImagesAction, ImagesState, SET_PROPERTIES } from '../types.d';

const initialState: ImagesState = {
    images: [],
    loading: false,
}

export function imagesReducer(state: ImagesState = initialState, action: ImagesAction): ImagesState {
    switch (action.type) {
        case SET_PROPERTIES:
            return {
                ...state,
                images: [...state.images, ...action.payload]
            }
        default:
            return state;
    }
}