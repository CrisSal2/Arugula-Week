import React from "react"
import {Link} from "react-router-dom"

function Home() {
    return(
        <div className="Home">
            <div className="flex flex-col items-center">
                <h1 className="my-5 text-white gloock-regular text-7xl">Sign In To Get Started</h1>
                <Link className="sign-in-btn gloock-regular bg-amber-100 text-green-900 hover:bg-white font-semibold border border-gray-400 rounded shadow" to="/signin">Sign In</Link>
                </div>
        </div>
    )
}

export default Home;