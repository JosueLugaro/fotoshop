import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import './SplashNavigation.css';

function SplashNavigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );

  return (
    <ul className="splash-nav-bar">
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default SplashNavigation;
