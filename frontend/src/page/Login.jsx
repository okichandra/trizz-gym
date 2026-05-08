import React, { Component } from 'react'
import Logo from '../assets/trizz-logo.svg'
import Input from '../component/Personal/Input';
import SubmitButton from '../component/Personal/SubmitButton';
import { Link } from 'react-router-dom';
import FormBackground from '../component/Personal/FormBackground';

export default class Login extends Component {

    render() {
        return (
            <div className='bg-main-background h-screen w-screen flex items-center justify-center font-rethink-sans'>
                <div id='login-container'
                    className='w-5/6 h-9/10 bg-secondary-background rounded-lg shadow-[0_0_0_1px_rgba(225,225,225,.1)] grid grid-cols-12'>
                    <FormBackground />
                    <div id='login-form' className='col-span-5 p-16 px-28'>
                        <div className='Logo flex flex-row justify-center items-center pb-24 pt-4 gap-2 font-semibold'>
                            <img src={Logo} alt="trizz logo" className='w-12' />
                            <span className='text-light'>Tirzz GYM</span>
                        </div>
                        <div className='flex flex-col gap-9'>
                            <div className='text-light gap-1.5 flex flex-col'>
                                <h4 className='text-xl'>Welcome back Sir!</h4>
                                <span className='text-medium text-sm'>Sign in to your account to continue your journey with Tirzz GYM</span>
                            </div>
                            <form action="" className='text-light flex flex-col gap-5'>
                                <Input type="text" id="username" placeholder="Enter your username" label="Username*" />
                                <Input type="password" id="password" placeholder="********" label="Password*" />
                                <div className='flex flex-col gap-1 -mt-3'>
                                    <SubmitButton text="Sign in" />
                                    <span className='text-medium text-sm'>Don't have account? <Link to="/register" className='font-semibold text-light'>Sign Up</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
