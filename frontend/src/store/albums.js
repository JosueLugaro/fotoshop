import { csrfFetch } from "./csrf";

const GET_ALBUM = 'albums/GET_ONE';
const GET_ALBUMS = 'albums/GET_ALL';
const POST_ALBUM = 'albums/POST';
const POST_TO_ALBUM = 'albums/POST_PIC';
const DELETE_ALBUM = 'albums/DELETE';
const DELETE_FROM_ALBUM = 'albums/DELETE_FROM';

const setAlbums = (albums) => {
    return {
        type: GET_ALBUMS,
        payload: albums
    }
}

const setAlbum = (album) => {
    return {
        type: GET_ALBUM,
        payload: album
    }
}

export const getAllAlbums = () => async dispatch => {
    let albums = await csrfFetch('/api/albums');
    let response = await albums.json();

    dispatch(setAlbums(response));
    return response;
}

export const getOneAlbum = (albumId) => async dispatch => {
    let album = await csrfFetch(`/api/albums/${albumId}`);
    let response = await album.json();

    dispatch(setAlbum(response));
    return response;
}

let initialState = { albums: [], currentAlbum: [] }

const albumReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_ALBUM:
            newState = Object.assign({}, state);
            newState.currentAlbum = action.payload
            return newState;
        case GET_ALBUMS:
            newState = Object.assign({}, state);
            newState.albums = action.payload;
            newState.currentAlbum = [];
            return newState;
        case POST_ALBUM:
            return newState;
        case POST_TO_ALBUM:
            return newState;
        case DELETE_ALBUM:
            return newState;
        case DELETE_FROM_ALBUM:
            return newState;
        default:
            return state;
    }
}

 export default albumReducer;