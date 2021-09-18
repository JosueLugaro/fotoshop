import "./Gallery.css"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getAllPhotos } from '../../store/photos';
import { NavLink } from "react-router-dom";

function Gallery() {

    const dispatch = useDispatch();
    let pics = useSelector(state => state.photo.photos);

    useEffect(() => (
        dispatch(getAllPhotos())
    ), [dispatch]);

    return (
        <div>
            {pics.map((pic) => {
                return <NavLink to={`/photos/${pic.id}`} key={pic.id}><img src={pic.imageUrl} alt={pic.title} key={pic.id} className="image"/></NavLink>
            })}
        </div>
    );
}

export default Gallery;
