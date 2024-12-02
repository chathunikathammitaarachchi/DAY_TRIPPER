import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Reviews from './components/Reviews'; 
import Footer from './components/Footer';
import PhotoGallery from './components/PhotoGallery';
import PackagePage from './components/PackagePage';
import AddPackageForm from './Admin/AddPackageForm';

function App() {
  return (
    
    <div>
      <Header />
      <section id="hero">
        <Hero />
      </section>
      <section id="services">
        <Services />
      </section>
      
      <section id="packages">
        <AddPackageForm/> 
      </section>

      <section id="packages">
        <PackagePage /> 
      </section>

      <section id="photogallery">
        <PhotoGallery />
      </section>

      <section id="reviews">
        <Reviews />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
}

export default App;
