import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ParticipantReport from '../components/ParticipantReport'
import ClosedAppraisals from '../components/ClosedAppraisals'

function ClosedAppraisalsPage() {
    return (
        <div>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar role={"employee"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-72 p-6 bg-primary">
                    <ClosedAppraisals/>
                </div>
            </div>
            <Navbar title="Closed Appraisals"/>
        </div>
    )
}

export default ClosedAppraisalsPage
