import React from 'react'
import {Link} from 'react-router-dom'


function NavBar() {
    return (
        <nav className="navbar">
            <div>
            <Link to={'/'}>
                <button>Home</button>
                </Link>
            </div>
            <div className='navbar_container'>
                <Link to={'/about'}>
                <button>About</button>
                </Link>
                <Link to={'/my-week'}>
                <button>My-Week</button>
                </Link>
                <Link to={'/pantry'}>
                <button>Pantry</button>
                </Link>
                <Link to={'/sign-in'}>
                <button>Sign-In</button>
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;







/* const data = [
    {
        label: 'HOME',
        to: '/'
    },
    {
        label: 'ABOUT',
        to: '/about'
    },
    {
        label: 'MY-WEEK',
        to: '/my-week'
    },
    {
        label: 'PANTRY',
        to: '/pantry'
    },
    {
        label: 'SIGN-IN',
        to: '/sign-in'
    }
] */