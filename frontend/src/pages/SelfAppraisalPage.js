import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import SelfAppraisal from '../components/SelfAppraisal'
import { useLocation } from 'react-router-dom'
import TopHeader from '../components/TopHeader'

function SelfAppraisalPage() {

    const location = useLocation();
    const { appraisal } = location.state || {};

    return (
        
        <div>
            <TopHeader breadcrumbs={["Participate Appraisals","Appraisal","Self Appraisal"]}/>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar role={"employee"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-72 p-6 bg-primary">
                    <SelfAppraisal currentAppraisal={appraisal}/>
                </div>
            </div>
        </div>
    )
}

export default SelfAppraisalPage
