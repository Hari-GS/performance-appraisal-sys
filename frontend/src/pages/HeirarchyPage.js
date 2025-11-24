import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import OrganizationalChart from '../components/OrganizationalChart'
import OrganizationEditor from '../components/OrganizationEditor'
import TopHeader from '../components/TopHeader'

function HeirarchyPage() {
    return (
        
        <div>
            <TopHeader breadcrumbs={["Participants","Heirarchy"]}/>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar role={"hr"}/>
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow md:pl-64 pl-0 p-6 bg-primary">
                    <OrganizationEditor/>
                </div>
            </div>
        </div>
    )
}

export default HeirarchyPage
