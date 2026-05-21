import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './page/Login'
import Dashboard from './page/Dashboard'
import Register from './page/Register';
import TestDB from './page/TestDB';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/testdb' element={<TestDB />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
