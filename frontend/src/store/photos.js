import { csrfFetch } from "./csrf";

const GET_PHOTO = 'photos/GET_ONE';
const GET_GALLERY = 'photos/GET_ALL';
const POST_PHOTO = 'photos/POST';
const DELETE_PHOTO = 'photos/DELETE';

const setPhoto = (photo) => {
    return {
        type: GET_PHOTO,
        payload: photo
    }
}

const setGallery = (gallery) => {
    return {
        type: GET_GALLERY,
        payload: gallery
    }
}

export const getAllPhotos = () => async dispatch => {
    let photos = await csrfFetch('api/photos');
    let response = await photos.json();

    dispatch(setGallery(response));
    return response;
}

let initialState = { photos: [], currentPhoto: []}

const photoReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_PHOTO:
            newState = Object.assign({}, state);
            newState.currentPhoto = [action.payload];
            return newState;
        case GET_GALLERY:
            newState = Object.assign({}, state);
            newState.photos = action.payload;
            newState.currentPhoto = [];
            return newState;
        case POST_PHOTO:
            newState = Object.assign({}, state);
            newState.photos.push(action.payload);
            newState.currentPhoto.push(action.payload);
            return newState;
        case DELETE_PHOTO:
            newState = Object.assign({}, state);
            newState.filter((photo) => (
                photo.id !== action.payload.id
            ));
            return newState;
        default:
            return state;
    }
}

export default photoReducer;
