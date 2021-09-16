import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getOnePhoto, deletePhoto } from '../../store/photos';
import "./PhotoDetails.css";

function PhotoDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    let history = useHistory();

    let pic = useSelector(state => state.photo.currentPhoto);
    let user = useSelector(state => state.session.user);

    useEffect(() => (
        dispatch(getOnePhoto(params.photoId))
    ), [dispatch, params.photoId])

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(deletePhoto(pic.id));

        history.push('/');
    }

    return (
        <div className="photo-details">
            <h1>Photo details! {pic.id}</h1>
            <img src={pic.imageUrl} alt="stuff"/>
            <form onSubmit={handleSubmit}>
                {user.id === pic.userId ? <button type="submit" >Delete Photo</button> : null}
            </form>
        </div>
    )
}

export default PhotoDetails;
