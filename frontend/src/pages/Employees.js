import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import EmployeeProfiles from '../components/EmployeeProfiles'

function Employees() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <div className="flex flex-col flex-grow pl-72 p-6 pt-20 bg-primary">
                <Navbar title="Employees"/>
                <EmployeeProfiles/>
            </div>
        </div>
    )
}

export default Employees

