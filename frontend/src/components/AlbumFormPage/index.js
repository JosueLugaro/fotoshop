import { getAllPhotos } from '../../store/photos';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { updatePhoto } from "../../store/photos";
import { getAllAlbums, createAlbum } from '../../store/albums';
import "./AlbumFormPage.css";

function AlbumFormPage() {
    const dispatch = useDispatch();
    let pics = useSelector(state => state.photo.photos);
    let user = useSelector(state => state.session.user);
    let albums = useSelector(state => state.albums);
    let possiblePhotos = pics.filter((photo) => (
        photo.albumId === null && photo.userId === user.id
    ));
    let [selectedPhotos, setSelectedPhotos] = useState([]);
    let [title, setTitle] = useState('');

    useEffect(() => {
        dispatch(getAllPhotos());
        dispatch(getAllAlbums());
    }, [dispatch]);

    const handleChange = (photoId) => {
        let newArray = selectedPhotos.slice();

        if(newArray.includes(photoId)) {
            let index = newArray.indexOf(photoId)
            newArray.splice(index, 1);
        } else {
            newArray.push(photoId);
        }

        setSelectedPhotos(newArray);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let albumObj = {
            userId: user.id,
            title
        }

        let album = await dispatch(createAlbum(albumObj));
        if (album) {
            console.log(album, "<---------------------------------------------");
        }
        // dispatch(updatePhoto(selectedPhotos, ))
    }

    return (
        <div>
            <h1>This is the album form page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Album Name:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </label>
                <label>
                    Photos:
                </label>
                    <div className="option-wrapper">
                        {possiblePhotos.map((photo, index) => (
                            <div className="option-image-container" key={index}>
                                <img src={photo.imageUrl} alt="stuff" className="option-image" key={index}/>
                                <input type="checkbox" value={photo.id} key={photo.id} className="option-input" checked={selectedPhotos.includes(photo.id)} onChange={(e) => handleChange(photo.id)}/>
                            </div>
                        ))}
                    </div>

                <button type="submit">Create Album!</button>
            </form>
        </div>
    )
}

export default AlbumFormPage;
