import { getAllPhotos } from '../../store/photos';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import "./AlbumFormPage.css";

function AlbumFormPage() {
    const dispatch = useDispatch();
    let pics = useSelector(state => state.photo.photos);
    let user = useSelector(state => state.session.user);
    let possiblePhotos = pics.filter((photo) => (
        photo.albumId === null && photo.userId === user.id
    ));
    let [selectedPhotos, setSelectedPhotos] = useState([]);

    useEffect(() => (
        dispatch(getAllPhotos())
    ), [dispatch]);

    // useEffect(() => {


    //     setSelectedPhotos(newArray);
    // }, [possiblePhotos]);

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

    const handleSubmit = () => {

    }

    return (
        <div>
            <h1>This is the album form page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Album Name:
                    <input type="text"/>
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
