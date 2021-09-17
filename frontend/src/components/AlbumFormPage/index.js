import { getAllPhotos } from '../../store/photos';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import "./AlbumFormPage.css";

function AlbumFormPage() {
    const dispatch = useDispatch();
    let pics = useSelector(state => state.photo.photos);
    let possiblePhotos = pics.filter((photo) => (
        photo.albumId === null
    ))

    useEffect(() => (
        dispatch(getAllPhotos())
    ), [dispatch]);

    return (
        <div>
            <h1>This is the album form page</h1>
            <form>
                <label>
                    Album Name:
                    <input type="text"/>
                </label>
                <label>
                    Photos:
                </label>
                    <div className="option-wrapper">
                        {possiblePhotos.map((photo) => (
                            <div className="option-image-container">
                                <img src={photo.imageUrl} alt="stuff" className="option-image"/>
                                <input type="checkbox" value={photo.id} className="option-input"/>
                            </div>
                        ))}
                    </div>
            </form>
        </div>
    )
}

export default AlbumFormPage;
