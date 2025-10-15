import React from 'react'
import AppraisalParticipants from '../components/AppraisalParticipants'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ParticipantReport from '../components/ParticipantReport'

function ParticipantReportPage() {
    return (
        <div>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar role={"hr"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-72 p-6 bg-primary">
                    <ParticipantReport/>
                </div>
            </div>
            <Navbar title="Participant Report"/>
        </div>
    )
}

export default ParticipantReportPage
