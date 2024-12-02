import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet is where the page content will change
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* The content changes here based on the route */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
