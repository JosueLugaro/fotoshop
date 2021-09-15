import "./Gallery.css"
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getAllPhotos } from '../../store/photos';

function Gallery() {

    const dispatch = useDispatch();
    let pics = useSelector(state => state.photo.photos);

    useEffect(() => (
        dispatch(getAllPhotos())
    ), [dispatch]);

    return (
        <div>
            {pics.map((pic) => {
                return <img src={pic.imageUrl} alt="something" key={pic.id} className="image"/>
            })}
        </div>
    );
}

export default Gallery;
