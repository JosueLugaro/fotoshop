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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/upload">
            <UploadFormPage />
          </Route>
          <Route exact path="/album_upload">
            <AlbumFormPage />
          </Route>
          <Route exact path="/photos/:photoId">
            <PhotoDetails />
          </Route>
          <Route exact path="/albums/:albumId">
            <AlbumDetails />
          </Route>
          <Route exact path="/albums/:albumId/edit">
            <AlbumEditForm />
          </Route>
        </Switch>
      )}
      <FootNav />
    </>
  );
}

export default App;
