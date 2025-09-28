import { useState } from 'react'
import './App.css'
import Squares from './components/Squares'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    
   <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#C3CDFA,transparent)] z-0">
      <NavBar/>
      <Squares 
        speed={0.5} 
        squareSize={40}
        direction="diagonal"
        borderColor="rgba(251, 251, 251, 0.58)"
        hoverFillColor="rgba(125, 125, 246, 0.33)"
      />
   </div>
   
  )
}

export default App

