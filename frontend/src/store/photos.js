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

const setAddition = (newPhoto) => {
    return {
        type: POST_PHOTO,
        payload: newPhoto
    }
}

const setRemoval = (photoId) => {
    return {
        type: DELETE_PHOTO,
        payload: photoId
    }
}

export const getAllPhotos = () => async dispatch => {
    let photos = await csrfFetch('/api/photos');
    let response = await photos.json();

    dispatch(setGallery(response));
    return response;
}

export const getOnePhoto = (photoId) => async dispatch => {
    let photo = await csrfFetch(`/api/photos/${photoId}`)
    let response = await photo.json();

    dispatch(setPhoto(response));
    return response;
}

export const postPhoto = (photoObj) => async dispatch => {
    let newPhoto = await csrfFetch('/api/photos/new', {
        method: "POST",
        body: JSON.stringify(photoObj)
    })

    let response = await newPhoto.json();
    dispatch(setAddition(response));
    return response;
}

export const deletePhoto = (photoId) => async dispatch => {
    let photo = await csrfFetch(`/api/photos/${photoId}`)
    dispatch(setRemoval(photoId));
    return photo;
}

let initialState = { photos: [], currentPhoto: [] }

const photoReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_PHOTO:
            newState = Object.assign({}, state);
            newState.currentPhoto = action.payload;
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
            newState.photos = newState.photos.filter((photo) => (
                photo.id !== action.payload
            ));
            return newState;
        default:
            return state;
    }
}

export default photoReducer;
