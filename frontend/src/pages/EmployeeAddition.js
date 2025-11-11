import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddEmployee from '../components/AddEmployee'
import TopHeader from '../components/TopHeader'

function EmployeeAddition() {
    return (
        <div>
            <TopHeader breadcrumbs={["Participants","Edit Participants"]}/>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar role={"hr"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-64 m-8">
                    <AddEmployee/>
                </div>
            </div>
        </div>
    )
}

export default EmployeeAddition

