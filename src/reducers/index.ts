import { combineReducers } from 'redux';
import { imagesReducer } from './images';

export const rootReducer = combineReducers({
    images: imagesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;