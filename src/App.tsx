import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css' 

import Gallery from './components/Gallery'
import Personalize from './components/Personalize'
import View from './components/View'

const App: React.FC = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/personalize" element={<Personalize />} />
        <Route path="/view" element={<View />} />
      </Routes>
      <ToastContainer position="top-center" />
    </div>
  </Router>
)

export default App
