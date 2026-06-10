import React from 'react'
import Logo from '../../assets/trizz-logo.svg'
import { NavLink } from 'react-router-dom'
import TransactionIcon from '../../assets/transaction-icon.svg'
import UserIcon from '../../assets/user-icon.svg'
import MembershipIcon from '../../assets/membership-icon.svg'

function SideBar() {
    return (
        <div className='Sidebar max-md:fixed bg-secondary-background max-md:left-1/2 max-md:-translate-x-1/2 md:block max-md:bottom-6 max-md:w-5/6 md:w-1/4 md:h-min-screen md:pt-14 flex flex-col gap-10 shadow-[0_0_0_1px_rgba(225,225,225,.1)] max-md:rounded-4xl z-10'>
            <div className='Logo w-full hidden md:flex justify-center items-center gap-3 font-semibold'>
                <img src={Logo} alt="trizz logo" className='w-12' />
                <span className='text-light'>Tirzz GYM</span>
            </div>
            <nav className="flex md:flex-col md:mt-14 py-3 px-7 md:px-0 justify-between">
                <NavLink
                    to="/account"
                    className={({ isActive }) =>
                        `md:py-5 md:px-12 rounded-lg ${isActive
                            ? "md:bg-active-background text-white"
                            : "text-medium"
                        }`
                    }
                >
                    <div className='flex flex-col md:flex-row items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7" />
                        </svg>
                        <span className='text-xs'>Account</span>
                    </div>
                </NavLink>
                <NavLink
                    to="/membership"
                    className={({ isActive }) =>
                        `md:py-5 md:px-12 rounded-lg ${isActive
                            ? "md:bg-active-background text-white"
                            : "text-medium"
                        }`
                    }
                >
                    <div className='flex flex-col md:flex-row items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18.214 2.571c.208 0 .401.1.52.266l.048.075 3.434 6.44.037.087.01.032.014.067.008.075-.002.085.003-.055a.6.6 0 0 1-.052.254l-.025.05-.035.058-.045.058-9.615 11.112a.62.62 0 0 1-.33.228l-.05.012-.084.012-.05.002-.086-.006-.073-.014-.089-.03-.022-.01a.6.6 0 0 1-.208-.152L1.861 10.051l-.054-.075-.04-.08-.03-.085-.02-.112v-.11l.012-.084.009-.034.029-.082.023-.049 3.429-6.428a.64.64 0 0 1 .479-.335l.088-.006zm-2.866 7.715H8.65L12 18.994zm-8.075 0h-3.51l6.319 7.3zm12.962 0h-3.508l-2.805 7.295zM8.592 3.856H6.171L3.427 9H7.22zm5.485 0H9.922L8.55 9h6.898zm3.752 0h-2.422L16.78 9h3.792z" /></svg>
                        <span className='text-xs'>Membership</span>
                    </div>
                </NavLink>
                <NavLink
                    to="/transaction"
                    className={({ isActive }) =>
                        `md:py-5 md:px-12 rounded-lg ${isActive
                            ? "md:bg-active-background text-white"
                            : "text-medium"
                        }`
                    }
                >
                    <div className='flex flex-col md:flex-row items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path fill='currentColor' d="M21.505 8.669 13.928 2.31l-2.312 2.754-4.245-1.583-2.914 6.803H2.575v11.137h18.857V10.285h-1.284zm-7.366-3.943 4.95 4.153-1.179 1.406H9.474zm-5.836.933 2.144.8-3.21 3.826h-.915zm11.415 14.048H4.289V12h15.43z" />
                            <path fill='currentColor' d="M14.57 15.023H18v1.714h-3.43z" /></svg>
                        <span className='text-xs'>Transaction</span>
                    </div>
                </NavLink>
            </nav>
        </div>
    )
}

export default SideBar
