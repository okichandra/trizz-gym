import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";

import { loginUser as login } from '../api/auth'

import Logo from '../assets/trizz-logo.svg'

import Input from '../component/Personal/Input';
import SubmitButton from '../component/Personal/SubmitButton';
import FormBackground from '../component/Personal/FormBackground';

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [waiting, setWaiting] = useState(false)

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Username dan password harus diisi")
            return
        }

        try {
            setWaiting(true);
            const response = await login({ username, password });

            setWaiting(false);

            if (response.success) {
                localStorage.setItem("user", JSON.stringify(response.user))
                navigate("/account")
            } else {
                alert(response.message)
            }

            console.log(response);

        } catch (error) {
            console.log(error)
            alert("Terjadi error")
        }
    }

    return (
        <div className='bg-main-background h-screen w-screen flex md:justify-center md:items-center pt-4 font-rethink-sans'>
            <div id='login-container'
                className='w-full md:w-5/6 h-9/10 p-4 bg-secondary-background rounded-lg md:shadow-[0_0_0_1px_rgba(225,225,225,.1)] md:grid grid-cols-12'>
                <FormBackground />
                <div id='login-form' className='col-span-5 m:p-16 md:px-28'>
                    <div className='Logo flex flex-row justify-center items-center pb-24 pt-4 gap-2 font-semibold'>
                        <img src={Logo} alt="trizz logo" className='w-12' />
                        <span className='text-light'>Tirzz GYM</span>
                    </div>
                    <div className='flex flex-col gap-9'>
                        <div className='text-light gap-1.5 flex flex-col'>
                            <h4 className='text-xl'>Welcome back Sir!</h4>
                            <span className='text-medium text-sm'>Sign in to your account to continue your journey with Tirzz GYM</span>
                        </div>
                        <form onSubmit={handleLogin} className='text-light flex flex-col gap-5'>
                            <Input type="text" id="username" placeholder="Enter your username" label="Username*" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <Input type="password" id="password" placeholder="********" label="Password*" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className='flex flex-col gap-1 -mt-3'>
                                <SubmitButton text="Sign in" waiting={waiting} />
                                <span className='text-medium text-sm'>Don't have account? <Link to="/register" className='font-semibold text-light'>Sign Up</Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}