import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postPhoto } from "../../store/photos";
import { getAllAlbums } from "../../store/albums";

function UploadFormPage() {
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [album, setAlbum] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [notReady, setNotReady] = useState(true);
    const userObj = useSelector(state => state.session);
    const albumObj = useSelector(state => state.album);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {

        dispatch(getAllAlbums());

        if(imageUrl && title) setNotReady(false);
        else setNotReady(true);

    }, [imageUrl, title, dispatch]);

    const userAlbums = albumObj.albums.filter((album) => (
        userObj.user.id === album.userId
    ));

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = [];

        if (!imageUrl) errors.push("Please input an image url.");
        if (!title) errors.push("Please input a title.");

        setValidationErrors(errors);

        let formData = {
            userId: userObj.user.id,
            album,
            imageUrl,
            title,
            description
        }

        if(!errors.length) {
            dispatch(postPhoto(formData));
        }

        history.push('/');
    }

    return (
        <div>
            <h1>This is the upload form!</h1>
            <ul>
                {validationErrors && validationErrors.map((error) => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <form className="upload-form" onSubmit={handleSubmit}>
                <label>
                    Image Url:
                    <input
                        type="text"
                        name="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="optional"
                    />
                </label>
                <label>
                    Select an Album:
                    <select onChange={(e) => setAlbum(e.target.value)}>
                        <option value="" disabled selected hidden>Optional</option>
                        {userAlbums.map((album) => (
                           <option value={album.id}>{album.title}</option>
                        ))}
                    </select>
                </label>
                <button
                    type="submit"
                    disabled={notReady}
                >
                    Submit!
                </button>
            </form>
        </div>
    )
}

export default UploadFormPage;
