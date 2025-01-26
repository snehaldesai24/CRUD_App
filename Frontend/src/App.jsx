//import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/pages/Home';
import AddUser from './components/pages/AddUser';
import EditUser from './components/pages/EditUser';
import NotFound from './components/pages/NotFound';


function App() {
  
  return (
    <>  
    <Router>
    <h1 className='bg-purple-200 text-black p-4 text-5xl text-center my-5 '>CRUD OPERATIONS</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/edituser/:id" element={<EditUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </>
    
  )
}

export default App
