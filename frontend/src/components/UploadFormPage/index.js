import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postPhoto } from "../../store/photos";

function UploadFormPage() {
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [albumId] = useState(1);
    const [description, setDescription] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [notReady, setNotReady] = useState(true);
    const userObj = useSelector(state => state.session);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {

        if(imageUrl && title) setNotReady(false);
        else setNotReady(true);

    }, [imageUrl, title]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = [];

        if (!imageUrl) errors.push("Please input an image url.");
        if (!title) errors.push("Please input a title.");

        setValidationErrors(errors);

        let formData = {
            userId: userObj.user.id,
            albumId,
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
                {/* <input type="hidden" name="userId" value={userObj.user.id}/>
                <input type="hidden" name="albumId" value={albumId} /> */}
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
