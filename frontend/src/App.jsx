import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './page/Login'
import Dashboard from './page/DashboardPage/Dashboard'
import Register from './page/Register';
import TestDB from './page/TestDB';
import DashboardLayout from './page/DashboardLayout'
import Exercise from './page/DashboardPage/Exercise';
import Membership from './page/DashboardPage/Membership';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='exercise' element={<Exercise />} />
            <Route path='membership' element={<Membership />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/testdb' element={<TestDB />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
