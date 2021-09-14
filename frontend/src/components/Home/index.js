import React from "react";
import { useSelector } from "react-redux";
import Gallery from "../Gallery"
import "./Home.css";

function Home() {
    const sessionUser = useSelector(state => state.session.user);

    let page;
    if(sessionUser) {
        page = (
            <div className="signed-in">
                <h1>We're signed in!</h1>
                <Gallery />
            </div>
        );
    } else {
        page = (
            <div className="signed-out">
                <h1>This is a heading</h1>
                <h3>Some random filler text</h3>
            </div>
        )
    }

    return (
        <div className="home-body">
            {page}
        </div>
    );
}

 export default Home;
