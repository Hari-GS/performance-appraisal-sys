import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import SentAppraisalsList from '../components/SentAppraisalsList'

function AppraisalsList() {
    return (
        
        <div>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar role={"hr"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-72 p-6 bg-primary">
                    <SentAppraisalsList/>
                </div>
            </div>
            <Navbar title="Manage Appraisals"/>
        </div>
    )
}

export default AppraisalsList
