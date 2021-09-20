import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
        <NavLink to="/upload">Upload</NavLink>
        <NavLink to="/album_upload">Create an album</NavLink>
        <NavLink to="/albums">Albums</NavLink>
      </>
    );


  return (
    <ul className="nav-bar">
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
