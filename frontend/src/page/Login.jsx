import React, { Component } from 'react'
import Grainient from '../component/ReactBitz/Grainient';
import Logo from '../assets/trizz-logo.svg'
import Input from '../component/Personal/Input';
import SubmitButton from '../component/Personal/SubmitButton';
import { Link } from 'react-router-dom';

export default class Login extends Component {

    render() {
        return (
            <div className='bg-main-background h-screen w-screen flex items-center justify-center font-rethink-sans'>
                <div id='login-container'
                    className='w-5/6 h-9/10 bg-secondary-background rounded-lg shadow-[0_0_0_1px_rgba(225,225,225,.1)] grid grid-cols-12'>
                    <div id='background' className='col-span-7 relative overflow-hidden'>
                        <Grainient
                            color1="#6911A3"
                            color3="#7D257E"
                            color2="#080F27"
                            timeSpeed={0.25}
                            colorBalance={0}
                            warpStrength={1}
                            warpFrequency={5}
                            warpSpeed={2}
                            warpAmplitude={50}
                            blendAngle={0}
                            blendSoftness={0.05}
                            rotationAmount={500}
                            noiseScale={2}
                            grainAmount={0.1}
                            grainScale={2}
                            grainAnimated={false}
                            contrast={1.5}
                            gamma={1}
                            saturation={1}
                            centerX={0}
                            centerY={0}
                            zoom={0.9}

                            className='absolute'
                        />
                        <div className='relative border-red-500 z-10 h-full w-full flex flex-col capitalize justify-end p-10 gap-4'>
                            <h3 className='text-medium text-3xl font-medium w-1/4'>Push <span className='text-light font-semibold'>your limit</span> with us</h3>
                            <span className='text-light w-1/2 text-sm'>train smarter, get stronger, and push your limit with expert coaching.</span>
                        </div>
                    </div>
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
