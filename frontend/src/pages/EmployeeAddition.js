import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddEmployee from '../components/AddEmployee'

function EmployeeAddition() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <div className="flex flex-col flex-grow pl-72 p-6 pt-20 bg-gray-100">
                <Navbar title="Employees"/>
                <AddEmployee/>
            </div>
        </div>
    )
}

export default EmployeeAddition

