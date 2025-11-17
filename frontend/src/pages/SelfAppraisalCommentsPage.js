import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import SelfAppraisalComments from '../components/SelfAppraisalComments.js'
import TopHeader from '../components/TopHeader.js'

function SelfAppraisalCommentsPage() {
    return (
        <div>
            <TopHeader breadcrumbs={["Participate","Participate Appraisal","Comment Subordinates","Comment"]}/>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar role={"employee"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-64 bg-primary">
                    <SelfAppraisalComments/>
                </div>
            </div>
        </div>
    )
}

export default SelfAppraisalCommentsPage

