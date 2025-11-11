import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import PendingCommentsList from '../components/PendingCommentsList'
import TopHeader from '../components/TopHeader'

function PendingComments() {
    return (
        <div>
            <TopHeader breadcrumbs={["Active Appraisals","Participate Appraisal","Comment Subordinates"]}/>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar role={"employee"}/>
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-64 pt-0 bg-primary">
                    <PendingCommentsList/>
                </div>
            </div>
        </div>
    )
}

export default PendingComments

