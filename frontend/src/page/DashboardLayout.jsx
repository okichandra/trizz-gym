import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../component/Personal/SideBar'

function DashboardLayout() {
    return (
        <div className="flex h-screen bg-main-background text-white w-full font-rethink-sans">
            <SideBar />
            <main className=' w-full p-10 flex-1'>
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
