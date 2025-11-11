import React from 'react'
import AppraisalParticipants from '../components/AppraisalParticipants'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ParticipantReport from '../components/ParticipantReport'
import TopHeader from '../components/TopHeader'

function ParticipantReportPage() {
    return (
        <div>
            <TopHeader breadcrumbs={["Closed Appraisals","Appraisal Participants","Report"]}/>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar role={"hr"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-64 bg-primary">
                    <ParticipantReport/>
                </div>
            </div>
        </div>
    )
}

export default ParticipantReportPage
