import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/trizz-logo.svg'
import AOS from 'aos'     
export default function Account() {

    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    if (!user) {
        navigate('/login')
    }
    AOS.init()
    return (
        <div className='bg-main-background h-full text-white flex flex-col font-rethink-sans min-h-screen'>
            <h1 className='text-3xl font-semibold capitalize' data-aos="fade-right">
            Welcome Back, {user.username
            }
            </h1>
            <span className='text-medium mt-2 text-base' data-aos="fade-right" data-aos-delay="200">
                Don't forget to attend our Gym and reach your body goals with us!
            </span>
            <span className='mt-6 text-base' data-aos="fade-right" data-aos-delay="400">
                Your member card
            </span>
        </div>
    )
}
