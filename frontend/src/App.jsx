import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './page/Login'
import Dashboard from './page/Dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
