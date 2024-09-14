import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useState } from 'react';

const publicLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Sign in', to: '/signin' },
];
const loggedInLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'My Week', to: '/myweek' },
    { label: 'Dashboard', to: '/dashboard' },
];

const navLinks = Auth.isLoggedIn() ? loggedInLinks : publicLinks;

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="navbar bg-white border-gray-200 dark:bg-gray-900">
            <div className="navbar_container max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <img src="../images/leaf.png" alt="logo" className="h-40"/>

                {/* Hamburger Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none dark:text-gray-400"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                {/* Navigation Links */}
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:border-gray-700">
                        {navLinks.map((link) => (
                            <li key={link.to}>
                                <Link to={link.to}>
                                    <button className="block py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500  dark:hover:text-white md:dark:hover:bg-transparent">
                                        {link.label}
                                    </button>
                                </Link>
                            </li>
                        ))}
                        {Auth.isLoggedIn() && (
                            <li>
                                <button
                                    onClick={Auth.logout}
                                    className="block py-2 px-6 text-white rounded bg-black  md:border-0  dark:text-white hover:bg-red-800"
                                >
                                    Sign out
                                </button>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Mobile Navigation Links */}
                <div
                    className={`${
                        isOpen ? 'block' : 'hidden'
                    } w-full md:hidden`}
                    id="mobile-menu"
                >
                    <ul className="flex flex-col items-end p-4 mt-4 border border-gray-100 rounded-lg">
                        {navLinks.map((link) => (
                            <li key={link.to}>
                                <Link to={link.to}>
                                    <button className="block py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500  dark:hover:text-white md:dark:hover:bg-transparent">
                                        {link.label}
                                    </button>
                                </Link>
                            </li>
                        ))}
                        {Auth.isLoggedIn() && (
                            <li>
                                <button
                                    onClick={Auth.logout}
                                    className="block py-2 px-6 text-white rounded bg-black  md:border-0  dark:text-white hover:bg-red-800"
                                >
                                    Sign out
                                </button>
                            </li>
                        )}
                    </ul>
                    </div>
            </div>
        </nav>
    );
}

export default NavBar;
