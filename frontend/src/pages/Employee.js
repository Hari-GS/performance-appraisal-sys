import React from 'react'
import EmployeeX from '../components/EmployeeX'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function Employee() {
    return (
        
        <div>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar role={"hr"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-72 p-6 bg-primary">
                    <EmployeeX/>
                </div>
            </div>
            <Navbar title="Employees"/>
        </div>
    )
}

export default Employee
