import Home from './Home';
import About from './about';
import Contact from './contact';
import Login from './Login';
import Register from './Register';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div style={{marginTop : '-3.5rem'}}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element ={<Register/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/about" element={<About />} />
          <Route path='/home/contact' element={<Contact/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
