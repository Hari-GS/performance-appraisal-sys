import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import SelfAppraisal from '../components/SelfAppraisal'
import { useLocation } from 'react-router-dom'

function SelfAppraisalPage() {

    const location = useLocation();
    const { appraisal } = location.state || {};

    return (
        
        <div>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar role={"employee"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-72 p-6 bg-primary">
                    <SelfAppraisal currentAppraisal={appraisal}/>
                </div>
            </div>
            <Navbar title="Self Appraisal"/>
        </div>
    )
}

export default SelfAppraisalPage
