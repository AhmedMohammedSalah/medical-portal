import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../admin/dashboardNav'
import Footer from '../admin/dashboardFooter'

const pharmaciestlayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-emerald-600">
        <Navbar />
        <main className="flex-grow">
            <Outlet />
        </main>
        <Footer />
        </div>
    )
}

export default pharmaciestlayout;
