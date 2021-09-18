import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getOnePhoto, deletePhoto } from '../../store/photos';
import { getAllAlbums } from "../../store/albums";
import "./PhotoDetails.css";

function PhotoDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    let history = useHistory();

    let pic = useSelector(state => state.photo.currentPhoto);
    let user = useSelector(state => state.session.user);
    let albums = useSelector(state => state.album.albums);


    let photoAlbumArray = albums.filter((album) => (
        album.id === pic.albumId
    ))

    let photoAlbum = photoAlbumArray[0];


    useEffect(() => {
        dispatch(getOnePhoto(params.photoId));
        dispatch(getAllAlbums());
    }, [dispatch, params.photoId])

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(deletePhoto(pic.id));

        history.push('/');
    }

    return (
        <div className="photo-details">
            <h1>Photo details! {pic.id}</h1>
            <img src={pic.imageUrl} alt={pic.title}/>
            {
                photoAlbum
                    ? <p>This photo belongs to the <NavLink to={`/albums/${photoAlbum?.id}`}>{photoAlbum?.title}</NavLink> album</p>
                    : <p>This photo does not belong to an album yet</p>
            }
            <form onSubmit={handleSubmit}>
                {user.id === pic.userId ? <button type="submit" >Delete Photo</button> : null}
            </form>
        </div>
    )
}

export default PhotoDetails;
