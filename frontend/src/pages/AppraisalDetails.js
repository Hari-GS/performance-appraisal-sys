import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AppraisalDetailsForEmployee from '../components/AppraisalDetailsForEmployee'
import { useLocation } from "react-router-dom";
import TopHeader from '../components/TopHeader';

function AppraisalDetails() {
    const location = useLocation();
    const { appraisal } = location.state || {};
    
    return (
        
        <div>
            <TopHeader breadcrumbs={["Active Appraisals","Participate Appraisal"]}/>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar role={"employee"}/>
                {/* Main Content */}
                <div className="flex flex-col flex-grow md:pl-64 pl-0 bg-primary">
                    <AppraisalDetailsForEmployee appraisal={appraisal}/>
                </div>
            </div>
        </div>
    )
}

export default AppraisalDetails
