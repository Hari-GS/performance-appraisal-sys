import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import OrganizationalChart from '../components/OrganizationalChart'
import OrganizationEditor from '../components/OrganizationEditor'

function HeirarchyPage() {
    return (
        
        <div>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar />
                
                {/* Main Content */}
                <div className="flex flex-col flex-grow pl-72 p-6 bg-primary">
                    <OrganizationEditor/>
                </div>
            </div>
            <Navbar title="Employees"/>
        </div>
    )
}

export default HeirarchyPage
