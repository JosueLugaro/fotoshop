import React from "react";
import { useSelector } from "react-redux";
import Gallery from "../Gallery"
import Navigation from "../Navigation";
import FootNav from "../FootNavigation";
import SplashNavigation from "../SplashNavigation";
import SplashFooterNavigation from "../SplashFooterNavigation";
import "./Home.css";

function Home({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let page;
    if(sessionUser) {
        page = (
            <>
                <div className="signed-in-container">
                    <div className="signed-in">
                        <h1>We're signed in!</h1>
                        <Gallery />
                    </div>
                </div>
            </>
        );
    } else {
        page = (
            <>
                <div className="signed-out-container">
                    <div className="signed-out">
                        <h1 className="inspiring-heading">Find your inspiration</h1>
                        <h3 className="inspiring-text">Join the fotoshop community, home to several photos</h3>
                        <h3 className="inspiring-text-two">and a handful of users</h3>
                        <a href="/signup" className="start-for-free">Start for free</a>
                    </div>
                </div>
            </>
        )
    }


    return (
            <div className="home-body-container">
                {sessionUser ? <Navigation isLoaded={isLoaded}/> : <SplashNavigation isLoaded={isLoaded}/>}
                <div className="home-body">
                    {page}
                </div>
                {sessionUser ? <FootNav /> : <SplashFooterNavigation />}
            </div>
    );
}

 export default Home;
