import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../home/Header'
import Footer from '../home/Footer'
import Sidebar from '../shared/Sidebar'

const PatientLayout = () => {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {/* side bar  */}
          <div className="flex">
            <div className=" bg-gray-800 text-white hight h-screen w-64">
              <Sidebar
                userRole="patient"
                isCollapsed={false}
                onToggle={() => {}}
              />
            </div>
            <div className="flex-grow p-6 bg-gray-100">
              {/* Main content will be rendered here */}
              <Outlet />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
}

export default PatientLayout;
