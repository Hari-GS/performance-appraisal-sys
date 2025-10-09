import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import PendingCommentsList from '../components/PendingCommentsList'

function PendingComments() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar role={"employee"}/>
            
            {/* Main Content */}
            <div className="flex flex-col flex-grow pl-72 p-6 pt-6 bg-primary">
                <Navbar title="Current Appraisal"/>
                <PendingCommentsList/>
            </div>
        </div>
    )
}

export default PendingComments

