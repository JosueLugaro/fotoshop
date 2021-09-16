import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getAllAlbums } from "../../store/albums";

function UploadFormPage() {
    const dispatch = useDispatch();
    let albumObj = useSelector(state => state.album);
    let allAlbums = albumObj.albums;

    useEffect(() => {
        dispatch(getAllAlbums());
    }, [dispatch]);

    return (
        <h1>This is the upload form!</h1>
    )
}

export default UploadFormPage;
