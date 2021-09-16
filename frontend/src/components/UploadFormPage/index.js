import { useEffect, useState } from "react";

function UploadFormPage() {
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [notReady, setNotReady] = useState(true);


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
