import { Link } from 'react-router-dom';

const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'My-Week', to: '/my-week' },
    { label: 'Pantry', to: '/pantry' },
    { label: 'Sign-In', to: '/sign-in' },
];

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar_container">
                {navLinks.map((link) => (
                    <Link key={link.to} to={link.to}>
                        <button>{link.label}</button>
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default NavBar;