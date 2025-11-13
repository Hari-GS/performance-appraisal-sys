import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ParticipantReport from '../components/ParticipantReport'
import ClosedAppraisals from '../components/ClosedAppraisals'
import TopHeader from '../components/TopHeader'

function ClosedAppraisalsPage() {
    return (
        <div>
            <TopHeader breadcrumbs={["Closed Appraisals"]}/>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar role={"employee"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-64 bg-primary">
                    <ClosedAppraisals/>
                </div>
            </div>
        </div>
    )
}

export default ClosedAppraisalsPage
