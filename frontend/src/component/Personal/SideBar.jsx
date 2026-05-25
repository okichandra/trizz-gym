import React from 'react'
import Logo from '../../assets/trizz-logo.svg'
import { NavLink } from 'react-router-dom'
import DashboardIcon from '../../assets/dashboard-icon.svg'
import ExerciseIcon from '../../assets/exercise-icon.svg'
import MembershipIcon from '../../assets/membership-icon.svg'

function SideBar() {
    return (
        <div className='Sidebar bg-secondary-background w-1/4 h-full py-10 flex flex-col gap-10 shadow-[0_0_0_1px_rgba(225,225,225,.1)]'>
            <div className='Logo w-full flex justify-center items-center gap-3 font-semibold'>
                <img src={Logo} alt="trizz logo" className='w-12' />
                <span className='text-light'>Tirzz GYM</span>
            </div>
            <nav className="flex flex-col gap-2">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `py-5 px-12 rounded-lg ${isActive
                            ? "bg-active-background text-white"
                            : "text-medium"
                        }`
                    }
                >
                    <div className='flex items-center gap-3'>
                        <img src={DashboardIcon} alt="dashboard icon" />
                        Dashboard
                    </div>
                </NavLink>
                <NavLink
                    to="/exercise"
                    className={({ isActive }) =>
                        `py-5 px-12 rounded-lg ${isActive
                            ? "bg-active-background text-white"
                            : "text-medium"
                        }`
                    }
                >
                    <div className='flex items-center gap-3'>
                        <img src={ExerciseIcon} alt="exercise icon" />
                        Exercise
                    </div>
                </NavLink>
                <NavLink
                    to="/membership"
                    className={({ isActive }) =>
                        `py-5 px-12 rounded-lg ${isActive
                            ? "bg-active-background text-white"
                            : "text-medium"
                        }`
                    }
                >
                    <div className='flex items-center gap-3'>
                        <img src={MembershipIcon} alt="membership icon" />
                        Membership
                    </div>
                </NavLink>
            </nav>
        </div>
    )
}

export default SideBar
