import { getAllAlbums } from "../../store/albums";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "./AlbumGallery.css";

function AlbumGallery() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllAlbums());
    }, [dispatch]);

    let albums = useSelector(state => state.album.albums);

    return (
        <div>
            <h1>Your Albums:</h1>
            {albums
                ? albums.map((album) => (
                    <NavLink to={`/albums/${album.id}`}><h3>{album.title}</h3></NavLink>
                ))
                : <h3>You do not have any albums yet</h3>
            }
        </div>
    );
}

export default AlbumGallery;
