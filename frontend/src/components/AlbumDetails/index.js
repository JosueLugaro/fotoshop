import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getOneAlbum } from "../../store/albums";
import { getAllPhotos } from '../../store/photos';
import "./AlbumDetails.css";

function AlbumDetails() {
    const params = useParams();
    const dispatch = useDispatch();

    let album = useSelector(state => state.album.currentAlbum);
    let photos = useSelector(state => state.photo.photos);

    let albumPhotos = photos.filter((photo) => (
        photo.albumId === album.id
    ))


    useEffect(() => {
        dispatch(getOneAlbum(params.albumId));
        dispatch(getAllPhotos());
    }, [dispatch, params.albumId]);


    return (
        <div className="album-details-container">
            <h1>This is the albums details page for the {album.title} album</h1>
            <NavLink to={`/albums/${album.id}/edit`}>Edit</NavLink>
            {albumPhotos && albumPhotos.map((photo) => (
                <div className="albums-photos-container" key={photo.id}>
                    <NavLink to={`/photos/${photo.id}`}><img src={photo.imageUrl} alt={photo.title} className="album-photo"/></NavLink>
                </div>
            ))}
        </div>
    )
}

export default AlbumDetails;
