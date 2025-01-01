import React from 'react';
import Navbar from './Navbar';
import HeroSection from './Pages/HeroSection';
import About from './Pages/About';
import Service from './Pages/Service';
import Footer from './Footer';
function Main() {
    return (
        <div>
            <Navbar/>
            <HeroSection/>
            <About/>
            <Service/>
            <Footer/>
        </div>
      );
}

export default Main;