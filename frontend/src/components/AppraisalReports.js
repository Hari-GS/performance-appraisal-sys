import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import AllReports from './AllReports'

function AppraisalReports() {
    return (
        <div>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar role={"hr"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-72 p-6 bg-primary">
                    <AllReports/>
                </div>
            </div>
            <Navbar title="Appraisal Reports"/>
        </div>
    )
}

export default AppraisalReports
