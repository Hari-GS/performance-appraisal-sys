import React from 'react'
import AppraisalParticipants from '../components/AppraisalParticipants'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import TopHeader from '../components/TopHeader'

function AppraisalParticipantsPage() {
    return (
        <div>
            <TopHeader breadcrumbs={["Closed Appraisals","Appraisal Participants"]}/>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar role={"hr"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow md:pl-64 pl-0 bg-primary">
                    <AppraisalParticipants/>
                </div>
            </div>
        </div>
    )
}

export default AppraisalParticipantsPage
