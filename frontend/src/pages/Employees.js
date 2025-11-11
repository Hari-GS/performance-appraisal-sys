import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import EmployeeProfiles from '../components/EmployeeProfiles'
import TopHeader from '../components/TopHeader'

function Employees() {
    return (
        <div>
            <TopHeader breadcrumbs={["Participants"]}/>
            {/* Sidebar */}
            <Sidebar role={"hr"}/>
    
            {/* Main Content */}
            <div className="flex flex-col flex-grow pl-64 p-0 pt-0 bg-primary">
                {/* <Navbar title="Participants"/> */}
                <EmployeeProfiles/>
            </div>
        </div>
    )
}

export default Employees

