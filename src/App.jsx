import { useState } from 'react';
import './App.css';
import Squares from './components/Squares';
import NavBar from './components/NavBar';
import Home from './sections/Home';
import PhishingDetector from './sections/Scanner';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Team from './sections/Team';

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="fixed inset-0 -z-10 w-full h-full">
        <div className="relative inset-0 w-full h-full overflow-x-hidden
             bg-[radial-gradient(ellipse_100%_100%_at_50%_10%,#c6d6ff_10%,transparent_100%)] bg-transparent">
          <Squares
            speed={0.5} 
            squareSize={40}
            direction='diagonal'
            borderColor='#fff'
            hoverFillColor='#222'>
          </Squares>
        </div>
      </div>
      
      <div>
        <NavBar />
        <div className='flex flex-col pt-20 md:pt-24'>
          <Home />
          <PhishingDetector/>
          <About/>
          <Team/>
          <Contact/>
          <Footer/>
        </div>
      </div>
    </div>
  );
}

export default App;



