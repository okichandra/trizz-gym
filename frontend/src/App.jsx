import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './page/Login'
import Account from './page/DashboardPage/Account';
import Register from './page/Register';
import TestDB from './page/TestDB';
import DashboardLayout from './page/DashboardLayout'
import Transaction from './page/DashboardPage/Transaction';
import Membership from './page/DashboardPage/Membership';
import PurchaseMembership from './component/Personal/PurchaseMembership';
import Payment from './page/Payment'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardLayout />}>
            <Route index element={<Account />} />
            <Route path='account' element={<Account />} />
            <Route path='transaction' element={<Transaction />} />
            <Route path='membership' element={<Membership />} >
            </Route>
          </Route>
          <Route path="/membership/purchase/:planId" element={<PurchaseMembership />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/testdb' element={<TestDB />} />
          <Route path="/payment/:transactionId" element={<Payment />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
