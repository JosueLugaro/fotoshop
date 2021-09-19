import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { getOneAlbum } from "../../store/albums";
import { getAllPhotos } from '../../store/photos';
import { updatePhoto } from "../../store/photos";
import "./AlbumEditForm.css";

function AlbumEditForm() {
    const params = useParams();
    const dispatch = useDispatch();
    let history = useHistory();

    let album = useSelector(state => state.album.currentAlbum);
    let photos = useSelector(state => state.photo.photos);
    let user = useSelector(state => state.session.user);

    let possiblePhotos = photos.filter((photo) => (
        photo.albumId === null && photo.userId === user.id
    ));

    let albumPhotos = photos.filter((photo) => (
        photo.albumId === album.id
    ))

    let [selectedDeletionPhotos, setSelectedDeletionPhotos] = useState([]);
    let [selectedAdditionPhotos, setSelectedAdditionPhotos] = useState([]);

    useEffect(() => {
        dispatch(getOneAlbum(params.albumId));
        dispatch(getAllPhotos());
    }, [dispatch, params.albumId]);

    const handleChangeDeletion = (photoId) => {
        let newArray = selectedDeletionPhotos.slice();

        if(newArray.includes(photoId)) {
            let index = newArray.indexOf(photoId)
            newArray.splice(index, 1);
        } else {
            newArray.push(photoId);
        }

        setSelectedDeletionPhotos(newArray);
    }

    const handleChangeAddition = (photoId) => {
        let newArray = selectedAdditionPhotos.slice();

        if(newArray.includes(photoId)) {
            let index = newArray.indexOf(photoId)
            newArray.splice(index, 1);
        } else {
            newArray.push(photoId);
        }

        setSelectedAdditionPhotos(newArray);
    }

    const handleDeletion = (e) => {
        e.preventDefault();

        dispatch(updatePhoto(selectedDeletionPhotos, null));

        history.push(`/albums/${params.albumId}`);
    }

    const handleAddition = (e) => {
        e.preventDefault();

        dispatch(updatePhoto(selectedAdditionPhotos, params.albumId));

        history.push(`/albums/${params.albumId}`);
    }

    return (
        <div className="edit-album-details-container">
            <h1>Edit album: {album.title}</h1>
            <div className="deletion-container">
                <form className="deletion-form" onSubmit={handleDeletion}>
                    {albumPhotos && albumPhotos.map((photo) => (
                        <div className="edit-albums-photos-container">
                            <img src={photo.imageUrl} alt={photo.title} className="edit-album-photo" key={photo.title}/>
                            <input type="checkbox" value={photo.id} key={photo.id} className="option-input" checked={selectedDeletionPhotos.includes(photo.id)} onChange={(e) => handleChangeDeletion(photo.id)}/>
                        </div>
                    ))}

                    <button type="submit">Delete these photos from {album.title} album</button>
                </form>
            </div>

            <div className="addition-container" onSubmit={handleAddition}>
                <form className="addition-form">
                    {possiblePhotos.map((photo) => (
                        <div className="edit-albums-photos-container">
                            <img src={photo.imageUrl} alt="stuff" className="edit-album-photo" key={photo.title}/>
                            <input type="checkbox" value={photo.id} key={photo.id} className="option-input" checked={selectedAdditionPhotos.includes(photo.id)} onChange={(e) => handleChangeAddition(photo.id)}/>
                        </div>
                    ))}

                    <button type="submit">Add these photos to {album.title} album</button>
                </form>
            </div>
        </div>
    )
}

export default AlbumEditForm;
