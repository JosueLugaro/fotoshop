import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getOnePhoto } from '../../store/photos';
import "./PhotoDetails.css";

function PhotoDetails() {
    const params = useParams();
    const dispatch = useDispatch();

    let pic = useSelector(state => state.photo.currentPhoto);

    console.log(pic, "<-----------------------------------");

    useEffect(() => (
        dispatch(getOnePhoto(params.photoId))
    ), [dispatch, params.photoId])

    return (
        <div className="photo-details">
            <h1>Photo details! {pic.id}</h1>
            <img src={pic.imageUrl} alt="stuff"/>
        </div>
    )
}

export default PhotoDetails;
