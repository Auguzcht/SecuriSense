import { useState } from 'react';
import './App.css';
import Squares from './components/Squares';
import NavBar from './components/NavBar';
import Home from './sections/Home';
import PhishingDetector from './sections/Scanner';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <div className="relative inset-0 w-full h-full overflow-x-hidden
             bg-[radial-gradient(ellipse_100%_100%_at_50%_10%,#c6d6ff_10%,transparent_100%)] bg-transparent">
               <Squares
        speed={0.5} 
squareSize={40}
direction='diagonal' // up, down, left, right, diagonal
borderColor='#fff'
hoverFillColor='#222'>

        </Squares>
        </div>
      </div>

      {/* Foreground Content */}
      <div>
        <NavBar />
        <div className='flex flex-col gap-20'>
          <Home />
          <PhishingDetector/>
        <About/>
        <Contact/>
        <Footer/>
        </div>
      </div>
    </div>
  );
}

export default App;


