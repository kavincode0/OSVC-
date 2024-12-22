import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Contact from './pages/Contact'
import logo from './components/logo.png'
import Navbar from './components/NavBar'
import { GiHamburgerMenu } from "react-icons/gi";
import './App.css';

function App() {

  const [ showNav, setShowNav ] = useState(false)

  return (
    <>
      <Router>
      <div className="App">
      
      <header>
        <div>
          <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
        </div>
          <img src={logo} alt="Logo" className='logo'/>
      </header>
      
      <Navbar show={showNav}/>
          
      <div className='main'>
          <Routes>
            <Route path='/' exact={true} element={<Home />}/>
            <Route path='/about' exact={true} element={<About />}/>
            <Route path='/contact' exact={true} element={<Contact/>}/>
          </Routes>
      </div>
    </div>
      </Router>
    </>
  );
}

export default App;
