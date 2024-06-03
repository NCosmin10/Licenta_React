import React from 'react';
import NavBar2 from './NavBar2'; // Adjust the path if necessary
import './Layout2.css';

const Layout2 = ({ children }) => {
    return (
        <div className="layout">
            <NavBar2 />
            <div className="content">
                {children}
            </div>
        </div>
    );
}

export default Layout2;
