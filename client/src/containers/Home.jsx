import React from "react"
import {Link} from "react-router-dom"

function Home() {
    return(
        <div className="Home">
            <div className="lander">
                <h1 className="my-5">Sign in to Get Started</h1>
                <Link className="sign-in-btn" to="/sign-in">Sign in</Link>
                </div>
        </div>
    )
}

export default Home;