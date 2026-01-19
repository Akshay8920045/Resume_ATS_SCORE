import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="text-gradient font-bold text-lg sm:text-2xl truncate">
                ScanMyResume
            </Link>
            <div className="flex-shrink-0">
                <Link to="/upload" className="primary-button text-xs sm:text-sm">
                    Upload Resume
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;