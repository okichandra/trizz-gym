import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import SideBar from '../component/Personal/SideBar'

function DashboardLayout() {
    const location = useLocation()
    const navigate = useNavigate()

    if(location.pathname == "/") {
        navigate("/account")
    }
    return (
        <div className="md:flex md:h-screen bg-main-background pt-14 text-white w-full font-rethink-sans relative">
            <SideBar />
            <main className='px-6 flex-1'>
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
