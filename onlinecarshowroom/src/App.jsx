import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarPage from './pages/CarPage';
import Navbar from './components/Navbar'
import './App.css'


function App() {
  

  return (
    <>
        <div className="relative flex min-h-screen">
          
          
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/car" element={<CarPage />} />
            
          </Routes>
        </Router>
          
        </div>
    </>
  )
}

export default App
