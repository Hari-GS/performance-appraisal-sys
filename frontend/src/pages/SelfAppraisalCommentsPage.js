import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import SelfAppraisalComments from '../components/SelfAppraisalComments.js'

function SelfAppraisalCommentsPage() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar role={"employee"}/>
            
            {/* Main Content */}
            <div className="flex flex-col flex-grow pl-72 p-6 pt-6 bg-primary">
                <Navbar title="Current Appraisal"/>
                <SelfAppraisalComments/>
            </div>
        </div>
    )
}

export default SelfAppraisalCommentsPage

