import React from 'react'
import EmployeeX from '../components/EmployeeX'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function Employee() {
    return (
        
        <div>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar />
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-72 p-6 bg-gray-100">
                    <EmployeeX/>
                </div>
            </div>
            <Navbar title="Employees"/>
        </div>
    )
}

export default Employee
