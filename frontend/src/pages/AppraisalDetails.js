import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AppraisalDetailsForEmployee from '../components/AppraisalDetailsForEmployee'
import { useLocation } from "react-router-dom";

function AppraisalDetails() {
    const location = useLocation();
    const { appraisal } = location.state || {};
    
    return (
        
        <div>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar role={"employee"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-72 p-6 bg-primary">
                    <AppraisalDetailsForEmployee appraisal={appraisal}/>
                </div>
            </div>
            <Navbar title="Active Appraisal"/>
        </div>
    )
}

export default AppraisalDetails
