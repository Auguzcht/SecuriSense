import { useState } from 'react';
import './App.css';
import Squares from './components/Squares';
import NavBar from './components/NavBar';
import Home from './sections/Home';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="absolute overflow-x-hidden inset-0 z-0 h-screen w-screen transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,#8EC1CC_50%,#336571_100%)]">
      <NavBar />
      <Squares 
        speed={0.5} 
        squareSize={40}
        direction="diagonal"
        borderColor="rgba(251, 251, 251, 0.4)"
        hoverFillColor="rgba(125, 125, 246, 0.33)"
      />

      <div></div>
    </div>
  );
}

export default App;


