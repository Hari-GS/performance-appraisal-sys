import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import AllReports from './AllReports'
import TopHeader from './TopHeader'

function AppraisalReports() {
    return (
        <div>
            <TopHeader breadcrumbs={["Reports"]}/>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar role={"hr"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow md:pl-64 pl-0 bg-primary">
                    <AllReports/>
                </div>
            </div>
        </div>
    )
}

export default AppraisalReports
