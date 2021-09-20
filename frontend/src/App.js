import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import FootNav from "./components/FootNavigation";
import PhotoDetails from "./components/PhotoDetails";
import UploadFormPage from "./components/UploadFormPage";
import AlbumFormPage from "./components/AlbumFormPage";
import AlbumDetails from "./components/AlbumDetails";
import AlbumEditForm from "./components/AlbumEditForm";
import AlbumGallery from "./components/AlbumGallery";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home isLoaded={isLoaded}/>
          </Route>
          <Route exact path="/login">
            <LoginFormPage isLoaded={isLoaded}/>
          </Route>
          <Route exact path="/signup">
            <SignupFormPage isLoaded={isLoaded}/>
          </Route>
          <Route exact path="/upload">
            <UploadFormPage isLoaded={isLoaded}/>
          </Route>
          <Route exact path="/album_upload">
            <AlbumFormPage isLoaded={isLoaded}/>
          </Route>
          <Route exact path="/photos/:photoId">
            <PhotoDetails isLoaded={isLoaded}/>
          </Route>
          <Route exact path="/albums">
            <AlbumGallery isLoaded={isLoaded}/>
          </Route>
          <Route exact path="/albums/:albumId">
            <AlbumDetails isLoaded={isLoaded}/>
          </Route>
          <Route exact path="/albums/:albumId/edit">
            <AlbumEditForm isLoaded={isLoaded}/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
