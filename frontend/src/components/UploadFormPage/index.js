import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { getAllAlbums } from "../../store/albums";

function UploadFormPage() {
    const [album, setAlbum] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [notReady, setNotReady] = useState(true);

    const dispatch = useDispatch();
    let albumObj = useSelector(state => state.album);
    let allAlbums = albumObj.albums;

    useEffect(() => {
        dispatch(getAllAlbums());

        if(album && imageUrl && title) setNotReady(false);

    }, [dispatch, album, imageUrl, title]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = [];

        if (!album) errors.push("Please select an album.");
        if (!imageUrl) errors.push("Please input an image url.");
        if (!title) errors.push("Please input a title.");

        setValidationErrors(errors);
        console.log("This is submitting")
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
                    <select
                        value={album}
                        onChange={(e) => setAlbum(e.target.value)}
                        required
                    >
                        <option value="" disabled selected hidden>Select Album?</option>
                        {allAlbums.map((album, index) => (
                            <option value={album.id} key={index}>{album.title}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Image Url:
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        placeholder="optional"
                    />
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
