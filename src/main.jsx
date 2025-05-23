import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import About from './About.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<About />} />
        <Route path='/upload' element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
