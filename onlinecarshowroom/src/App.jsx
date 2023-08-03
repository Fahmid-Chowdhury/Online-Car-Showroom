import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CarPage from './pages/CarPage';
import './App.css'


function App() {
  return (
    <>
        <div className="flex flex-col root-container">
          
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/cars" element={<CarPage />} />
          </Routes>
        </Router>
          
        </div>
    </>
  )
}

export default App
