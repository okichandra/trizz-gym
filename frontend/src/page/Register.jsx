import React, { useState } from 'react'
import Grainient from '../component/ReactBitz/Grainient';
import Logo from '../assets/trizz-logo.svg'
import Input from '../component/Personal/Input';
import SubmitButton from '../component/Personal/SubmitButton';
import { Link } from 'react-router-dom';
import FormBackground from '../component/Personal/FormBackground';
import { useEffect } from 'react';

function Register() {

    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [strength, setStrength] = useState("weak")
    const [color, setColor] = useState("text-red-400")

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password)

    useEffect(() => {

        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (
            hasLowercase &&
            hasUppercase &&
            hasNumber
        ) {

            if (password.length >= 12) {
                setStrength("strong");
                setColor("text-green-400")
            } else if (password.length >= 8) {
                setStrength("medium");
                setColor("text-yellow-400")
            }

        } else {
            setStrength("weak");
            setColor("text-red-400")
        }

    }, [password]);


    const handleRegister = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("Username dan password harus diisi")
            return
        }
        if (password !== confirmPassword) {
            alert("Password tidak sama")
            return
        }
        try {
            const response = await fetch(
                "http://localhost:8000/api/register.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        full_name: fullName,
                        username: username,
                        email: email,
                        password: password
                    })
                }
            )

            const data = await response.json()

            alert(data.message)
            console.log(data)
        } catch (error) {
            console.log(error)
            alert("Terjadi error")
        }
    }

    return (
        <div className='bg-main-background h-screen w-screen flex items-center justify-center font-rethink-sans'>
            <div id='register-container'
                className='w-full md:w-5/6 h-9/10 p-4 bg-secondary-background md:rounded-lg md:shadow-[0_0_0_1px_rgba(225,225,225,.1)] md:grid grid-cols-12'>
                <FormBackground />
                <div id='register-form' className='col-span-5 m:p-16 md:px-28'>
                    <div className='Logo flex flex-row justify-center items-center pb-24 pt-4 gap-2 font-semibold'>
                        <img src={Logo} alt="trizz logo" className='w-12' />
                        <span className='text-light'>Tirzz GYM</span>
                    </div>
                    <div className='flex flex-col gap-9'>
                        <div className='text-light gap-1.5 flex flex-col'>
                            <h4 className='text-xl'>Create your account</h4>
                            <span className='text-medium text-sm'>Sign up to start building better experiences with Tirzz GYM</span>
                        </div>

                        <form onSubmit={handleRegister} className='text-light flex flex-col gap-5'>
                            <Input
                                type="text"
                                id="fullName"
                                placeholder="Enter your name"
                                label="Full Name*"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />

                            <Input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                label="Username*"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <Input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                label="Email*"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className='flex gap-4'>

                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="********"
                                    label="Password*"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <Input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="********"
                                    label="Confirm Password*"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            {password != '' && <h1 className={color}>password strength: {strength}</h1>}

                            <div className='flex flex-col gap-1 -mt-3'>

                                <SubmitButton text="Create Account" />

                                <span className='text-medium text-sm'>
                                    Already have an account?
                                    <Link
                                        to="/login"
                                        className='font-semibold text-light'
                                    >
                                        {" "}Sign In
                                    </Link>
                                </span>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
