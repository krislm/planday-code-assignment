export type Image = {
    title: string;
    link: string;
    media: {m: string};
    date_taken: string;
    description: string;
    published: string;
    author: string;
    author_id: string;
    tags: string;
}

export type ImagesState = {
    images: Image[];
    loading: boolean;
}

export type ImagesAction = ReturnType<typeof setImages>;

export const SET_PROPERTIES: string = 'SET_PROPERTIES';