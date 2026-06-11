import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import AdminSideBar from '../component/Personal/AdminSideBar'

function AdminLayout() {
    const isAdmin =
        localStorage.getItem("isAdmin");

    if (!isAdmin) {
        return (
            <Navigate
                to="/admin-login"
                replace
            />
        );
    }
    return (
        <div className="flex min-h-screen">
            <AdminSideBar />
            <main className="flex-1 px-6 pt-14 bg-main-background">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
