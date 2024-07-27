import React, { ReactNode, useEffect } from 'react';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
