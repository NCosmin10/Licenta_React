import React from 'react';
import './Layout.css';
import NavBar from './NavBar';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <NavBar />
            <div className="content">
                {children}
            </div>
        </div>
    );
}

export default Layout;
