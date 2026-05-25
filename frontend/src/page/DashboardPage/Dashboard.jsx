import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/trizz-logo.svg' 

export default function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    if (!user) {
        navigate('/login')
    }

    return (
        <div className='bg-main-background text-white h-screen flex font-rethink-sans'>
            <h1 className='text-3xl font-bold'>
            Welcome Back, {user.username
            }
            </h1>
        </div>
    )
}
