import React from 'react'
import AppraisalParticipants from '../components/AppraisalParticipants'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function AppraisalParticipantsPage() {
    return (
        <div>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar role={"hr"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-72 p-6 bg-primary">
                    <AppraisalParticipants/>
                </div>
            </div>
            <Navbar title="Reports"/>
        </div>
    )
}

export default AppraisalParticipantsPage
