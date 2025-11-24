import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import SentAppraisalsList from '../components/SentAppraisalsList'
import TopHeader from '../components/TopHeader'

function AppraisalsList() {
    return (
        
        <div>
            <TopHeader breadcrumbs={["Manage Appraisals"]}/>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar role={"hr"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow md:pl-64 pl-0 bg-primary">
                    <SentAppraisalsList/>
                </div>
            </div>
        </div>
    )
}

export default AppraisalsList
