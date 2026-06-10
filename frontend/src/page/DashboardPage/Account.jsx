import React, { Component, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/trizz-logo.svg'
import AOS from 'aos'
import { API_URL } from './../../api/config'
import { getMembershipStatus } from '../../api/membership'
export default function Account() {

    const [showModal, setShowModal] = useState(false)
    const [pendingData, setPendingData] = useState(null);

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

    useEffect(() => {
        const checkPendingTransaction = async () => {

            try {

                const response = await fetch(
                    `${API_URL}/transactions/pending/${user.id}`
                );

                const data = await response.json();

                if (data.success) {
                    setPendingData(data.transaction);
                    setShowModal(true);
                }

            } catch (error) {
                console.error(error);
            }

        };

        checkPendingTransaction();

    }, []);

    AOS.init()
    return (
        <div className='bg-main-background h-full text-white flex flex-col font-rethink-sans '>
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
                    <span className='uppercase md:text-lg'>{sortName}</span>
                    <div className='flex items-center gap-2'>
                        <span className='font-extralight text-xs md:text-lg'>{membershipStatus}</span>
                        <div className={`status-light w-3 h-3 ${membershipStatus === "Active" ? "bg-green-400" : "bg-red-400"} rounded-full`}></div>
                    </div>
                </div>
                <div className='flex justify-between items-end mt-4'>
                    <img src={`${API_URL}/member-card/qr/${user.id}`} className='mt-2 w-1/2 max-w-xs' alt="Member Card" />
                    <div className='Logo flex flex-row justify-center items-center gap-2 font-semibold'>
                        <img src={Logo} alt="trizz logo" className='w-6' />
                        <span className='text-light text-xs font-light'>Tirzz GYM</span>
                    </div>
                </div>
            </div>
            {
                showModal && (
                    <div 
                        data-aos="fade-up"
                        className="bg-black/60 flex justify-center items-center pt-5">
                        <div
                            onClick={() => navigate(`/payment/${pendingData.id}`)}w
                            className="bg-main-background border border-amber-400/45 py-2 px-4 rounded-xl w-full flex items-center justify-between cursor-pointer">
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Continue Payment
                                </h2>
                                <p className="  text-medium text-sm">
                                    Complete your pending payment
                                </p>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17"><path fill="#908e10" d="m4.25 2.005.837-.942L12.75 8.5l-7.663 7.438-.837-.943L10.942 8.5z" /></svg>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
