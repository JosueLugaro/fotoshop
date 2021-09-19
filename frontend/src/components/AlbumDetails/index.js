import { useParams, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getOneAlbum, deleteAlbum } from "../../store/albums";
import { getAllPhotos, updatePhoto } from '../../store/photos';
import "./AlbumDetails.css";

function AlbumDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    let history = useHistory();

    let user = useSelector(state => state.session.user)
    let album = useSelector(state => state.album.currentAlbum);
    let photos = useSelector(state => state.photo.photos);

    //This commented out block breaks the code for some reason, idk why
    // let [userAlbum, setUserAlbum] = useState(false);

    // if (user.id === album.userId) {
    //     setUserAlbum(true);
    // } else {
    //     setUserAlbum(false);
    // }

    let albumPhotos = photos.filter((photo) => (
        photo.albumId === album.id
    ))

    useEffect(() => {
        dispatch(getOneAlbum(params.albumId));
    }, [dispatch, params.albumId]);

    useEffect(() => {
        dispatch(getAllPhotos());
    }, [dispatch, album])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let albumPhotosIds = [];

        albumPhotos.forEach((photo) => {
            albumPhotosIds.push(photo.id);
        })

        await dispatch(updatePhoto(albumPhotosIds, null));

        dispatch(deleteAlbum(album.id))

        history.push('/');
    }


    return (
        <div className="album-details-container">
            <h1>This is the albums details page for the {album.title} album</h1>
            {user.id === album.userId ? <NavLink to={`/albums/${album.id}/edit`}>Edit</NavLink> : null}
            {albumPhotos && albumPhotos.map((photo) => (
                <div className="albums-photos-container" key={photo.id}>
                    <NavLink to={`/photos/${photo.id}`}><img src={photo.imageUrl} alt={photo.title} className="album-photo"/></NavLink>
                </div>
            ))}
            {user.id === album.userId
                ? <form onSubmit={handleSubmit}>
                    <button type="submit">Delete this album</button>
                  </form>
                : null
            }
        </div>
    )
}

export default AlbumDetails;
