import React, { Component, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/trizz-logo.svg'
import AOS from 'aos'
import { API_URL } from './../../api/config'
import { getMembershipStatus } from '../../api/membership'
export default function Account() {

    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    if (!user) {
        navigate('/login')
    }

    const [membershipStatus, setMembershipStatus] = React.useState(null)

    useEffect(() => {
        getMembershipStatus(user.qr_token)
            .then(data => {
                if (data.success) setMembershipStatus("Active")
                else setMembershipStatus("Inactive")
            })
            .catch(err => console.error(err))
    }, [])
    const sortName = (user.full_name).split(' ').slice(0, 2).join(' ')
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
            <div data-aos="fade-up" data-aos-delay="200" id="member-card" className='mt-4 w-full py-6 px-4   text-sm rounded-lg max-md:shadow-[0_0_0_1px_rgba(225,225,225,.1)] bg-linear-to-tr from-secondary-background to-active-background'>
                <div className='flex justify-between'>
                    <span className='uppercase'>{sortName}</span>
                    <div className='flex items-center gap-2'>
                        <span className='font-extralight text-xs'>{membershipStatus}</span>
                        <div className={`status-light w-3 h-3 ${membershipStatus === "Active" ? "bg-green-400" : "bg-red-400"} rounded-full`}></div>
                    </div>
                </div>
                <div className='flex justify-between items-end mt-4'>
                    <img src={`${API_URL}/member-card/qr/${user.id}`} className='mt-2 w-1/2' alt="Member Card" />
                    <div className='Logo flex flex-row justify-center items-center gap-2 font-semibold'>
                        <img src={Logo} alt="trizz logo" className='w-6' />
                        <span className='text-light text-xs font-light'>Tirzz GYM</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
